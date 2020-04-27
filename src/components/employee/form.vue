<template>
    <div :class="{'form-reposition':isOpen}">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Employee Form</h5>
                <form>
                    <div class="form-group row">
                        <label for="fname" class="col-sm-4 col-form-label">First Name</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control form-control-sm" id="fname">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="lname" class="col-sm-4 col-form-label">Last Name</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control form-control-sm" id="lname">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="age" class="col-sm-4 col-form-label">Age</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control form-control-sm" id="age">
                        </div>
                    </div>
                    <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-4 pt-0">Gender</legend>
                            <div class="col-sm-8">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gridRadios" id="male"
                                           value="male">
                                    <label class="form-check-label" for="male">
                                        Male
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gridRadios" id="female"
                                           value="female">
                                    <label class="form-check-label" for="female">
                                        Female
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gridRadios" id="other"
                                           value="other">
                                    <label class="form-check-label" for="other">
                                        Other
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <a href="#" class="card-link">Save Changes</a>
                <a href="#" class="card-link" @click.prevent="onClose">Cancel</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "app-form",
        props: ['isOpen'],
        methods: {
            onClose() {
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>
    .form-reposition {
        position: absolute;
        /*top: 10px;*/
        /*bottom: 10px;*/
        /*left: 10px;*/
        /*right: 10px;*/
        max-height: calc(100vh - 20px);
        max-width: calc(100% - 20px);
        min-width: 30%;
        z-index: 1000;
        display: inline-block;
        box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
        0px 20px 31px 3px rgba(0, 0, 0, 0.14),
        0px 8px 38px 7px rgba(0, 0, 0, 0.12);
        background: #fff;
        margin: 0 auto;
    }

    .form-reposition::before{
        transition: all .4s;
        background: rgba(134, 132, 132, 0.58);
        content: '';
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

</style>