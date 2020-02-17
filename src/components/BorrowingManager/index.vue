<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <b-container fluid>
        <b-row align-h="center" class="p-3">
            <b-col cols="12" md="10" lg="8" class="p-3">
                <b-card :title="navActiveTitle()" body-class="text-center" header-tag="nav">
                    <template v-slot:header>
                        <b-nav card-header tabs>
                            <b-nav-item to="/borrowing/newOrder" replace
                                        :active="activeNavItemIndex === 0"
                                        @click="changeNavItemActive(0)">
                                预约房间
                            </b-nav-item>
                            <b-nav-item to="/borrowing/orderList" replace
                                        :active="activeNavItemIndex === 1"
                                        @click="changeNavItemActive(1)">
                                预约列表
                            </b-nav-item>
                        </b-nav>
                    </template>
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    String.prototype.endWith = function (endStr) {
        let d = this.length - endStr.length;
        return (d >= 0 && this.lastIndexOf(endStr) === d)
    };
    export default {
        name: "index",
        data() {
            return {
                activeNavItemIndex: -1
            }
        },
        computed:{
          ...mapState([
              "navItem"
          ])
        },
        methods: {
            changeNavItemActive(index) {
                this.activeNavItemIndex = index;
            },
            navActiveTitle() {
                if (this.$router.currentRoute.path.includes('newOrder'))
                    return '创建预约';
                else if (this.$router.currentRoute.path.includes('orderList'))
                    return '历史预约';
            },
            ...mapMutations([
                "changeNavItem"
            ])
        },
        created() {
            if (this.$router.currentRoute.path.includes('newOrder'))
                this.activeNavItemIndex = 0;
            else if (this.$router.currentRoute.path.includes('/orderList'))
                this.activeNavItemIndex = 1;
            this.changeNavItem(2);
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
