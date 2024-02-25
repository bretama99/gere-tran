<template>
  <vx-card :title="$t('macAddressList')">
    <vx-card>
        <div class="vx-row">

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
         <div class="vx-col sm:w-full md:w-full lg:w-2/5 xl:w-2/5 mt-4"></div>
         <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-4"></div>
          <div class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4">
            <vs-input
              @keyup="fetchMacAdresses()"
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
        :data="macAddresses"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="macAddress">{{$t('macAddress')}}</vs-th>
          <vs-th sort-key="status">{{$t('status')}}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].macAddress">{{data[indextr].macAddress}}</vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
            <ul class="switch-container">
              <li>
                <span @click="updateMacAddressChanges(data[indextr].status,data[indextr].macAddressId,'success', indextr)">
                  <vs-switch color="success" v-model="data[indextr].status" />
                </span>
              </li>
            </ul>
          </vs-td>            
          </vs-tr>
        </template>
      </vs-table>
      <p v-if="increament!=0">.</p>
    </vx-card>
    <vs-pagination class="m-4" :total="total" v-model="currentPage" @change="fetchMacAdresses"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      macAddresses: [],
      limit: 15,
      total: 0,
      currentPage: 1,
      searchKey: "",
      perPage: 20,
      preventTableClickAction: false,
      macAddressId: ""
    };
  },
  methods: {
    updateMacAddressChanges(status, macAddressId,color, index) {      
      this.macAddresses[index].status=!this.macAddresses[index].status  
      if (status){ 
          this.status = "Disabled";
          this.confirm="Do You Want to Disable?";
      }
      else{ 
          this.status = "Active";
          this.confirm="Do You Want to Enable?";
      }
      this.macAddressId=macAddressId;
      this.$vs.dialog({
        type: 'confirm',
        color: 'warning',
        title: `Confirm`,
        text: this.confirm,
        accept: this.changeStatus,
        acceptText: this.$t('Yes'),
        cancelText: this.$t('No')
      })
  },
  changeStatus(){
      this.isLoading=true
      this.$http
      .put("/api/mac-address/change-status/" + this.macAddressId, {
        status: this.status
      })
      .then(response => {
        this.isLoading=false
        this.$vs.notify({
        color: 'success',
        title: 'Status',
        text: 'Status Changed'
    })
    this.fetchMacAdresses()
    }).catch(error=>{
      this.isLoading=false;
    })
     
  },
    fetchMacAdresses(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/mac-address",{
          params: { 
            page: thisIns.currentPage, 
            limit: thisIns.limit, 
            searchKey: thisIns.searchKey }
        })
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.macAddresses = response.data;
          thisIns.total=response.data[0].totalPage;
          for(let i=0; i<thisIns.macAddresses.length; i++){
            if(thisIns.macAddresses[i].status=="Active")
              thisIns.macAddresses[i].status=true
            else
              thisIns.macAddresses[i].status=false
          }
        }).catch(error => {
            thisIns.isLoading=false
        });
    },
   

    openConfirm(macAddressId) {
      this.macAddressId = macAddressId;
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
        .delete("/api/mac-address/"+this.macAddressId)
        .then(function(response) {
          thisIns.$vs.notify({
            color: "success",
            title: "Status",
            text: "Contact Deleted!"
          });
          thisIns.fetchMacAdresses();
        }).catch(error => {
        });

    },

    add: function() {
      this.$router.push({ name: "addMacAddress" });
    },
    updateMacAddress: function(id) {
      this.$router.push({ path: "/pages/edit-mac-address/" + id });
    }
  },
 created() {
    this.fetchMacAdresses();
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
