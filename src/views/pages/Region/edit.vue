<template>
  <div id="main-div" class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editRegion')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-2">
                       
                          <div
                            class="vx-col sm:w-full md:w-full l:w-1/3 xl:w-2/5"
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
                              errors.first("step-2.name")
                            }}</span>
                          </div>
                          
                          <div
                          class="vx-col sm:w-full md:w-full l:w-1/3 xl:w-2/5"
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
                              errors.first("step-2.localName")
                            }}</span>
                        </div>

                        <div class="vx-col sm:w-1/3 w-full mb-6 mt-6">
              <span class="ml-1">{{ $t('Country') }}</span>
              <v-select
                v-model="record.countryId"
                :placeholder="$t('country')"
                class="ml-0"
                label="name"
                :options="countries"
                :reduce="country => country.id"
                name="countryId"
              ></v-select>
              <span class="text-danger">{{ errors.first('countryId') }}</span>
            </div>
                        </div>
                  
            <div class="vx-row ml-8 mt-8">
              <vs-button v-if="isGranted('editRole')" @click="editRegion" color="#292929" class="mr-3 mb-2">{{$t('update')}}</vs-button>
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
      record: {
        name: "",
        localName: "",
        countryId: ""
        },

        countries: [],
      isLoading: false,
      regionId: this.$route.params.id,
    };
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


  editRegion() {
    this.$validator.validateAll().then(result => {
       if (result) {
         this.isLoading=true
           this.$http
             .put("/api/regions/"+this.regionId, 
             {
              "name":this.record.name,
              "name_tg":this.record.localName,
              "country_id":this.record.countryId
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
               this.$router.push({ path: "/pages/view-regions" });
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


    fetchRegion(){
      const thisIns = this;
      this.isLoading=true
alert(JSON.stringify(this.$route.params.id))
      this.$http
      .get("/api/regions/"+this.regionId)
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.record.name = response.data.data.name;
          thisIns.record.localName = response.data.data.name_tg;
          thisIns.record.countryId = response.data.data.country_id;
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
    this.fetchRegion();
    this.getCountries();
  }


};
</script>
<style  lang="scss" scoped>

</style>
