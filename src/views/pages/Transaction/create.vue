<template>
  <div id="main-div" class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addTransaction')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <form data-vv-scope="step-2">
            <div class="vx-row mt-2">
              <div class="vx-col sm:w-full md:w-full lg:w-full xl:w-full">
                <div class="vx-row mt-2">
                  <div class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5">
                    <vs-input
                      :label="$t('amount')"
                      v-model="record.amount"
                      class="w-full"
                      name="name"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("amount")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5">
                    <vs-input
                      :label="$t('exRate')"
                      v-model="record.exRate"
                      class="w-full"
                      name="exRate"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("exRate")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-1/3 w-full mb-6">
                    <span class="ml-4">{{ $t("type") }}</span>
                    <v-select
                      v-model="record.type"
                      v-validate="'required'"
                      class="w-full"
                      :options="types"
                      v-validate:type="'required'"
                      name="type"
                      :class="{ danger: errors.has('type') }"
                    ></v-select>
                    <span class="text-danger">{{ errors.first("type") }}</span>
                  </div>

                  <div class="vx-col sm:w-1/3 w-full mb-6">
                    <span class="ml-4">{{ $t("bank") }}</span>
                    <v-select
                      v-model="record.bankId"
                      :placeholder="$t('bank')"
                      class="ml-2"
                      label="name"
                      :options="banks"
                      :reduce="(bank) => bank.id"
                      name="bankId"
                    ></v-select>
                    <span class="text-danger">{{
                      errors.first("bankId")
                    }}</span>
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5">
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

                  <div class="vx-col sm:w-1/3 w-full mb-3">
                    <span class="inputLabel"
                      >{{ $t("transactionDate")
                      }}<i class="text-danger">*</i></span
                    >
                    <flat-pickr
                      class="w-full"
                      v-model.trim="transactionDate"
                      :placeholder="$t('transactionDate')"
                      :format="format"
                      name="transactionDate"
                      v-validate="'required'"
                      v-validate:transactionDate="'required'"
                    />
                    <span
                      class="text-danger"
                      v-show="errors.has('transactionDate')"
                      >{{ errors.first("transactionDate") }}</span
                    >
                  </div>

                  <div class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5">
                    <vs-input
                      :label="$t('receipt')"
                      v-model="record.receipt"
                      class="w-full"
                      name="receipt"
                      v-validate="'required'"
                      data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{
                      errors.first("receipt")
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class="vx-row mt-4 ml-4">
            <div class="vx-col w-full">
              <vs-button
                v-if="isGranted('addTransaction')"
                @click="addTransaction"
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
        amount: "",
        exRate: "",
        type: "",
        bankId: "",
        branch: "",
        receipt: "",
        transactionDate: ""
      },
      format: "yyyy-MM-dd",
      types: ["block", "service"],
    };
  },

  created(){
    this.getBanks();
  },
  methods: {
    getBanks(){
      this.$http
        .get("/api/banks")
        .then(response => {
          this.banks = response.data.data;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    addTransaction() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isLoading = true;
          this.$http
            .post("/api/transactions", this.record)
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
              this.$router.push({ path: "/pages/view-banks" });
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
