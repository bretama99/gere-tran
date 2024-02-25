<template>
  <vx-card :title="$t('userList')">
    <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
    <div class="chat__profile-search flex p-4 mt-6">
      <div
        class="vx-col sm:w-full md:w-full lg:w-1/6 xl:w-1/6 mt-2 mr-2"
      >
        <vs-button class="mb-2 small text-base" icon-pack="feather" icon="icon-plus" color="#292929"
                    @click.prevent="add">{{$t('create')}}
        </vs-button>
      </div>
      <div class="vx-col sm:w-full md:w-full lg:w-1/8 xl:w-1/8">
        <vs-dropdown vs-custom-content vs-trigger-click>
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2"><p>{{(currentPage-1)*limit+1}}-{{currentPage*limit}} of {{total*limit}}</p></span>
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
      <div class="vx-col sm:w-full md:w-full lg:w-1/4 xl:w-1/4"></div>
        <div class="vx-col sm:w-full md:w-full lg:w-2/5 xl:w-2/5">
          <vs-input
            @keyup="search()"
            icon="icon-search"
            icon-pack="feather"
            class="w-full mx-2 input-rounded-full no-icon-border"
            :placeholder="$t('Search')"
            v-model="searchKey"
          />
      </div>
    </div>
    <loading :active.sync="isLoading" :can-cancel="true"></loading>
    <vs-table :max-items="currentPage" :data="users">
      <template slot="thead">
        <vs-th sort-key="number">#</vs-th>
        <vs-th sort-key="Name">{{$t('Name')}}</vs-th>
        <vs-th sort-key="mobilePhone">{{$t('phoneNumber')}}</vs-th>
        <vs-th sort-key="email">{{$t('Email')}}</vs-th>
        <vs-th sort-key="role">{{$t('role')}}</vs-th>
        <vs-th sort-key="status">{{$t('Status')}}</vs-th>
        <vs-th sort-key="edit">{{$t('Edit')}}</vs-th>
        <vs-th sort-key="assigned">{{$t('Assign Role')}}</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="p-0"
            >{{indextr+1}}</vs-td>
            <vs-td
              class="p-0"
              :data="data[indextr].firstName"
            >{{data[indextr].firstName}} {{data[indextr].middleName}} {{data[indextr].lastName}}</vs-td>

          <vs-td class="p-0" :data="data[indextr].mobilePhone">{{data[indextr].mobilePhone}}</vs-td>

          <vs-td class="p-0" :data="data[indextr].email">{{data[indextr].email}}</vs-td>
          <vs-td class="p-0" :data="data[indextr].email">{{data[indextr].userType}}</vs-td>
          <vs-td class="p-0" :data="data[indextr].id">
            <ul class="switch-container">
              <li>
                <span @click="openConfirm(data[indextr].userStatus,data[indextr].userId,'success', indextr),increament++,decreament--">
                  <vs-switch color="success" v-model="data[indextr].userStatus"/>
                </span>
              </li>
            </ul>
          </vs-td>
          <vs-td class="p-0" :data="data[indextr].id">
            <span @click="updateUser(data[indextr].userId)">
              <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
            </span>
          </vs-td>
          <vs-td class="p-0" :data="data[indextr].id">
            <span @click="assignRole(data[indextr].id)">
              <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-arrow-right" />
            </span>

          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <p v-if="increament!=0">.</p>
    <vs-pagination color="#292929" @change="pagination()" :total="total" v-model="currentPage" :max="6"></vs-pagination>
    </vx-card>
  </vx-card>
