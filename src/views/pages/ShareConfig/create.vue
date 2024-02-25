<template>
  <div id="main-div" class="vx-row">

    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addShareConfig')">
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
                              :label="$t('shareCategory')"
                              v-model="record.shareCategory"
                              class="w-full"
                              name="shareCategory"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("shareCategory")
                            }}</span>
                          </div>
                          <!-- <div  class="vx-col w-12 mt-6">
                            <img height="20px" width="25px" src="@/optifood/assets/img/user-login.png" alt="">
                          </div> -->
                          <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('shareValue')"
                              v-model="record.shareValue"
                              class="w-full"
                              name="shareValue"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("shareValue")
                            }}</span>
                        </div>


  <!-- `start_date` datetime NOT NULL, -->

                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('minFounderShare')"
                              v-model="record.minFounderShare"
                              class="w-full"
                              name="minFounderShare"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("minFounderShare")
                            }}</span>
                        </div>
                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('minFounderShareValue')"
                              v-model="record.minFounderShareValue"
                              class="w-full"
                              name="minFounderShareValue"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("minFounderShareValue")
                            }}</span>
                        </div>
                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('maxFounderShare')"
                              v-model="record.maxFounderShare"
                              class="w-full"
                              name="maxFounderShare"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("maxFounderShare")
                            }}</span>
                          </div>
                          <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('maxFounderShareValue')"
                              v-model="record.maxFounderShareValue"
                              class="w-full"
                              name="maxFounderShareValue"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("maxFounderShareValue")
                            }}</span>
                          </div>

                          <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('minMemberShare')"
                              v-model="record.minMemberShare"
                              class="w-full"
                              name="minMemberShare"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("minMemberShare")
                            }}</span>
                        </div>

                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('minMemberShareValue')"
                              v-model="record.minMemberShare"
                              class="w-full"
                              name="minMemberShare"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("minMemberShare")
                            }}</span>
                        </div>

                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('maxMemberShare')"
                              v-model="record.maxMemberShare"
                              class="w-full"
                              name="maxMemberShare"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("maxMemberShare")
                            }}</span>
                        </div>

                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('maxMemberShareValue')"
                              v-model="record.maxMemberShareValue"
                              class="w-full"
                              name="maxMemberShareValue"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("maxMemberShareValue")
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
