<template>
    <div>SpaceManager</div>
</template>

<script>
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
        created() {
            if (this.loginStatus)
                this.changeManagerNavItem(1);
            else
                this.$router.push('/manager/login');
        }
    }
</script>

<style scoped>

</style>
