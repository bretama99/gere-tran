<template>
  <div class="register h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card id="card">
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
            <div class="vx-col sm:w-full md:w-full mx-auto self-center d-theme-dark-bg">
              <div class="p-8">
                <p>
                  <b>{{$t('userRegistration')}}</b>
                  <span class="float-right">
                    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer mr-4">
          <span class="cursor-pointer flex i18n-locale">
            <img
              class="h-4 w-5"
              :src="require(`@/assets/images/flags/${$i18n.locale}.png`)"
              :alt="$i18n.locale"
            />
            <span class="hidden sm:block ml-2">{{ getCurrentLocaleData.lang }}</span>
          </span>
          <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
            <vs-dropdown-item @click="updateLocale('en')">
              <img class="h-4 w-5 mr-1" src="@/assets/images/flags/en.png" alt="en" /> &nbsp;English
            </vs-dropdown-item>
            <vs-dropdown-item @click="updateLocale('am')">
              <img class="h-4 w-5 mr-1" src="@/assets/images/flags/am.png" alt="am" /> &nbsp;Amharic
            </vs-dropdown-item>
          </vs-dropdown-menu> 
        </vs-dropdown>
                    <b>
                      <router-link to="/pages/login">{{$t('Login')}}</router-link>
                    </b>
                    
                  </span>
                </p>
                <div v-if="!register" class="mt-5">
                  <form-wizard
                    color="rgba(var(--vs-primary), 1)"
                    errorColor="rgba(var(--vs-danger), 1)"
                    :title="null"
                    :subtitle="null"
                    :finishButtonText="$t('Register')"
                    buttons-hidden
                    :nextButtonText="$t('Next')"
                    :backButtonText="$t('Back')"
                  >
                    <tab-content
                      :title="$t('restaurantInformation')"
                      class="mb-5"
                      icon="feather icon-user"
                      :before-change="validateStep1"
                    >
                      <form data-vv-scope="step-1">
                        <div class="vx-row">
                          <div class="vx-col md:w-1/4 w-full mt-5">
                            <vs-input
                              :label="$t('restaurantName')"
                              v-model="restaurantName"
                              class="w-full"
                              name="restaurantName"
                              v-validate="'required|alpha'"
                            />
                            <span
                              @change="errors.has('step-1.restaurantName')"
                              class="text-danger"
                            >{{ errors.first('step-1.restaurantName') }}</span>
                          </div>
                          <div class="vx-col md:w-1/4 w-full mt-5">
                            <vs-input
                              :label="$t('openingTime')"
                              v-model="openingTime"
                              class="w-full"
                              name="openingTime"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{ errors.first('step-1.openingTime') }}</span>
                          </div>
                          <div class="vx-col md:w-1/4 w-full mt-5">
                            <vs-input
                              :label="$t('closingTime')"
                              v-model="closingTime"
                              class="w-full"
                              name="closingTime"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{ errors.first('step-1.closingTime') }}</span>
                          </div>
                          <div class="vx-col md:w-1/4 w-full mt-5">
                            <vs-input
                              :label="$t('address')"
                              v-model="address"
                              class="w-full"
                              name="address"
                              v-validate="'required|alpha'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{ errors.first('step-1.address') }}</span>
                          </div>
                          <div class="vx-col md:w-1/4 w-full mt-5">
                            <vs-input
                            :label="$t('postalCode')"
                              v-model="postalCode"
                              class="w-full"
                              name="postalCode"
                              v-validate="'required|alpha'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{ errors.first('step-1.postalCode') }}</span>
                          </div>
                          <div class="vx-col md:w-1/4 w-full mt-5">
                            <vs-input
                               :label="$t('websiteLink')"
                              v-model="websiteLink"
                              class="w-full"
                              name="websiteLink"
                              data-vv-validate-on="blur"
                              @keyup="space"
                            />
                            <span class="text-danger">{{ errors.first('step-1.websiteLink') }}</span>
                          </div>                          
                        </div>
                      </form>
                    </tab-content>

                    <!-- tab 2 content -->
                    <tab-content
                      :title="$t('contactInformation')"
                      class="mb-5"
                      icon="feather icon-briefcase"
                      :before-change="validateStep2"
                    >
                      <form data-vv-scope="step-2">
                        <div class="vx-row">
                          <div class="vx-col md:w-1/3 w-full">
                            <vs-input
                              :label="$t('name')"
                              v-model="name"
                              class="w-full mt-4"
                              name="name"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{ errors.first('step-2.name') }}</span>
                          </div>
                          <div class="vx-col md:w-1/4 w-full">
                            <vs-input
                            :label="$t('firstName')"
                              v-model="firstName"
                              class="w-full mt-4"
                              name="firstName"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{ errors.first('step-2.firstName') }}</span>
                          </div>

                          <div class="vx-col md:w-1/4 w-full">
                            <vs-input
                            :label="$t('email')"
                              v-model="email"
                              class="w-full mt-4"
                              name="email"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{ errors.first('step-2.email') }}</span>
                          </div>

                          <div class="vx-col md:w-1/4 w-full">
                            <vs-input
                            :label="$t('phoneNumber')"
                              v-model="phoneNumber"
                              class="w-full mt-4"
                              name="phoneNumber"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{ errors.first('step-2.phoneNumber') }}</span>
                          </div>
                        </div>
                      </form>
                    </tab-content>
                      <loading :active.sync="isLoading" :can-cancel="true"></loading>
                    <!-- tab 3 content -->
                    <tab-content
                      v-if="!register&&!error"
                      :title="$t('Summary')"
                      class="mb-5"
                      icon="feather icon-image"
                      :before-change="validateStep3"
                    >
                      <form data-vv-scope="step-3">
                        <vx-card title class="mt-base">
                          <b>
                            <vs-row type="flex">
                              <vs-col vs-type="flex" vs-w="6" vs-order="3">
                                <h3>
                                  <strong>{{$t('restaurantInformation')}}</strong>
                                </h3>
                              </vs-col>
                              <vs-col vs-type="flex" vs-w="6" vs-order="3">
                                <h3>
                                  <strong>{{$t('contactInformation')}}</strong>
                                </h3>
                              </vs-col>
                            </vs-row>
                          </b>
                          <vs-row vs-type="flex">
                            <vs-col type="flex" vs-w="6" vs-order="3">
                              <div class="mt-5">
                                <h6>
                                  <b>{{$t('restaurantName')}}</b>
                                </h6>
                                <p>{{companyName}}</p>

                                <h6>
                                  <b>{{$t('address')}}</b>
                                </h6>
                                <p>{{address}}</p>
                                <h6>
                                  <b>{{$t('cityName')}}</b>
                                </h6>
                                <p>{{cityName}}</p>
                                <h6>
                                  <b>{{$t('postalCode')}}</b>
                                </h6>
                                <p>{{postalCode}}</p>
                                <h6>
                                  <b>{{$t('websiteLink')}}</b>
                                </h6>
                                
                              </div>
                              <div class="mt-5"></div>
                            </vs-col>

                            <vs-col vs-type="flex" vs-w="6" vs-order="3">
                              <div class="mt-8">
                                <p>{{websiteLink}}</p>
                                <h6>{{$t('Name')}}</h6>
                                <p>{{name}} {{firstName}}</p>

                                <h6>{{$t('phoneNumber')}}</h6>
                                <p>{{mobilePhone}}</p>
                                <h6>{{$t('Email')}}</h6>
                                <p>{{email}}</p>
                              </div>
                            </vs-col>
                          </vs-row>
                        </vx-card>
                      </form>
                    </tab-content>
                     
                    <tab-content
                      v-if="error==true"
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

