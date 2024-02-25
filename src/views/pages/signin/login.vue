
<template>
  <div
    :style="{'background-image': 'url(' + require('@/optifood/assets/img/bg-smart-home-1.jpg')}"
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    
    <div class="vx-col sm:w-2/5 md:w-2/5 lg:w-1/6 xl:w-1/3 items-center justify-center">
      <vx-card class="grid-view-item mb-base overflow-hidden px-1">
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">            
            <div class="vx-col sm:w-full md:w-full lg:w-full xl:w-full d-theme-dark-bg">
              <div class="p-8">
                
                <div  class="vx-row mt-2 ml-6">

                  <div class="justify-center mb-4 vx-col sm:w-1/4" >
                  <!-- <img width="150" src="@/optifood/assets/img/tacos-logo.png" alt=""> -->
                </div>  
                <div class="justify-center mb-4" >
                  <img width="150" src="@/optifood/assets/img/tacos-logo.png" alt="">
                </div> 
                </div>
     
             
                <vs-input
                  v-validate="'required|email'"
                  data-vv-validate-on="blur"
                  name="email" 
                  color="dark" 
                  icon-before="true" 
                  icon="email" 
                  :label-placeholder="$t('Email')"
                  v-model="email"
                  class="w-full no-icon-border"
                />
                <span class="text-danger text-sm">{{ errors.first('email') }}</span>

                <vs-input
                  data-vv-validate-on="blur"
                  v-validate="'required'"
                  type="password"
                  name="password"
                  color="dark" 
                  icon-before="true" 
                  icon="lock"
                  :label-placeholder="$t('Password')"
                  v-model="password"
                  class="w-full mt-6 no-icon-border"
                  @keyup.enter="login"
                />
                <span class="text-danger text-sm">{{ errors.first('password') }}</span>
                <div class="vx-row mt-8 ml-2">

                  <div class="mr-8 vx-col sm:w-1/2 w-full mb-6">
                    <vs-button color="#292929" @click="registerUser">{{$t('Register')}}</vs-button>

                  </div>

                  <!-- <div class="ml-12 justify-right">

                  </div> -->
                  <div class="ml-12 justify-right">
                    <vs-button color="#292929" @click="login">{{$t('Login')}}</vs-button>

                  </div>
                </div>
                <div class="vx-row justify-center mt-2">
                  <router-link to="/pages/forgot-password"><span style="color: #292929">{{$t('Forgot Password?')}}</span></router-link>
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
import router from "@/router";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    email: {
      required: "Please enter email",
    },
    password: {
      required: "Please enter password",
    },
  }
};
Validator.localize("en", dict);
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmedEmail: "",
      verificationtoken: "",
      popupActive: false,
      logedin: false
    };
  },
  methods: {
    resend() {
      this.$http.post("/verify/resend/" + this.email).then(function(response) {
        this.$vs.notify({
          title: this.$t("Resend"),
          text: this.$t("Verification token sent agian"),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "success"
        });
      });
    },
    
    updateLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    },
   
    login() {

      // var userType
      // if(result.data.userType=='SuperAdmin'){
                        router.push('/pages/register-restaurant');
                    // }
                    // if(result.data.userType=='Admin'){
                    //     router.push('/pages/view-user');
                    // }
      // this.$validator.validateAll().then(result => {
      //   if (result) {
      //     if (localStorage.getItem('accessToken') != null && localStorage.getItem('userId') != '') {
      //         payload.notify({
      //           title: 'Login Attempt',
      //           text: 'You are already logged in!',
      //           iconPack: 'feather',
      //           icon: 'icon-alert-circle',
      //           color: 'warning'
      //       });

      //       return false
      //   }


      //   this.$http.post('/api/user/login', {
      //       "email": this.email,
      //       "password": this.password
      //   })
      //       .then((result) => {
      //           if (result.data.accessToken != null && result.data.userId != '') {
      //               localStorage.setItem('accessToken', result.data.accessToken);
      //               localStorage.setItem('userId', result.data.userId);
      //               localStorage.setItem('userStatus', result.data.userStatus);
      //               localStorage.setItem('userType',result.data.userType);
      //               if(result.data.userType=='SuperAdmin'){
      //                   router.push('/pages/register-restaurant');
      //               }
      //               if(result.data.userType=='Admin'){
      //                   router.push('/pages/view-user');
      //               }
      //               else{
      //                   payload.notify({
      //                   time: 2500,
      //                   title: 'Login Failed',
      //                   text: "Verify your email first",
      //                   iconPack: 'feather',
      //                   icon: 'icon-alert-circle',
      //                   color: 'danger'
                      
      //               });
      //               localStorage.removeItem('accessToken');
      //               localStorage.removeItem('userId');
      //               localStorage.removeItem('userType');
      //               localStorage.removeItem('userStatus');
      //               router.push('/pages/login');
      //               }
      //           }


      //       }, (err) => {
      //           if(err=="Error: Network Error" || err=="Error: Request failed with status code 404"){
      //               payload.notify({
      //                   time: 2500,
      //                   title: 'Login Failed',
      //                   text: "Check your connection",
      //                   iconPack: 'feather',
      //                   icon: 'icon-alert-circle',
      //                   color: 'danger'
      //               });
      //           }
                
      //       else{
      //           payload.notify({
      //               time: 2500,
      //               title: 'Login Failed',
      //               text: "Incorrect Password or Email",
      //               iconPack: 'feather',
      //               icon: 'icon-alert-circle',
      //               color: 'danger'
      //           });
      //       } 
      //       })
      //   }
      // });
    },

  registerUser() {
    this.$router.push("/pages/register");
  }
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.email != "" && this.password != "";
    },
    getCurrentLocaleData() {
      if (localStorage.getItem("locale") == null) {
        const locale = this.$i18n.locale;
        if (locale == "en") return { flag: "us", lang: "English" };
        else if (locale == "am") return { flag: "am", lang: "Amharic" };
      } else {
        const locale = localStorage.getItem("locale");
        if (locale == "en") return { flag: "us", lang: "English" };
        else if (locale == "am") return { flag: "am", lang: "Amharic" };
      }
    },

  checkIfAlreadyLogedIn(){
    if (this.$router.query.email != "") this.email = this.$router.query.email;
    if (
      localStorage.getItem("userId") != null &&
      localStorage.getItem("accessToken") != null
    ) {
      this.$vs.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "warning"
      });
      router.push("/pages/eCommerce/shop");
    }
  }
  },
  created() {
    this.checkIfAlreadyLogedIn();
  }
};
</script>

<style lang="scss">

#icon{
  color: red
}

</style>
