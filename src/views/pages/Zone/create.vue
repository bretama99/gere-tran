<template>
  <div id="main-div" class="vx-row">

    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addZone')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>  
          <form data-vv-scope="step-2">
                        <div class="vx-row mt-2">
                        <div class="vx-col sm:w-full md:w-full lg:w-full xl:w-full">
                        <div class="vx-row mt-2">

                          <div
                            class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
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

                        <div class="vx-col sm:w-1/4 w-full mb-6">
              <span class="ml-3">{{ $t('Country') }}</span>
              <v-select
              v-model="record.countryId"
                :placeholder="$t('country')"
                class="ml-2"
                label="name"
                :options="countries"
                :reduce="country => country.id"
                :on-change="updateDependableOptions(countryId, 'Country')"
                name="countryId"
              ></v-select>
              <span class="text-danger">{{ errors.first('countryId') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <span class="ml-3">{{ $t('Region') }}</span>
              <v-select
              v-model="record.regionId"
                :placeholder="$t('region')"
                class="ml-2"
                label="name"
                :options="regions"
                :reduce="region => region.id"
                :on-change="updateDependableOptions(regionId, 'Region')"
                name="regionId"
              ></v-select>
              <span class="text-danger">{{ errors.first('regionId') }}</span>
            </div>
                        </div>

                          </div>
                        </div>
                      </form>        
            <div class="vx-row mt-4 ml-4">
                <div class="vx-col w-full">
                  <vs-button v-if="isGranted('addRole')" @click="addZone" color="#292929" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
        regionId: "",
        },
        regions:[],
        countries:[]
    };
  },


  created(){
    this.getCountries();
    this.getRegions();
  },


  methods: {
    getCountries(){
      this.$http
        .get("/api/countries")
        .then(response => {
          this.countries = response.data.data;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
},


getRegions(){

this.$http
  .get("/api/regions")
  .then(response => {
    this.regions = response.data.data;
    this.isLoading = false;
  })
  .catch(error => {
    this.isLoading = false;
  });
},

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


    addZone() {
      this.$validator.validateAll().then(result => {
       if (result) {

         this.isLoading=true
           this.$http
             .post("/api/zones", {
              "name":this.record.name,
              "name_tg":this.record.localName,
              "region_id":this.record.regionId
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
               this.$router.push({ path: "/pages/view-zones" });
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
