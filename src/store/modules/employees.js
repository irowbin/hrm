import {EmployeeDbContext} from '../../storage/database'

const state = {
    employees: [],
    employee: null
}

const mutations = {
    /**
     * Initializes employees with payload
     */
    'INIT_EMPLOYEE'(state, payload) {
        if (state.employees.length > 0) return;
        state.employees = payload
    },
    /**
     * Gets an employee by Id
     */
    async 'GET_EMPLOYEE_BY_ID'(state, payload) {

        state.employee = payload;
    },

    /**
     * Adds an employee
     */
    'ADD_EMPLOYEE'(state, payload) {
        const copy = state.employees.slice();
        copy.unshift(payload);
        state.employees = copy
    },

    /**
     * Updates an employee with modified payload
     */
    'UPDATE_EMPLOYEE'(state, payload) {
        const copy = state.employees.slice();
        const index = copy.findIndex(e => e.id === payload.id);
        if (index > -1) {
            copy[index] = payload
        }

        state.employees = copy;

        // clear the activated employee object after updated.
        state.employee = null;
    },

    /**
     * Removes an employee finding by Id
     */
    'REMOVE_EMPLOYEE_BY_ID'(state, id) {
        const index = state.employees.findIndex(e => e.id === id);
        if (index > -1) {
            state.employees.splice(index, 1)
        }
    }
}

const actions = {

    // dispatch and commits `INIT_EMPLOYEE`
    async getEmployees({commit}) {
        const db = new EmployeeDbContext();
        commit('INIT_EMPLOYEE', await db.getEmployees())
    },

    // dispatch and commits `GET_EMPLOYEE_BY_ID`
    async getEmployeeById({commit}, id) {
        if (id <= 0) {
            throw Error('Id must be greater than zero')
        }
        const db = new EmployeeDbContext();
        commit('GET_EMPLOYEE_BY_ID', await db.getById(id))
    },

    // dispatch and commits `ADD_EMPLOYEE`
    async addEmployee({commit}, payload) {
        if (!payload) {
            throw Error("Payload must be provided to create new employee")
        }
        const db = new EmployeeDbContext();
        const id = await db.addOrUpdateEmployee(payload)
        commit('ADD_EMPLOYEE', await db.getById(id));
    },

    // dispatch and commits `UPDATE_EMPLOYEE`
    async updateEmployee({commit}, payload) {
        if (!payload) {
            throw Error('Payload must be provided')
        }
        if ((payload.id <= 0)) {
            throw Error('Employee id must be greater than zero')
        }
        const db = new EmployeeDbContext();
        const id = await db.addOrUpdateEmployee(payload)
        commit('UPDATE_EMPLOYEE', await db.getById(id))
    },

    // dispatch and commits `REMOVE_EMPLOYEE_BY_ID`
    async removeEmployee({commit}, id) {
        if (id <= 0) {
            throw Error('Id must be greater than zero')
        }
        const db = new EmployeeDbContext();
        await db.deleteEmployeeById(id);
        commit('REMOVE_EMPLOYEE_BY_ID', id)
    }
}

const getters = {
    // Gets list of employee
    employeeData(state) {
        return state.employees
    },
    // Gets an employee
    getEmployee(state) {
        return state.employee
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
