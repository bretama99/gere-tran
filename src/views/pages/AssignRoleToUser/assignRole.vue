<template>
  <vx-card :title="$t('rolesList')">
    <vx-card>
        <div class="vx-row">

      <div id="dropdown" class="vx-col sm:w-full md:w-full lg:w-1/6 xl:w-1/6 mt-4">
        <!-- <vs-dropdown vs-custom-content vs-trigger-click>
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
        </vs-dropdown> -->
      </div>
         <!-- <div class="vx-col sm:w-full md:w-full lg:w-2/5 xl:w-2/5 mt-4"></div>
         <div class="vx-col sm:w-full md:w-full lg:w-1/1 xl:w-1/12 mt-4"></div>
          <div class="vx-col sm:w-full md:w-full lg:w-1/5 xl:w-1/5 mt-4">
            <vs-input
              @keyup="fetchContacts()"
              icon="icon-search"
              icon-pack="feather"
              class="w-full mx-2 input-rounded-full no-icon-border"
              :placeholder="$t('Search')"
              v-model="searchKey"
            />
        </div> -->
      </div>
      </vx-card>
    <vx-card id="internal-card" title no-shadow card-border>

      <vs-table
        class="stripe"
        hoverFlat
        @selected="goToDetail"
        :max-items="perPage"
        :data="roles"
      >
        <!-- <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="roleName">{{$t('roleName')}}</vs-th>
          <vs-th sort-key="roleFullName">{{$t('roleFullName')}}</vs-th>
          <vs-th>{{$t('actions')}}</vs-th>
        </template> -->
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].roleName">{{data[indextr].roleName}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].roleFullName">{{data[indextr].roleFullName}}</vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
              <!-- <span v-if="isGranted('editContact')" @click="updateContact(data[indextr].roleId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span> -->
              <!-- <vs-checkbox :val="data[indextr].roleId" v-model="assigned" v->
      </vs-checkbox> -->
      <label class="form-checkbox">
                            <input type="checkbox" :value="data[indextr].roleId"
                               v-model="assigned">
                            <i class="form-icon"></i>
                          </label>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <p v-if="increament!=0">.</p>
      <div style="float:right;">
                <br>
                <vs-button v-if="isGranted('addLab')" @click="addAssignedRoles()" color="success"
                  class="mr-3 mb-2">{{ $t('save') }}</vs-button>
              </div>
    </vx-card>
    <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" @change="fetchRoles"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      roles: [],
      assigned:[],
      limit: 15,
      total: 0,
      currentPage: 1,
      searchKey: "",
      perPage: 20,
      totalPage: 0,
      preventTableClickAction: false,
      contactId: ""
    };
  },
  methods: {
    addAssignedRoles(){
      alert(JSON.stringify(this.assigned));
      // this.$route.params.id
      this.$http.post("/api/user-role", {userId: this.$route.params.id, roleIds:this.assigned})
             .then(response => {
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Add'),
                 text: this.$t('Assigned Successfully!'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "success",
                 time:6000
               });
               this.$router.push({ path: "/pages/view-user" });
             }).catch(error=>{
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Add'),
                 text: this.$t('notRegistered'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "warnning",
                 time:6000
               });
             })

    },
    fetchRoles(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/roles",{
          params: {
            page: thisIns.currentPage,
            limit: thisIns.limit,
            searchKey: thisIns.searchKey }
        })
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.roles = response.data;
          thisIns.total = 1;
        }).catch(error => {
            thisIns.isLoading=false
        });
    },

    // openConfirm(contactId) {
    //   this.contactId = contactId;
    //   this.$vs.dialog({
    //     type: "confirm",
    //     color: "warning",
    //     title: `Confirm`,
    //     text: this.$t("deleteConfirmation"),
    //     accept: this.acceptAlert,
    //     acceptText: this.$t("Yes"),
    //     cancelText: this.$t("No")
    //   });
    // },
    // acceptAlert() {
    //   const thisIns = this;
    //   thisIns.$http
    //     .delete("/api/contact/"+thisIns.contactId)
    //     .then(function(response) {
    //         thisIns.$vs.notify({
    //         color: "success",
    //         title: "Status",
    //         text: "Contact Deleted!"
    //       });
    //       thisIns.fetchContacts();
    //     }).catch(error => {
    //     });

    // },

    add: function() {
      this.$router.push({ name: "addContact" });
    },
    updateContact: function(id) {
      this.$router.push({ path: "/pages/edit-contact/" + id });
    }
  },
 created() {
    this.fetchRoles();
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