export const emailAddress = "";
// For custom error message
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
      required: "Please enter phone number"
    },
    restaurantName: {
      required: "Please enter restaurant name"
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
  }
};

// register custom messages
Validator.localize("en", dict);

export default {
  data() {
    return {
      firstName: "",
      name: "",
      email: "",
      phoneNumber: "",
      restaurantName: "",
      address: "",
      cityName: "",
      postalCode: "",
      websiteLink: "",    
      checkPassword: "",
      register: false,
      responseStatus: false,
      error: false,
      checkEmail: "",
      comingData: "",
      validateMobilePhone:"",
      registerButtonClicked:false,
      clicked:0,
      isLoading: false
    };
  },
  methods: {
    updateLocale(locale) {
      this.$i18n.locale = locale;
    },
    space(){
      let temp=this.mobilePhone;
    if(this.mobilePhone.length<2 && this.mobilePhone!=" "){
      this.mobilePhone=" "+temp;
    }
    if(this.mobilePhone=="") this.validateMobilePhone="Mobile phone is required";
      else this.validateMobilePhone="";
    if(this.mobilePhone.length>10){
      this.mobilePhone=this.mobilePhone.substring(0, this.mobilePhone.length - 1);
    }  
    },
    convertToUpperCase: function() {
      this.licenceNumber = this.licenceNumber.toUpperCase();
      this.tinNumber = this.tinNumber.toUpperCase();
    },
    passwordConfirm: function() {
      if (this.password != this.confirmPassword) {
        this.checkPassword = "Password mismatch";
      } else {
        this.checkPassword = "";
      }
    },
    checkEmailIfNotExist: function() {
      this.isLoading=true
      this.$http.get("accounts/checkemail/" + this.email).then(response => {
        this.isLoading=false
        if (response.data == "Email exists") {
          this.checkEmail = "This email already Exists";
        } else this.checkEmail = "";
      }).catch(error=>{
        this.isLoading=false
        this.checkEmail="Server error";
      })
    },
    validateStep1() {
        return new Promise((resolve, reject) => {
          this.$validator.validateAll("step-1").then(result => {
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
        this.$validator.validateAll("step-2").then(result => {
          if (result) {
            resolve(true);
          } else {
            reject("correct all values");
          }
        });
      });
    },
    validateStep3() {
      this.isLoading=true
      this.$http
        .post("/auth/signup", {
          firstName: this.firstName,
          lastName: this.lastName,
          grandFatherName: this.grandFatherName,
          mobilePhone: "+251"+this.mobilePhone.substr(1),
          userType: "Customer",
          userStatus: "Active",
          email: this.email,
          password: this.password,
          companyId: "-1",
          companyName: this.companyName,
          licenceNumber: this.licenceNumber,
          tinNumber: this.tinNumber,
          companyStatus: "Active",
          regionId: this.regionId,
          woredaCity: this.woredaCity,
          street: this.street
        })
        .then(response => {
          this.isLoading=false
          this.clicked=1;
          this.error = false;
          this.$store.state.confirm.email = this.email;
          this.$router.push({ path: "/pages/login" });
          // this.register = true;
          // responseStatus = true;
          return new Promise((resolve, reject) => {
            this.$validator.validateAll("step-3").then(result => {
              if (result) {
                resolve(true);
              } else {
                reject("correct all values");
              }
            });
          });
        })
        .catch(error => {
          this.isLoading=false
          if(this.clicked==0){
          this.error = true;
          this.registerButtonClicked=false;
          }
        });
    },
  },
  created(){

  },
  components: {
    FormWizard,
    TabContent,
    'v-select':VSelect,
    Loading
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
  checkMobilePhone(){
      if(this.mobilePhone!="") this.validateMobilePhone="";
      else this.validateMobilePhone="";
  }
  },

};
</script>
<style  lang="scss">
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
#mobilePhone{
  color: red;
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
