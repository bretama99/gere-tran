<template>
 <vx-card :title="$t('restaurantList')+' | '+ chain.chainName">
   <vx-card id="internal-card" title no-shadow card-border>
    <div v-if="!isCategory" class="vx-row mt-8 ml-8 ">                  <span class="mr-1 mt-1" v-if="isGranted('setRolePermission')">
                    <!-- <vs-switch color="success" @click="allowAllPermissions()" v-model="assignAllPermissions" /> -->
                    <label class="form-checkbox">
                            <input type="checkbox"  @click="allowAllRestaurants()"
                               v-model="assignAllRestaurants">
                            <i class="form-icon"></i>
                          </label>
                  </span><h4><strong>{{$t('allowAll')}}</strong></h4></div>
    <div class="vx-row mt-2">
      <div class="vx-col sm:w-full md:w-full lg:w-1/5 xl:w-1/5" :key="indextr" v-for="(tr, indextr) in restaurants" style="border: 0px solid;
          padding: 8px;
          box-shadow: 0px 0px 1px #8B6E6E;">

  <span class="mr-1">
                    <label class="form-checkbox" >
                            <input :value="tr.restaurantId" @click="pushOrRemoveRestaurantId(tr.restaurantStatus, tr.restaurantId)"
                               v-model="tr.restaurantStatus" type="checkbox" >
                            <i class="form-icon"></i>
                          </label>
                    <!-- <vs-switch @click="pushOrRemovePermissionId(data[indextr].permissionStatus, data[indextr].privilegeId)" color="success" v-model="data[indextr].permissionStatus" /> -->
                  </span>{{ tr.restaurantName }}

                </div>
     </div>


    
    <!-- <vs-table
       class="stripe"
       hoverFlat
       :max-items="perPage"
       :data="restaurants"
     >
       <template slot="thead">
         <vs-th sort-key="number">#</vs-th>
         <vs-th sort-key="restaurantName">{{$t('restaurantName')}}</vs-th>
         <vs-th sort-key="address">{{$t('address')}}</vs-th>
         <vs-th v-if="isGranted('setRestaurant')" sort-key="actions">{{$t('allowAll')}}
           <ul style="margin-left: 15px" class="switch-container">
               <li>
                 <span v-if="isGranted('setRestaurant')">
                   <label class="form-checkbox">
                           <input type="checkbox"  @click="allowAllRestaurants()"
                              v-model="assignAllRestaurants">
                           <i class="form-icon"></i>
                         </label>
                 </span>
               </li>
             </ul>
         </vs-th>
       </template>
       <template slot-scope="{data}">
         <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
           <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
           <vs-td class="pr-4 w-1/4" :data="data[indextr].restaurantName">{{data[indextr].restaurantName}}</vs-td>
           <vs-td class="pr-4 w-1/3" :data="data[indextr].address">{{data[indextr].address}}</vs-td>
           <vs-td class="p-0" :data="data[indextr].restaurantId">
             <ul class="switch-container">
               <li>
                 <span v-if="isGranted('setRestaurant')">
                        <label class="form-checkbox" style="margin-left: 100px;">
                           <input type="checkbox" :value="data[indextr].restaurantId" @click="pushOrRemoveRestaurantId(data[indextr].restaurantStatus,
                              data[indextr].restaurantId)"
                              v-model="data[indextr].restaurantStatus">
                           <i class="form-icon"></i>
                         </label>
                 </span>
               </li>
             </ul>
           </vs-td>
         </vs-tr>
       </template>
     </vs-table> -->
     <div style="float:right;">
               <br>
               <vs-button v-if="isGranted('addLab')" @click="assignRestaurant()" color="success"
                 class="mr-3 mb-2 mt-2">{{ $t('save') }}</vs-button>
             </div>
   </vx-card>
   <vs-pagination class="m-4 mt-10" :total="totalPage" v-model="currentPage" @change="getRestaurants"></vs-pagination>
 </vx-card>
