<template>
  <div id="main-div" class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addChain')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 md:w-full lg:w-1/2 xl:w-1/2 mb-6">
              <vs-input
                class="w-full"
                :label="$t('chainName')"
                v-model="chainName"
                name="chainName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('chainName') }}</span>
            </div>
          </div>
          <div class="vx-row">
              <vs-button v-if="isGranted('addChain')" @click="editChain" color="#292929" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
    chainName: {
      required: "Please enter chain name",
    },
  }
};
Validator.localize("en", dict);
import VSelect from "vue-select";
import Loading from "vue-loading-overlay";
export default {
  components: {
    "v-select": VSelect,
    Loading
  },
  data() {
    return {
      chainName: "",
      isLoading: false,
      chainId: this.$route.params.id
    };
  },
  methods: {
    fetchChain(){
      this.$http.get("/api/chain/"+this.chainId)
             .then(response => {
              this.chainName=response.data.chainName
             }).catch(error=>{
             }) 

    },
    editChain() {
      this.$validator.validateAll().then(result => {
       if (result) {
         this.isLoading=true
           this.$http
             .put("/api/chain/"+this.chainId,
             {
              chainName: this.chainName
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
               this.$router.push({ path: "/pages/view-chain" });
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
    }
  },

  created(){
    this.fetchChain();
  }
 
};
</script>
<style  lang="scss" scoped>

</style>
