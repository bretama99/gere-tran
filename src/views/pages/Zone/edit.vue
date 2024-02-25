<template>
  <div id="main-div" class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editZone')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-2">

            <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
              <vs-input :label="$t('name')" v-model="name" class="w-full" name="name" v-validate="'required'"
                data-vv-validate-on="blur" />
              <span class="text-danger">{{
                errors.first("step-2.name")
              }}</span>
            </div>

            <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
              <vs-input :label="$t('localName')" v-model="localName" class="w-full" name="localName"
                v-validate="'required'" data-vv-validate-on="blur" />
              <span class="text-danger">{{
                errors.first("step-2.localName")
              }}</span>
            </div>

            <div class="vx-col sm:w-1/4 w-full mb-6">
              <span class="ml-3">{{ $t('Country') }}</span>
              <v-select v-model="countryId" :placeholder="$t('country')" class="ml-2" label="name" :options="countries"
                :reduce="country => country.id" :on-change="updateDependableOptions(countryId, 'Country')"
                name="countryId"></v-select>
              <span class="text-danger">{{ errors.first('countryId') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <span class="ml-3">{{ $t('Region') }}</span>
              <v-select v-model="regionId" :placeholder="$t('region')" class="ml-2" label="name" :options="regions"
                :reduce="region => region.id" :on-change="updateDependableOptions(regionId, 'Region')"
                name="regionId"></v-select>
              <span class="text-danger">{{ errors.first('regionId') }}</span>
            </div>
          </div>

          <div class="vx-row ml-8 mt-8">
            <vs-button v-if="isGranted('editRole')" @click="editZone" color="#292929"
              class="mr-3 mb-2">{{ $t('update') }}</vs-button>
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
      localName: "",
      regionId: "",
      countryId: "",
      isLoading: false,
      zoneId: this.$route.params.id,
      countries: [],
      regions: []
    };
  },



  methods: {
    getCountries() {
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

    getRegions() {

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

    updateDependableOptions(parentId, level) {
      var collectionsKey = '', url = '';
      if (level == 'Country') {
        if (parentId == '' || this.refCountryId == parentId) {
          return;
        }
        this.refCountryId = parentId;
        // collectionsKey='regions';
        // url=`/region?countryId=${parentId}`;
        this.regionId = '';
        this.regions = this.allRegions.filter(region => region.countryId == this.countryId);
      }
      if (level == 'Region') {
        if (parentId == '' || this.refRegionId == parentId) {
          return;
        }
        this.refRegionId = parentId;
        // collectionsKey='zones';
        // url=`/zone?regionId=${parentId}`;
        this.zoneId = '';
        this.zones = this.allZones.filter(zone => zone.regionId == this.regionId);
      }
      if (level == 'Zone') {
        collectionsKey = 'woredas';
        url = `/woreda?zoneId=${parentId}`;
      }
      if (level == 'Woreda') {
        collectionsKey = 'kebelles';
        url = `/kebelle?woredaId=${parentId}`;
      }

    },
    editZone() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading = true
          this.$http
            .put("/api/zones/" + this.zoneId,
              {
                "name": this.name,
                "name_tg": this.localName,
                "region_id": this.regionId
              })
            .then(response => {
              this.isLoading = false
              this.$vs.notify({
                title: this.$t('Update'),
                text: this.$t('Update Successfully!'),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
                time: 6000
              });
              this.$router.push({ path: "/pages/view-zones" });
            }).catch(error => {
              this.isLoading = false
              this.$vs.notify({
                title: this.$t('Update'),
                text: this.$t('notRegistered'),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "warnning",
                time: 6000
              });
            })
        }
      });
    },

    fetchZone() {
      const thisIns = this;
      this.isLoading = true

      this.$http
        .get("/api/zones/" + this.zoneId)
        .then(function (response) {
          thisIns.isLoading = false
          alert(JSON.stringify(response.data.data.region_id))

          thisIns.name = response.data.data.name;
          thisIns.localName = response.data.data.name_tg;
          thisIns.regionId = response.data.data.region_id;

        }).catch(error => {
          thisIns.isLoading = false
        });
    }

  },

  computed: {
    getRole() {
      return this.$store.getters["RoleModule/getRole"];
    }
  },

  created() {
    this.getCountries();
    this.getRegions();
    this.fetchZone();

  }


};
</script>
<style  lang="scss" scoped></style>
