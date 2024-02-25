<template>
  <div @mouseover="aa()" @mouseleave="bb()" :style="{'background-image': 'url(' + require('@/optifood/assets/img/background.png')}" class="parentx">
    <vs-sidebar
      :hiddenBackground="clickNotClose"
      :reduce="reduce"
      default-index="-1"
      class="sidebarx main-menu-sidebar items-no-padding"
      v-model="isSidebarActive"
      :click-not-close="clickNotClose"
      :reduce-not-rebound="reduceNotRebound"
    >
      <div @mouseenter="sidebarMouseEntered" @mouseleave="sidebarMouseLeave">
        <div class="header-sidebar flex items-end justify-between" slot="header">
          <div v-if="this.$store.state.reduceButton" class="items-center ml-16">
            <img width="60px" height="60" style="margin-left:-70px; color: red;" :src="logo" alt="logo" v-if="logo && sidebarItemsMin"/>
            <img width="60px" height="60"  style="margin-left:15px; " :src="logo" alt="logo" v-else/>

          </div>
          <div v-else class="items-center ml-8 mt-4">
            <img width="150px" height="40" :src="logo" alt="logo" v-if="logo" />
          </div>
          <hr>
          <div>
            <!-- <template v-if="showCloseButton">
              <feather-icon
                icon="XIcon"
                class="m-0 cursor-pointer"
                @click="$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false)"
              ></feather-icon>
            </template>
            <template v-else-if="!showCloseButton && !sidebarItemsMin">
              <feather-icon
                icon="DiscIcon"
                class="mr-0 cursor-pointer"
                svg-classes="stroke-current"
                v-show="!reduce"
                @click="toggleReduce(true)"
                id="btnSidebarToggler"
              ></feather-icon>
              <feather-icon
                icon="CircleIcon"
                class="mr-0 cursor-pointer"
                svg-classes="stroke-current"
                v-show="reduce"
                @click="toggleReduce(false)"
                id="btnSidebarToggler"
              ></feather-icon>
            </template> -->
          </div>
        </div>
        <div class="shadow-bottom" v-show="showShadowBottom"></div>

        <VuePerfectScrollbar
          ref="mainSidebarPs"
          class="scroll-area--main-sidebar pt-2"
          :settings="settings"
          @ps-scroll-y="psSectionScroll"
        >
          <template v-for="(sidebarItem, index) in sidebarItems">
            <span
              :key="`header-${index}`"
              v-if="sidebarItem.header && !sidebarItemsMin"
            >{{ $t(sidebarItem.i18n) || sidebarItem.header }}</span>
            <template v-else-if="!sidebarItem.header">
              <vx-sidebar-item
                ref="sidebarLink"
                :key="`sidebarItem-${index}`"
                v-if="!sidebarItem.submenu"
                :index="index"
                :to="sidebarItem.slug != 'external' ? sidebarItem.url : ''"
                :href="sidebarItem.slug == 'external' ? sidebarItem.url : ''"
                :icon="iconText==sidebarItem.icon?sidebarItem.icon+'-wht':sidebarItem.icon"
                :target="sidebarItem.target"
                :isDisabled="sidebarItem.isDisabled"
                :slug="sidebarItem.slug"
                @clickFromChildComponent="handleClickInParent"
              >
                <span v-if="index==1"
                  v-show="!sidebarItemsMin"
                  class="truncate"
                >{{ $t(sidebarItem.i18n) || sidebarItem.name }}</span>
                <span v-else
                  v-show="!sidebarItemsMin"
                  class="truncate"
                >{{ $t(sidebarItem.i18n) || sidebarItem.name }}</span>
                <vs-chip
                  :color="sidebarItem.tagColor"
                  v-if="sidebarItem.tag && (isMouseEnter || !reduce)"
                >{{ sidebarItem.tag }}</vs-chip>
              </vx-sidebar-item>

              <template v-else>
                <vx-sidebar-group
                  ref="sidebarGrp"
                  :key="`group-${index}`"
                  :openHover="openGroupHover"
                  :group="sidebarItem"
                  :groupIndex="index"
                  :open="isGroupActive(sidebarItem)"
                  @clickFromChildComponentGroup="handleClickInParent"
                ></vx-sidebar-group>
              </template>
            </template>
          </template>
        </VuePerfectScrollbar>
      </div>
    </vs-sidebar>
    <div
      v-hammer:swipe.right="onSwipeRightSidebarSwipeArea"
      v-if="!isSidebarActive"
      class="sidebar-swipe-area"
      id="sidebar-swipe-area"
    ></div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import VxSidebarGroup from "./VxSidebarGroup.vue";
import VxSidebarItem from "./VxSidebarItem.vue";
import router from "@/router";

