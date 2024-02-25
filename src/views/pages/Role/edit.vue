<template>
  <div id="main-div" class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editRole')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('roleName')"
                v-model="roleName"
                name="roleName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('roleName') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('roleFullName')"
                v-model="roleFullName"
                name="roleFullName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('roleFullName') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button v-if="isGranted('editRole')" @click="editRole" color="#292929" class="mr-3 mb-2">{{$t('update')}}</vs-button>
            </div>
            </div>
          </div>

          <div class="vx-row">
          </div>
          <div v-if="registerButtonClicked==true&&!error" class="loader-overlay">
            <div class="loader"></div>
            <span class="text" v-html="text"></span>
          </div>
        </vx-card>
      </vx-card>
    </div>
  </div>
</template>


<script>
import router from "@/router.js";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    roleName: {
      required: "Please enter role name",
      alpha: "Role name must be character"
    },
    roleFullName: {
      required: "Please enter role full name",
      alpha: "Role full name must be character"
    }
  }
};
Validator.localize("en", dict);
import VSelect from "vue-select";
// import flatPickr from "vue-flatpickr-component";
// import "flatpickr/dist/flatpickr.css";
import Loading from "vue-loading-overlay";
export default {
  components: {
    "v-select": VSelect,
    Loading
  },
  data() {
    return {
      roleName: "",
      roleFullName: "",
      registerButtonClicked: false,
      isLoading: false,
      roleId:this.$route.params.id,
      item: {},
    };
  },
  methods: {
  editRole() {
    this.$validator.validateAll().then(result => {
       if (result) {
         this.isLoading=true
           this.$http
             .put("/api/roles/"+this.roleId, 
             {
              roleName: this.roleName,
              roleFullName: this.roleFullName
             })
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
     });
      },


    fetchRole(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/roles/"+this.roleId)
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.roleName = response.data.roleName;
          thisIns.roleFullName = response.data.roleFullName;
          thisIns.total = 1;
        }).catch(error => {
            thisIns.isLoading=false
        });
    }

  },

computed: {
   getRole(){
     return this.$store.getters["RoleModule/getRole"];
   }
 },

created(){
    this.fetchRole()
  }


};
</script>
<style  lang="scss" scoped>

</style>
