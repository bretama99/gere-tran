<template>
  <vx-card>
<Privilege :isCategory="false" :permissions="permissions" :title="$t('allPrivileges')+' | '+title"/>
  </vx-card>
</template>
<script>
import Privilege from "@/components/Privilege/privilegePage.vue";
export default {
  components: {
    Privilege,
  },
  data() {
    return {
      role: {},
      permissionStatuses: [],
      assignedPermissions: [],
      assignedPermissionIds: [],
      roleId: this.$route.params.id,
      assignAllPermissions: false,
      permissions: [],
      limit: 50,
      total: 0,
      currentPage: 1,
      perPage: 50,
      getRole:{},
      searchKey: "",
      title:""

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
      this.$http
        .get("/api/roles/"+this.$route.params.id,

        )
        .then((response) => {
this.title = response.data.roleName;
        });
    }


  },
  created() {
    this.fetchAllPrivileges();
    this.fetchRole();
  },

  computed: {
  }
};
</script>

<style lang="scss" scoped>

</style>
