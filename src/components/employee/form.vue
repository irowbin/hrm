<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Employee Form</h5>
            <form>
                <div class="row">
                    <div class="col-12 h6 text-indigo bg-light-blue-1">
                        Personal Info
                    </div>
                </div>
                <div class="form-group row">
                    <label for="fname" class="col-sm-4 col-form-label">First Name</label>
                    <div class="col-sm-8">
                        <input type="text" v-model="employee.firstName" class="form-control form-control-sm" id="fname">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="lname" class="col-sm-4 col-form-label">Last Name</label>
                    <div class="col-sm-8">
                        <input type="text" v-model="employee.lastName" class="form-control form-control-sm" id="lname">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-sm-4 col-form-label">Email</label>
                    <div class="col-sm-8">
                        <input type="email" v-model="employee.email" class="form-control form-control-sm" id="email">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="age" class="col-sm-4 col-form-label">Age</label>
                    <div class="col-sm-8">
                        <input type="number" v-model="employee.age" class="form-control form-control-sm" id="age">
                    </div>
                </div>
                <fieldset class="form-group">
                    <div class="row">
                        <legend class="col-form-label col-sm-4 pt-0 px-0">Gender</legend>
                        <div class="col-sm-8">
                            <div class="form-check">
                                <input v-model="employee.gender" class="form-check-input" type="radio" name="gridRadios"
                                       id="male"
                                       value="male">
                                <label class="form-check-label" for="male">
                                    Male
                                </label>
                            </div>
                            <div class="form-check">
                                <input v-model="employee.gender" class="form-check-input" type="radio" name="gridRadios"
                                       id="female"
                                       value="female">
                                <label class="form-check-label" for="female">
                                    Female
                                </label>
                            </div>
                            <div class="form-check">
                                <input v-model="employee.gender" class="form-check-input" type="radio" name="gridRadios"
                                       id="other"
                                       value="other">
                                <label class="form-check-label" for="other">
                                    Other
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <div class="row">
                    <div class="col-12 h6 text-indigo bg-light-blue-1">
                        Account Info
                    </div>
                </div>
                <div class="form-group row">
                    <label for="uname" class="col-sm-4 col-form-label">Username</label>
                    <div class="col-sm-8">
                        <input type="text" v-model="employee.account.username" class="form-control form-control-sm"
                               id="uname">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="pw" class="col-sm-4 col-form-label">Password</label>
                    <div class="col-sm-8">
                        <input type="password" v-model="employee.account.password" class="form-control form-control-sm"
                               id="pw">
                    </div>
                </div>
            </form>
            <a href="#" class="card-link" @click.prevent="saveChanges">Save Changes</a>
            <a href="#" class="card-link" v-close-popup @click="onClose(true)">Cancel</a>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {socket} from '../../shared/socket-io.extension';

    export default {
        name: "app-form",
        props: ['id'],
        data() {
            return {
                // TODO: model validation
                employee: {
                    id: 0,
                    firstName: null,
                    lastName: null,
                    age: null,
                    gender: null,
                    email: null,
                    account: {
                        username: null,
                        password: null
                    }
                }
            }
        },
        methods: {
            ...mapGetters('employee', ['getEmployee']),
            ...mapActions('employee', ['getEmployeeById', 'updateEmployee', 'addEmployee']),
            onClose(isCancelled) {
                this.$emit('close', isCancelled)
            },
            async saveChanges() {

                socket.emit('addOrUpdateEmployee', this.employee);

                if (this.id > 0) {
                    await this.updateEmployee(this.employee);
                } else {
                    this.employee.id = 0
                    await this.addEmployee(this.employee)
                }

                this.onClose(false);
            },
            async initEdit() {
                if (this.id <= 0) return;

                await this.getEmployeeById(this.id);
                // lets not mutate the origin
                this.employee = this.getEmployee()
            }
        },
        mounted() {
            this.initEdit();
        }
    }
</script>

<style scoped>

</style>