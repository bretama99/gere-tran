<template>
  <vx-card :title="$t('privilegeList')">
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
              <span @click="setPerPagePrivileges(15)">15</span>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <span @click="setPerPagePrivileges(25)">25</span>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <span @click="setPerPagePrivileges(50)">50</span>
            </vs-dropdown-item>
            <vs-dropdown-item>
              <span @click="setPerPagePrivileges(75)">75</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
         <div class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4"></div>
         <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-4"></div>
          <div class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4 mt-4">
            <vs-input
              @keyup="fetchPrivileges()"
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
        :data="privileges"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="privilegeName">{{$t('privilegeName')}}</vs-th>
          <vs-th sort-key="privilegeDescription">{{$t('privilegeDescription')}}</vs-th>
          <vs-th sort-key="privilegeUrl">{{$t('privilegeUrl')}}</vs-th>
          <vs-th sort-key="method">{{$t('method')}}</vs-th>
          <vs-th>{{$t('actions')}}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
            <vs-td class="pr-4 w-1/5" :data="data[indextr].firstName">{{data[indextr].privilegeName}} </vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].privilegeDescription">{{data[indextr].privilegeDescription}} </vs-td>
            <vs-td class="pr-4 w-1/3" :data="data[indextr].privilegeUrl">{{data[indextr].privilegeUrl}}</vs-td>
             <vs-td class="pr-4 w-1/10" :data="data[indextr].method">{{data[indextr].method}}</vs-td>
            <vs-td class="pr-4 w-1/5" :data="data[indextr].id">
              <span v-if="isGranted('editPrivilege')" @click="updatePrivilege(data[indextr].privilegeId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
                  <span v-if="isGranted('deletePrivilege')"
                    @click=" openConfirm(data[indextr].privilegeId)"
                  >
                    <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
                  </span>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <p v-if="increament!=0">.</p>
    </vx-card>
    <!-- <div
        :key="indextr"
        v-for="(tr, indextr) in getPatientDetail.patientEncounters"
      > -->
    <!-- <vs-pagination class="m-4" :total="total" v-model="currentPage" @change="fetchPrivileges"></vs-pagination> -->
    <p v-if="increament!=0">.</p>
    <vs-pagination class="m-4" :total="total" v-model="currentPage" @change="fetchPrivileges()"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dot: "",
      privileges: [],
      limit: 15,
      total: 0,
      currentPage: 1,
      privilegeId: "",
      confirm: "",
      searchKey: "",
      perPage: 15,
      totalPage: 0,
      privilegeCategories:[],
      preventTableClickAction: false
    };
  },
  methods: {
    setPerPagePrivileges(perPage){
      this.perPage = perPage;
      this.fetchPrivileges();
    },

    getPrivileges(privilegeCategoryId){
      alert(privilegeCategoryId)
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/privileges",{
          params: {
            page: thisIns.currentPage,
            limit: thisIns.perPage,
            privilegeCategoryId:privilegeCategoryId,
            searchKey: thisIns.searchKey }
        })
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.privileges = response.data;
          thisIns.total = response.data[0].totalPage;
        }).catch(error => {
            thisIns.isLoading=false
        });
    },

    fetchPrivilegeCategories(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/privilege-category",{
          params: {
            page: thisIns.currentPage,
            limit: thisIns.perPage,
            searchKey: thisIns.searchKey }
        })
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.privilegeCategories = response.data;
          thisIns.total = response.data[0].totalPage;
        }).catch(error => {
            thisIns.isLoading=false
        });
    },

    fetchPrivileges(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/privileges",{
          params: {
            page: thisIns.currentPage,
            limit: thisIns.perPage,

            searchKey: thisIns.searchKey }
        })
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.privileges = response.data;
          thisIns.total = response.data[0].totalPage;
        }).catch(error => {
            thisIns.isLoading=false
        });
    },


    openConfirm(privilegeId) {
      this.privilegeId = privilegeId;
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
        .delete("/api/privileges/"+this.privilegeId)
        .then(function(response) {
          thisIns.$vs.notify({
            color: "success",
            title: "Status",
            text: "Role Deleted!"
          });
          thisIns.fetchPrivileges();
        }).catch(error => {
        });

    },
    add: function() {
      this.$router.push({ name: "addPrivilege" });
    },
    updatePrivilege: function(id) {
      this.$router.push({ path: "/pages/edit-privilege/" + id });
    }

  },
  created() {
    this.fetchPrivilegeCategories();
    this.fetchPrivileges();
  },

  computed: {
    getPrivileges(){
        return this.$store.getters["PrivilegeModule/getPrivileges"];
      },
        getPrivilege(){
        return this.$store.getters["PrivilegeModule/getPrivilege"];
      },
  }
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
    transform: translate(-50%, -50%);
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
      content: "";
      border-radius: 50%;
      height: 80px;
      width: 80px;
      position: absolute;
    }
  }
  @keyframes loader-animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(220deg);
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
</style>
