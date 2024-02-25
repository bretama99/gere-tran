<template>
 <div

   class="
     register
     h-screen
     flex
     w-full
     vx-row
     no-gutter
     items-center
     justify-center
   "
 >
   <div class="vx-col sm:w-full md:w-full lg:w-3/4 xl:w-3/4">
     <loading :active.sync="isLoading" :can-cancel="true"></loading>
     <vx-card class="grid-view-item mb-base overflow-hidden px-1">
       <div slot="no-body" class="full-page-bg-color">
         <div class="vx-row no-gutter">
           <div
             class="
               vx-col
               sm:w-full
               md:w-full
               mx-auto
               self-center
               d-theme-dark-bg
             "
           >
             <div class="p-8">
               <p>
                 <b>{{ $t("editRestaurant") }}</b>
               </p>
               <div v-if="!register" class="mt-5">
                 <form-wizard
                   errorColor="rgba(var(--vs-danger), 1)"
                   :title="null"
                   :subtitle="null"
                   :finishButtonText="$t('update')"
                   buttons-hidden
                   size="large"
                   :nextButtonText="$t('Next')"
                   :backButtonText="$t('Back')"
                 >

                   <tab-content
                     :title="$t('restaurantInformation')"
                     class="mb-5"
                     :before-change="validateStep1"
                   >
                     <form data-vv-scope="step-1">
                       <div class="vx-row">
                         <div class="vx-col sm:w-full md:w-full lg:w-1/3 xl:w-1/3 mt-24">
                          <vs-avatar
                               v-if="image!=''"
                               size="150px"
                               :src="image"
                               class="ml-16"
                             />
                           <vs-avatar
                               v-else-if="(logo!=null || logo!='')"
                               size="150px"
                               :src="(`${$domain}/logos/${logo}`)"
                               class="ml-16"
                             />
                             <img v-else width="150px" src="@/optifood/assets/img/picture.png"
                                 class="d-flex border-radius-md ml-16" alt="avatar">
                           <div class="invoice__invoice-detail mt-6 ml-8">
                             <div class="vx-row">
                               <div class="vx-col sm:w-full md:w-full lg:w-3/5">
                                   <div class="vx-row">
                                     <div class="vx-col w-1/4">
                                       <form enctype="multipart/form-data">
                                         <input
                                          class="file-upload rounded-lg mr-4 mt-2 vs-button small bg-grey vs-button-gradient w-64 text-sm"
                                           type="file"
                                           id="file"
                                           ref="file"
                                           name="file"
                                           @change="onSelect"
                                         />
                                       </form>
                                     </div>
                                   </div>
                               </div>
                               </div>
                             </div>
                         </div>
                         <div class="vx-col sm:w-full md:w-full lg:w-2/3 xl:w-2/3">
                           <div class="vx-row mt-5">
                             <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-12">
                               <img height="20px" width="25px" src="@/optifood/assets/img/couvercles.png">
                             </div>

                             <div class="vx-col sm:w-full md:w-full lg:w-11/12 xl:w-11/12 mt-6">
                                 <div class="vx-row">
                                   <div
                                     class="
                                       vx-col
                                       sm:w-full
                                       md:w-full
                                       lg:w-5/12
                                       xl:w-5/12
                                       "
                                     >
                               <vs-input
                                 :label="$t('restaurantName')"
                                 v-model="restaurantName"
                                 class="w-full"
                                 name="restaurantName"
                                 v-validate="'required'"
                               />
                               <span
                                 @change="errors.has('step-1.restaurantName')"
                                 class="text-danger"
                                 >{{
                                   errors.first("step-1.restaurantName")
                                 }}</span
                               >
                             </div>
                             <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-6">
                               <img height="20px" width="25px" src="@/optifood/assets/img/information.png">
                             </div>
                             <div
                               class="
                                 vx-col
                                 sm:w-full md:w-full lg:w-1/2 xl:w-1/2
                               "
                             >
                               <vs-input
                                 :label="$t('companyId')"
                                 v-model="companyId"
                                 class="w-full"
                                 name="companyId"
                                 v-validate="'required'"
                               />
                               <span
                                 @change="errors.has('step-1.companyId')"
                                 class="text-danger"
                                 >{{
                                   errors.first("step-1.companyId")
                                 }}</span
                               >
                             </div>
                                 </div>

                             </div>

                           </div>
                           <div class="vx-row mt-6">
                               <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-2">
                                 <feather-icon icon="ClockIcon" svgClasses="h-16 w-8"></feather-icon>
                               </div>
                             <div class="vx-col sm:w-full md:w-full lg:w-11/12 xl:w-11/12 mt-2">
                               <div class="vx-row">

                                <div class="vx-col sm:w-full md:w-full lg:w-5/12 xl:w-5/12">
                                    <span>{{$t('openingTime')}}</span>
                                    <input type="time" id="openingTime" step="1"  v-model="openingTime"/>

                                                <span class="text-danger">{{
                                                  errors.first("step-1.openingTime")
                                                }}</span>
                                  </div>

                                  <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-0">
                                    <feather-icon icon="ClockIcon" svgClasses="h-16 w-8"></feather-icon>
                                  </div>

                                  <div class="vx-col sm:w-full md:w-full lg:w-5/12 xl:w-5/12">
                                    <span>{{$t('closingTime')}}</span>
                                    <input type="time" id="closingTime" step="1"  v-model="closingTime"/>
                                <span class="text-danger">{{
                                  errors.first("step-1.closingTime")
                                }}</span>
                              </div>

                                 <!-- <div class="vx-col sm:w-full md:w-full lg:w-5/12 xl:w-5/12">
                                               <span>{{$t('openingTime')}}</span>
                                               <flat-pickr
                                                 :config="configdateTimePicker"
                                                 v-model="openingTime"
                                                 placeholder="Choose time"
                                                 name="openingTime"
                                                 class="w-full"
                                                 v-validate="'required'"
                                               />
                                               <span class="text-danger">{{
                                                 errors.first("step-1.openingTime")
                                               }}</span>
                                 </div>

                                 <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-2">
                                   <feather-icon icon="ClockIcon" svgClasses="h-16 w-8"></feather-icon>
                                 </div>

                                 <div class="vx-col sm:w-full md:w-full lg:w-1/2 xl:w-1/2">
                                   <span>{{$t('closingTime')}}</span>
                                   <flat-pickr
                                     :config="configdateTimePicker"
                                     v-model="closingTime"
                                     placeholder="Choose time"
                                     name="closingTime"
                                     class="w-full"
                                     v-validate="'required'"
                                   />
                               <span class="text-danger">{{
                                 errors.first("step-1.closingTime")
                               }}</span>
                             </div> -->

                           </div>
                           </div>

                         </div>

                           <div class="vx-row mt-6">
                             <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-6">
                               <img src="@/optifood/assets/img/location.png" height="20px" width="25px" alt="lire">
                             </div>
                             <div
                               class="
                                 vx-col
                                 sm:w-full
                                 md:w-full
                                 l:w-11/12
                                 xl:w-11/12
                               "
                             >
                               <vs-input
                                 :label="$t('address')"
                                 v-model="address"
                                 class="w-full"
                                 name="address"
                                 v-validate="'required'"
                               />
                               <span class="text-danger">{{
                                 errors.first("step-1.address")
                               }}</span>
                             </div>
                           </div>


                           <div class="vx-row mt-5">
                             <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-6"></div>
                             <div class="vx-col sm:w-full md:w-full lg:w-11/12 xl:w-11/12 mt-6">
                             <div class="vx-row">
                             <div
                               class="
                                 vx-col
                                 sm:w-full
                                 md:w-full
                                 l:w-5/12
                                 xl:w-5/12
                               "
                             >
                               <vs-input
                                 :label="$t('cityName')"
                                 v-model="cityName"
                                 class="w-full"
                                 name="cityName"
                                 v-validate="'required'"
                               />
                               <span class="text-danger">{{
                                 errors.first("step-1.cityName")
                               }}</span>
                             </div>
                             <div
                               class="
                                 vx-col
                                 sm:w-full
                                 md:w-full
                                 l:w-1/12
                                 xl:w-1/12
                               "
                             >
                             </div>
                             <div
                               class="
                                 vx-col
                                 sm:w-full
                                 md:w-full
                                 l:w-1/2
                                 xl:w-1/2
                               "
                             >
                               <vs-input
                                 :label="$t('postalCode')"
                                 v-model="postalCode"
                                 class="w-full"
                                 name="postalCode"
                                 v-validate="'required'"
                                 data-vv-validate-on="blur"
                               />
                               <span class="text-danger">{{
                                 errors.first("step-1.postalCode")
                               }}</span>
                             </div>
                           </div>
                             </div>
                           </div>
                           <div class="vx-row mt-2">
                             <div class="vx-col sm:w-full md:w-full lg:w-1/12 xl:w-1/12 mt-6"></div>
                             <div
                               class="
                                 vx-col
                                 sm:w-full
                                 md:w-full
                                 l:w-11/12
                                 xl:w-11/12
                               "
                             >
                               <vs-input
                                 :label="$t('websiteLink')"
                                 v-model="websiteLink"
                                 class="w-full"
                                 name="websiteLink"
                                 data-vv-validate-on="blur"
                                 @keyup="space"
                               />
                               <span class="text-danger">{{
                                 errors.first("step-1.websiteLink")
                               }}</span>
                             </div>
                           </div>
                         </div>
                         </div>

                     </form>
                   </tab-content>

                   <!-- tab 2 content -->
                   <tab-content
                     :title="$t('contactInformation')"
                     class="mb-5"
                     :before-change="validateStep2"
                   >
                     <form data-vv-scope="step-2">
                       <div class="vx-row mt-2">
                       <div class="vx-col sm:w-full md:w-full lg:w-full xl:w-full">
                       <div class="vx-row mt-2">
                         <div  class="vx-col w-12 mt-6">
                           <img height="20px" width="25px" src="@/optifood/assets/img/user-login.png" alt="">
                         </div>
                         <div
                           class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5"
                         >
                           <vs-input
                             :label="$t('name')"
                             disabled="disabled"
                             v-model="name"
                             class="w-full"
                             name="name"
                             v-validate="'required'"
                             data-vv-validate-on="blur"
                           />
                           <span class="text-danger">{{
                             errors.first("step-2.name")
                           }}</span>
                         </div>
                         <div  class="vx-col w-12 mt-6">
                           <img height="20px" width="25px" src="@/optifood/assets/img/user-login.png" alt="">
                         </div>
                         <div
                         class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5"
                         >
                           <vs-input
                             disabled="disabled"
                             :label="$t('firstName')"
                             v-model="firstName"
                             class="w-full"
                             name="firstName"
                             v-validate="'required'"
                             data-vv-validate-on="blur"
                           />
                           <span class="text-danger">{{
                             errors.first("step-2.firstName")
                           }}</span>
                       </div>
                       </div>
                       <div class="vx-row mt-2">
                         <div  class="vx-col w-12 mt-8">
                           <img height="20px" width="25px" src="@/optifood/assets/img/email.png" alt="">
                         </div>
                         <div
                         class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5"
                         >
                           <vs-input
                             disabled="disabled"
                             :label="$t('email')"
                             v-model="email"
                             class="w-full"
                             name="email"
                             v-validate="'required'"
                             data-vv-validate-on="blur"
                           />
                           <span class="text-danger">{{
                             errors.first("step-2.email")
                           }}</span>
                         </div>

                          <div class="vx-col w-12 mt-8">
                             <img height="20px" width="25px" src="@/optifood/assets/img/phone-call.png" alt="">
                         </div>
                         <div
                         class="vx-col sm:w-full md:w-full l:w-2/5 xl:w-2/5"
                         >
                           <vs-input
                             disabled="disabled"
                             :label="$t('phoneNumber')"
                             v-model="phoneNumber"
                             class="w-full"
                             name="phoneNumber"
                             v-validate="'required'"
                             data-vv-validate-on="blur"
                           />
                           <span class="text-danger">{{
                             errors.first("step-2.phoneNumber")
                           }}</span>
                         </div>
                         </div>
                         </div>
                       </div>
                     </form>
                   </tab-content>
                   <loading
                     :active.sync="isLoading"
                     :can-cancel="true"
                   ></loading>
                   <!-- tab 3 content -->
                   <tab-content
                     v-if="!register && !error"
                     :title="$t('Summary')"
                     class="mb-5"
                     :before-change="validateStep3"
                   >
                     <form data-vv-scope="step-3">
                       <div class="vx-row">
                         <div  class="vx-col sm:w-full md:w-full l:w-1/3 xl:w-1/3 mt-32">
                          <vs-avatar
                               v-if="image!=''"
                               size="150px"
                               :src="image"
                               class="ml-16"
                             />
                           <vs-avatar
                               v-else-if="(logo!=null || logo!='')"
                               size="150px"
                               :src="(`${$domain}/logos/${logo}`)"
                               class="ml-16"
                             />
                             <img v-else width="150px" src="@/optifood/assets/img/picture.png"
                                 class="d-flex border-radius-md ml-16" alt="avatar">
                         </div>
                       <div  class="vx-col sm:w-full md:w-full l:w-2/3 xl:w-2/3 mt-6">
                       <vx-card title class="mt-base">
                         <b>
                           <vs-row type="flex">
                             <vs-col vs-type="flex" vs-w="6" vs-order="3">
                               <h3>
                                 <strong>{{
                                   $t("restaurantInformation")
                                 }}</strong>
                               </h3>
                             </vs-col>
                             <vs-col vs-type="flex" vs-w="6" vs-order="3">
                               <h3>
                                 <strong>{{
                                   $t("contactInformation")
                                 }}</strong>
                               </h3>
                             </vs-col>
                           </vs-row>
                         </b>
                         <vs-row vs-type="flex">
                           <vs-col type="flex" vs-w="6" vs-order="3">
                             <div class="mt-5">
                               <h6>
                                 <b>{{ $t("restaurantName") }}</b>
                               </h6>
                               <p>{{ restaurantName }}</p>

                               <h6>
                                 <b>{{ $t("address") }}</b>
                               </h6>
                               <p>{{ address }}</p>
                               <h6>
                                 <b>{{ $t("cityName") }}</b>
                               </h6>
                               <p>{{ cityName }}</p>
                               <h6>
                                 <b>{{ $t("postalCode") }}</b>
                               </h6>
                               <p>{{ postalCode }}</p>
                               <h6>
                                 <b>{{ $t("websiteLink") }}</b>
                               </h6>
                               <p>{{ websiteLink }}</p>
                             </div>
                           </vs-col>

                           <vs-col vs-type="flex" vs-w="6" vs-order="3">
                             <div class="mt-8">
                               <h6>{{ $t("Name") }}</h6>
                               <p>{{ name }} {{ firstName }}</p>

                               <h6>{{ $t("phoneNumber") }}</h6>
                               <p>{{ phoneNumber }}</p>
                               <h6>{{ $t("Email") }}</h6>
                               <p>{{ email }}</p>
                             </div>
                           </vs-col>
                         </vs-row>
                       </vx-card>
                         </div>
                       </div>
                     </form>
                   </tab-content>

                   <tab-content
                     v-if="error == true"
                     title="Summary"
                     class="mb-5"
                     icon="feather icon-image"
                     :before-change="validateStep3"
                   >
                     <form data-vv-scope="step-3">
                       <vx-card
                         id="success"
                         title="You have not registered due to some reason"
                         class="mt-base"
                       >
                         <vs-row vs-type="flex">
                           <vs-col type="flex" vs-w="10" vs-order="3">
                             <div class="mt-5" color="red">
                               <h5>Please check:</h5>
                               <h6>your connection</h6>
                               <h6>all fields are filled</h6>
                             </div>
                             <div class="mt-5"></div>
                           </vs-col>
                         </vs-row>
                       </vx-card>
                     </form>
                   </tab-content>
                 </form-wizard>
               </div>
             </div>
           </div>
         </div>
       </div>
     </vx-card>
   </div>
 </div>
