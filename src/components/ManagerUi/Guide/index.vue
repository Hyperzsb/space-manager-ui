<template>
    <div>Guide</div>
</template>

<script>
    // import axios from 'axios'
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "index",
        computed: {
            ...mapState([
                "loginStatus",
                "managerNavItem"
            ])
        },
        methods: {
            ...mapMutations([
                "changeManagerNavItem"
            ])
        },
        /*
        beforeRouteEnter(to, from, next) {
            axios({
                methods: 'get',
                url: '/api/manager/authentication'
            }).then(resolve => {
                if (resolve.status === 200 && resolve.data.authenticated) {
                    next();
                } else {
                    next('/manager/login');
                }
            }).catch(reject => {
                if (reject.response.status === 403) {
                    next('/manager/login');
                } else if (reject.response.status === 500) {
                    next('/manager/login');
                } else {
                    next('/manager/login');
                }
            });
        },
         */
        created() {
            if (this.loginStatus)
                this.changeManagerNavItem(2);
            else
                this.$router.push('/manager/login');
        }
    }
</script>

<style scoped>

</style>
