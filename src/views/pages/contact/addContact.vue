<template>
  <div id="main-div" class="vx-row">

    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addContact')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>  
          <form data-vv-scope="step-2">
                        <div class="vx-row mt-2">
                        <div class="vx-col sm:w-full md:w-full lg:w-full xl:w-full">
                        <div class="vx-row mt-2">
                          <div  class="vx-col w-12 mt-6">
                            <img height="20px" width="25px" src="@/optifood/assets/img/user-login.png" alt="">
                          </div>
                          <div
                            class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5"
                          >
                            <vs-input
                              :label="$t('name')"
                              v-model="record.name"
                              class="w-full"
                              name="name"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("name")
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
                              v-model="record.firstName"
                              class="w-full"
                              name="firstName"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("firstName")
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
                              v-model="record.email"
                              class="w-full"
                              name="email"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("email")
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
                              v-model="record.phoneNumber"
                              class="w-full"
                              name="phoneNumber"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("phoneNumber")
                            }}</span>
                          </div>
                          </div>
                          </div>
                        </div>
                      </form>        
            <div class="vx-row mt-4 ml-4">
                <div class="vx-col w-full">
                  <vs-button v-if="isGranted('addRole')" @click="addContact" color="#292929" class="mr-3 mb-2">{{$t('save')}}</vs-button>
                </div>
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
    firstName: {
      required: "Please enter first name",
    },
    name: {
      required: "Please enter name",
    },
    email: {
      required: "Please enter email",
    },
    phoneNumber: {
      required: "Please enter phone number",
    },
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
      record: {
        name: "",
        firstName: "",
        phoneNumber: "",
        email: "",
        }
    };
  },
  methods: {

    addContact() {
      this.$validator.validateAll().then(result => {
       if (result) {
         this.isLoading=true
           this.$http
             .post("/api/contact", this.record)
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
               this.$router.push({ path: "/pages/view-contact" });
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

};
</script>
<style  lang="scss" scoped>

</style>
