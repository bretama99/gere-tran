<template>
  <vx-card :title="$t('chainList')">
    <vx-card>
        <div class="vx-row">
          <div
        class="vx-col sm:w-full md:w-full lg:w-1/6 xl:w-1/6 mt-4 mr-2"
      >
        <vs-button class="mb-2 small text-base" icon-pack="feather" icon="icon-plus" color="#292929"
                    @click.prevent="add">{{$t('create')}}
        </vs-button>
      </div>

      <div id="dropdown" class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-2">
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
         <div class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4"></div>
         <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-4"></div>
          <div class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4">
            <vs-input
              @keyup="fetchChains()"
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
        :data="chains"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="chainName">{{$t('chainName')}}</vs-th>
          <vs-th>{{$t('actions')}}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].chainName">{{data[indextr].chainName}}</vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
              <span v-if="isGranted('editChain')" @click="updateChain(data[indextr].chainId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
              <span v-if="isGranted('editContact')" @click="assignRestaurant(data[indextr].chainId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-arrow-right" />
              </span>
              <span v-if="isGranted('deleteChain')"
                @click=" openConfirm(data[indextr].chainId)">
                <vs-avatar color="danger" icon-pack="feather" icon="icon-delete"/>
              </span>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <p v-if="increament!=0">.</p>
    </vx-card>
    <vs-pagination class="m-4" :total="total" v-model="currentPage" @change="fetchChains"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      chains: [],
      limit: 15,
      total: 0,
      currentPage: 1,
      searchKey: "",
      perPage: 20,
      totalPage: 0,
      preventTableClickAction: false,
      chainId: ""
    };
  },
  methods: {
    assignRestaurant(chaindId){
      this.$router.push({ path: "/pages/assign-restaurant/"+ chaindId});
    },
    fetchChains(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/chain",{
          params: { 
            page: thisIns.currentPage, 
            limit: thisIns.limit, 
            searchKey: thisIns.searchKey }
        })
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.chains = response.data;
          thisIns.total = response.data[0].totalPage;
        }).catch(error => {
            thisIns.isLoading=false
        });
    },
   

    openConfirm(chainId) {
      this.chainId = chainId;
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
        .delete("/api/chain/"+this.chainId)
        .then(function(response) {
          thisIns.$vs.notify({
            color: "success",
            title: "Status",
            text: "Contact Deleted!"
          });
          thisIns.fetchChains();
        }).catch(error => {
        });

    },

    add: function() {
      this.$router.push({ name: "addChain" });
    },
    updateChain: function(id) {
      this.$router.push({ path: "/pages/edit-chain/" + id });
    }
  },
 created() {
    this.fetchChains();
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
