<template>
  <div id="main-div" class="vx-row">

    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addRole')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('roleName')"
                v-model="role.roleName"
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
                v-model="role.roleFullName"
                name="roleFullName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('roleFullName') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button v-if="isGranted('addRole')" @click="addRole" color="#292929" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
      role:{roleName: "", roleFullName: ""},
      isLoading: false,
    };
  },
  methods: {
    resetValues(){
      this.role.roleName= "";
      this.role.roleFullName= "";
      this.isLoading= false;
    },

    checkRoleIfNotExist: function() {
      this.$store.dispatch('RoleModule/checkRole', this.roles.roleName).then(response => {
        if (response.data == "Test role name exists") {
          this.checkRole = "This role name already Exists";
        } else this.addRole();
      });
    },
    addRole() {
      this.$validator.validateAll().then(result => {
       if (result) {
         this.isLoading=true
           this.$http
             .post("/api/roles", this.role)
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
    }
  },
  updated() {
    if (this.roleName == "") {
      this.checkRole = "";
    }
  }
};
</script>
<style  lang="scss" scoped>

</style>