</template>
<script>
export default {
 components: {},
 data() {
   return {
     restuarant: {},
     restaurantStatuses: [],
     assignedRestaurants: [],
     assignedRestaurantIds: [],
     chainId: this.$route.params.id,
     assignAllRestaurants: false,
     restaurants: [],
     limit: 15,
     total: 0,
     currentPage: 1,
     perPage: 20,
     getRestaurant:{},
     chain:{}
   };
 },
 methods: {

   fetchAllRestaurants() {
       var params = {limit: this.perPage, page: this.currentPage}
     this.$http
       .get("/api/restaurant",

       )
       .then((response) => {
         this.restaurants = response.data;
         this.isLoading = false;
         this.fetchAssignedRestaurants();
         this.populateRestaurant();
       });
   },

   fetchAssignedRestaurants(){
     this.$http
       .get("/api/restaurant/chain/"+this.$route.params.id

       )
       .then((response) => {
         this.assignedRestaurants = response.data;

         this.isLoading = false;
         this.totalPage = 1;
         this.populateAssignedRestaurantIds();
         this.populateRestaurant();
       });
   },

   populateRestaurant(){
         var restaurants=[], restaurantObject={};
         for(let k=0; k< this.restaurants.length; k++){
          restaurantObject =  {
                         "restaurantId": this.restaurants[k].restaurantId,
                         "restaurantName": this.restaurants[k].restaurantName,
                         "address": this.restaurants[k].address,
                         "createdBy": this.restaurants[k].createdBy,
                         "totalPage": this.restaurants[k].totalPage,
                         "restaurantStatus": (this.assignedRestaurants.filter(assignedRestaurant=>assignedRestaurant.restaurantId == this.restaurants[k].restaurantId)).length>0 && this.assignedRestaurants!=undefined ? true:false
                       }
          restaurants.push(restaurantObject);
       }

       this.restaurants = restaurants;
       if(this.restaurants.filter(restaurant=>restaurant.restaurantStatus==false).length==0)
           this.assignAllRestaurants = true;
   },

   pushOrRemoveRestaurantId(restaurantStatus, restaurantId) {
       this.assignAllRestaurants = false;
       var obj={};
       if(!restaurantStatus){
           this.assignedRestaurantIds.push(restaurantId)
       }
       else{
          this.assignedRestaurantIds = this.assignedRestaurantIds.filter(assignedRestaurant=>assignedRestaurant != restaurantId)
       }

   },

   assignRestaurant(){
    alert(JSON.stringify( this.assignedRestaurantIds))
       var restaurantObj = {chainId:this.$route.params.id, restaurantIds: this.assignedRestaurantIds}
       this.isLoading=true
       this.$http
            .put("/api/restaurant/assign-chain", restaurantObj)
            .then(response => {
              this.isLoading=false
              this.$router.push({ path: "/pages/view-restaurant" });
              this.$vs.notify({
                title:this.$t('Add'),
                text: this.$t('Registered Successfully!'),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
                time:6000
              });
             
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
              this.$router.push({ path: "/pages/view-restaurant" });
            })
   },
   allowAllRestaurants(){
     this.assignedRestaurantIds = [];
     for(let j=0; j<this.restaurants.length; j++){
       if(!this.assignAllRestaurants){
           this.assignedRestaurantIds.push(this.restaurants[j].restaurantId);
           this.restaurants[j].restaurantStatus = true;
       }

       else{
           this.assignedRestaurantIds = [];
           this.restaurants[j].restaurantStatus = false;
       }
     }

   },
   populateAssignedRestaurantIds(){

     for(let i=0; i<this.assignedRestaurants.length; i++){
         this.assignedRestaurantIds.push(this.assignedRestaurants[i].restaurantId)
     }
   },

   fetchChain(){
     this.$http.get("/api/chain/"+this.$route.params.id,
       )
       .then((response) => {
       this.chain = response.data;
       });
   }
 },
 created() {
   this.fetchAllRestaurants();
   this.fetchChain();
 },

 computed: {
 }
};
</script>

<style lang="scss" scoped>

</style>
