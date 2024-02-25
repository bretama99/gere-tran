<template>
 <div id="main-div"  class="vx-row register">
   <div class="vx-col w-full mb-base">
     <vx-card id="card-id" :title="$t('addNewUser')">
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
               icon-pack="feather"
               icon-no-border
               class="w-full"
               :label="$t('phoneNumber')"
               v-model="phoneNumber"
               name="phoneNumber"
               v-validate="'required'"
               data-vv-validate-on="blur"
             />
             <span class="text-danger">{{ errors.first('phoneNumber') }}</span>
           </div>
         </div>
         <div class="vx-row">

         <div class="vx-col sm:w-full md:w-full lg:w-1/3 xl:w-1/3 mb-6">
             <vs-input
               type="email"
               :label="$t('Email')"
               v-model="email"
               class="w-full"
               name="email"
               v-validate="'required|email'"
               data-vv-validate-on="blur"
             />
             <span class="text-danger">{{ errors.first('step-1.email') }}</span>
             <span class="text-danger">{{ errors.first('email') }}</span>
             <p id="checkPassword">{{checkEmail}}</p>
           </div>
           <div class="vx-col sm:w-full md:w-full lg:w-1/3 xl:w-1/3 mb-6">
             <vs-input
               type="password"
               v-validate="'required|min:6|max:10'"
               :label="$t('Password')"
               name="password"
               v-model="password"
               class="w-full"
               data-vv-validate-on="blur"
             />
             <span class="text-danger">{{ errors.first('password') }}</span>
           </div>
           <div class="vx-col sm:w-full md:w-full lg:w-1/3 xl:w-1/3 mb-6">
              <vs-input
               :label="$t('confirmPassword')"
               v-model="confirmPassword"
               class="w-full"
               type="password"
               name="confirm_password"
               @change="passwordConfirm"
               data-vv-validate-on="blur"
             />
             <span class="text-danger">{{ errors.first('confirm_password') }}</span>
             <p id="checkPassword">{{checkPassword}}</p>
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
             <vs-button color="#292929" @click="addUser" class="mr-3 mb-2">{{$t('Register')}}</vs-button>
           </div>
         </div>

       </vx-card>
     </vx-card>
   </div>
 </div>
</template>


<script>
import router from "@/router.js";
import { Validator } from "vee-validate";
import Loading from "vue-loading-overlay";
import VSelect from "vue-select";
import "vue-loading-overlay/dist/vue-loading.css";
import axios from 'axios';
const dict = {
 custom: {
   firstName: {
     required: "Please enter First Name",
   },
   lastName: {
     required: "Please Enter Last Name",
   },
   middleName: {
     required: "Please Enter Middle Name",
   },

   email: {
     required: "Please Enter email",
     email: "Please enter valid email"
   },
   phoneNumber: {
    required: "Please enter phone number"
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
     firstName: "",
     lastName: "",
     middleName: "",
     phoneNumber: "",
     restaurantId: 0,
     email: "",
     role: "",
     password: "",
     confirmPassword: "",
     checkPassword: "",
     checkEmail: "",
     validateMobilePhone: "",
     isLoading:false,
     roles:[
       "Admin",
       "kitchen"
     ],
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
   passwordConfirm: function() {
     if (this.password != this.confirmPassword) {
       this.checkPassword = "Password Doesn't Match";
     } else {
       this.checkPassword = "";
     }
   },

   checkEmailIfNotExist: function() {
     this.$http.get("accounts/checkemail/" + this.email).then(response => {
       if (response.data == "Email exists") {
         this.checkEmail = "This email already Exists";
       } else this.checkEmail = "";
     });
   },


   addUser() {
     this.$validator.validateAll().then(result => {
       if (result) {
        if(this.restaurantId==0){
         this.isLoading=true
           this.$http
             .post("/api/user", {
               firstName: this.firstName,
               lastName: this.lastName,
               middleName: this.middleName,
               mobilePhone: this.phoneNumber,
               email: this.email,
               restaurantId: this.restaurantId,
               userType: this.role,
               password: this.password,
             })
             .then(response => {
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Add'),
                 text: this.$t('Registered Successfully!'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "success",
                 time:1000
               });
               if(this.restaurantId>0)
                this.$router.push({ path: "/pages/view-restaurant-user", query: { restaurantId: this.restaurantId }});
              else
                this.$router.push({ path: "/pages/view-user" });
             }).catch(error=>{
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Add'),
                 text: this.$t('notRegistered'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "warnning",
                 time:1000
               });
             })
       }
       else{
        axios.defaults.baseURL = this.optifoodBaseAddress; 
        axios.defaults.headers.common['X-TenantID'] =this.restaurantName;
        this.isLoading=true
           axios.post("/api/user",
             {
               firstName: this.firstName,
               lastName: this.lastName,
               middleName: this.middleName,
               mobilePhone: this.phoneNumber,
               email: this.email,
               restaurantId: this.restaurantId,
               userType: this.role,
               password: this.password,
               userStatus: "Active"
             })
             .then(response => {
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Add'),
                 text: this.$t('Registered Successfully!'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "success",
                 time:1000
               });
               axios.defaults.baseURL = this.managementBaseAddress; 
               if(this.restaurantId>0)
                this.$router.push({ path: "/pages/view-restaurant-user", query: { restaurantId: this.restaurantId, restaurantName: this.restaurantName }});
              else
                this.$router.push({ path: "/pages/view-user" });
             }).catch(error=>{
              axios.defaults.baseURL = this.managementBaseAddress; 
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Add'),
                 text: this.$t('notRegistered'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "warnning",
                 time:1000
               });
             })
       }
       }
     });
   },

   getRestaurants(){
    this.$http.get("/api/restaurant",
      ).then(response => {
        this.restaurants=response.data
      });
   }
 },

 created(){
  this.getRestaurants();
 },
 updated() {
   if(this.email==""){
     this.checkEmail="";
   }
 }
};
</script>
<style  scoped>
#checkPassword {
 color: red;
}
#mobilePhone {
 color: red;
}
</style>
