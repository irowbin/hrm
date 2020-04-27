<template>
    <div class="row mt-3">
        <div class="col-md-3" :key="index" v-for="(wid,index) in widgets">
            <div class="card bg-light mb-3">
                <div class="card-header">Employee</div>
                <div class="card-body">
                    <p class="card-text">
                        Employee activity
                    </p>
                </div>
                <div class="card-footer bg-transparent">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-success" style="width:40%"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Home',
        data() {
            return {
                widgets: 4
            }
        },

    }
</script>
