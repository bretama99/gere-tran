<template>
  <div id="main-div" class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editPrivilege')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
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
          <div class="vx-col sm:w-1/4 w-full mb-6">
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


            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('privilegeUrl')"
                v-model="privilegeUrl"
                name="privilegeUrl"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('privilegeUrl') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('method')"
                v-model="method"
                name="method"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('method') }}</span>
            </div>
            <div class="vx-col sm:w-full md:w-1/3 lg:w-1/3">
              <span class="inputLabel">{{  $t("privilegeCategory")  }}</span>
              <v-select v-model.trim="privilegeCategoryId" class="w-full" :options="privilegeCategories" label="category"
                :reduce="(privilegeCategory) => privilegeCategory.privilegeCategoryId" name="privilegeCategoryId" size="small"></v-select>
              <span class="text-danger" v-show="errors.has('privilegeCategoryId')">{{
                 errors.first("privilegeCategoryId")
                }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button v-if="isGranted('editPrivilege')" @click="editPrivilege" color="success" class="mr-3 mb-2">{{$t('update')}}</vs-button>
            </div>
            </div>
          </div>

          <div class="vx-row">
            <!-- <div class="vx-col w-full">
              <vs-button @click="editZone" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
      required: "Please enter privilege Name",
      alpha: "privilege name must be character"
    },
     privilegeDescription: {
      required: "Please enter Privilege Description",
      alpha: "Privilege Description must be character"
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
      privilegeName: '',
      privilegeDescription:'',
      privilegeUrl: '',
      method: "",
      registerButtonClicked: false,
      id: this.$route.params.id,
      clicked: 0,
      privilegeCategoryId:"",
      error: false,
      isLoading: false,
      privilegeId:this.$route.params.id,
      item: {},
      privilegeCategories:[]
    };
  },
  methods: {
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
    editPrivilege() {
      this.$validator.validateAll().then(result => {
       if (result) {
         this.isLoading=true
           this.$http
             .put("/api/privileges/"+this.privilegeId,
             {
                privilegeName: this.privilegeName,
                privilegeDescription: this.privilegeDescription,
                privilegeUrl: this.privilegeUrl,
                method: this.method,
                privilegeCategoryId:this.privilegeCategoryId,
                updatedBy: localStorage.getItem('userId'),
             })
             .then(response => {
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Update'),
                 text: this.$t('Updated Successfully!'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "success",
                 time:6000
               });
               this.$router.push({ path: "/pages/view-privileges" });
             }).catch(error=>{
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Update'),
                 text: this.$t('notRegistered'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "warnning",
                 time:6000
               });
             })
       }
     });

    },
    fetchPrivilege(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/privileges/"+this.privilegeId)
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.privilegeName = response.data.privilegeName;
          thisIns.privilegeDescription = response.data.privilegeDescription;
          thisIns.privilegeUrl = response.data.privilegeUrl;
          thisIns.method = response.data.method;
          this.privilegeCategoryId = response.data.privilegeCategoryId;
          thisIns.total = 1;
        }).catch(error => {
            thisIns.isLoading=false
        });
    }

  },

computed: {
   getPrivilege(){
     return this.$store.getters["PrivilegeModule/getPrivilege"];
   }
 },

created(){

  this.fetchPrivilegeCategories();
    this.fetchPrivilege();
  }
};
</script>
<style  lang="scss" scoped>

</style>
