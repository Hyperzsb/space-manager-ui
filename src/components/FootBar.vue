<template>
    <b-container tag="footer" fluid class="text-center bg-gray-200 border-top-3">
        <b-row class="p-3">
            <b-col cols="12" class="p-3">
                <b-row class="mt-3 mb-3">
                    <b-col md="6" offset-sm="2" order-md="1" order="2" class="mb-3">
                        <b-row class="pt-3 pb-3 pl-4 pl-sm-0 pr-4 pr-sm-0">
                            <b-col cols="6" sm="5">
                                <div class="pb-1 pt-1 text-left text-ruixin font-weight-bolder font-size-101">
                                    相关链接
                                </div>
                                <div class="pt-1 pl-3 text-left">
                                    <b-link href="http://www.bit.edu.cn/" class="custom-link">北京理工大学官网</b-link>
                                </div>
                                <div class="pt-1 pl-3 text-left">
                                    <b-link href="#" class="custom-link">睿信书院官网</b-link>
                                </div>
                                <div class="pt-1 pl-3 text-left">
                                    <b-link href="#" class="custom-link">睿信书院公众号平台</b-link>
                                </div>
                            </b-col>
                            <b-col cols="6" sm="5">
                                <div class="pb-1 pt-1 text-left text-ruixin font-weight-bolder font-size-101">
                                    联系我们
                                </div>
                                <div class="pt-1 pl-3 text-left">
                                    <b-link href="http://www.bit.edu.cn/" class="custom-link">睿信书院自管委员会</b-link>
                                </div>
                                <div class="pt-1 pl-3 text-left">
                                    <b-link href="#" class="custom-link">自管委技术保障中心</b-link>
                                </div>
                                <div class="pt-1 pl-3 text-left">
                                    <b-link href="#" class="custom-link">网站运维</b-link>
                                </div>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col md="2" order-md="2" order="1" class="mb-3">
                        <b-row align-v="center" style="height: 100%">
                            <b-col>
                                <b-img center rounded="circle" :src="require('../assets/img/RuiXinLOGO.png')" alt="睿信书院"
                                       style="height: 11rem"></b-img>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-row class="p-3">
                    <b-col cols="10" offset="1" sm="8" offset-sm="2" class="border-top-1">
                        <div class="p-3 font-size-09 text-secondary">
                            Designed and built by&nbsp;
                            <b-link href="#" class="custom-link">
                                Hyperview
                            </b-link>
                            &nbsp;with&nbsp;
                            <b-link href="https://cn.vuejs.org/" class="custom-link">
                                Vue.js
                            </b-link>
                            &nbsp;and&nbsp;
                            <b-link href="https://spring.io/projects/spring-boot/" class="custom-link">
                                Spring Boot
                            </b-link>
                            .&nbsp;
                            <br/>
                            Currently v{{version}}. Code licensed&nbsp;
                            <b-link href="https://www.mit-license.org/" class="custom-link">
                                MIT
                            </b-link>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: "FootBar",
        computed: {
            version: () => {
                return require("../../package.json").version;
            }
        }
    }
</script>

<style lang="scss" scoped>
    // Import custom SASS variable overrides, or alternatively
    // define your variable overrides here instead
    @import '../assets/custom.scss';
    // Import Bootstrap and BootstrapVue source SCSS files
    @import '~bootstrap/scss/bootstrap.scss';
    @import '~bootstrap-vue/src/index.scss';

    .border-top-3 {
        border-top: $gray-300 3px solid;
    }

    .border-top-1 {
        border-top: $gray-400 1px solid;
    }

    .bg-gray-200 {
        background-color: $gray-200;
    }

    .text-ruixin {
        color: $ruixin;
    }

    .font-size-101 {
        font-size: 1.1rem;
    }

    .font-size-09 {
        font-size: 0.9em;
    }

    .custom-link {
        @extend .font-weight-bold;
        @extend .font-size-09;

        color: $dark;

        &:hover {
            color: $primary;
        }

        &:active {
            color: $primary;
        }
    }
</style>
