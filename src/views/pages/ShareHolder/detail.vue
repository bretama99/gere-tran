<template>
  <vx-card :title="$t('Shareholder Detail')">
    <vx-card>
      <div class="vx-row">
        <div class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-6">
          <vs-button
            class="mb-2 small text-base"
            icon-pack="feather"
            icon="icon-plus"
            color="#292929"
            @click.prevent="upgradeShare"
            >{{ $t("Upgrade Share") }}
          </vs-button>
        </div>

        <div class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-6">
          <vs-button
            class="mb-2 small text-base"
            icon-pack="feather"
            icon="icon-plus"
            color="#292929"
            @click.prevent="addTransaction"
            >{{ $t("Add Transaction") }}
          </vs-button>
        </div>

        <div
          id="dropdown"
          class="vx-col sm:w-full md:w-full lg:w-1/6 xl:w-1/6 mt-4"
        >
          <vs-dropdown vs-custom-content vs-trigger-click>
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2"
                ><p>{{ limit }}</p></span
              >
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item>
                <span @click="pageLimit(15)">15</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span @click="pageLimit(25)">25</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span @click="pageLimit(50)">50</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span @click="pageLimit(75)">75</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
        <!-- <div class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4"></div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/1 xl:w-1/12 mt-4"></div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/5 xl:w-1/5 mt-4"> -->
          <vs-input
            @keyup="fetchCountries()"
            icon="icon-search"
            icon-pack="feather"
            class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4 mx-2 input-rounded-full no-icon-border"
            :placeholder="$t('Search')"
            v-model="searchKey"
          />
        </div>
      </div>
    </vx-card>

    <h2 class="mt-4 ml-10">List of Transactions</h2>
    <vx-card id="internal-card" title no-shadow card-border>
      <vs-table
        class="stripe"
        hoverFlat
        @selected="goToDetail"
        :max-items="perPage"
        :data="transactions"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>

          <vs-th sort-key="ex_rate">{{ $t("ex_rate") }}</vs-th>
          <vs-th sort-key="type">{{ $t("type") }}</vs-th>
          <vs-th sort-key="branch">{{ $t("branch") }}</vs-th>
          <vs-th sort-key="transaction_date">{{
            $t("transaction_date")
          }}</vs-th>
          <vs-th sort-key="created_at">{{ $t("created_at") }}</vs-th>

          <vs-th>{{ $t("actions") }}</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{
              indextr + 1 + limit * (currentPage - 1)
            }}</vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].ex_rate">{{
              data[indextr].ex_rate
            }}</vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].type"
              >{{ data[indextr].type }}
            </vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].branch">{{
              data[indextr].branch
            }}</vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].transaction_date">{{
              data[indextr].transaction_date
            }}</vs-td>
          <vs-td class="pr-4 w-1/5" :data="data[indextr].created_at">{{
              data[indextr].created_at.split("T")[0] 
            }} {{ data[indextr].created_at.split("T")[1].split(".")[0]  }}</vs-td>

            <vs-td class="p-0 pr-4 w-1/3" :data="data[indextr].id">

              <span
                v-if="isGranted('updateShareholder')"
                @click="updateTransaction(data[indextr].id)"
              >
                <vs-avatar
                  color="lightGreen"
                  icon-pack="feather"
                  icon="icon-edit"
                />
              </span>
              <span
                v-if="isGranted('deleteContact')"
                @click="openConfirmTransaction(data[indextr].id)"
              >
                <vs-avatar
                  color="danger"
                  icon-pack="feather"
                  icon="icon-delete"
                />
              </span>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <p v-if="increament != 0">.</p>
    </vx-card>
    <h2 class="mt-4 ml-10">List of Upgrades</h2>

    <vx-card id="internal-card" title no-shadow card-border>
      <vs-table
        class="stripe"
        hoverFlat
        @selected="goToDetail"
        :max-items="perPage"
        :data="sharehistories"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>

          <vs-th sort-key="upgrade_share_amount">{{ $t("Upgrade Share Amount") }}</vs-th>
          <vs-th sort-key="share_upgrade_date">{{ $t("Share Upgrade Date") }}</vs-th>
    
          <vs-th sort-key="created_at">{{ $t("created_at") }}</vs-th>

          <vs-th>{{ $t("actions") }}</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{
              indextr + 1 + limit * (currentPage - 1)
            }}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].upgrade_share_amount">{{
              data[indextr].upgrade_share_amount
            }}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].share_upgrade_date"
              >{{ data[indextr].share_upgrade_date }}
            </vs-td>
          
            <vs-td class="pr-4 w-1/5" :data="data[indextr].created_at">{{
              data[indextr].created_at.split("T")[0] 
            }} {{ data[indextr].created_at.split("T")[1].split(".")[0]  }}</vs-td>

            <vs-td class="p-0 pr-4 w-1/3" :data="data[indextr].id">
      
              <span
                v-if="isGranted('updateShareholder')"
                @click="updateUpgrade(data[indextr].id)"
              >
                <vs-avatar
                  color="lightGreen"
                  icon-pack="feather"
                  icon="icon-edit"
                />
              </span>
              <span
                v-if="isGranted('deleteContact')"
                @click="openConfirmUpgrade(data[indextr].id)"
              >
                <vs-avatar
                  color="danger"
                  icon-pack="feather"
                  icon="icon-delete"
                />
              </span>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <p v-if="increament != 0">.</p>
    </vx-card>
    <vs-pagination
      class="m-4"
      :total="total"
      v-model="currentPage"
      @change="fetchShareholders"
    ></vs-pagination>
    <vs-popup
      classContent="popup-example "
      :title="$t('Add Transaction')"
      buttons-hidden
      :active.sync="showTransactionModalModal"
    >
      <div class="vx-row">
        <div class="vx-row mx-2 my-4">
          <div class="vx-col sm:w-1/3 w-full mb-6">
            <span class="inputLabel"
              >{{ $t("Amount") }}<i class="text-danger">*</i></span
            >
            <vs-input
              class="w-full"
              v-model.trim="amount"
              name="amount"
              v-validate="'required'"
              v-validate:amount="'required'"
              data-vv-validate-on="blur"
              data-vv-scope="amount"
            />
            <span class="text-danger">{{ errors.first("amount") }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-6">
            <span class="inputLabel"
              >{{ $t("Country") }}<i class="text-danger">*</i></span
            >
            <span class="ml-4">{{ $t("Country") }}</span>
            <v-select
              v-model="country_id"
              :placeholder="$t('Country')"
              class="ml-2"
              label="name"
              :options="countries"
              :reduce="(country) => country.id"
              name="country_d"
            ></v-select>
            <span class="text-danger">{{ errors.first("country_id") }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-6">
            <!-- <span class="inputLabel"
              >{{ $t("Bank") }}<i class="text-danger">*</i></span
            > -->
            <span class="ml-4">{{ $t("Bank") }}</span>
            <v-select
              v-model="bank_id"
              :placeholder="$t('Bank')"
              class="ml-2"
              label="name"
              :options="banks"
              :reduce="(bank) => bank.id"
              name="bank_d"
            ></v-select>
            <span class="text-danger">{{ errors.first("bank_id") }}</span>
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-6">
            <vs-input
              class="w-full"
              :label="$t('Branch')"
              v-model.trim="branch"
              name="branch"
              data-vv-validate-on="blur"
              data-vv-scope="branch"
            />
            <span class="text-danger">{{ errors.first("branch") }}</span>
          </div>


          <div class="vx-col sm:w-1/3 w-full mb-6">
            <vs-input
              class="w-full"
              :label="$t('Type')"
              v-model.trim="type"
              name="type"
              data-vv-validate-on="blur"
              data-vv-scope="type"
            />
            <span class="text-danger">{{ errors.first("type") }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-6">
            <vs-input
              class="w-full"
              :label="$t('ExRate')"
              v-model.trim="ex_rate"
              name="ex_rate"
              data-vv-validate-on="blur"
              data-vv-scope="ex_rate"
            />
            <span class="text-danger">{{ errors.first("ExRate") }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-3">
            <!-- <span class="inputLabel"
              >{{ $t("Transaction Date") }}<i class="text-danger">*</i></span
            > -->
            <span class="inputLabel">{{ $t("Transaction Date") }}</span>
            <flat-pickr
              class="w-full"
              v-model.trim="transaction_date"
              :format="format"
              :config="{ maxDate: new Date().fp_incr(0) }"
              name="transaction_date"
            />
            <span
              class="vx-row ml-1 text-danger"
              v-show="errors.has('transaction_date')"
              >{{ errors.first("transaction_date") }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="flex items-stretch mt-5 flex justify-around justify-items-center"
      >
        <vs-button
          v-if="isGranted('addTransaction')"
          class=""
          color="success"
          type="filled"
          @click.prevent="saveTransaction"
        >
          {{ $t("Save") }}
        </vs-button>
        <vs-button
          class=""
          color="dark"
          type="border"
          @click="showTransactionModal = false"
          >{{ $t("Cancel") }}
        </vs-button>
      </div>
    </vs-popup>

    <vs-popup
      classContent="popup-example "
      :title="$t('Upgrade Share')"
      buttons-hidden
      :active.sync="shareModal"
    >
      <div class="vx-row">
        <div class="vx-row mx-2 my-4">
          <div class="vx-col sm:w-1/2 w-full mb-6">
            <span class="inputLabel"
              >{{ $t("Upgrade Share Amount")
              }}<i class="text-danger">*</i></span
            >
            <vs-input
              class="w-full"
              v-model.trim="upgrade_share_amount"
              name="upgrade_share_amount"
              v-validate="'required'"
              v-validate:amount="'required'"
              data-vv-validate-on="blur"
              data-vv-scope="upgrade_share_amount"
            />
            <span class="text-danger">{{
              errors.first("upgrade_share_amount")
            }}</span>
          </div>

          <div class="vx-col sm:w-1/2 w-full mb-3">
            <!-- <span class="inputLabel"
              >{{ $t("share_upgrade_date") }}<i class="text-danger">*</i></span
            > -->
            <span class="inputLabel">{{ $t("Share Upgrade Date") }}</span>
            <flat-pickr
              class="w-full"
              v-model.trim="share_upgrade_date"
              :format="format"
              :config="{ maxDate: new Date().fp_incr(0) }"
              name="share_upgrade_date"
            />
            <span
              class="vx-row ml-1 text-danger"
              v-show="errors.has('share_upgrade_date')"
              >{{ errors.first("share_upgrade_date") }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="flex items-stretch mt-5 flex justify-around justify-items-center"
      >
        <vs-button
          v-if="isGranted('addTransaction')"
          class=""
          color="success"
          type="filled"
          @click.prevent="saveUpgrade"
        >
          {{ $t("Save") }}
        </vs-button>
        <vs-button
          class=""
          color="dark"
          type="border"
          @click="shareModal = false"
          >{{ $t("Cancel") }}
        </vs-button>
      </div>
    </vs-popup>
  </vx-card>
</template>
<script>
import flatPickr from "vue-flatpickr-component";
import VSelect from "vue-select";
import "flatpickr/dist/flatpickr.css";
import Loading from "vue-loading-overlay";

export default {
  components: {
    "v-select": VSelect,
    Loading,
    flatPickr,
  },
  data() {
    return {
      countries: [],
      transactions: [],
      format: "yyyy-MM-dd",
      upgrade_share_amount: "",
      share_upgrade_date: "",

      banks: [],
      limit: 15,
      total: 0,
      currentPage: 1,
      searchKey: "",
      perPage: 20,
      totalPage: 0,
      preventTableClickAction: false,
      showTransactionModalModal: false,
      shareModal: false,
      amount: "",
      country_id: "",
      type: "block",
      bank_id: "",
      ex_rate: "",
      branch: "",
      transaction_date: "",
      id: this.$route.params.id,
      sharehistories: [],
    };
  },
  methods: {
    addTransaction() {
      this.showTransactionModalModal = true;
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

    saveTransaction() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isLoading = true;
          this.$http
            .post("/api/transactions", {
              shareholder_id: this.id,
              amount: this.amount,
              country_id: this.country_id,
              type: this.type,
              bank_id: this.bank_id,
              ex_rate: this.ex_rate,
              branch: this.branch,
              transaction_date: this.transaction_date,
            })
            .then((response) => {
              this.isLoading = false;
              this.showTransactionModalModal = false;
              this.$vs.notify({
                title: this.$t("Add"),
                text: this.$t("Registered Successfully!"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
                time: 6000,
              });
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

              this.fetchShareholders();

            });
        }
      });
    },





    
    openConfirm(contactId) {
      this.contactId = contactId;
      this.$vs.dialog({
        type: "confirm",
        color: "warning",
        title: `Confirm`,
        text: this.$t("deleteConfirmation"),
        accept: this.acceptAlert,
        acceptText: this.$t("Yes"),
        cancelText: this.$t("No"),
      });
    },
    acceptAlert() {
      const thisIns = this;
      thisIns.$http
        .delete("/api/shareholders/" + thisIns.contactId)
        .then(function (response) {
          thisIns.$vs.notify({
            color: "success",
            title: "Status",
            text: "Contact Deleted!",
          });
          thisIns.fetchShareholders();
        })
        .catch((error) => {});
    },


    // updateUpgrade: function (id) {
    //   this.$router.push({ path: "/pages/share-holder" });
    // },





    saveUpgrade() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.isLoading = true;
          this.$http
            .post("/api/shareholders/share-upgrade", {
              shareholder_id: this.id,
              upgrade_share_amount: this.upgrade_share_amount,
              share_upgrade_date: this.share_upgrade_date,
            })
            .then((response) => {
              this.isLoading = false;
              this.shareModal = false;
              this.$vs.notify({
                title: this.$t("Add"),
                text: this.$t("Registered Successfully!"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
                time: 6000,
              });
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

              this.fetchShareholders();

            });
        }
      });
    },

    upgradeShare() {
      this.shareModal = true;
    },
    fetchShareholders() {
      const thisIns = this;
      this.isLoading = true;
      this.$http
        .get("/api/shareholders/" + this.id + "/details", {
          params: {
            page: thisIns.currentPage,
            limit: thisIns.limit,
            searchKey: thisIns.searchKey,
          },
        })
        .then(function (response) {
          thisIns.isLoading = false;
          thisIns.transactions = response.data.transactions;
          thisIns.sharehistories = response.data.sharehistories;
          // thisIns.total = response.data[0].totalPages;
          this.$forceUpdate();

        })
        .catch((error) => {
          thisIns.isLoading = false;
        });
    },
    getBanks() {
      this.$http
        .get("/api/banks")
        .then((response) => {
          this.banks = response.data.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },




  },
  created() {
    this.fetchShareholders();
    this.getCountries();
    this.getBanks();


  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vuesax/pages/switch.scss";
// @import "@/assets/scss/custom.scss";
#search {
  margin-left: 150px;
  width: 300px;
}
#dropdown {
  width: 500px;
  margin-left: 50px;
}
#add {
  width: 180px;
  background: aliceblue;
  text-decoration-color: white;
}
</style>
