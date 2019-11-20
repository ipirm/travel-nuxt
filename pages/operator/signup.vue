<template>
    <div class="page signup-page">
        <i18n-link to="/" class="logo logo-w"></i18n-link>
        <div class="overlay">
            <div class="card card-auth-operator">
                <div class="card-body">
                    <!--<h4 class="card-title">-->
                        <!--Sign up-->
                    <!--</h4>-->
                    <signup-form></signup-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SignupForm from '~/components/operator/SignupForm'

    export default {
        layout: 'auth',

        auth: false,

        components: {
            SignupForm
        }
    }
</script>
