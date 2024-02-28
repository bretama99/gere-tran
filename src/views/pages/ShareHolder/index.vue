<template>
  <vx-card :title="$t('shareHolderList')">
    <vx-card>
      <div class="vx-row">
        <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-6">
          <vs-button
            class="mb-2 small text-base"
            icon-pack="feather"
            icon="icon-plus"
            color="#292929"
            @click.prevent="add"
            >{{ $t("create") }}
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
        <div class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4"></div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/1 xl:w-1/12 mt-4"></div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/5 xl:w-1/5 mt-4">
          <vs-input
            @keyup="fetchCountries()"
            icon="icon-search"
            icon-pack="feather"
            class="w-full mx-2 input-rounded-full no-icon-border"
            :placeholder="$t('Search')"
            v-model="searchKey"
          />
        </div>
      </div>
    </vx-card>
    <vx-card id="internal-card" title no-shadow card-border>
      <vs-table
        class="stripe"
        hoverFlat
        @selected="goToDetail"
        :max-items="perPage"
        :data="shareholders"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="first_name"
            >{{ $t("First Name") }}/{{ $t("ስም") }}</vs-th
          >
          <vs-th sort-key="middle_name"
            >{{ $t("Middle Name") }}/{{ $t("ስም ኣቦ") }}</vs-th
          >
          <vs-th sort-key="last_name"
            >{{ $t("Last Name") }}/{{ $t("ኣቦ ሓጎ") }}</vs-th
          >
          <vs-th sort-key="country">{{ $t("Country") }}/{{ $t("ሃገር") }}</vs-th>
          <vs-th sort-key="share_amount">{{ $t("Share Amount") }}</vs-th>
          <vs-th sort-key="share_value">{{ $t("Share Value") }}</vs-th>
          <vs-th sort-key="service_fee">{{ $t("Service Fee") }}</vs-th>
          <vs-th sort-key="service_paid_up">{{ $t("service_paid_up") }}</vs-th>
          <vs-th sort-key="paid_up">{{ $t("paid_up") }}</vs-th>
          <vs-th sort-key="share_category">{{ $t("share_category") }}</vs-th>
          <vs-th>{{ $t("actions") }}</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{
              indextr + 1 + limit * (currentPage - 1)
            }}</vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].first_name"
              >{{ data[indextr].first_name }}/
              {{ data[indextr].first_name_tg }}</vs-td
            >
            <vs-td class="pr-4 w-1/6" :data="data[indextr].middle_name"
              >{{ data[indextr].middle_name }} /{{
                data[indextr].middle_name_tg
              }}</vs-td
            >
            <vs-td class="pr-4 w-1/6" :data="data[indextr].last_name"
              >{{ data[indextr].last_name }} /{{
                data[indextr].last_name
              }}</vs-td
            >
            <vs-td class="pr-4 w-1/6" :data="data[indextr].country"
              >{{ data[indextr].address.country }}/
              {{ data[indextr].address.country_tg }}</vs-td
            >
            <vs-td class="pr-4 w-1/8" :data="data[indextr].share_amount">{{
              data[indextr].share_amount
            }}</vs-td>
            <vs-td class="pr-4 w-1/8" :data="data[indextr].share_value">{{
              data[indextr].share_value
            }}</vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].service_fee">{{
              data[indextr].service_fee
            }}</vs-td>

            <vs-td class="pr-4 w-1/6" :data="data[indextr].service_paid_up">{{
              data[indextr].service_paid_up
            }}</vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].paid_up">{{
              data[indextr].paid_up
            }}</vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].share_category">{{
              data[indextr].share_category
            }}</vs-td>
            <vs-td class="p-0 pr-4 w-1/3" :data="data[indextr].id">
              <span
                v-if="isGranted('updateShareholder')"
                @click="updateShareholder(data[indextr].id)"
              >
                <vs-avatar
                  color="lightGreen"
                  icon-pack="feather"
                  icon="icon-edit"
                />
              </span>
              <span
                v-if="isGranted('deleteContact')"
                @click="openConfirm(data[indextr].id)"
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
      shareholders: [],
      format: "yyyy-MM-dd",

      banks: [],
      limit: 15,
      total: 0,
      currentPage: 1,
      searchKey: "",
      perPage: 20,
      totalPage: 0,
      preventTableClickAction: false,
      id: "",

      showAgentModal: false,
      amount: 0,
      country_id: 0,
      type: "block",
      bank_id: 0,
      ex_rate: 0,
      branch: "",
      isOpenDetailValid: true,
      transaction_date: "",
      //       "shareholder_id":6,
      // "amount":300000,
      // "country_id":1,
      // "type":"block",
      // "bank_id":1,
      // "ex_rate":1.56,
      // "branch":"ayder",
    };
  },
  methods: {
    goToDetail(shareholder) {
      if (this.isOpenDetailValid)
        this.$router.push({ path: "/pages/share-holder/" + shareholder.id });
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
    addTransaction(id) {
      this.id = id;
      this.showAgentModal = true;
    },
    fetchShareholders() {
      const thisIns = this;
      this.isLoading = true;
      this.$http
        .get("/api/shareholders", {
          params: {
            page: thisIns.currentPage,
            limit: thisIns.limit,
            searchKey: thisIns.searchKey,
          },
        })
        .then(function (response) {
          thisIns.isLoading = false;
          thisIns.shareholders = response.data;
          thisIns.total = response.data[0].totalPages;
        })
        .catch((error) => {
          thisIns.isLoading = false;
        });
    },

    openConfirm(id) {
      this.isOpenDetailValid = false;
      this.id = id;
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
      this.isOpenDetailValid = true;

      const thisIns = this;
      thisIns.$http
        .delete("/api/shareholders/" + thisIns.id)
        .then(function (response) {
          thisIns.$vs.notify({
            color: "success",
            title: "Status",
            text: "Shareholder Deleted!",
          });
          thisIns.fetchShareholders();
        })
        .catch((error) => {});
    },

    add: function () {
      this.$router.push({ name: "addShareHolder" });
    },
    updateShareholder: function (id) {
      this.isOpenDetailValid = false;

      this.$router.push({ path: "/pages/edit-share-holders/" + id });
    },
  },
  created() {
    this.getCountries();
    this.getBanks();
    this.fetchShareholders();
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
