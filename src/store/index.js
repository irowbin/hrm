import Vue from 'vue'
import Vuex from 'vuex'
import EmployeeModule from './modules/employees'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        employee: {
            ...EmployeeModule,
            namespaced: true
        }
    }
})
