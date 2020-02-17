<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <b-navbar class="shadow" toggleable="lg" type="dark" variant="ruixin" :sticky="true">
        <b-navbar-brand class="mb-n1" href="#" :active="true">
            <img src="../assets/img/logo.png" title="睿信社区" alt="" class="mr-3" style="height: 2em">
            <strong>睿信社区</strong>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/home" replace
                            class="font-weight-bold"
                            :class="{ active: this.navItem === 0 }">
                    <b class="d-inline-block pb-1 pt-3 pt-lg-1"
                       :class="{ 'border-bottom-2': this.navItem === 0 }">主页</b>
                </b-nav-item>
                <b-nav-item to="/space" replace
                            :class="{ active: this.navItem === 1 }">
                    <b class="d-inline-block pb-1 pt-1"
                       :class="{ 'border-bottom-2': this.navItem === 1 }">空间概览</b>
                </b-nav-item>
                <b-nav-item to="/borrowing" replace
                            class="font-weight-bold"
                            :class="{ active: this.navItem === 2 }">
                    <b class="d-inline-block pb-1 pt-1 mb-2 mb-lg-0"
                       :class="{ 'border-bottom-2': this.navItem === 2 }">空间预约</b>
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>
                <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        name: "NavBar",
        computed: {
            ...mapState([
                "navItem"
            ]),
            ...mapGetters([
                "currentPath"
            ])
        },
        methods: {
            ...mapMutations([
                "changeNavItem"
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
