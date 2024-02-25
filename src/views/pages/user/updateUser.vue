<template>
  <div id="main-div" class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('updateUser')">
        <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
        <div class="vx-row mt-10">
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-col sm:w-full md:w-full lg:w-1/3 xl:w-1/3 mb-6">
            <vs-input
              class="w-full"
              :label="$t('firstName')"
              v-model="firstName"
              name="firstName"
              v-validate="'required'"
              data-vv-validate-on="blur"
            />
            <span class="text-danger">{{ errors.first('firstName') }}</span>
          </div>
          <div class="vx-col sm:w-full md:w-full lg:w-1/3 xl:w-1/3 mb-6">
            <vs-input
              class="w-full"
              :label="$t('lastName')"
              v-model="lastName"
              name="lastName"
              v-validate="'required'"
              data-vv-validate-on="blur"
            />
            <span class="text-danger">{{ errors.first('lastName') }}</span>
          </div>
          <div class="vx-col sm:w-full md:w-full lg:w-1/3 xl:w-1/3 mb-6">
            <vs-input
              class="w-full"
              :label="$t('mobilePhone')"
              v-model="mobilePhone"
              name="mobilePhone"
              data-vv-validate-on="blur"
            />
            <span class="text-danger">{{ errors.first('mobilePhone') }}</span>
            <span id="mobilePhone">{{validateMobilePhone}}</span>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-full md:w-full lg:w-1/3 xl:w-1/3 mb-6">
            <vs-input
              class="w-full"
              :label="$t('Email')"
              v-model="email"
              name="email"
              v-validate="'required|email'"
              data-vv-validate-on="blur"
              @keyup.enter="updateUser"
            />
            <span class="text-danger">{{ errors.first('email') }}</span>
          </div>

           <div class="vx-col sm:w-full md:w-full lg:w-1/3 xl:w-1/3 mb-6">
           <span class="ml-2">{{$t('role')}}</span>
           <v-select
             v-model="role"
             v-validate="'required'"
             class="w-full"
             :options="roles"
             v-validate:role="'required'"
             name="role"
             :class="{ danger: errors.has('role') }"
           ></v-select>
           <span
             class="text-danger"
             v-show="errors.has('role')"
           >{{ errors.first('role') }}</span>
         </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button color="#292929" @click="updateUser" class="mr-3 mb-2">{{$t('Update')}}</vs-button>
          </div>
        </div>
        <p></p>
      </vx-card>
      </vx-card>
    </div>
  </div>
</template>


<script>
import { Validator } from "vee-validate";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VSelect from "vue-select";
import axios from 'axios';
const dict = {
  custom: {
    firstName: {
      required: "First name is required",
      alpha: "First name must be characters"
    },
    lastName: {
      required: "Last name is required",
      alpha: "Last name must be characters"
    },
    middleName: {
      required: "Grand fahter is required",
      alpha: "Grand Father name must be characters"
    },
    mobilePhone: {
      regex:"Invalid phone number format"
    },
  }
};
Validator.localize("en", dict);


export default {
  components:{
   Loading,
   'v-select':VSelect,
  },
  data() {
    return {
      restaurants:[],
      users: [],
      id: this.$route.params.id,
      firstName: "",
      lastName: "",
      middleName: "",
      mobilePhone: "",
      email: "",
      role: "",
      roles:[
        "Admin",
        "kitchen"
      ],
      validateMobilePhone:"",
      isLoading:false,
      restaurantId: this.$route.query.restaurantId!=undefined?this.$route.query.restaurantId:0,
      restaurantName: this.$route.query.restaurantName!=undefined?this.$route.query.restaurantName:"",
    };
  },
  methods: {
    space() {
      let temp = this.mobilePhone;
      if (this.mobilePhone.length < 2 && this.mobilePhone!=" " ) {
        this.mobilePhone = " " + temp;
      }
      if (this.mobilePhone == "")
      this.validateMobilePhone = "Please enter mobile phone";
      else this.validateMobilePhone = "";
      if(this.mobilePhone.length>10){
      this.mobilePhone=this.mobilePhone.substring(0, this.mobilePhone.length - 1);
    }
    },
    updateUser() {
      this.$validator.validateAll().then(result => {
          this.isLoading=true;
          if(this.restaurantId==0){
            this.$http
            .put("/api/user/" + this.id, {
              firstName: this.firstName,
              lastName: this.lastName,
              middleName: this.middleName,
              mobilePhone: this.mobilePhone,
              email: this.email,
              userType: this.role,
              userStatus:"Active"
            })
            .then(response => {

              this.isLoading=false
              this.$vs.notify({
                title:this.$t('Update'),
                text: this.$t('Updated Successfully!'),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success"
              });
              if(this.restaurantId>0)
                this.$router.push({ path: "/pages/view-restaurant-user", query: { restaurantId: this.restaurantId, restaurantName: this.restaurantName }});
              else
               this.$router.push({ path: "/pages/view-user" });
            }).catch(error=>{
              this.isLoading=false
            });
          }
          else{
            axios.defaults.baseURL = this.optifoodBaseAddress; 
            axios.defaults.headers.common['X-TenantID'] =this.restaurantName;
            this.$http
            .put("/api/user/" + this.id, {
              firstName: this.firstName,
              lastName: this.lastName,
              middleName: this.middleName,
              mobilePhone: this.mobilePhone,
              email: this.email,
              userType: this.role,
              userStatus:"Active",
            })
            .then(response => {

              this.isLoading=false
              this.$vs.notify({
                title:this.$t('Update'),
                text: this.$t('Updated Successfully!'),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success"
              });
              if(this.restaurantId>0)
                this.$router.push({ path: "/pages/view-restaurant-user", query: { restaurantId: this.restaurantId, restaurantName: this.restaurantName }});
              else
               this.$router.push({ path: "/pages/view-user" });
              axios.defaults.baseURL = this.managementBaseAddress;
            }).catch(error=>{
              this.isLoading=false;
              axios.defaults.baseURL = this.managementBaseAddress;
            })
          }
          
          
      });
    },
    getUserDetail(){
      if(this.restaurantId==0){
        this.$http
            .get("/api/user/" + this.id, {
            })
            .then(response => {
              this.users = response.data;
              this.firstName = this.users.firstName;
              this.lastName = this.users.lastName;
              this.middleName = this.users.middleName;
              this.mobilePhone = this.users.mobilePhone;
              this.email = this.users.email;
              this.role = this.users.userType
              this.isLoading=false
            }).catch(error=>{
              this.isLoading=false
            })
      }

      else{
        axios.defaults.baseURL = this.optifoodBaseAddress; 
        axios.defaults.headers.common['X-TenantID'] =this.restaurantName;
        this.$http
            .get("/api/user/" + this.id, {
            })
            .then(response => {
              this.users = response.data;
              this.firstName = this.users.firstName;
              this.lastName = this.users.lastName;
              this.middleName = this.users.middleName;
              this.mobilePhone = this.users.mobilePhone;
              this.email = this.users.email;
              this.role = this.users.userType
              this.isLoading=false
              axios.defaults.baseURL = this.managementBaseAddress;
            }).catch(error=>{
              axios.defaults.baseURL = this.managementBaseAddress;
              this.isLoading=false
            })
      }
      
    },

  },

  

  created() {          
         this.getUserDetail()
  },


};
</script>
<style  scoped>
#mobilePhone{
  color: red;
}
</style>