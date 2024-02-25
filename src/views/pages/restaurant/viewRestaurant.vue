<template>
  <vx-card :title="$t('Restaurant List')">
    <!-- <img class="circular_image" src="@/assets/images/icons/delete-line.svg" style="color: black"/>
    <img src="@/assets/images/icons/delete-line.svg" alt="Avatar" class="avatar"> -->
    <vx-card id="internal-card" class="mt-10" title no-shadow card-border>

      <vx-card>
        <div class="vx-row">
        <!-- <div
          @click="add"
          class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-6">
          <vs-button class="mb-2 small text-base" icon-pack="feather" icon="icon-plus" type="gradient" color="success"
                     @click.prevent="add">{{$t('create')}}
          </vs-button>
        </div> -->
        <div
        class="vx-col sm:w-full md:w-full lg:w-1/6 xl:w-1/6 mt-4 mr-2"
      >
        <vs-button class="mb-2 small text-base" icon-pack="feather" icon="icon-plus" color="#292929"
                    @click.prevent="add">{{$t('create')}}
        </vs-button>
      </div>
      <div id="dropdown" class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-4">
        <vs-dropdown vs-custom-content vs-trigger-click>
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2"><p>{{limit}}</p></span>
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

      <div class="vx-col sm:w-full md:w-full lg:w-1/5 xl:w-1/5">
           <span class="ml-2">{{$t('Filter By Contact')}}</span>
           <v-select
             v-model="contactId"
             class="w-full"
             :options="contacts"
             label="firstName"
             :reduce="contact=>contact.contactId"
             @input="fetchRestaurants()"
           ></v-select>
         </div>

         <div class="vx-col sm:w-full md:w-full lg:w-1/6 xl:w-1/6">
           <span class="ml-2">{{$t('Filter By Chain')}}</span>
           <v-select
             v-model="chainId"
             class="w-full"
             :options="chains"
             label="chainName"
             :reduce="chain=>chain.chainId"
             @input="fetchRestaurants()"
           ></v-select>
         </div>
         <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-4"></div>
          <div class="vx-col sm:w-full md:w-full lg:w-1/5 xl:w-1/5 mt-4">
            <vs-input
              @keyup="fetchRestaurants()"
              icon="icon-search"
              icon-pack="feather"
              class="w-full mx-2 input-rounded-full no-icon-border"
              :placeholder="$t('Search')"
              v-model="searchKey"
            />
        </div>
      </div>
      </vx-card>
    <loading :active.sync="isLoading" :can-cancel="true"></loading>
    <vs-table :max-items="currentPage" :data="restaurants">
      <template slot="thead">
        <vs-th>#</vs-th>
        <vs-th></vs-th>
        <vs-th style="font-size: 9px;" class="p-0" sort-key="restaurantName">{{$t('restaurantName')}}</vs-th>
        <vs-th class="p-1" sort-key="companyId">{{$t('companyId')}}</vs-th>
        <vs-th class="p-1" sort-key="licenseKey">{{$t('licenseKey')}}</vs-th>
        <vs-th class="p-1" sort-key="address">{{$t('address')}}</vs-th>
        <vs-th class="p-1" sort-key="contact">{{$t('Contact')}}</vs-th>
        <vs-th class="p-1">{{$t('Actions')}}</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10"
            >{{indextr+1}}</vs-td>
            <vs-td v-if="data[indextr].logo"><img  width="60" :src="(`${$domain}/logos/${data[indextr].logo}`)"></vs-td>
            <vs-td v-else></vs-td>
            <vs-td class="pr-4 w-1/7" style="font-size: 11px;"
              :data="data[indextr].restaurantName"
            >{{data[indextr].restaurantName}}</vs-td>
            <vs-td style="font-size: 11px;" class="p-1 w-6 w-1/7"
              :data="data[indextr].companyId"
            >{{data[indextr].companyId}}</vs-td>
            <vs-td style="font-size: 11px;" class="p-2 w-1/6"
              :data="data[indextr].licenseKey"
            >{{data[indextr].licenseKey}}</vs-td>

          <vs-td style="font-size: 11px;" class="p-1 w-1/6" :data="data[indextr].address">
              <p>{{data[indextr].address}}</p>
              <p>
                {{data[indextr].cityName}} {{data[indextr].postalCode}}
              </p>
            </vs-td>
          <vs-td style="font-size: 11px;" class="p-1 w-1/6" :data="data[indextr].contactName">{{data[indextr].contactName}}</vs-td>
          <vs-td class="p-0 w-1/4" :data="data[indextr].restaurantId">
            <span @click="updateRestaurant(data[indextr].restaurantId)">
              <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
            </span>
            <span @click="viewUser(data[indextr].restaurantId, data[indextr].restaurantName)">
              <vs-avatar color="black" icon-pack="feather" icon="icon-user" />
            </span>


            <span @click="viewMacAddress(data[indextr].restaurantId)">
              <vs-avatar color="green" icon-pack="feather" icon="icon-list" />
            </span>
            <span @click="openConfirm(data[indextr].restaurantId)">

            <img src="@/assets/images/icons/delete.svg" style="
                height: 32px;
