<template>
  <div id="main-div" class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editContact')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-2">
                          <div  class="vx-col w-12 mt-6">
                            <img height="20px" width="25px" src="@/optifood/assets/img/user-login.png" alt="">
                          </div>
                          <div
                            class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5"
                          >
                            <vs-input
                              :label="$t('name')"
                              v-model="name"
                              class="w-full"
                              name="name"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("step-2.name")
                            }}</span>
                          </div>
                          <div  class="vx-col w-12 mt-6">
                            <img height="20px" width="25px" src="@/optifood/assets/img/user-login.png" alt="">
                          </div>
                          <div
                          class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5"
                          >
                            <vs-input
                              :label="$t('firstName')"
                              v-model="firstName"
                              class="w-full"
                              name="firstName"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("step-2.firstName")
                            }}</span>
                        </div>
                        </div>
                        <div class="vx-row mt-2">
                          <div  class="vx-col w-12 mt-8">
                            <img height="20px" width="25px" src="@/optifood/assets/img/email.png" alt="">
                          </div>
                          <div
                          class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5"
                          >
                            <vs-input
                              :label="$t('email')"
                              v-model="email"
                              class="w-full"
                              name="email"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("step-2.email")
                            }}</span>
                          </div>

                           <div class="vx-col w-12 mt-8">
                              <img height="20px" width="25px" src="@/optifood/assets/img/phone-call.png" alt="">
                          </div>
                          <div
                          class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5"
                          >
                            <vs-input
                              :label="$t('phoneNumber')"
                              v-model="phoneNumber"
                              class="w-full"
                              name="phoneNumber"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("step-2.phoneNumber")
                            }}</span>
                          </div>
                        </div>
            <div class="vx-row ml-8 mt-8">
              <vs-button v-if="isGranted('editRole')" @click="editContact" color="#292929" class="mr-3 mb-2">{{$t('update')}}</vs-button>
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
import Loading from "vue-loading-overlay";
export default {
  components: {
    "v-select": VSelect,
    Loading
  },
  data() {
    return {
      name: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      isLoading: false,
      contactId: this.$route.params.id,
    };
  },
  methods: {
  editContact() {
    this.$validator.validateAll().then(result => {
       if (result) {
         this.isLoading=true
           this.$http
             .put("/api/contact/"+this.contactId, 
             {
              name: this.name,
              firstName: this.firstName,
              email: this.email,
              phoneNumber: this.phoneNumber
             })
             .then(response => {
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Update'),
                 text: this.$t('Update Successfully!'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "success",
                 time:6000
               });
               this.$router.push({ path: "/pages/view-contact" });
             }).catch(error=>{
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Update'),
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


    fetchContact(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/contact/"+this.contactId)
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.name = response.data.name;
          thisIns.firstName = response.data.firstName;
          thisIns.email = response.data.email;
          thisIns.phoneNumber = response.data.phoneNumber;
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
    this.fetchContact()
  }


};
</script>
<style  lang="scss" scoped>

</style>