</template>
<script>
import AddNewDataSidebar from "@/views/ui-elements/data-list/AddNewDataSidebar.vue";
import router from "@/router";
import { AgGridVue } from "ag-grid-vue";
import contacts1 from "@/views/ui-elements/ag-grid-table/data.json";
// import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import axios from 'axios';
import "@/assets/scss/vuesax/extraComponents/agGridStyleOverride.scss";
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    AddNewDataSidebar,
    AgGridVue,
    Loading
  },
  data() {
    return {
      dot:'',
      users: [],
      limit: 15,
      total: 0,
      updateRestaurant: "",
      currentPage: 1,
      status: [],
      swich: true,
      userStatus: "",
      updateStatus:false,
      colorAlert:'primary',
      titleAlert:'Alert',
      activeConfirm: false,
      valueInput:'',
      accepted:false,
      userId:"",
      confirm:"",
      increament:0,
      decreament:0,
      responseGeted:false,
      isLoading:false,
      searchKey:"",
      restaurantId: this.$route.query.restaurantId!=undefined?this.$route.query.restaurantId:0,
      restaurantName: this.$route.query.restaurantName!=undefined?this.$route.query.restaurantName:"",
    };
  },
  methods: {
      search: function() {
         this.isLoading=true
         this.$http.post('/api/user/search',{
          "searchKey":this.searchKey},
          {params: { page:this.currentPage, limit:this.limit}}
      )
        .then(response => {
          this.isLoading=false
          this.users= response.data;
          this.total=thisIns.users[0].totalPages;
          thisIns.$store.dispatch('user/populateUser',response.data);
        }).catch(error=>{
          this.isLoading=false
        })
    },
    openConfirm(userStatus, userId,color, index) {

        this.users[index].userStatus=!this.users[index].userStatus
        if (userStatus){ this.userStatus = "Disabled";this.confirm="Do You Want to Disable?";}
        else{ this.userStatus = "Active";this.confirm="Do You Want to Enable?";}
        this.userId=userId;
        this.$vs.dialog({
          type: 'confirm',
          color: 'warning',
          title: `Confirm`,
          text: this.confirm,
          accept: this.acceptAlert,
          acceptText: this.$t('Yes'),
          cancelText:this.$t('No')
        })
    },
    acceptAlert(){
        this.isLoading=true
        this.$http
        .put("/api/user/changestatus/" + this.userId, {
          userStatus:this.userStatus
        })
        .then(response => {
          this.isLoading=false
          this.$vs.notify({
          color: 'success',
          title: 'Status',
          text: 'User Status Changed'
      })
      this.getUsers()

      }).catch(error=>{
        this.isLoading=false;
      })

    },
    pageLimit: function(limit) {
      this.limit = limit;
      this.updateStatus=true;
      this.pagination();
      this.updateStatus=false;
    },
    pagination: function() {
      this.isLoading=true
      const thisIns = this;
      this.$http
        .get("/api/user", {
          params: { page: this.currentPage, limit: this.limit }
        })
        .then(function(response) {
          this.isLoading=false
          thisIns.users = response.data;
          thisIns.total = thisIns.users[0].totalPages;
          thisIns.$store.dispatch('user/populateUser',response.data);
          if(thisIns.updateStatus==true){
            for(let i=0;i<thisIns.users.length;i++){
              if(thisIns.users[i].userStatus=="Active")
              thisIns.users[i].userStatus=true;
              else thisIns.users[i].userStatus=false;
            }
          }
        }).catch(error=>{
          this.isLoading=false
        })
    },

    add: function() {
      this.$router.push({ path: "/pages/add-user", query: { restaurantId: this.restaurantId, restaurantName: this.restaurantName }});
    },
    updateUser: function(id) {
      this.$router.push({ path: "/pages/update-user/" + id , query: { restaurantId: this.restaurantId, restaurantName: this.restaurantName }});
    },
    assignRole: function(id){
      // this.$router.push({ path: "/pages/assign-roles/" + id });
      this.$router.push({ path: "/pages/assign-role/" + id });

    },
        getUsers(){
          if(this.restaurantId==0){
            const thisIns = this;
            this.isLoading=true;   
            axios.get("/api/user",{
                params: { page: this.currentPage, limit: this.limit, restaurantId: this.restaurantId }
              })
              .then(function(response) {
                thisIns.isLoading=false
                thisIns.users = response.data;
                thisIns.total = thisIns.users[0].totalPages;
                thisIns.$store.dispatch('user/populateUser',response.data);
                for (let i = 0; i < thisIns.users.length; i++) {
                  if (thisIns.users[i].userStatus == "Active") thisIns.users[i].userStatus = true;
                  else thisIns.users[i].userStatus = false;
                }
              }).catch(error => {
                  thisIns.isLoading=false
                });
          }

          else{
            const thisIns = this;
            this.isLoading=true;
            axios.defaults.baseURL = thisIns.optifoodBaseAddress; 
            axios.get("/api/user",   
              {
                headers: {"X-TenantID": thisIns.restaurantName},
                params: { page: this.currentPage, limit: this.limit }
              })
              .then(function(response) {
                axios.defaults.baseURL = thisIns.managementBaseAddress; 
                thisIns.isLoading=false
                thisIns.users = response.data;
                // thisIns.total = thisIns.users[0].totalPage;
                thisIns.$store.dispatch('user/populateUser',response.data);
                for (let i = 0; i < thisIns.users.length; i++) {
                  if (thisIns.users[i].userStatus == "Active") thisIns.users[i].userStatus = true;
                  else thisIns.users[i].userStatus = false;
                }
                this.responseGeted=true;
              }).catch(error => {
                  axios.defaults.baseURL = thisIns.managementBaseAddress; 
                  thisIns.isLoading=false
                });
          }
    }
  },
  created() {
   this.getUsers();
  },
  updated(){
    if(this.updateRestaurant==""&&this.increament!=0){
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
</style>
