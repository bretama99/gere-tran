<template>
  <div id="main-div" class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('Add Shareholder')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <form data-vv-scope="step-2">
            <div class="vx-row mt-2">
              <div class="vx-col sm:w-full md:w-full lg:w-full xl:w-full">
                <div class="vx-row mt-2">
                  <div class="vx-col sm:w-full mb-4 md:w-full l:w-1/4 xl:w-1/4">
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

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('localFirstName')"
                      v-model="record.localFirstName"
                      class="w-full"
                      name="localFirstName"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("localFirstName")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('middleName')"
                      v-model="record.middleName"
                      class="w-full"
                      name="middleName"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("middleName")
                    }}</span>
                  </div>
                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('localMiddleName')"
                      v-model="record.localMiddleName"
                      class="w-full"
                      name="localMiddleName"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("localMiddleName")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('lastName')"
                      v-model="record.lastName"
                      class="w-full"
                      name="lastName"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("lastName")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('localLastName')"
                      v-model="record.localLastName"
                      class="w-full"
                      name="localLastName"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("localLastName")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
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

                  <div class="vx-col sm:w-1/4 w-full mb-6">
                    <span class="ml-3">{{ $t("maritalStatus") }}</span>
                    <v-select
                      v-model="record.maritalStatusId"
                      :placeholder="$t('maritalStatus')"
                      class="ml-2"
                      label="name"
                      :options="maritalStatusId"
                      :reduce="(country) => record.maritalStatusId"
                      name="maritalStatuses"
                    ></v-select>
                    <span class="text-danger">{{
                      errors.first("maritalStatus")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
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

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('email')"
                      v-model="record.email"
                      class="w-full"
                      name="email"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{ errors.first("email") }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('identificationId')"
                      v-model="record.identificationId"
                      class="w-full"
                      name="identificationId"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("identificationId")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-1/4 w-full mb-6">
                    <span class="ml-4">{{ $t("Country") }}</span>
                    <v-select
                      v-model="record.countryId"
                      :placeholder="$t('country')"
                      class="ml-2"
                      label="name"
                      :options="countries"
                      :reduce="(country) => country.id"
                      :on-change="updateDependableOptions(countryId, 'Country')"
                      name="countryId"
                    ></v-select>
                    <span class="text-danger">{{
                      errors.first("countryId")
                    }}</span>
                  </div>
                  <div class="vx-col sm:w-1/4 w-full mb-6">
                    <span class="ml-4">{{ $t("Region") }}</span>
                    <v-select
                      v-model="record.regionId"
                      :placeholder="$t('region')"
                      class="ml-2"
                      label="name"
                      :options="regions"
                      :reduce="(region) => region.id"
                      :on-change="updateDependableOptions(regionId, 'Region')"
                      name="regionId"
                    ></v-select>
                    <span class="text-danger">{{
                      errors.first("regionId")
                    }}</span>
                  </div>
                  <div class="vx-col sm:w-1/4 w-full mb-6">
                    <span class="ml-4">{{ $t("Zone") }}</span>
                    <v-select
                      v-model="record.zoneId"
                      :placeholder="$t('zone')"
                      class="ml-2"
                      label="name"
                      :options="zones"
                      :reduce="(zone) => zone.id"
                      :on-change="updateDependableOptions(zoneId, 'Zone')"
                      name="zoneId"
                    ></v-select>
                    <span class="text-danger">{{
                      errors.first("zoneId")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-1/4 w-full mb-6">
                    <span class="ml-4">{{ $t("woreda") }}</span>
                    <v-select
                      v-model="record.woredaId"
                      :placeholder="$t('woreda')"
                      class="ml-2"
                      label="name"
                      :options="woredas"
                      :reduce="(woreda) => woreda.id"
                      :on-change="updateDependableOptions(woredaId, 'woreda')"
                      name="woredaId"
                    ></v-select>
                    <span class="text-danger">{{
                      errors.first("woreda")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('kebelle')"
                      v-model="record.kebelle"
                      class="w-full"
                      name="kebelle"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("kebelle")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('Share Amount')"
                      v-model="record.shareAmount"
                      class="w-full"
                      name="shareAmount"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                      type="number"
                    />
                    <span class="text-danger">{{
                      errors.first("shareAmount")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('Paid Up')"
                      v-model="record.paidUp"
                      class="w-full"
                      name="paidUp"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                      type="number"
                    />
                    <span class="text-danger">{{
                      errors.first("paidUp")
                    }}</span>
                  </div>
                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('Service Paid Up')"
                      v-model="record.servicePaidUp"
                      class="w-full"
                      name="servicePaidUp"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                      type="number"
                    />
                    <span class="text-danger">{{
                      errors.first("servicePaidUp")
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class="vx-row mt-4 ml-4">
            <div class="vx-col w-full">
              <vs-button
                v-if="isGranted('editShareHolder')"
                @click="editShareHolder"
                color="#292929"
                class="mr-3 mb-2"
                >{{ $t("save") }}</vs-button
              >
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
  },
};
Validator.localize("en", dict);
import VSelect from "vue-select";
// import flatPickr from "vue-flatpickr-component";
// import "flatpickr/dist/flatpickr.css";
import Loading from "vue-loading-overlay";
export default {
  components: {
    "v-select": VSelect,
    Loading,
  },
  data() {
    return {
      record: {
        firstName: "",
        localFirstName: "",
        middleName: "",
        localMiddleName: "",
        lastName: "",
        localLastName: "",
        shareCategory: "",
        maritalStatusId: "",
        shareHolderId: "",
        phoneNumber: "",
        email: "",
        identificationId: "",
        countryId: "",
        regionId: "",
        zoneId: "",
        woredaId: "",
        kebelle: "",
        shareAmount: "",
        paidUp: "",
        servicePaidUp: "",
      },
      woredas: [],
      countries: [],
      regions: [],
      zones: [],
      refRegionId: "",
      refCountryId: "",
      refZoneId: "",
      refWoredaId: "",
      id: this.$route.params.id,
    };
  },

  created() {
    this.getCountries();
    this.getShareholder();
    this.getRegions();
    this.fetchZones();
    this.fetchWoredas();
  },

  methods: {
    getShareholder() {
      const thisIns = this;
      this.isLoading = true;
      this.$http
        .get("/api/shareholders/" + this.id)
        .then(function (response) {
          thisIns.isLoading = false;
          thisIns.record.firstName = response.data.data.first_name;
          thisIns.record.localFirstName = response.data.data.first_name_tg;
          thisIns.record.middleName = response.data.data.middle_name;
          thisIns.record.localMiddleName = response.data.data.middle_name_tg;
          thisIns.record.lastName = response.data.data.last_name;
          thisIns.record.localLastName = response.data.data.last_name_tg;
          thisIns.record.shareCategory = response.data.data.shareCategory;
          thisIns.record.maritalStatusId = response.data.data.martial_status;

          thisIns.record.phoneNumber = response.data.data.phone;
          thisIns.record.email = response.data.data.email;
          thisIns.record.countryId = 0;
          thisIns.record.share_amount = response.data.data.shareAmount;
          thisIns.record.paid_up = response.data.data.paidUp;
          thisIns.record.service_paid_up = response.data.data.servicePaidUp;
        })
        .catch((error) => {
          thisIns.isLoading = false;
        });
    },
    getCountries() {
      this.$http
        .get("/api/countries")
        .then((response) => {
          this.countries = response.data.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },

    getRegions() {
      this.$http
        .get("/api/regions")
        .then((response) => {
          this.regions = response.data.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },

    fetchZones() {
      const thisIns = this;
      this.isLoading = true;
      this.$http
        .get("/api/zones", {
          params: {
            page: thisIns.currentPage,
            limit: thisIns.limit,
            searchKey: thisIns.searchKey,
          },
        })
        .then(function (response) {
          thisIns.isLoading = false;
          thisIns.zones = response.data.data;
          thisIns.total = response.data.data[0].totalPages;
        })
        .catch((error) => {
          thisIns.isLoading = false;
        });
    },

    fetchWoredas() {
      this.$http
        .get("/api/woredas")
        .then((response) => {
          this.woredas = response.data.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },

    updateDependableOptions(parentId, level) {
      var collectionsKey = "",
        url = "";
      if (level == "Country") {
        if (parentId == "" || this.refCountryId == parentId) {
          return;
        }
        this.refCountryId = parentId;
        // collectionsKey='regions';
        // url=`/region?countryId=${parentId}`;
        this.record.regionId = "";
        this.regions = this.allRegions.filter(
          (region) => region.countryId == this.record.countryId
        );
      }
      if (level == "Region") {
        if (parentId == "" || this.refRegionId == parentId) {
          return;
        }
        this.refRegionId = parentId;
        // collectionsKey='zones';
        // url=`/zone?regionId=${parentId}`;
        this.record.zoneId = "";
        this.zones = this.allZones.filter(
          (zone) => zone.regionId == this.record.regionId
        );
      }
      if (level == "Zone") {
        collectionsKey = "woredas";
        url = `/woreda?zoneId=${parentId}`;
      }
      if (level == "Woreda") {
        collectionsKey = "kebelles";
        url = `/kebelle?woredaId=${parentId}`;
      }
    },
    editShareHolder() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isLoading = true;

          const formData = new FormData();

          formData.append("first_name", this.record.firstName);
          formData.append("first_name_tg", this.record.localFirstName);
          formData.append("middle_name", this.record.middleName);
          formData.append("middle_name_tg", this.record.localMiddleName);
          formData.append("last_name", this.record.lastName);
          formData.append("last_name_tg", this.record.localLastName);
          formData.append("shareCategory", this.record.shareCategory);
          formData.append("martial_status", this.record.maritalStatusId);
          formData.append("phone", this.record.phoneNumber);
          formData.append("email", this.record.email);
          formData.append("countryId", this.record.countryId);
          formData.append("regionId", this.record.regionId);
          formData.append("zoneId", this.record.zoneId);
          formData.append("woredaId", this.record.woredaId);
          formData.append("kebelle", this.record.kebelle);
          formData.append("address_id", 2);
          formData.append("password", 1233332);
          formData.append("share_amount", this.record.shareAmount);
          formData.append("paid_up", this.record.paidUp);
          formData.append("service_paid_up", this.record.servicePaidUp);

          this.$http
            .put("/api/shareholders/" + this.id, formData)
            .then((response) => {
              this.isLoading = false;
              this.$vs.notify({
                title: this.$t("Add"),
                text: this.$t("Registered Successfully!"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
                time: 6000,
              });
              this.$router.push({ path: "/pages/view-share-holders" });
            })
            .catch((error) => {
              this.isLoading = false;
              this.$vs.notify({
                title: this.$t("Add"),
                text: this.$t("notRegistered"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "warnning",
                time: 6000,
              });
            });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
