<template>
  <vx-card :title="$t('roleList')">
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
              @keyup="fetchRoles()"
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
        :data="roles"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="roleName">{{$t('roleName')}}</vs-th>
          <vs-th sort-key="roleFullName">{{$t('roleFullName')}}</vs-th>
          <vs-th>{{$t('actions')}}</vs-th>
          <vs-th>{{$t('assignPrivilege')}}</vs-th>
          <!-- <vs-th>{{$t('assignPrivilegetrial')}}</vs-th> -->
          <vs-th>{{$t('assignCategory')}}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].roleName">{{data[indextr].roleName}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].roleFullName">{{data[indextr].roleFullName}}</vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
              <span v-if="isGranted('editRole')" @click="updateRole(data[indextr].roleId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
                  <span v-if="isGranted('deleteRole')"
                    @click="preventTableClickAction=true, openConfirm(data[indextr].roleId)"
                  >
                    <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
                  </span>

            </vs-td>
            <!-- <vs-td class="p-0 " :data="data[indextr].id">
              <span class="ml-8" @click="assignPermission(data[indextr].roleId)">
              <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-arrow-right" />
            </span>
            </vs-td> -->
            <vs-td class="p-0 " :data="data[indextr].id">
              <span class="ml-8" @click="assignPermissions(data[indextr].roleId)">
              <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-arrow-right" />
            </span>
            </vs-td>
            <vs-td class="p-0 ml-4" :data="data[indextr].id">

                  <span class="ml-8" @click="assignCategory(data[indextr].roleId)">
              <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-arrow-right" />
            </span>
            </vs-td>

          </vs-tr>
        </template>
      </vs-table>


    </vx-card>

    <p v-if="increament!=0">.</p>
    <vs-pagination color="#292929" @change="fetchRoles()" :total="total" v-model="currentPage"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dot: "",
      roles: [],
      selected: [],
      limit: 15,
      total: 0,
      searchRole: "",
      currentPage: 1,
      status: [],
      swich: true,
      roleStatus: "",
      updateStatus: false,
      colorAlert: "primary",
      titleAlert: "Alert",
      activeConfirm: false,
      valueInput: "",
      accepted: false,
      id: "",
      confirm: "",
      increament: 0,
      decreament: 0,
      responseGeted: false,
      currentItemView: "item-grid-view",
      knowledgeBaseSearchQuery: "",
      searchKey: "",
      kb: [],
      allRoles: [],
      perPage: 20,
      totalPage: 0,
      preventTableClickAction: false
    };
  },
  methods: {
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
    searchRoles() {
      this.isLoading = true;
      this.$http
        .get("/roles?searchKey="+this.searchKey/*, {
          searchKey: this.searchKey
        }*/)
        .then(response => {
          this.roles = response.data;

          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },

    openConfirm(roleId) {
      this.roleId = roleId;
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
        .delete("/api/roles/"+this.roleId)
        .then(function(response) {
          thisIns.$vs.notify({
            color: "success",
            title: "Status",
            text: "Role Deleted!"
          });
          thisIns.fetchRoles();
        }).catch(error => {
        });

    },

    add: function() {
      this.$router.push({ name: "addRole" });
    },
    updateRole: function(id) {
      this.$router.push({ path: "/pages/edit-role/" + id });
    },
    assignPermission:function(id) {
      this.$router.push({ path: "/pages/permission/" + id });
    },
    assignPermissions: function(id){
      this.$router.push({ path: "/pages/permissions/" + id });
    },
    assignCategory: function(id){
      this.$router.push({ path: "/pages/view-privilege-categories/" , query: { foo: id}});
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
