<template>
  <vx-card :title="$t('categoryList')">
    <vx-card class="mb-12">
          <div class="vx-row">
            <div class="vx-col sm:w-full md:w-full lg:w-1/6 xl:w-1/6 mt-4 mr-2">
              <vs-button
                class="mb-2 small text-base"
                icon-pack="feather"
                icon="icon-plus"
                color="#292929"
                @click.prevent="add"
                >{{ $t("create") }}
              </vs-button>
            </div>

            <div
              id="dropdown"
              class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-2"
            >
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div
                  class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                >
                  <span class="mr-2"
                    ><p>{{ limit }}</p></span
                  >
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


            <div
              class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-12"
            ></div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-4"
            ></div>
            <div  class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4">
              <vs-input
                @keyup="fetchPrivileges()"
                icon="icon-search"
                icon-pack="feather"
                class="w-full mx-2 input-rounded-full no-icon-border"
                :placeholder="$t('Search')"
                v-model="searchKey"
              />
            </div>
          </div>
          <div class="vx-row">
            <div
              class="vx-col sm:w-full md:w-full lg:w-2/3 xl:w-2/3"
            ></div>
            <div
              class="vx-col sm:w-full ml-6 md:w-full lg:w-1/5 xl:w-1/5"
            ><h3><strong style="" class="mt-12">{{$t('actions')}}</strong>
              <span >
                    <!-- <vs-switch color="success" @click="allowAllPermissions()" v-model="assignAllPermissions" /> -->
                    <label class="form-checkbox ml-10">
                            <input type="checkbox"  @click="allowAllPermissions()"
                               v-model="assignAllCategories">
                            <i class="form-icon"></i>
                          </label>
                  </span>
            </h3>
           
          </div>
            <div>

            </div>

          </div>

          <div :key="indextr" v-for="(tr, indextr) in privilegeCategories">
    <vs-collapse

    type="border" ref="open_me"
          @click="handleHeight(tr.privilegeCategoryId)"

    >
      <vs-collapse-item id="item" class="collapseItem" style="height:auto;">
      <div  slot="header" class="vx-row" style="">
        <div class="vx-col sm:w-full md:w-full lg:w-1/6 xl:w-1/6" @click="getPrivilegesInCategories(tr.privilegeCategoryId)">
          {{ tr.category }}
        </div>
<div class="vx-col sm:w-full md:w-full lg:w-1/2 xl:w-1/2">

