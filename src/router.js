

import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
var redirectionPath = '/pages/view-agents';
Vue.use(Router)

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================

                {
                    path: '/',
                    redirect: `${redirectionPath}`
                },
                {
                    path: '/dashboard/analytics',
                    name: 'dashboard-analytics',
                    component: () => import('./views/DashboardAnalytics.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },





                //Brhane

                {
                    path: '/pages/view-countries',
                    name: 'viewCountries',
                    component: () => import('./views/pages/Country/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/add-country',
                    name: 'addCountry',
                    component: () => import('./views/pages/Country/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/edit-countries/:id',
                    name: 'editCountry',
                    component: () => import('./views/pages/Country/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/country/:id',
                    name: 'countryDetail',
                    component: () => import('./views/pages/Country/detail.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/view-regions',
                    name: 'viewRegions',
                    component: () => import('./views/pages/Region/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/add-region',
                    name: 'addRegion',
                    component: () => import('./views/pages/Region/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/edit-regions/:id',
                    name: 'editRegion',
                    component: () => import('./views/pages/Region/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/region/:id',
                    name: 'regionDetail',
                    component: () => import('./views/pages/Region/detail.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },


                  {
                    path: '/pages/view-zones',
                    name: 'viewZones',
                    component: () => import('./views/pages/Zone/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/add-zone',
                    name: 'addZone',
                    component: () => import('./views/pages/Zone/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/edit-zones/:id',
                    name: 'editZone',
                    component: () => import('./views/pages/Zone/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/zone/:id',
                    name: 'zoneDetail',
                    component: () => import('./views/pages/Zone/detail.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/view-woredas',
                    name: 'viewWoredas',
                    component: () => import('./views/pages/Woreda/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/add-woreda',
                    name: 'addWoreda',
                    component: () => import('./views/pages/Woreda/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/edit-woredas/:id',
                    name: 'editWoreda',
                    component: () => import('./views/pages/Woreda/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/woreda/:id',
                    name: 'woredaDetail',
                    component: () => import('./views/pages/Woreda/detail.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },





                  {
                    path: '/pages/view-banks',
                    name: 'viewBanks',
                    component: () => import('./views/pages/Bank/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/add-bank',
                    name: 'addBank',
                    component: () => import('./views/pages/Bank/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/edit-banks/:id',
                    name: 'editBank',
                    component: () => import('./views/pages/Bank/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/bank/:id',
                    name: 'bankDetail',
                    component: () => import('./views/pages/Bank/detail.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },





                  {
                    path: '/pages/view-agents',
                    name: 'viewAgents',
                    component: () => import('./views/pages/Agent/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/add-agent',
                    name: 'addAgent',
                    component: () => import('./views/pages/Agent/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/edit-agents/:id',
                    name: 'editAgent',
                    component: () => import('./views/pages/Agent/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/agent/:id',
                    name: 'agentDetail',
                    component: () => import('./views/pages/Agent/detail.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },



                  {
                    path: '/pages/view-share-holders',
                    name: 'viewShareHolders',
                    component: () => import('./views/pages/ShareHolder/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/add-share-holder',
                    name: 'addShareHolder',
                    component: () => import('./views/pages/ShareHolder/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/edit-share-holders/:id',
                    name: 'editShareHolder',
                    component: () => import('./views/pages/ShareHolder/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/share-holder/:id',
                    name: 'shareHolderDetail',
                    component: () => import('./views/pages/ShareHolder/detail.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },





                  {
                    path: '/pages/view-marital-statuses',
                    name: 'viewMaritalStatuses',
                    component: () => import('./views/pages/MaritalStatus/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/add-marital-status',
                    name: 'addMaritalStatus',
                    component: () => import('./views/pages/MaritalStatus/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/edit-marital-statuses/:id',
                    name: 'editMaritalStatus',
                    component: () => import('./views/pages/MaritalStatus/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/MaritalStatus/:id',
                    name: 'maritalStatusDetail',
                    component: () => import('./views/pages/MaritalStatus/detail.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },



                  {
                    path: '/pages/view-shares',
                    name: 'viewShares',
                    component: () => import('./views/pages/Share/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/add-share',
                    name: 'addShare',
                    component: () => import('./views/pages/Share/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/edit-shares/:id',
                    name: 'editShare',
                    component: () => import('./views/pages/Share/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/Share/:id',
                    name: 'shareDetail',
                    component: () => import('./views/pages/Share/detail.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },





                  
                  {
                    path: '/pages/view-share-configs',
                    name: 'viewShareConfigs',
                    component: () => import('./views/pages/ShareConfig/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/add-share-config',
                    name: 'addShareConfig',
                    component: () => import('./views/pages/ShareConfig/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/edit-share-configs/:id',
                    name: 'editShareConfig',
                    component: () => import('./views/pages/ShareConfig/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/ShareConfig/:id',
                    name: 'shareConfigDetail',
                    component: () => import('./views/pages/ShareConfig/detail.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },



                {
                    path: 'pages/view-restaurant',
                    name: 'viewRestaurant',
                    component: () => import('./views/pages/restaurant/viewRestaurant.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/add-macaddress',
                    name: 'addMacAddress',
                    component: () => import('./views/pages/macAddress/addMacAddress.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/view-mac-address/:id',
                    name: 'viewMacAddress',
                    component: () => import('./views/pages/macAddress/viewMacAddress.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/add-mac-address',
                    name: 'addMacAddress',
                    component: () => import('./views/pages/macAddress/addMacAddress.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/edit-mac-address/:id',
                    name: 'editMacaddress',
                    component: () => import('./views/pages/macAddress/editMacAddress.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/register-restaurant',
                    name: 'registerRestaurant',
                    component: () => import('@/views/pages/restaurant/registerRestaurant.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/edit-restaurant/:id',
                    name: 'editRestaurant',
                    component: () => import('@/views/pages/restaurant/editRestaurant.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: 'pages/view-contact',
                    name: 'viewContact',
                    component: () => import('./views/pages/contact/viewContact.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/edit-contact/:id',
                    name: 'editContact',
                    component: () => import('@/views/pages/contact/editContact.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/add-contact',
                    name: 'addContact',
                    component: () => import('@/views/pages/contact/addContact.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },



                {
                    path: '/pages/edit-chain/:id',
                    name: 'editChain',
                    component: () => import('@/views/pages/chain/editChain.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: 'pages/view-chain',
                    name: 'viewChain',
                    component: () => import('./views/pages/chain/viewChain.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/add-chain',
                    name: 'addChain',
                    component: () => import('@/views/pages/chain/addChain.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },



                {
                    path: 'pages/view-user',
                    name: 'viewUser',
                    component: () => import('./views/pages/user/viewuserAccount.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: 'pages/view-restaurant-user',
                    name: 'viewRestaurantUser',
                    component: () => import('./views/pages/user/viewuserAccount.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },


                {

                    path: 'pages/update-user/:id',
                    name: 'updateUser',
                    component: () => import('./views/pages/user/updateUser.vue'),

                    meta: {
                        rule: 'editor'
                    }
                },



                {
                    path: 'pages/add-user',
                    name: 'registerUser',
                    component: () => import('./views/pages/user/registerUser.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },


                {
                    path: 'pages/userProfile',
                    name: 'userProfile',
                    component: () => import('./views/pages/userProfile.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },


                {
                    path: '/pages/fetch-roles-for-permission',
                    name: 'fetchRolesForPermission',
                    component: () => import('@/views/pages/Permission/fetch-roles-for-permission.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: '/pages/set-role-permission/:roleId',
                    name: 'setRolePermission',
                    component: () => import('@/views/pages/Permission/assignPermission.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },,


                  {
                    path: 'pages/view-roles',
                    name: 'viewRoles',
                    component: () => import('@/views/pages/Role/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/add-role',
                    name: 'addRole',
                    component: () => import('@/views/pages/Role/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/edit-role/:id',
                    name: 'editRole',
                    component: () => import('@/views/pages/Role/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },

                  {
                    path: 'pages/view-privileges',
                    name: 'viewPrivileges',
                    component: () => import('@/views/pages/Privilege/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },

                  {
                    path: 'pages/add-privilege/:id',
                    name: 'addPrivilege',
                    component: () => import('@/views/pages/Privilege/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/edit-privilege/:id',
                    name: 'editPrivilege',
                    component: () => import('@/views/pages/Privilege/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },




                  {
                    path: 'pages/view-privilege-categories',
                    name: 'viewPrivilegeCategories',
                    component: () => import('@/views/pages/PrivilegeCategory/index.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },

                  {
                    path: 'pages/add-privilege-category',
                    name: 'addPrivilegeCategory',
                    component: () => import('@/views/pages/PrivilegeCategory/create.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },
                  {
                    path: 'pages/edit-privilege-category/:id',
                    name: 'editPrivilegeCategory',
                    component: () => import('@/views/pages/PrivilegeCategory/edit.vue'),
                    meta: {
                      rule: 'editor'
                    }
                  },

                //   {
                //     path: 'pages/assign-roles/:id',
                //     name: 'assignRoles',
                //     component: () => import('./views/pages/AssignRoleToUser/assignRole.vue'),
                //     meta: {
                //         rule: 'editor'
                //     }
                // },

                {
                  path: 'pages/permission/:id',
                  name: 'permission',
                  component: () => import('./views/pages/Permission/assignPermission.vue'),
                  meta: {
                      rule: 'editor'
                  }
              },


              {
                path: 'pages/permissions/:id',
                name: 'permissions',
                component: () => import('./views/pages/Permission/assignPermission1.vue'),
                meta: {
                    rule: 'editor'
                }
            },


              {
                path: 'pages/assign-role/:id',
                name: 'roleAssign',
                component: () => import('./views/pages/AssignRoleToUser/assignRoles.vue'),
                meta: {
                    rule: 'editor'
                }
            },

            {
                path: 'pages/assign-restaurant/:id',
                name: 'assignRestaurant',
                component: () => import('./views/pages/chain/assignRestaurant.vue'),
                meta: {
                    rule: 'editor'
                }
            },
                {
                    path: '/components/navbar',
                    name: 'component-navbar',
                    component: () => import('@/views/components/vuesax/navbar/Navbar.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Navbar', active: true },
                        ],
                        pageTitle: 'Navbar',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/notifications',
                    name: 'component-notifications',
                    component: () => import('@/views/components/vuesax/notifications/Notifications.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Notifications', active: true },
                        ],
                        pageTitle: 'Notifications',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/pagination',
                    name: 'component-pagination',
                    component: () => import('@/views/components/vuesax/pagination/Pagination.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Pagination', active: true },
                        ],
                        pageTitle: 'Pagination',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/popup',
                    name: 'component-popup',
                    component: () => import('@/views/components/vuesax/popup/Popup.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Popup', active: true },
                        ],
                        pageTitle: 'Popup',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/progress',
                    name: 'component-progress',
                    component: () => import('@/views/components/vuesax/progress/Progress.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Progress', active: true },
                        ],
                        pageTitle: 'Progress',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/sidebar',
                    name: 'component-sidebar',
                    component: () => import('@/views/components/vuesax/sidebar/Sidebar.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Sidebar', active: true },
                        ],
                        pageTitle: 'Sidebar',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/slider',
                    name: 'component-slider',
                    component: () => import('@/views/components/vuesax/slider/Slider.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Slider', active: true },
                        ],
                        pageTitle: 'Slider',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/tabs',
                    name: 'component-tabs',
                    component: () => import('@/views/components/vuesax/tabs/Tabs.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Tabs', active: true },
                        ],
                        pageTitle: 'Tabs',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/tooltip',
                    name: 'component-tooltip',
                    component: () => import('@/views/components/vuesax/tooltip/Tooltip.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Tooltip', active: true },
                        ],
                        pageTitle: 'Tooltip',
                        rule: 'editor'
                    },
                },
                {
                    path: '/components/upload',
                    name: 'component-upload',
                    component: () => import('@/views/components/vuesax/upload/Upload.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Components' },
                            { title: 'Upload', active: true },
                        ],
                        pageTitle: 'Upload',
                        rule: 'editor'
                    },
                },



        // =============================================================================
        // Pages Routes
        // =============================================================================
                {
                    path: '/pages/profile',
                    name: 'page-profile',
                    component: () => import('@/views/pages/Profile.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Pages' },
                            { title: 'Profile', active: true },
                        ],
                        pageTitle: 'Profile',
                        rule: 'editor'
                    },
                },
                                {
                    path: '/pages/search',
                    name: 'page-search',
                    component: () => import('@/views/pages/Search.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/' },
                            { title: 'Pages' },
                            { title: 'Search', active: true },
                        ],
                        pageTitle: 'Search',
                        rule: 'editor'
                    },
                },


            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================

                {
                    path: '/verifyaccount',
                    name: 'verifyaccount',
                    component: () => import('@/views/pages/user/verifyAccount.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/callback',
                    name: 'auth-callback',
                    component: () => import('@/views/Callback.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/login',
                    name: 'page-login',
                    component: () => import('@/views/pages/signin/login.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/sign',
                    name: 'page-sign',
                    component: () => import('@/views/pages/signin/login.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/register',
                    name: 'page-register',
                    component: () => import('@/views/pages/user/Register.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },

                {
                    path: '/pages/forgot-password',
                    name: 'page-forgot-password',
                    component: () => import('@/views/pages/ForgotPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },


                {
                    path: '/pages/reset-password',
                    name: 'page-reset-password',
                    component: () => import('@/views/pages/user/ResetPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/resetpassword',
                    name: 'page-reset-password',
                    component: () => import('@/views/pages/user/verifyResetCode.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/lock-screen',
                    name: 'page-lock-screen',
                    component: () => import('@/views/pages/LockScreen.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/comingsoon',
                    name: 'page-coming-soon',
                    component: () => import('@/views/pages/ComingSoon.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/error-404',
                    name: 'page-error-404',
                    component: () => import('@/views/pages/Error404.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/error-500',
                    name: 'page-error-500',
                    component: () => import('@/views/pages/Error500.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/not-authorized',
                    name: 'page-not-authorized',
                    component: () => import('@/views/pages/NotAuthorized.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/maintenance',
                    name: 'page-maintenance',
                    component: () => import('@/views/pages/Maintenance.vue'),
                    meta: {
                        rule: 'editor'
                    }
                }
            ]
        },
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

router.beforeEach((to, from, next) => {
    const id = to.path.split("/").slice(-1)[0];
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');
    const userType = localStorage.getItem('userType');
    if(accessToken!=null){
        axios.defaults.headers.common['Authorization'] =accessToken;
    }

 //Open Access
    if (
       true
    ){
        return next();
    }



//If User is Admin
    else if((userId != null && accessToken != null && userType=="SuperAdmin") ){

           return next();
    }
    router.push({ path: '/pages/login', query: { to: to.path }})


});

export default router
