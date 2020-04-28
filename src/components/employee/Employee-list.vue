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
                        <button type="button" class="btn btn-outline-danger btn-sm mx-1"  @click="deleted">YES</button>
                        <button type="button" class="btn btn-outline-secondary btn-sm mx-1" @click="deleted(false)">NO</button>
                    </div>
                </div>
            </q-card>
        </q-dialog>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import FormComp from './form';

    export default {
        name: 'employee-list',
        components: {
            'app-form-comp': FormComp
        },
        data() {
            return {
                isFormOpened: false,
                selectedId: 0,
                showDeleteConfirm: false
            }
        },
        methods: {
            ...mapActions('employee', {
                fetchEmployee: 'getEmployees',
                deleteEmployee: 'removeEmployee'
            }),
            ...mapGetters('employee', ['employeeData']),

            // toggle form dialog
            toggleForm(id) {
                this.selectedId = id;
                this.isFormOpened = !this.isFormOpened;
            },
            formClosed() {
                this.isFormOpened = false;
                this.selectedId = 0;
            },
            deleteConfirm(id) {
                this.showDeleteConfirm = id > 0;
                this.selectedId = id;
            },
            deleted(isdelete) {
                if(isdelete) {
                    this.deleteEmployee(this.selectedId);
                }
                this.showDeleteConfirm = false;
                this.selectedId = 0;
                // TODO: show a toast
            }
        },
        mounted() {
            // TODO: either fetch from HTTP or use default from local
            this.fetchEmployee();

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