export default {
  name: "vx-sidebar",
  props: {
    sidebarItems: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    logo: {
      type: String
    },
    parent: {
      type: String
    },
    openGroupHover: {
      type: Boolean,
      default: false
    },
    reduceNotRebound: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    iconText: "",
    leave: true,
    searchOrder: "",
    clickNotClose: false,
    reduce: false,
    showCloseButton: false,
    isMouseEnter: false,
    settings: {
      maxScrollbarLength: 60,
      wheelSpeed: 1,
      swipeEasing: true
    },
    windowWidth: window.innerWidth,
    showShadowBottom: false
  }),
  computed: {
    isSidebarActive: {
      get() {
        return this.$store.state.isSidebarActive;
      },
      set(val) {
        this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", val);
      }
    },
    reduceSidebar() {
      return Boolean(this.reduce && this.reduceButton);
    },
    reduceButton: {
      get() {
        return this.$store.state.reduceButton;
      },
      set(val) {
        this.$store.commit("TOGGLE_REDUCE_BUTTON", val);
      }
    },
    sidebarItemsMin() {
      return this.$store.state.sidebarItemsMin;
    },
    isGroupActive() {
      return sidebarItem => {
        const path = this.$route.fullPath;
        let open = false;
        let func = function(sidebarItem) {
          if (sidebarItem.submenu) {
            sidebarItem.submenu.forEach(item => {
              if (path == item.url) {
                open = true;
              } else if (item.submenu) {
                func(item);
              }
            });
          }
        };
        func(sidebarItem);
        return open;
      };
    }
  },
  watch: {
    reduce(val) {
      if (val == true) {
        this.$store.dispatch("updateSidebarWidth", "reduced");
      } else {
        this.$store.dispatch("updateSidebarWidth", "default");
      }

      setTimeout(function() {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    },
    reduceButton() {
      this.setSidebarWidth();
    },
    $route() {
      if (this.isSidebarActive && this.showCloseButton)
        this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", false);
    }
  },
  methods: {
    handleClickInParent: function(iconNew) {
      this.iconText="dashboard";
      this.iconText=iconNew;
    },

    bb(){
      this.leave=true;
      // if(this.showCloseButton){
      //   this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false);
      // }

      // else if(!this.showCloseButton && !this.sidebarItemsMin){
      //   if()
      //   this.toggleReduce(true);
      // }
      // else 
      //  this.toggleReduce(false);
    },

    aa(){
      if(this.leave){
        this.leave=false;   
        if(!this.reduce)
           this.toggleReduce(true);
        else 
          this.toggleReduce(false);
    } 
    },
    sidebarMouseEntered() {
      if (this.reduce) this.$store.commit("UPDATE_SIDEBAR_ITEMS_MIN", false);
      this.isMouseEnter = true;
    },
    sidebarMouseLeave() {
      if (this.reduce) {
        this.$store.commit("UPDATE_SIDEBAR_ITEMS_MIN", true);
      }
      this.isMouseEnter = false;
    },
    toggleReduce(val) {
      this.reduceButton = val;
      this.setSidebarWidth();
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      if (this.windowWidth < 1200) {
        if (this.windowWidth < 992)
          this.$store.commit("UPDATE_WINDOW_BREAKPOINT", "md");
        else this.$store.commit("UPDATE_WINDOW_BREAKPOINT", "lg");

        this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", false);
        if (this.reduceButton) this.reduce = false;
        // this.reduceButton = false;
        this.showCloseButton = true;
        this.clickNotClose = false;
        this.$store.dispatch("updateSidebarWidth", "no-sidebar");
        this.$store.commit("UPDATE_SIDEBAR_ITEMS_MIN", false);
      } else {
        this.$store.commit("UPDATE_WINDOW_BREAKPOINT", "xl");
        if (this.reduceButton) this.reduce = true;
        else this.reduce = false;

        this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", true);
        if (this.reduceButton && !this.isMouseEnter)
          this.$store.commit("UPDATE_SIDEBAR_ITEMS_MIN", true);
        else this.$store.commit("UPDATE_SIDEBAR_ITEMS_MIN", false);

        this.clickNotClose = true;
        this.showCloseButton = false;
        if (this.reduceSidebar)
          this.$store.dispatch("updateSidebarWidth", "reduced");
        else this.$store.dispatch("updateSidebarWidth", "default");
      }
    },
    psSectionScroll() {
      if (this.$refs.mainSidebarPs.$el.scrollTop > 0)
        this.showShadowBottom = true;
      else this.showShadowBottom = false;
    },
    onSwipeLeft() {
      if (this.isSidebarActive && this.showCloseButton)
        this.isSidebarActive = false;
    },
    onSwipeRightSidebarSwipeArea() {
      if (!this.isSidebarActive && this.showCloseButton)
        this.isSidebarActive = true;
    }
  },
  components: {
    VxSidebarGroup,
    VxSidebarItem,
    VuePerfectScrollbar
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleWindowResize);
    });
    this.setSidebarWidth();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/components/vxSidebar.scss";

#search {
  width: 200px;
  margin-left: 10px;
}
</style>
