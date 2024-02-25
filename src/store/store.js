

import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
  
Vue.use(Vuex)

import moduleAuth from './auth/moduleAuth.js'
import invoice from './invoice.js'
import confirm from './confirm'
import locale from './locale'


export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
        auth: moduleAuth,
        confirm:confirm,
        invoice:invoice,
        locale,
    },
    strict: process.env.NODE_ENV !== 'production'
})
