<template>
    <div class="row mt-5">
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
                        <div class="btn-group btn-group-sm" role="group">
                            <button ref="rowActions" type="button" class="btn btn-outline-info btn-sm"
                                    @click="onAction($event)">
                                <i class="las la-ellipsis-v la-lg"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#" @click.prevent="toggleForm">
                                    <i class="la las la-edit la-lg text-info"></i> Edit
                                </a>
                                <a class="dropdown-item" href="#" @click.prevent="toggleForm">
                                    <i class="la las la-trash la-lg text-danger"></i>
                                    Delete
                                </a>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <transition name="scale" mode="in-out">
            <app-form-comp v-if="isFormOpened" @close="isFormOpened = false" :isOpen="isFormOpened"></app-form-comp>
        </transition>

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
                isFormOpened: false
            }
        },
        methods: {
            ...mapActions('employee', {
                fetchEmployee: 'getEmployees'
            }),
            ...mapGetters('employee', ['employeeData']),

            // show/hide dropdown menu
            onAction(e) {
                e.currentTarget.classList.toggle('show')
                e.currentTarget.nextSibling.classList.toggle('show')
            },
            // toggle form dialog
            toggleForm() {
                // gets menu elements and remove `show` class
                const el = this.$refs.rowActions;
                el.forEach(b => {
                    b.classList.remove('show')
                    b.nextSibling.classList.remove('show')
                })
                this.isFormOpened = !this.isFormOpened;
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


    .scale-enter-active{
        animation: bounce-in .4s forwards cubic-bezier(.59,.73,.23,1.09);
    }


    .scale-leave-active{
        animation: bounce-in .5s reverse cubic-bezier(.59,.73,.23,1.09);
    }

    @keyframes bounce-in {
        0% {
            transform: translateY(1000px);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>
