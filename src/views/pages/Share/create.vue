<template>
  <div id="main-div" class="vx-row">

    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addShare')">
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
                            class="vx-col sm:w-full md:w-full l:w-1/3 xl:w-1/3"
                          >
                            <vs-input
                              :label="$t('shareAmount')"
                              v-model="record.shareAmount"
                              class="w-full"
                              type="number"
                              name="shareAmount"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("shareAmount")
                            }}</span>
                          </div>
                          <!-- <div  class="vx-col w-12 mt-6">
                            <img height="20px" width="25px" src="@/optifood/assets/img/user-login.png" alt="">
                          </div> -->
                          <div
                          class="vx-col sm:w-full md:w-full l:w-1/3 xl:w-1/3"
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



                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/3 xl:w-1/3"
                          >
                            <vs-input
                              :label="$t('serviceFee')"
                              v-model="record.serviceFee"
                              class="w-full"
                              name="serviceFee"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("serviceFee")
                            }}</span>
                        </div>

                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/3 xl:w-1/3"
                          >
                            <vs-input
                              :label="$t('servicePaidUp')"
                              v-model="record.servicePaidUp"
                              class="w-full"
                              name="servicePaidUp"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("servicePaidUp")
                            }}</span>
                        </div>


                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/3 xl:w-1/3"
                          >
                            <vs-input
                              :label="$t('paidUp')"
                              v-model="record.paidUp"
                              class="w-full"
                              name="paidUp"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("paidUp")
                            }}</span>
                        </div>

                        <div class="vx-col sm:w-1/3 w-full mb-6">
              <span class="ml-3">{{ $t('shareholder') }}</span>
              <v-select
                v-model="shareholderId"
                :placeholder="$t('shareholder')"
                class="ml-2"
                label="name"
                :options="countries"
                :reduce="country => record.shareholderId"
                name="shareholderId"
              ></v-select>
              <span class="text-danger">{{ errors.first('shareholderId') }}</span>
            </div>
                        </div>
                        <div class="vx-row mt-2">


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
        countryId: ""
        }
    };
  },
  methods: {


    updateDependableOptions(parentId, level){
      var collectionsKey='', url='';
      if(level=='Country'){
        if(parentId=='' || this.refCountryId==parentId){
          return;
          }
      this.refCountryId=parentId;
        // collectionsKey='regions';
        // url=`/region?countryId=${parentId}`;
        this.regionId='';
        this.regions=this.allRegions.filter(region=>region.countryId==this.countryId);
      }
      if(level=='Region'){
        if(parentId=='' || this.refRegionId==parentId){
          return;
        }
      this.refRegionId=parentId;
        // collectionsKey='zones';
        // url=`/zone?regionId=${parentId}`;
        this.zoneId='';
        this.zones=this.allZones.filter(zone=>zone.regionId==this.regionId);
        }
      if(level=='Zone'){
        collectionsKey='woredas';
        url=`/woreda?zoneId=${parentId}`;
      }
      if(level=='Woreda'){
        collectionsKey='kebelles';
        url=`/kebelle?woredaId=${parentId}`;
      }

    },
    
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