</div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/3 xl:w-1/3"
        style="margin-top: -10px;">


            <span @click="updatePrivilegeCategory(tr.privilegeCategoryId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
              <span v-if="isGranted('deletePrivilegeCategory')"
                    @click=" openConfirmPrivilegeCategory(tr.privilegeCategoryId)"
                  >
                    <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
                  </span>

                  <span @click="assignPrivileges(tr.privilegeCategoryId)">
              <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-arrow-right" />
            </span>
            <span v-if="$route.query.foo!=undefined">
                    <label class="form-checkbox" style="margin-left: 10px; height:50px;">
                            <input style="margin-left: 10px; height:40px;" type="checkbox" :value="privilegeCategoriesForAssignment[indextr].status" @click="assignPrivilegesToCategory(tr.privilegeCategoryId, privilegeCategoriesForAssignment[indextr].status)"
                               v-model="privilegeCategoriesForAssignment[indextr].status">
                            <i style="margin-left: 10px; "></i>
                          </label>
                  </span>
            </div>
          </div>

        <!-- <div v-if="privileges.length>0 && privileges.filter(pf=>pf.privilegeCategoryIds!=null && pf.privilegeCategoryIds.includes(tr.privilegeCategoryId)).length>1">
          <div class="vx-row">
            <div
              id="dropdown"
              class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-2"
            >
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div
                  class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                >
                  <span class="mr-2"
                    ><p>{{ limit }}</p></span
                  >
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
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4"
            ></div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-4"
            ></div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4">
              <vs-input
                @keyup="fetchPrivileges()"
                icon="icon-search"
                icon-pack="feather"
                class="w-full mx-2 input-rounded-full no-icon-border"
                :placeholder="$t('Search')"
                v-model="searchKey"
              />
            </div>
          </div>
        </div>
        <vx-card id="internal-card" title no-shadow card-border v-if="privileges.length>0 && privileges.filter(pf=>pf.privilegeCategoryIds!=null && pf.privilegeCategoryIds.includes(tr.privilegeCategoryId)).length!=0">
          <vs-table
            class="stripe"
            hoverFlat
            @selected="goToDetail"
            :max-items="perPage"
            :data="
              privileges.filter(pf=>pf.privilegeCategoryIds!=null && pf.privilegeCategoryIds.includes(tr.privilegeCategoryId))
            "
          >
            <template slot="thead">
              <vs-th sort-key="number">#</vs-th>
              <vs-th sort-key="privilegeName">{{ $t("privilegeName") }}</vs-th>
              <vs-th sort-key="privilegeUrl">{{ $t("privilegeUrl") }}</vs-th>
              <vs-th sort-key="method">{{ $t("method") }}</vs-th>
              <vs-th>{{ $t("actions") }}</vs-th>
            </template>
            <template slot-scope="{ data }">
              <vs-tr style="height:10px;" :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td class="w-10">{{
                  indextr + 1 + limit * (currentPage - 1)
                }}</vs-td>
                <vs-td class="pr-4 w-1/5" :data="data[indextr].firstName"
                  >{{ data[indextr].privilegeName }}
                </vs-td>
                <vs-td class="pr-4 w-1/3" :data="data[indextr].privilegeUrl">{{
                  data[indextr].privilegeUrl
                }}</vs-td>
                <vs-td class="pr-4 w-1/10" :data="data[indextr].method">{{
                  data[indextr].method
                }}</vs-td>
                <vs-td class="pr-4 w-1/5" :data="data[indextr].id">
                  <span
                    v-if="isGranted('editPrivilege')"
                    @click="updatePrivilege(data[indextr].privilegeId)"
                  >
                    <vs-avatar
                      color="lightGreen"
                      icon-pack="feather"
                      icon="icon-edit"
                    />
                  </span>
                  <span
                    v-if="isGranted('deletePrivilege')"
                    @click="openConfirm(data[indextr].privilegeId)"
                  >
                    <vs-avatar
                      color="danger"
                      icon-pack="feather"
                      icon="icon-delete"
                    />
                  </span>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
          <p v-if="increament != 0">.</p>
        </vx-card> -->
        <Privilege :isCategory="true" :permissions="privileges.filter(pf=>pf.privilegeCategoryIds!=null && pf.privilegeCategoryIds.includes(tr.privilegeCategoryId))"/>

      </vs-collapse-item>
    </vs-collapse>
    </div>
    <div style="float:right;">
                <br>
                <vs-button v-if="isGranted('addLab')" @click="assignPermission()" color="success"
                  class="mr-3 mb-2 mt-2">{{ $t('assignPrivilege') }}</vs-button>
              </div>
  </vx-card>

      <!-- <div
        :key="indextr"
        v-for="(tr, indextr) in getPatientDetail.patientEncounters"
      > -->
    <!-- <vs-pagination class="m-4" :total="total" v-model="currentPage" @change="fetchPrivileges"></vs-pagination> -->
    <!-- <p v-if="increament != 0">.</p>
    <vs-pagination
      class="m-4"
      :total="total"
      v-model="currentPage"
      @change="fetchPrivileges()"
    ></vs-pagination> -->
 
  </vx-card>
</template>
<script>
import Privilege from "@/components/Privilege/privilegePage.vue";

