import {employees} from '../../storage/database'

const state = {
    employees: [],
    employee: null
}

const mutations = {
    /**
     * Initializes employees with payload
     */
    'INIT_EMPLOYEE'(state, payload) {
        if(state.employees.length> 0) return;
        const copy = payload.slice();
        // simulation auto increment of ID as primary KEY
        copy.forEach((e, index) => {
            e.id = index + 1;
            e.firstName = e.firstName + index;
            e.account.username = e.account.username + index;
            e.email = e.firstName + index + '@mail.com';
            e.age = e.age + index;
        });
        state.employees = copy
    },
    /**
     * Gets an employee by Id
     */
    'GET_EMPLOYEE_BY_ID'(state, id) {
        state.employee = state.employees.find(e => e.id === id);
    },

    /**
     * Adds an employee
     */
    'ADD_EMPLOYEE'(state, payload) {
        const copy = state.employees.slice();
        // find the max ID and add by 1
        const maxId = Math.max(...copy.map(i => i.id)) + 1;
        // employee have new ID
        payload.id = maxId;
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
    getEmployees({commit}, payload) {
        // either supplied payload or a default
        const data = (payload || employees)
        commit('INIT_EMPLOYEE', data)
    },

    // dispatch and commits `GET_EMPLOYEE_BY_ID`
    getEmployeeById({commit}, id) {
        if (id <= 0) {
            throw Error('Id must be greater than zero')
        }
        commit('GET_EMPLOYEE_BY_ID', id)
    },

    // dispatch and commits `ADD_EMPLOYEE`
    addEmployee({commit}, payload) {
        if (!payload) {
            throw Error("Payload must be provided to create new employee")
        }
        commit('ADD_EMPLOYEE', payload);
    },

    // dispatch and commits `UPDATE_EMPLOYEE`
    updateEmployee({commit}, payload) {
        if (!payload) {
            throw Error('Payload must be provided')
        }
        if ((payload.id <= 0)) {
            throw Error('Employee id must be greater than zero')
        }
        commit('UPDATE_EMPLOYEE', payload)
    },

    // dispatch and commits `REMOVE_EMPLOYEE_BY_ID`
    removeEmployee({commit}, id) {
        if (id <= 0) {
            throw Error('Id must be greater than zero')
        }
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
