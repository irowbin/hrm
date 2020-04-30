<template>

    <div class="row">
        <div class="col-md-12 mt-2 mb-2">
            <button class="btn btn-info float-right" @click.prevent="toggleForm(0)">Add New</button>
        </div>
        <div class="col-md-12">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Email</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr :key="index" v-for="(em, index) in employeeList">
                    <th>{{index+1}}</th>
                    <td>{{em.firstName}} {{em.lastName}}</td>
                    <td>{{em.age}}</td>
                    <td>{{em.gender}}</td>
                    <td>{{em.email}}</td>
                    <td>
                        <div class="bg-purple text-white rounded-borders row flex-center q-mt-md menu-wrap">
                            <q-icon name="more_vert"/>
                            <q-menu>
                                <q-list class="menu-list">
                                    <q-item clickable v-close-popup @click.prevent="toggleForm(em.id)">
                                        <q-item-section side>
                                            <q-icon name="edit" color="amber"/>
                                        </q-item-section>
                                        <q-item-section>
                                            Edit
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup @click.prevent="deleteConfirm(em.id)">
                                        <q-item-section side>
                                            <q-icon name="delete" color="pink"/>
                                        </q-item-section>
                                        <q-item-section> Delete</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <q-dialog no-backdrop-dismiss v-model="isFormOpened">
            <app-form-comp @close="formClosed" :id="selectedId"></app-form-comp>
        </q-dialog>

        <q-dialog v-model="showDeleteConfirm">
            <q-card style="width: 300px">
                <q-card-section class="text-center">
                    <div class="text-h6">Confirm</div>
                </q-card-section>

                <q-card-section class="q-pt-none text-center">
                    Are you sure?
                </q-card-section>
                <div class="row mx-0 mb-4 mt-3">
                    <div class="col-12 d-flex justify-center mx-auto mb-2">
                        <button type="button" class="btn btn-outline-danger btn-sm mx-1" @click="deleted">YES</button>
                        <button type="button" class="btn btn-outline-secondary btn-sm mx-1" @click="deleted(false)">NO
                        </button>
                    </div>
                </div>
            </q-card>
        </q-dialog>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import FormComp from './form';
    import {socket} from '../../shared/socket-io.extension';

    export default {
        name: 'employee-list',
        components: {
            'app-form-comp': FormComp
        },
        data() {
            return {
                isFormOpened: false,
                selectedId: 0,
                showDeleteConfirm: false,
                isSelfAction: false
            }
        },
        methods: {
            ...mapActions('employee', {
                fetchEmployee: 'getEmployees',
                deleteEmployee: 'removeEmployee',
                // updateEmployee: 'updateEmployee',
                addEmployee: 'addEmployee'
            }),
            ...mapGetters('employee', ['employeeData']),
            notify(text, type) {
                this.$q.notify({
                    textColor: 'white',
                    icon: 'info',
                    type: type,
                    message: text,
                    position: 'top-right',
                    multiLine: true,
                    timeout: 10000
                })
            },
            // toggle form dialog
            toggleForm(id) {
                this.selectedId = id;
                this.isFormOpened = !this.isFormOpened;
            },
            formClosed(isCancelled) {
                this.isFormOpened = false;
                if (!isCancelled)
                    this.notify(`Successfully ${this.selectedId > 0 ? 'Updated' : 'Created'}`, 'positive');
                this.selectedId = 0;
            },
            deleteConfirm(id) {
                this.showDeleteConfirm = id > 0;
                this.selectedId = id;

            },
            deleted(isDelete) {
                if (isDelete) {
                    this.deleteEmployee(this.selectedId);
                    this.notify('Successfully Deleted', 'negative');
                    socket.emit('deleteEmployee', this.selectedId);
                    this.isisSelfAction = true;
                }
                this.showDeleteConfirm = false;
                this.selectedId = 0;
            }
        },
        mounted() {
            // TODO: either fetch from HTTP or use default from local
            this.fetchEmployee();

            socket.on('connect', () => {

                // when an employee get deleted
                socket.on('employeeDeleted', (id) => {
                    this.deleteEmployee(id);
                    this.notify('Successfully Deleted from elsewhere', 'negative');
                    this.isisSelfAction = false;

                });

                // when an employee being added or updated existing.
                socket.on('employeeCreatedOrUpdated', (employee) => {
                    this.notify(`Successfully ${employee.id > 0 ? 'Updated' : 'Created'} from elsewhere`, 'positive');
                });

                socket.on('employeeCreatedOrUpdated', (employee) => {
                    if (employee.id > 0) {
                        this.$store.dispatch('employee/updateEmployee', employee)
                    } else {
                        this.addEmployee(employee)
                    }
                });
            })
        },
        computed: {
            employeeList() {
                return this.employeeData()
            }
        }
    }
</script>

<style scoped>
    .menu-wrap {
        width: 25px;
        height: 25px;
        margin: 0;
        cursor: pointer
    }

    .menu-list {
        min-width: 100px;
        padding: 5px;
        overflow: hidden;
    }

</style>
