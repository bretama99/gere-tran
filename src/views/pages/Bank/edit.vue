<template>
  <div id="main-div" class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addBank')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <form data-vv-scope="step-2">
            <div class="vx-row mt-2">
              <div class="vx-col sm:w-full md:w-full lg:w-full xl:w-full">
                <div class="vx-row mt-2">
                  <div class="vx-col mb-6 sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('name')"
                      v-model="record.name"
                      class="w-full"
                      name="name"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{ errors.first("name") }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
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

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('branch')"
                      v-model="record.branch"
                      class="w-full"
                      name="branch"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("branch")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('blockAccount')"
                      v-model="record.blockAccount"
                      class="w-full"
                      name="blockAccount"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("blockAccount")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('serviceAccount')"
                      v-model="record.serviceAccount"
                      class="w-full"
                      name="serviceAccount"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("serviceAccount")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('swiftCode')"
                      v-model="record.swiftCode"
                      class="w-full"
                      name="swiftCode"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("swiftCode")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('swiftBlockAccount')"
                      v-model="record.swiftBlockAccount"
                      class="w-full"
                      name="swiftBlockAccount"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("swiftBlockAccount")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4">
                    <vs-input
                      :label="$t('swiftServiceAccount')"
                      v-model="record.swiftServiceAccount"
                      class="w-full"
                      name="swiftServiceAccount"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("swiftServiceAccount")
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class="vx-row mt-4 ml-4">
            <div class="vx-col w-full">
              <vs-button
                v-if="isGranted('addRole')"
                @click="editBank"
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
    roleName: {
      required: "Please enter role name",
      alpha: "Role name must be character",
    },
    roleFullName: {
      required: "Please enter role full name",
      alpha: "Role full name must be character",
    },
  },
};
Validator.localize("en", dict);
import VSelect from "vue-select";
import Loading from "vue-loading-overlay";
export default {
  components: {
    "v-select": VSelect,
    Loading,
  },
  data() {
    return {
      record: {
        name: "",
        localName: "",
        blockAccount: "",
        serviceAccount: "",
        swiftBlockAccount: "",
        swiftCode: "",
        swiftServiceAccount: "",
        branch: "",
      },
      isLoading: false,
      id: this.$route.params.id,
    };
  },
  methods: {
    editBank() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isLoading = true;
          this.$http
            .put("/api/banks/" + this.id, {
              name: this.record.name,
              name_tg: this.record.localName,
              branch: this.record.branch,
              block_account: this.record.blockAccount,
              service_account: this.record.serviceAccount,
              swift_code: this.record.swiftCode,
              swift_block_account: this.record.swiftBlockAccount,
              swift_service_account: this.record.swiftServiceAccount,
            })
            .then((response) => {
              this.isLoading = false;
              this.$vs.notify({
                title: this.$t("Update"),
                text: this.$t("Update Successfully!"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
                time: 6000,
              });
              this.$router.push({ path: "/pages/view-banks" });
            })
            .catch((error) => {
              this.isLoading = false;
              this.$vs.notify({
                title: this.$t("Update"),
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

    fetchBank() {
      const thisIns = this;
      this.isLoading = true;
      this.$http
        .get("/api/banks/" + this.id)
        .then(function (response) {
          thisIns.isLoading = false;

          thisIns.record.name = response.data.data.name;
          thisIns.record.localName = response.data.data.name_tg;
          thisIns.record.branch = response.data.data.branch;
          thisIns.record.blockAccount = response.data.data.block_account;
          thisIns.record.serviceAccount = response.data.data.service_account;
          thisIns.record.swiftCode = response.data.data.swift_code;
          thisIns.record.swiftBlockAccount =
            response.data.data.swift_block_account;
          thisIns.record.swiftServiceAccount =
            response.data.data.swift_service_account;
        })
        .catch((error) => {
          thisIns.isLoading = false;
        });
    },
  },

  computed: {
    getRole() {
      return this.$store.getters["RoleModule/getRole"];
    },
  },

  created() {
    this.fetchBank();
  },
};
</script>
<style lang="scss" scoped></style>