</template>

<script>
import VSelect from "vue-select";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import router from "@/router";
import "@/assets/css/iconfont.css";
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export const emailAddress = "";
import { Validator } from "vee-validate";
const dict = {
 custom: {
   firstName: {
     required: "Please enter first name",
   },
   name: {
     required: "Please enter name",
   },
   email: {
     required: "Please enter email",
   },
   phoneNumber: {
     required: "Please enter phone number",
   },
   restaurantName: {
     required: "Please enter restaurant name",
   },
   openingTime: {
     required: "Please enter opening time",
   },
   closingTime: {
     required: "Please enter closing time",
   },
   address: {
     required: "Please enter address",
   },
   cityName: {
     required: "Please enter city name",
   },
   postalCode: {
     required: "Please enter postal code",
   },
   websiteLink: {
     required: "Please enter website link",
   },
 },
};

// register custom messages
Validator.localize("en", dict);
export default {
 data() {
   return {
     companyId: "",
     logoSelected: false,
     isLoading:false,
     firstName: "",
     name: "",
     email: "",
     phoneNumber: "",
     restaurantName: "",
     address: "",
     cityName: "",
     postalCode: "",
     websiteLink: "",
     openingTime: null,
     closingTime: null,
     checkPassword: "",
     contactId: "",
     contacts: [],
     register: false,
     responseStatus: false,
     error: false,
     checkEmail: "",
     isLoading: false,
     logo: "",
     image: "",
     restaurantId: this.$route.params.id,
     configdateTimePicker: {
       enableTime: true,
       enableSeconds: true,
       noCalendar: true,
     },
     disabled: true,
   };
 },

 methods: {

   onSelectText() {
     const logo = this.$refs.logo.files[0];
     this.logo = logo;
     var textImage = new Image();
     var reader = new FileReader();
     var vm = this;

     reader.onload = e => {
       vm.textImage = e.target.result;
     };
     reader.readAsDataURL(logo);
   },
   onSelect(e) {
     const file = e.target.files[0];;
     this.logo = file;
     var image = new Image();
     var reader = new FileReader();
     var vm = this;

     reader.onload = e => {
       vm.image = e.target.result;
     };
     reader.readAsDataURL(file);
   },
   cancel() {
     this.$refs.file.value = null;
     this.image = "";
   },
   cancelText() {
     this.$refs.logo.value = null;
     this.textImage = "";
   },

   uploadLogo(){
     const formData = new FormData();
     formData.append("restaurantId", this.restaurantId);
     formData.append("logo", this.logo);
     this.$http.post(`/api/restaurant/upload-logo`, formData).then(response => {
         this.$router.push({ path: "/pages/view-restaurant" });
       }).catch((error) => {
         this.$router.push({ path: "/pages/view-restaurant" });
         this.isLoading = false;
         this.checkEmail = "Server error";
       });
   },

   simpleSuggestionList() {
     return ["Vue.js", "React.js", "Angular.js"];
   },
   updateLocale(locale) {
     this.$i18n.locale = locale;
   },
   space() {
     let temp = this.mobilePhone;
     if (this.mobilePhone.length < 2 && this.mobilePhone != " ") {
       this.mobilePhone = " " + temp;
     }
     if (this.mobilePhone == "")
       this.validateMobilePhone = "Mobile phone is required";
     else this.validateMobilePhone = "";
     if (this.mobilePhone.length > 10) {
       this.mobilePhone = this.mobilePhone.substring(
         0,
         this.mobilePhone.length - 1
       );
     }
   },
   convertToUpperCase: function () {
     this.licenceNumber = this.licenceNumber.toUpperCase();
     this.tinNumber = this.tinNumber.toUpperCase();
   },
   passwordConfirm: function () {
     if (this.password != this.confirmPassword) {
       this.checkPassword = "Password mismatch";
     } else {
       this.checkPassword = "";
     }
   },
   checkEmailIfNotExist: function () {
     this.isLoading = true;
     this.$http
       .get("accounts/checkemail/" + this.email)
       .then((response) => {
         this.isLoading = false;
         if (response.data == "Email exists") {
           this.checkEmail = "This email already Exists";
         } else this.checkEmail = "";
       })
       .catch((error) => {
         this.isLoading = false;
         this.checkEmail = "Server error";
       });
   },
   validateStep1() {
     return new Promise((resolve, reject) => {
       this.$validator.validateAll("step-1").then((result) => {
         if (result) {
           resolve(true);
         }
       });
     });
   },
   validateStep2() {
     this.register = false;
     this.error = false;
     return new Promise((resolve, reject) => {
       this.$validator.validateAll("step-2").then((result) => {
         if (result) {
           resolve(true);
         } else {
           reject("correct all values");
         }
       });
     });
   },
   validateStep3() {
     if (this.contactId != "") this.updateRestaurant();
     else this.addContact();
   },

   addContact() {
     this.isLoading = true;
     this.$http
       .post("/api/contact", {
         firstName: this.firstName,
         name: this.name,
         phoneNumber: this.phoneNumber,
         email: this.email,
       })
       .then((response) => {
         this.updateRestaurant();
       })
       .catch((error) => {
         this.isLoading = false;
         this.$vs.notify({
           title: this.$t("Add"),
           text: this.$t("notRegistered"),
           iconPack: "feather",
           icon: "icon-alert-circle",
           color: "warnning",
           time: 6000,
         });
       });
   },

   updateRestaurant() {
     this.isLoading = true;
     this.$http
       .put("/api/restaurant/"+this.restaurantId, {
         restaurantName: this.restaurantName,
         address: this.address,
         cityName: this.cityName,
         postalCode: this.postalCode,
         websiteLink: this.websiteLink,
         openingTime: this.openingTime,
         closingTime: this.closingTime,
         contactId: this.contactId,
         companyId: this.companyId,
       })
       .then((response) => {
         this.isLoading = false;
         this.$vs.notify({
           title: this.$t("Add"),
           text: this.$t("Registered Successfully!"),
           iconPack: "feather",
           icon: "icon-alert-circle",
           color: "success",
           time: 6000,
         });
         this.restaurantId=response.data.restaurantId
         this.uploadLogo();
       })
       .catch((error) => {
         this.isLoading = false;
         this.$vs.notify({
           title: this.$t("Add"),
           text: this.$t("notRegistered"),
           iconPack: "feather",
           icon: "icon-alert-circle",
           color: "warnning",
           time: 6000,
         });
       });
   },

   searchContact() {
     this.$http
       .get("/api/contact", {
         params: {
           searchKey: this.searchKey,
         },
       })
       .then((response) => {
         this.contacts = response.data;
       });
   },

   fetchRestaurant() {
     this.$http
       .get("/api/restaurant/"+this.restaurantId)
       .then((response) => {
         this.restaurantName= response.data.restaurantName,
         this.address= response.data.address,
         this.cityName= response.data.cityName,
         this.postalCode= response.data.postalCode,
         this.websiteLink= response.data.websiteLink,
         this.openingTime= response.data.openingTime,
         this.closingTime= response.data.closingTime,
         this.contactId= response.data.contactId,
         this.companyId= response.data.companyId,
         this.logo = response.data.logo
         this.fetchContact()
       });
   },

   fetchContact() {
     this.$http
       .get("/api/contact/"+this.contactId)
       .then((response) => {
           this.firstName=response.data.firstName,
           this.name=response.data.name,
           this.phoneNumber=response.data.phoneNumber,
           this.email=response.data.email
       });
   },
 },
 created() {
  this.fetchRestaurant();
 },
 components: {
   FormWizard,
   TabContent,
   "v-select": VSelect,
   Loading,
   flatPickr,
 },
 computed: {
   isNew() {
     this.confirmedEmail = this.$store.state.confirm.email;
     if (this.$store.state.confirm.email != "") {
       this.confirmedEmail = this.$store.state.confirm.email;
       this.email = this.confirmedEmail;
       return true;
     } else return false;
   },
   validateForm() {
     return !this.errors.any() && this.email != "" && this.password != "";
   },
   getCurrentLocaleData() {
     const locale = this.$i18n.locale;
     if (locale == "en") return { flag: "us", lang: "English" };
     else if (locale == "am") return { flag: "am", lang: "Amharic" };
   },
   checkMobilePhone() {
     if (this.mobilePhone != "") this.validateMobilePhone = "";
     else this.validateMobilePhone = "";
   },
 },
};
</script>
<style  lang="scss">
@import "@/assets/scss/vuesax/extraComponents/autocomplete.scss";
#checkPassword {
 color: red;
}
#success {
 width: 550px;
 margin-left: 80px;
 background: skyblue;
 margin-top: 400px;
}
#card {
 height: 600px;
}
#mobilePhone {
 color: red;
}
</style>
