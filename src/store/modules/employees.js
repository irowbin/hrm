import {employees} from '../../storage/database'

const state = {
    employees: []
}

const mutations = {
    /**
     * Initializes employees with payload
     */
    'INIT_EMPLOYEE'(state, payload) {
        state.employees = payload
    }
}

const actions = {

    getEmployees({commit}, payload) {
        // either supplied payload or a default
        const data = (payload || employees)
        commit('INIT_EMPLOYEE', data)
    }
}

const getters = {
    employeeData(state) {
        return state.employees
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
