<template>
    <div>
        <tr>
            <th>{{serialNo+1}}</th>
            <td>{{employee.firstName}} {{employee.lastName}}</td>
            <td>{{employee.age}}</td>
            <td>{{employee.gender}}</td>
            <td>{{employee.email}}</td>
        </tr>
    </div>
</template>

<script>
    export default {
        name: "employee",
        props: ['employee', 'serialNo']
    }
</script>

<style scoped>

</style>