<template>
    <div>
        <app-employee-list></app-employee-list>
    </div>
</template>

<script>
    import EmployeeList from '@/components/employee/Employee-list'

    export default {
        name: 'Employees',
        components: {
            'app-employee-list': EmployeeList
        }
    }
</script>

<style scoped>

</style>
