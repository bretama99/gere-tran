<template>
  <vx-card :title="$t('bankList')">
    <vx-card>
        <div class="vx-row">
          <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-6">
                <vs-button class="mb-2 small text-base" icon-pack="feather" icon="icon-plus" color="#292929"
                    @click.prevent="add">{{$t('create')}}
                 </vs-button>
          </div>

      <div id="dropdown" class="vx-col sm:w-full md:w-full lg:w-1/6 xl:w-1/6 mt-4">
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
        :data="contacts"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="name">{{$t('name')}}</vs-th>
          <vs-th sort-key="name">{{$t('ሃገር')}}</vs-th>
          <vs-th sort-key="name">{{$t('code')}}</vs-th>
          <vs-th sort-key="name">{{$t('nationality')}}</vs-th>
          <vs-th sort-key="email">{{$t('ዜግነት')}}</vs-th>
          <vs-th sort-key="phoneNumber">{{$t('currency')}}</vs-th>
          <vs-th sort-key="phoneNumber">{{$t('ካረንሲ')}}</vs-th>
          <vs-th>{{$t('actions')}}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].name">{{data[indextr].name}} {{data[indextr].firstName}}</vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].name">{{data[indextr].name}} {{data[indextr].firstName}}</vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].name">{{data[indextr].name}} {{data[indextr].firstName}}</vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].name">{{data[indextr].name}} {{data[indextr].firstName}}</vs-td>
            <vs-td class="pr-4 w-1/8" :data="data[indextr].name">{{data[indextr].name}} {{data[indextr].firstName}}</vs-td>
            <vs-td class="pr-4 w-1/8" :data="data[indextr].email">{{data[indextr].email}}</vs-td>
            <vs-td class="pr-4 w-1/6" :data="data[indextr].phoneNumber">{{data[indextr].phoneNumber}}</vs-td>
            <vs-td class="p-0 pr-4 w-1/4" :data="data[indextr].id">
              <span v-if="isGranted('editContact')" @click="updateContact(data[indextr].contactId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
              
              <span v-if="isGranted('deleteContact')"
                @click=" openConfirm(data[indextr].contactId)">
                <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
              </span>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <p v-if="increament!=0">.</p>
    </vx-card>
    <vs-pagination class="m-4" :total="total" v-model="currentPage" @change="fetchCountries"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      contacts: [],
      limit: 15,
      total: 0,
      currentPage: 1,
      searchKey: "",
      perPage: 20,
      totalPage: 0,
      preventTableClickAction: false,
      contactId: "",
    };
  },
  methods: {

    assignRestaurant(contactId){
      this.$router.push({ path: "/pages/assign-restaurant/"+ contactId});
    },
    fetchCountries(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/contact",{
          params: {
            page: thisIns.currentPage,
            limit: thisIns.limit,
            searchKey: thisIns.searchKey }
        })
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.contacts = response.data;
          thisIns.total = response.data[0].totalPages;
        }).catch(error => {
            thisIns.isLoading=false
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
        cancelText: this.$t("No")
      });
    },
    acceptAlert() {
      const thisIns = this;
      thisIns.$http
        .delete("/api/contact/"+thisIns.contactId)
        .then(function(response) {
            thisIns.$vs.notify({
            color: "success",
            title: "Status",
            text: "Contact Deleted!"
          });
          thisIns.fetchContacts();
        }).catch(error => {
        });

    },

    add: function() {
      this.$router.push({ name: "addBank" });
    },
    updateContact: function(id) {
      this.$router.push({ path: "/pages/edit-contact/" + id });
    }
  },
 created() {
    this.fetchCountries();
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
