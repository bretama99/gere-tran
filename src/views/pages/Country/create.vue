<template>
  <div id="main-div" class="vx-row">

    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addCountry')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>  
          <form data-vv-scope="step-2">
                        <div class="vx-row mt-2">
                        <div class="vx-col sm:w-full md:w-full lg:w-full xl:w-full">
                        <div class="vx-row mt-2">
                          <!-- <div  class="vx-col w-12 mt-6">
                            <img height="20px" width="25px" src="@/optifood/assets/img/user-login.png" alt="">
                          </div> -->
                          <div
                            class="vx-col sm:w-full mb-4 md:w-full l:w-1/4 xl:w-1/4"
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
                          <!-- <div  class="vx-col w-12 mt-6">
                            <img height="20px" width="25px" src="@/optifood/assets/img/user-login.png" alt="">
                          </div> -->
                          <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('localName')"
                              v-model="record.localName"
                              class="w-full"
                              name="localName"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("localName")
                            }}</span>
                        </div>

                      
                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('countryCode')"
                              v-model="record.countryCode"
                              class="w-full"
                              name="countryCode"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("countryCode")
                            }}</span>
                        </div>
                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('nationality')"
                              v-model="record.nationality"
                              class="w-full"
                              name="nationality"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("nationality")
                            }}</span>
                        </div>

                      
                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('localNationality')"
                              v-model="record.localNationality"
                              class="w-full"
                              name="localNationality"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("localNationality")
                            }}</span>
                          </div>

                         
                          <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('currency')"
                              v-model="record.currency"
                              class="w-full"
                              name="currency"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("currency")
                            }}</span>
                          </div>

                          <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('localCurrency')"
                              v-model="record.localCurrency"
                              class="w-full"
                              name="localCurrency"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("localCurrency")
                            }}</span>
                        </div>



                        </div>
            
                          </div>
                        </div>
                      </form>        
            <div class="vx-row mt-4 ml-4">
                <div class="vx-col w-full">
                  <vs-button v-if="isGranted('addRole')" @click="addCountry" color="#292929" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
        localName: "",
        countryCode: "",
        localCurrency:"",
        currency:"",
        localNationality:"",
        nationality:""
        }
    };
  },
  methods: {

    addCountry() {
      this.$validator.validateAll().then(result => {
       if (result) {
         this.isLoading=true
           this.$http
             .post("/api/countries",
             {
              "name":this.record.name,
              "name_tg":this.record.localName,
              "country_code":this.record.countryCode,
              "nationality":this.record.localCurrency,
              "nationality_tg":this.record.currency,
              "currency":this.record.localNationality,
              "currency_tg":this.record.nationality
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
               this.$router.push({ path: "/pages/view-countries" });
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
