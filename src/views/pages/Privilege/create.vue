<template>
  <div id="main-div" class="vx-row">

    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addPrivilege')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-6">
              <vs-input
                class="w-full"
                :label="$t('privilegeName')"
                v-model="privilegeName"
                name="privilegeName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('privilegeName') }}</span>
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mb-6">
              <vs-input
                class="w-full"
                :label="$t('privilegeDescription')"
                v-model="privilegeDescription"
                name="privilegeDescription"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('privilegeDescription') }}</span>
            </div>
            </div>
            <div class="vx-row">
              <div class="vx-col sm:w-full md:w-full lg:w-1/3 xl:w-1/3 mb-6">
              <vs-input
                class="w-full"
                :label="$t('privilegeUrl')"
                v-model="privilegeUrl"
                name="privilegeUrl"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('privilegeUrl') }}</span>
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/3 xl:w-1/3 mb-6">
              <vs-input
                class="w-full"
                :label="$t('method')"
                v-model="method"
                name="method"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('method') }}</span>
            </div>
              <!-- <div class="vx-col sm:w-full md:w-1/3 lg:w-1/3">
              <span class="inputLabel">{{  $t("privilegeCategory")  }}</span>
              <v-select v-model.trim="privilegeCategoryId" class="w-full" :options="privilegeCategories" label="category"
                :reduce="(privilegeCategory) => privilegeCategory.privilegeCategoryId" name="privilegeCategoryId" size="small"></v-select>
              <span class="text-danger" v-show="errors.has('privilegeCategoryId')">{{
                 errors.first("privilegeCategoryId")
                }}</span>
            </div> -->
            </div>
            <div class="vx-row">
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button v-if="isGranted('addPrivilege')" @click="addPrivilege" color="#292929" class="mr-3 mb-2">{{$t('save')}}</vs-button>
            </div>
            </div>
          </div>

          <div class="vx-row">
            <!-- <div class="vx-col w-full">
              <vs-button @click="addZone" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
            </div> -->
          </div>
          <div v-if="registerButtonClicked==true&&!error" class="loader-overlay">
            <div class="loader"></div>
            <span class="text" v-html="text"></span>
          </div>
        </vx-card>
      </vx-card>
    </div>
  </div>
</template>


<script>
import router from "@/router.js";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    privilegeName: {
      required: "Please enter privilege name",
      alpha: "privilege name must be character"
    },
    privilegeDescription:{
      required: "Please enter privilege description",
      alpha: "privilege description must be character"
    }
  }
};
Validator.localize("en", dict);
import VSelect from "vue-select";
// import flatPickr from "vue-flatpickr-component";
// import "flatpickr/dist/flatpickr.css";
import Loading from "vue-loading-overlay";
export default {
  components: {
    "v-select": VSelect,
    Loading
  },
  data() {
    return {

      privilegeName: "",
      privilegeDescription:"",
      privilegeUrl:"",
      method:"",
      privilegeCategoryId:this.$route.params.id,
      registerButtonClicked: false,
      clicked: 0,
      error: false,
      genders: ["Male", "Female"],
      isLoading: false,
      privilegeCategories:[]
    };
  },
  methods: {
    resetValues(){
      this.privilegeName= "";
      this.privilegeUrl="";
      this.method="";
      this.privilegeCategoryId="";
      this.registerButtonClicked= false;
      this.clicked= 0;
      this.error= false;
      this.isLoading= false;

    },

    addPrivilege() {
      this.$validator.validateAll().then(result => {
       if (result) {
         this.isLoading=true
           this.$http
             .post("/api/privileges",
             {
                privilegeName: this.privilegeName,
                privilegeDescription:this.privilegeDescription,
                privilegeUrl:this.privilegeUrl,
                method:this.method,
                privilegeCategoryId:this.$route.params.id,
                createdBy: localStorage.getItem('userId')
             })
             .then(response => {
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Add'),
                 text: this.$t('Registered Successfully!'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "success",
                 time:6000
               });
               this.$router.push({ path: "/pages/view-privileges" });
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
       }
     });
      // }
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

  },
  created() {
    this.fetchPrivilegeCategories();
  },
};
</script>
<style  lang="scss" scoped>

#checkPassword {
  color: red;
}
#phoneNumber {
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