margin-top: 8px;
margin-top: -41px;
margin-left: 130px;" />
            </span>


          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <p v-if="increament!=0">.</p>
    <vs-pagination color="#292929"  @change="fetchRestaurants()" :total="total" v-model="currentPage" :max="6"></vs-pagination>
    </vx-card>
  </vx-card>
</template>
<script>
import AddNewDataSidebar from "@/views/ui-elements/data-list/AddNewDataSidebar.vue";
import router from "@/router";
import { AgGridVue } from "ag-grid-vue";
import contacts1 from "@/views/ui-elements/ag-grid-table/data.json";
// import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import "@/assets/scss/vuesax/extraComponents/agGridStyleOverride.scss";
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import Avatar from 'vue-avatar'
export default {
  components: {
    AddNewDataSidebar,
    AgGridVue,
    Loading,
    Avatar,
  },
  data() {
    return {
      searchKey: "",
      restaurants: [],
      limit: 15,
      total: 0,
      searchUser: "",
      currentPage: 1,
      isLoading:false,
      chains: [],
      chaindId: "",
      contacts: [],
      contactId: "",

    };
  },
  methods: {

    openConfirm(restaurantId) {
      this.restaurantId = restaurantId;
      this.$vs.dialog({
        type: "confirm",
        color: "warning",
        title: `Confirm`,
        text: this.$t("deleteConfirmation"),
        accept: this.acceptAlert,
        acceptText: this.$t("Yes"),
        cancelText: this.$t("No")
      });
    },
    acceptAlert() {
      const thisIns = this;
      this.$http
        .delete("/api/restaurant/"+this.restaurantId)
        .then(function(response) {
          thisIns.$vs.notify({
            color: "success",
            title: "Status",
            text: "Restaurant Deleted!"
          });
          thisIns.fetchRestaurants();
        }).catch(error => {
        });

    },
    pageLimit: function(limit) {
      this.limit = limit;
      this.fetchRestaurants()
    },


    add: function() {
      this.$router.push({ path: "/pages/register-restaurant" });
    },
    updateRestaurant: function(id) {
      this.$router.push({ path: "/pages/edit-restaurant/" + id });
    },

    viewMacAddress: function(id) {
      this.$router.push({ path: "/pages/view-mac-address/" + id });
    },

    viewUser: function(id) {
      var restaurantName = this.restaurants.find(r=>r.restaurantId==id).restaurantName;
      this.$router.push({ path: "/pages/view-user", query: { restaurantId: id, restaurantName: restaurantName } });
      // this.$router.push({ path: "/pages/view-user" });
    },


    fetchRestaurants(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/restaurant",{
          params: {
            page: thisIns.currentPage,
            limit: thisIns.limit,
            searchKey: thisIns.searchKey,
            contactId: thisIns.contactId,
            chainId: thisIns.chainId }
        })
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.restaurants = response.data;
          thisIns.total = thisIns.users[0].totalPage;
        }).catch(error => {
            thisIns.isLoading=false
        });
    },

    fetchContacts(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/contact")
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.contacts = response.data;
        }).catch(error => {
            thisIns.isLoading=false
        });
    },

    fetChains(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/chain")
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.chains = response.data;
        }).catch(error => {
            thisIns.isLoading=false
        });
    }
  },
  created() {
    this.fetchRestaurants();
    this.fetchContacts();
    this.fetChains();
  },
  updated(){
    if(this.searchUser==""&&this.increament!=0){
      const thisIns = this;
      this.$http
        .get("/accounts/users", {
        params: { page: this.currentPage, limit: this.limit }
      })
      .then(function(response) {
        thisIns.users = response.data;
        thisIns.total = thisIns.users[0].totalPages;
        for (let i = 0; i < thisIns.users.length; i++) {
          if (thisIns.users[i].userStatus == "Active") thisIns.status[i] = true;
          else thisIns.status[i] = false;
        }
      }).catch(error=>{
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vuesax/pages/switch.scss";
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
.loader-overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.1);
        z-index: 999;
        cursor: pointer;
        span.text {
            display: inline-block;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            color: #fff;
        }
        .loader {
            animation: loader-animate 1.5s linear infinite;
            clip: rect(0, 80px, 80px, 40px);
            height: 80px;
            width: 80px;
            position: absolute;
            left: calc(50% - 40px);
            top: calc(50% - 40px);
            &:after {
                animation: loader-animate-after 1.5s ease-in-out infinite;
                clip: rect(0, 80px, 80px, 40px);
                content: '';
                border-radius: 50%;
                height: 80px;
                width: 80px;
                position: absolute;
            }
        }
        @keyframes loader-animate {
            0% {
                transform: rotate(0deg)
            }
            100% {
                transform: rotate(220deg)
            }
        }
        @keyframes loader-animate-after {
            0% {
                box-shadow: inset #fff 0 0 0 17px;
                transform: rotate(-140deg);
            }
            50% {
                box-shadow: inset #fff 0 0 0 2px;
            }
            100% {
                box-shadow: inset #fff 0 0 0 17px;
                transform: rotate(140deg);
            }
        }
    }
    .avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.circular_image{
    float:left;
    width: 30px;
    height: 30px;
    border-radius: 50%; /* Modified*/
    /*overflow:hidden;*/
    background-color: #db1e24;
}
img {
  border-radius: 50%;
}

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
