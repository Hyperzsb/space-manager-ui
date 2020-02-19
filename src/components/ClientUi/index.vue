<template>
    <div>
        <nav-bar/>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <foot-bar/>
    </div>
</template>

<script>
    //TODO: Loading component
    const NavBar = () => import('./NavBar');
    const FootBar = () => import('./FootBar');

    export default {
        name: 'Client',
        components: {
            NavBar,
            FootBar
        }
    }
</script>

<style lang="scss" scoped>
    .fade-enter-active {
        transition: opacity .3s;
    }
    .fade-enter {
        opacity: 0;
    }
    .fade-leave {
        opacity: 1;
    }
    .fade-leave-active {
        opacity: 0;
        transition: opacity .3s;
    }
</style>
