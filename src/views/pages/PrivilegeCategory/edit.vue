<template>
  <div id="main-div" class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editPrivilegeCategory')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('privilegeCategory')"
                v-model="category"
                name="privilegeCategory"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('privilegeCategory') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button v-if="isGranted('editPrivilegeCategory')" @click="editPrivilegeCategory" color="success" class="mr-3 mb-2">{{$t('update')}}</vs-button>
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
    category: {
      required: "Please enter privilege category",
      alpha: "privilege category must be character"
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
      category: '',
      registerButtonClicked: false,
      id: this.$route.params.id,
      clicked: 0,
      error: false,
      isLoading: false,
      privilegeCategoryId:this.$route.params.id,
      item: {},
    };
  },
  methods: {
    editPrivilegeCategory() {
      this.$validator.validateAll().then(result => {
       if (result) {
         this.isLoading=true
           this.$http
             .put("/api/privilege-category/"+this.privilegeCategoryId,
             {
              category: this.category,
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
               this.$router.push({ path: "/pages/view-privilege-categories" });
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
    fetchPrivilegeCategory(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/api/privilege-category/"+this.privilegeCategoryId)
        .then(function(response) {
          thisIns.isLoading=false
          thisIns.category = response.data.category;
          thisIns.total = 1;
        }).catch(error => {
            thisIns.isLoading=false
        });
    }

  },

computed: {
 },

created(){

    this.fetchPrivilegeCategory();
  }
};
</script>
<style  lang="scss" scoped>

</style>
