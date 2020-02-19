<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <b-navbar class="shadow" toggleable="lg" type="dark" variant="ruixin" :sticky="true">
        <b-navbar-brand class="mb-n1" href="#" :active="true">
            <img src="../../assets/img/logo.png" title="睿信社区" alt="" class="mr-3" style="height: 2em">
            <strong>睿信社区</strong>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/home" replace
                            :class="{ active: this.clientNavItem === 0 }">
                    <b class="d-inline-block pb-1 pt-3 pt-lg-1"
                       :class="{ 'border-bottom-2': this.clientNavItem === 0 }">主页</b>
                </b-nav-item>
                <b-nav-item to="/space" replace
                            :class="{ active: this.clientNavItem === 1 }">
                    <b class="d-inline-block pb-1 pt-1"
                       :class="{ 'border-bottom-2': this.clientNavItem === 1 }">空间概览</b>
                </b-nav-item>
                <b-nav-item to="/borrowing" replace
                            :class="{ active: this.clientNavItem === 2 }">
                    <b class="d-inline-block pb-1 pt-1 mb-2 mb-lg-0"
                       :class="{ 'border-bottom-2': this.clientNavItem === 2 }">空间预约</b>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "NavBar",
        computed: {
            ...mapState([
                "clientNavItem"
            ])
        },
        methods: {
            ...mapMutations([
                "changeClientNavItem"
            ])
        }
    }
</script>

<style lang="scss" scoped>

    .font-size-105 {
        font-size: 1.5rem;
    }

    .border-bottom-2 {
        border-bottom: #FFFFFF 2px solid;
    }

</style>
