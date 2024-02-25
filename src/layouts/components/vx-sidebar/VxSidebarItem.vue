
<template>
    <div :class="[{'disabled-item pointer-events-none': isDisabled}]" class="vs-sidebar--item" v-if="canSee">
       
        <span  @click=" handleClick()" >
        <router-link v-if="to" :to="to"  :target="target">
                <feather-icon v-if="icon=='CircleIcon'" :icon="icon" :class="{'w-3 h-3': iconSmall}"></feather-icon>  
                    <img  v-else-if="!sidebarItemsMin" class="mr-8" width="30" :src="require(`@/assets/images/icons/${icon}.svg`)"/>
                    <img v-else class="mr-8" width="30px;" :src="require(`@/assets/images/icons/${icon}.svg`)"/>  
            <slot></slot>
        </router-link>
        
        <a v-else :target="target" :href="href">
            <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon">
            </vs-icon>
            <feather-icon :icon="icon" :class="{'w-3 h-3': iconSmall}" v-else></feather-icon>
            <slot></slot>
        </a>
    </span>
    </div>
</template>

<script>
export default {
    name: 'VxSidebarItem',
    props: {
        icon: {
            default: "",
            type: String
        },
        iconSmall: {
            default: false,
            type: Boolean,
        },
        iconPack: {
            default: 'material-icons',
            type: String
        },
        href: {
            default: '#',
            type: String
        },
        to: {
            default: null,
            type: String
        },
        slug: {
          default: null,
          type: String
        },
        index: {
            default: null,
            type: [String, Number]
        },
        featherIcon: {
            default: true,
            type: Boolean,
        },
        target: {
            default: '_self',
            type: String,
        },
        isDisabled: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            activeLink: true,
            activeIcon: "",
        }
    },
    watch: {
        '$route'() {
            this.CheckIsActive()
        }
    },
    methods: {

        handleClick: function() {
             this.$emit("clickFromChildComponent", this.icon);
             this.$emit("clickFromChildComponentGroup", this.icon);
        },
        changeIcon(){
            this.activeIcon=this.icon;
        },
        CheckIsActive() {
            if (this.to) {
                if (this.$route.path.slice(1).includes(this.to.slice(1)) && this.to.slice(1)) this.activeLink = true
                else this.activeLink = false
            }
        }
    },
    computed: {
      sidebarItemsMin() {
      return this.$store.state.sidebarItemsMin;
    },
        canSee() {
            this.$acl.check(this.$store.state.userRole);
            if(this.to) {
                return this.$acl.check(this.$router.match(this.to).meta.rule)
            }
            return true
        }
    },
    updated() {
        this.CheckIsActive();
    }
}
</script>
