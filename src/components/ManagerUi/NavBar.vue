<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <b-navbar class="shadow" toggleable="lg" type="dark" variant="ruixin" :sticky="true">
        <b-navbar-brand class="mb-n1" href="#" :active="true">
            <img src="../../assets/img/logo.png" title="睿信社区" alt="" class="mr-3" style="height: 2em">
            <strong>睿信社区管理平台</strong>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/manager/borrowing" replace
                            :disabled="!this.loginStatus"
                            :class="{ active: this.managerNavItem === 0 }">
                    <b class="d-inline-block pb-1 pt-3 pt-lg-1"
                       :class="{ 'border-bottom-2': this.managerNavItem === 0 }">预约管理</b>
                </b-nav-item>
                <b-nav-item to="/manager/space" replace
                            :disabled="!this.loginStatus"
                            :class="{ active: this.managerNavItem === 1 }">
                    <b class="d-inline-block pb-1 pt-1"
                       :class="{ 'border-bottom-2': this.managerNavItem === 1 }">房间管理</b>
                </b-nav-item>
                <b-nav-item to="/manager/guide" replace
                            :disabled="!this.loginStatus"
                            :class="{ active: this.managerNavItem === 2 }">
                    <b class="d-inline-block pb-1 pt-1"
                       :class="{ 'border-bottom-2': this.managerNavItem === 2 }">指南</b>
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="this.loginStatus ? '/manager/logout' : '/manager/login'" replace
                            :class="{ active: this.managerNavItem === 3 }">
                    <b class="d-inline-block pb-1 pt-2 pt-lg-1 mb-2 mb-lg-0"
                       :class="{ 'border-bottom-2': this.managerNavItem === 3 }">
                        {{this.loginStatus ? '登出' : '登录'}}
                    </b>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "NavBar",
        computed: {
            ...mapState([
                "loginStatus",
                "managerNavItem"
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
