<template>
    <div>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    //TODO: Loading component

    export default {
        name: 'app'
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
