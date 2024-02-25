<template>
  <vx-card :title="$t('allRoles')+' | '+ user.firstName +' ' +user.middleName +' ' +user.lastName">
    <!-- <div id="knowledge-base-page">
    <vx-card :title="$t('allRoles')+' | '+getRole.roleName">
      <div class="knowledge-base-jumbotron">
        <div
          class="knowledge-base-jumbotron-content lg:p-8 md:p-24 sm:p-16 py-8 rounded-lg mb-base"
        >
          <div class="vx-row">
            <div class="w-2/5">
              <vs-input
                :placeholder="$t('seachRoleHint')"
                v-model="searchKey"
                icon-pack="feather"
                icon="icon-search"
                size="large"
                class="w-full no-icon-border mt-6"
                @keyup="searchRoles()"
              />
            </div>
            <div class="w-1/6" id="dropdown">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div
                  class="p-4 mt-6 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                >
                  <span class="pl-4 pr-4">
                    <p>{{(currentPage-1)*perPage+1}}-{{currentPage*perPage}} of {{totalPage*perPage}}</p>
                  </span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu>
                  <vs-dropdown-item>
                    <span @click="perPage=15 ,getRoles()">15</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=25,getRoles()">25</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=50,getRoles()">50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=75,getRoles()">75</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>

            <div class="w-1/5 mt-8">
              <vs-button
                class="small text-base"
                icon-pack="feather"
                icon="icon-plus"
                type="gradient"
                color="success"
                @click.prevent="add"
              >{{$t('addRole')}}</vs-button>
            </div>

            <div class="w-1/6 ml-12 mt-6">

            </div>
          </div>
        </div>
      </div>
    </div> -->
    <vx-card id="internal-card" title no-shadow card-border>
      <!-- KNOWLEDGE BASE CARDS  -->

      <vs-table
        class="stripe"
        hoverFlat
        :max-items="perPage"
        :data="roles"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="roleName">{{$t('roleName')}}</vs-th>
          <vs-th sort-key="roleFullName">{{$t('roleFullName')}}</vs-th>
          <vs-th v-if="isGranted('setRole')" sort-key="actions">{{$t('allowAll')}}
            <ul style="margin-left: 15px" class="switch-container">
                <li>
                  <span v-if="isGranted('setRole')">
                    <!-- <vs-switch color="success" @click="allowAllRoles()" v-model="assignAllRoles" /> -->
                    <label class="form-checkbox">
                            <input type="checkbox"  @click="allowAllRoles()"
                               v-model="assignAllRoles">
                            <i class="form-icon"></i>
                          </label>
                  </span>
                </li>
              </ul>
          </vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].roleName">{{data[indextr].roleName}}</vs-td>
            <vs-td class="pr-4 w-1/3" :data="data[indextr].roleFullName">{{data[indextr].roleFullName}}</vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
              <ul class="switch-container">
                <li>
                  <span v-if="isGranted('setRole')">
                    <!-- <vs-switch @click="pushOrRemoveRoleId(data[indextr].roleStatus,
                    data[indextr].roleId)" color="success" v-model="data[indextr].roleStatus" /> -->
                         <label class="form-checkbox" style="margin-left: 100px;">
                            <input type="checkbox" :value="data[indextr].roleId" @click="pushOrRemoveRoleId(data[indextr].roleStatus,
                    data[indextr].roleId)"
                               v-model="data[indextr].roleStatus">
                            <i class="form-icon"></i>
                          </label>
                  </span>
                </li>
              </ul>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div style="float:right;">
                <br>
                <vs-button v-if="isGranted('addLab')" @click="assignRole()" color="success"
                  class="mr-3 mb-2 mt-2">{{ $t('save') }}</vs-button>
              </div>
    </vx-card>
    <vs-pagination class="m-4 mt-10" :total="totalPage" v-model="currentPage" @change="getRoles"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      role: {},
      roleStatuses: [],
      assignedRoles: [],
      assignedRoleIds: [],
      userId: this.$route.params.id,
      assignAllRoles: false,
      roles: [],
      limit: 15,
      total: 0,
      currentPage: 1,
      perPage: 20,
      getRole:{},
      user:{}
    };
  },
  methods: {

    fetchAllRoles() {
        var params = {limit: this.perPage, page: this.currentPage}
      this.$http
        .get("/api/roles",

        )
        .then((response) => {
          this.roles = response.data;
          this.isLoading = false;
          this.fetchAssignedRoles();
          this.populateRole();
        });
    },

    fetchAssignedRoles(){

      this.$http
        .get("/api/user-role/assigned-roles/"+this.userId,

        )
        .then((response) => {
          this.assignedRoles = response.data;
          this.isLoading = false;
          this.totalPage = 1;
          this.populateAssignedRoleIds();
          this.populateRole();
        });
    },

    populateRole(){

          var roles=[], roleObject={};
          for(let k=0; k< this.roles.length; k++){
              roleObject =  {
                          "roleId": this.roles[k].roleId,
                          "roleName": this.roles[k].roleName,
                          "roleFullName": this.roles[k].roleFullName,
                          "createdBy": this.roles[k].createdBy,
                          "totalPage": this.roles[k].totalPage,
                          "roleStatus": (this.assignedRoles.roles.filter(assignedRole=>assignedRole.roleId  ==this.roles[k].roleId)).length>0 && this.assignedRoles!=undefined ? true:false

                        }
              roles.push(roleObject);
        }

        this.roles = roles;
        if(this.roles.filter(role=>role.roleStatus==false).length==0)
            this.assignAllRoles = true;
    },

    pushOrRemoveRoleId(roleStatus, roleId) {
        this.assignAllRoles = false;
        var obj={};
        if(!roleStatus){
            this.assignedRoleIds.push(roleId)
        }
        else{
           this.assignedRoleIds = this.assignedRoleIds.filter(assignedRole=>assignedRole != roleId)
        }
        // this.assignRole();

    },

    assignRole(){

        var roleRoleObj = {userId:this.$route.params.id, roleIds: this.assignedRoleIds, "isRoled":false}
        this.isLoading=true
        this.$http
             .post("/api/user-role", roleRoleObj)
             .then(response => {
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Add'),
                 text: this.$t('Registered Successfully!'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "success",
                 time:6000
               });
               this.$router.push({ path: "/pages/view-user" });
             }).catch(error=>{
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Add'),
                 text: this.$t('notRegistered'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "warnning",
                 time:6000
               });
             })
        // this.$store.dispatch('ManageRoleRolesModule/assignRole', roleRoleObj).then(response => {

        // })
        // .catch(error => {
        //   this.isLoading = false;
        // });
    },
    allowAllRoles(){
      this.assignedRoleIds = [];
      for(let j=0; j<this.roles.length; j++){
        if(!this.assignAllRoles){
            this.assignedRoleIds.push(this.roles[j].roleId);
            this.roles[j].roleStatus = true;
        }

        else{
            this.assignedRoleIds = [];
            this.roles[j].roleStatus = false;
        }
      }
      // this.assignRole();

    },
    populateAssignedRoleIds(){
      for(let i=0; i<this.assignedRoles.roles.length; i++){
          this.assignedRoleIds.push(this.assignedRoles.roles[i].roleId)
      }
    },

    fetchUser(){
      this.$http.get("/api/user/get-user-by-id/"+this.$route.params.id,
        )
        .then((response) => {
this.user = response.data;

        });
    }
  },
  created() {
    this.fetchAllRoles();
    this.fetchUser();
  },

  computed: {
  }
};
</script>

<style lang="scss" scoped>

</style>