export default {
  components: {
    Privilege
  },
  data() {
    return {
      dot: "",
      privileges: [],
      categoryAssignedRoles:[],
      limit: 1500,
      total: 0,
      isCategoryAssigned:false,
      currentPage: 1,
      privilegeId: "",
      confirm: "",
      searchKey: "",
      perPage: 1500,
      totalPage: 0,
      privilegeCategories: [],
      privilegesInCategories: [],
      preventTableClickAction: false,
      privilegeIds: [],
      privilegeIdsInRole:[],
      privilegesInRole:[],
      privilegeCategoriesForAssignment:[],
      categoryIds:[],
      title:"",
      assignAllCategories:false,

    };
  },
  methods: {


    allowAllPermissions(){
      this.privilegeIds = [];
  for(let i=0;i<this.privilegeCategories.length;i++){
    var privileges=this.privileges.filter(pf=>pf.privilegeCategoryIds!=null && pf.privilegeCategoryIds.includes(this.privilegeCategories[i].privilegeCategoryId));
        if(!this.assignAllCategories){
              this.privilegeCategoriesForAssignment[i].status = true;

            }

            else{
                this.privilegeCategoriesForAssignment[i].status = false;
            }    
        for(let j=0; j<privileges.length; j++){
        if(!this.assignAllCategories){
          this.privilegeCategoriesForAssignment[j].status = true;

            this.privilegeIds.push(privileges[j].privilegeId);
        }

        else{
            this.privilegeIds = [];
            this.privilegeCategoriesForAssignment[j].status = false;
        }
      }
  }
    },
    assignPrivilegesToCategory(privilegeCategoryId, status){
      var privileges=this.privileges.filter(pf=>pf.privilegeCategoryIds!=null && pf.privilegeCategoryIds.includes(privilegeCategoryId));
      if(status==false)
        for(let i=0;i<privileges.length;i++){
          if(!this.privilegeIds.includes(privileges[i].privilegeId))
          this.privilegeIds.push(privileges[i].privilegeId);
      }
      else{
        var temp = []
        for(let i=0;i<privileges.length;i++){
          temp.push(privileges[i].privilegeId)

      }
      this.privilegeIds = this.privilegeIds.filter(x => !temp.includes(x));

      }

    },
    assignPermission(){

    //  var assignedPreviousCatIds = this.privilegeCategoriesForAssignment.filter(st=>st.status==true);
    //  for(let i=0;i<assignedPreviousCatIds.length;i++){
    //   var privileges=this.privileges.filter(pf=>pf.privilegeCategoryIds!=null && pf.privilegeCategoryIds.includes(assignedPreviousCatIds[i].privilegeCategoryId));
    //   for(let i=0;i<privileges.length;i++){
    //       if(!this.privilegeIds.includes(privileges[i].privilegeId))
    //       this.privilegeIds.push(privileges[i].privilegeId);
    //   }

    //  }
      var rolePermissionObj = {categoryIds:this.categoryIds, roleId:this.$route.query.foo, privilegeIds: this.privilegeIds}
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
    },
    handleHeight(privilegeCategoryId) {
      var elem = $('._' + privilegeCategoryId);
      elem.closest(".vs-collapse-item--content").css("max-height", "");
    },
    openConfirmPrivilegeCategory(privilegeCategoryId) {
      this.privilegeCategoryId = privilegeCategoryId;
      this.$vs.dialog({
        type: "confirm",
        color: "warning",
        title: `Confirm`,
        text: this.$t("deleteConfirmation"),
        accept: this.acceptAlertPrivilegeCategory,
        acceptText: this.$t("Yes"),
        cancelText: this.$t("No")
      });
    },
    acceptAlertPrivilegeCategory() {
      const thisIns = this;
      this.$http
        .delete("/api/privilege-category/"+this.privilegeCategoryId)
        .then(function(response) {
          thisIns.$vs.notify({
            color: "success",
            title: "Status",
            text: "Privilege Category Deleted!"
          });
          thisIns.fetchPrivilegeCategories();
        }).catch(error => {
        });

    },
    adPrivilegeCategory: function() {
      this.$router.push({ name: "addPrivilegeCategory" });
    },
    assignPrivileges:function(id){
      this.$router.push({ path: "/pages/permissions/" + id, query: { foo: this.$route.name}});
    },
    updatePrivilegeCategory: function(id) {
      this.$router.push({ path: "/pages/edit-privilege-category/" + id, query: { foo: this.$route.name}});
    },
    setPerPagePrivileges(perPage) {
      this.perPage = perPage;
      this.fetchPrivileges();
    },


    getPrivilegesInCategories(privilegeCategoryId) {
      const thisIns = this;
    this.fetchCategory(privilegeCategoryId)
      this.isLoading = true;
      // this.$http
      //   .get("/api/privilege-category-privilege/"+privilegeCategoryId)
      //   .then(function (response) {
      //     thisIns.isLoading = false;
      //     thisIns.privilegesInCategories = response.data;
      //     this.title = response.data.category;

      //     thisIns.total = response.data[0].totalPage;
      //     var elem = $('._' + privilegeCategoryId);
      // elem.closest(".vs-collapse-item--content").css("max-height", "");
      //   })
      //   .catch((error) => {
      //     thisIns.isLoading = false;
      //   });
    },

    fetchPrivilegeCategories() {
      const thisIns = this;
      this.isLoading = true;
      this.$http
        .get("/api/privilege-category", {
          params: {
            page: thisIns.currentPage,
            limit: thisIns.perPage,
            searchKey: thisIns.searchKey,
          },
        })
        .then(function (response) {
          thisIns.isLoading = false;
          thisIns.privilegeCategories = response.data;
          // thisIns.total = response.data[0].totalPage;
          thisIns.checkIfCategoryAssignedToRole();

        })
        .catch((error) => {
          thisIns.isLoading = false;
        });
    },

    fetchPrivileges() {
      const thisIns = this;
      this.isLoading = true;
      this.$http
        .get("/api/privileges", {
          params: {
            page: thisIns.currentPage,
            limit: thisIns.perPage,
            searchKey: thisIns.searchKey,
          },
        })
        .then(function (response) {
          thisIns.isLoading = false;
          thisIns.privileges = response.data;

          thisIns.total = response.data[0].totalPage;
        })
        .catch((error) => {
          thisIns.isLoading = false;
        });
    },

    openConfirm(privilegeId) {
      this.privilegeId = privilegeId;
      this.$vs.dialog({
        type: "confirm",
        color: "warning",
        title: `Confirm`,
        text: this.$t("deleteConfirmation"),
        accept: this.acceptAlert,
        acceptText: this.$t("Yes"),
        cancelText: this.$t("No"),
      });
    },
    acceptAlert() {
      const thisIns = this;
      this.$http
        .delete("/api/privileges/" + this.privilegeId)
        .then(function (response) {
          thisIns.$vs.notify({
            color: "success",
            title: "Status",
            text: "Role Deleted!",
          });
          thisIns.fetchPrivileges();
        })
        .catch((error) => {});
    },
    add: function (id) {
      this.$router.push({ path: "/pages/add-privilege-category"});
    },
    updatePrivilege: function (id) {
      this.$router.push({ path: "/pages/edit-privilege/" + id});
    },
    checkIfCategoryAssignedToRole(){
      const thisIns = this;
      this.$http
        .get("/api/privileges/check-category-assigned-role", {
          params: {
            roleId: this.$route.query.foo
          },
        })
        .then(function (response) {
          thisIns.isLoading = false;
          thisIns.categoryAssignedRoles = response.data;

          // thisIns.total = response.data[0].totalPage;

          thisIns.populateVals();

        })
        .catch((error) => {
          thisIns.isLoading = false;
        });
    },
    populateVals(){
      const thisIns = this;
          var permissions = [];
          for(let i=0;i<this.privilegeCategories.length;i++){

             var obj = {
              "status":thisIns.categoryAssignedRoles.filter(pc=>pc.privilegeCategoryId==this.privilegeCategories[i].privilegeCategoryId).length==0?false:
              thisIns.categoryAssignedRoles.filter(ca=>ca.privilegeCategoryId==this.privilegeCategories[i].privilegeCategoryId)[0].status,
              "privilegeCategoryId":this.privilegeCategories[i].privilegeCategoryId
             }
             permissions.push(obj);

          }

          this.privilegeCategoriesForAssignment=permissions;
          if(this.privilegeCategoriesForAssignment.filter(permission=>permission.status==false).length==0)
            this.assignAllCategories = true;

    },
//     fetchCategory(privilegeCategoryId){
//         this.$http
//         .get("/api/privilege-category/"+privilegeCategoryId,

//         )
//         .then((response) => {
// this.title = response.data.category;
//         });
//       },
getPrivilegesInRole(){
  const thisIns = this;
  thisIns.$http
        .get("/api/role-privilege/"+thisIns.$route.query.foo,

        )
        .then((response) => {
          thisIns.privilegesInRole = response.data;
          

          for(let i=0;i<thisIns.privilegesInRole.length;i++){
            thisIns.privilegeIdsInRole.push(thisIns.privilegesInRole[i].privilegeId);
            thisIns.privilegeIds.push(thisIns.privilegesInRole[i].privilegeId);
          }
        });
      }
  },
  created() {
    this.fetchPrivilegeCategories();
    this.fetchPrivileges();
    if(this.$route.query.foo!=undefined){
      this.getPrivilegesInRole();
    }
  },

  computed: {
    getPrivileges() {
      return this.$store.getters["PrivilegeModule/getPrivileges"];
    },
    getPrivilege() {
      return this.$store.getters["PrivilegeModule/getPrivilege"];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vuesax/pages/switch.scss";
// @import "@/assets/scss/custom.scss";
#search {
  margin-left: 150px;
  width: 300px;
}
#dropdown {
  width: 500px;
  margin-left: 50px;
}
#add {
  width: 180px;
  background: aliceblue;
  text-decoration-color: white;
}
.loader-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
  cursor: pointer;
  span.text {
    display: inline-block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
  .loader {
    animation: loader-animate 1.5s linear infinite;
    clip: rect(0, 80px, 80px, 40px);
    height: 80px;
    width: 80px;
    position: absolute;
    left: calc(50% - 40px);
    top: calc(50% - 40px);
    &:after {
      animation: loader-animate-after 1.5s ease-in-out infinite;
      clip: rect(0, 80px, 80px, 40px);
      content: "";
      border-radius: 50%;
      height: 80px;
      width: 80px;
      position: absolute;
    }
  }
  @keyframes loader-animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(220deg);
    }
  }
  @keyframes loader-animate-after {
    0% {
      box-shadow: inset #fff 0 0 0 17px;
      transform: rotate(-140deg);
    }
    50% {
      box-shadow: inset #fff 0 0 0 2px;
    }
    100% {
      box-shadow: inset #fff 0 0 0 17px;
      transform: rotate(140deg);
    }
  }
}
</style>
