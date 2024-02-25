<template>
  <vx-card :title="title">
    <vx-card v-if="!isCategory">
        <div class="vx-row">

      <div id="dropdown" class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-4">
        <vs-dropdown vs-custom-content vs-trigger-click>
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2"><p>{{limit}}</p></span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <vs-dropdown-menu>
            <vs-dropdown-item>
              <span @click="setPerPagePrivileges(15)">15</span>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <span @click="setPerPagePrivileges(25)">25</span>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <span @click="setPerPagePrivileges(50)">50</span>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <span @click="setPerPagePrivileges(75)">75</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
         <div class="vx-col sm:w-full md:w-full lg:w-2/5 xl:w-2/5 mt-4"></div>
         <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-4"></div>
          <div class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4">
            <vs-input
              @keyup="fetchAllPrivileges()"
              icon="icon-search"
              icon-pack="feather"
              class="w-full mx-2 input-rounded-full no-icon-border"
              :placeholder="$t('Search')"
              v-model="searchKey"
            />
        </div>
      </div>
      </vx-card>
 <div v-if="!isCategory" class="vx-row mt-8 ml-8 ">                  <span class="mr-1 mt-1" v-if="isGranted('setRolePermission')">
                    <!-- <vs-switch color="success" @click="allowAllPermissions()" v-model="assignAllPermissions" /> -->
                    <label class="form-checkbox">
                            <input type="checkbox"  @click="allowAllPermissions()"
                               v-model="assignAllPermissions">
                            <i class="form-icon"></i>
                          </label>
                  </span><h4><strong>{{$t('allowAll')}}</strong></h4></div>
  <div class="vx-row mt-2">
      <div class="vx-col sm:w-full md:w-full lg:w-1/5 xl:w-1/5" :key="indextr" v-for="(tr, indextr) in permissions" style="border: 0px solid;
          padding: 8px;
          box-shadow: 0px 0px 1px #8B6E6E;">

  <span v-if="!isCategory" class="mr-1">
                    <label class="form-checkbox" >
                            <input :value="tr.privilegeId" @click="pushOrRemovePermissionId(tr.permissionStatus, tr.privilegeId)"
                               v-model="tr.permissionStatus" type="checkbox" >
                            <i class="form-icon"></i>
                          </label>
                    <!-- <vs-switch @click="pushOrRemovePermissionId(data[indextr].permissionStatus, data[indextr].privilegeId)" color="success" v-model="data[indextr].permissionStatus" /> -->
                  </span>{{ tr.privilegeDescription }}

                </div>
     </div>
     <div v-if="!isCategory" style="float:right;">
                <br>
                <vs-button v-if="isGranted('addLab')" @click="assignPermission()" color="success"
                  class="mr-3 mb-2 ">{{ $t('save') }}</vs-button>
              </div>
    <vx-card id="internal-card" title no-shadow card-border>
    </vx-card>
    <vs-pagination v-if="!isCategory" class="m-4 mt-10" :total="total" v-model="currentPage" @change="fetchAllPrivileges"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  props: {
    permissions: Array,
    title: String,
    isCategory:Boolean
  },
  data() {
    return {
      role: {},
      permissionStatuses: [],
      assignedPermissions: [],
      assignedPermissionIds: [],
      roleId: this.$route.params.id,
      assignAllPermissions: false,
      limit: 50,
      total: 0,
      currentPage: 1,
      perPage: 50,
      getRole:{},
      searchKey: "",

    };
  },
  methods: {
    setPerPagePrivileges(perPage){
      this.perPage = perPage;
      this.fetchAllPrivileges();
    },
    fetchAllPrivileges() {
      this.$http
        .get("/api/privileges",{
          params: {
            page: this.currentPage,
            limit: this.perPage,
            searchKey: this.searchKey }
        }

        )
        .then((response) => {
          this.permissions = response.data;
          this.total = response.data[0].totalPage
          this.isLoading = false;
          this.fetchAssignedPermissions();
          this.populatePermission();
        });
    },

    fetchAssignedPermissions(){
      if(this.$route.query.foo=="viewPrivilegeCategories"){
        this.$http
        .get("/api/privilege-category-privilege/"+this.$route.params.id)
        .then((response) => {
          this.assignedPermissions = response.data;
          this.isLoading = false;
          this.totalPage = 1;
          this.populateAssignedPermissionIds();
          this.populatePermission();
        });
      }
      else{
        this.$http
        .get("/api/role-privilege/"+this.$route.params.id)
        .then((response) => {
          this.assignedPermissions = response.data;
          this.isLoading = false;
          this.totalPage = 1;
          this.populateAssignedPermissionIds();
          this.populatePermission();
        });
      }

    },

    populatePermission(){
          var permissions=[], permissionObject={};
          for(let k=0; k< this.permissions.length; k++){
              permissionObject =  {
                          "privilegeId": this.permissions[k].privilegeId,
                          "privilegeName": this.permissions[k].privilegeName,
                          "privilegeDescription": this.permissions[k].privilegeDescription,
                          "privilegeUrl": this.permissions[k].privilegeUrl,
                          "method": this.permissions[k].method,
                          "createdBy": this.permissions[k].createdBy,
                          "privileged": this.permissions[k].privileged,
                          "totalPage": this.permissions[k].totalPage,
                          "permissionStatus": (this.assignedPermissions.filter(assignedPermission=>assignedPermission.privilegeId  ==this.permissions[k].privilegeId)).length>0 && this.assignedPermissions!=undefined ? true:false
                        }
              permissions.push(permissionObject);
        }
        this.permissions = permissions;
        if(this.permissions.filter(permission=>permission.permissionStatus==false).length==0)
            this.assignAllPermissions = true;
    },

    pushOrRemovePermissionId(permissionStatus, privilegeId) {
        this.assignAllPermissions = false;
        var obj={};
        if(!permissionStatus){
            this.assignedPermissionIds.push(privilegeId)
        }
        else{
           this.assignedPermissionIds = this.assignedPermissionIds.filter(assignedPermission=>assignedPermission != privilegeId)
        }
        // this.assignPermission();

    },

    assignPermission(){
        this.isLoading=true
      if(this.$route.query.foo=="viewPrivilegeCategories"){
        var rolePermissionObj = {privilegeCategoryId:this.$route.params.id, privilegeIds: this.assignedPermissionIds}
        this.$http
             .post("/api/privilege-category-privilege", rolePermissionObj)
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
               this.$router.push({ path: "/pages/view-privilege-categories" });
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
      }
else{
  rolePermissionObj = {roleId:this.$route.params.id, privilegeIds: this.assignedPermissionIds}
  this.$http
             .post("/api/role-privilege", rolePermissionObj)
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
               this.$router.push({ path: "/pages/view-roles" });
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
}

    },
    allowAllPermissions(){
      this.assignedPermissionIds = [];
      for(let j=0; j<this.permissions.length; j++){
        if(!this.assignAllPermissions){
            this.assignedPermissionIds.push(this.permissions[j].privilegeId);
            this.permissions[j].permissionStatus = true;
        }

        else{
            this.assignedPermissionIds = [];
            this.permissions[j].permissionStatus = false;
        }
      }
      // this.assignPermission();

    },
    populateAssignedPermissionIds(){
      for(let i=0; i<this.assignedPermissions.length; i++){
          this.assignedPermissionIds.push(this.assignedPermissions[i].privilegeId)
      }
    },

    fetchRole(){
      if(this.$route.query.foo!="viewPrivilegeCategories"){
      this.$http
        .get("/api/roles/"+this.$route.params.id,

        )
        .then((response) => {
this.title = response.data.roleName;
        });
      }
      else{
        this.$http
        .get("/api/privilege-category/"+this.$route.params.id,

        )
        .then((response) => {
this.title = response.data.category;
        });
      }
    }


  },
  created() {
    // this.fetchAllPrivileges();
    // this.fetchRole();
  },

  computed: {
    getPrivileges(){
        return this.$store.getters["PrivilegeModule/getPrivileges"];
      },

    getPrivilege(){
      return this.$store.getters["PrivilegeModule/getPrivilege"];
    },


  //   getRole(){
  //    return this.$store.getters["RoleModule/getRole"];
  //  }
  }
};
</script>

<style lang="scss" scoped>

</style>
