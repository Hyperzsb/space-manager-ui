<template>
    <b-container fluid class="p-0 m-0">
        <b-carousel ref="mainCarousel"
                    :interval="4000"
                    img-width="1024"
                    img-height="480"
                    controls
                    indicators
                    background="#e9ecef">
            <b-carousel-slide caption="First slide" img-src="https://picsum.photos/1024/480/?image=10"
                              :class="smallCarouselSlide">
            </b-carousel-slide>
            <b-carousel-slide caption="Second slide" img-src="https://picsum.photos/1024/480/?image=52"
                              :class="smallCarouselSlide">
            </b-carousel-slide>
            <b-carousel-slide caption="Third slide" img-src="https://picsum.photos/1024/480/?image=51"
                              :class="smallCarouselSlide">
            </b-carousel-slide>
        </b-carousel>
        <b-row class="no-gutters">
            <b-col>
                <b-card no-body class="shadow p-0 m-0">
                    <b-card-title class="pt-5 pl-5 pr-3 font-size-105 font-weight-bold">
                        睿信书院社区空间
                    </b-card-title>
                    <b-card-text class="pb-5 pl-5 pr-3">
                        睿信书院服务于同学们的共享空间，为大家提供学习、娱乐、交流的场所。
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    //TODO: Thin carousel slide
    //TODO: NewsCard component
    import {mapState, mapMutations} from 'vuex'
    import {BCarousel, BCarouselSlide} from 'bootstrap-vue/src/components/carousel'

    export default {
        name: 'index',
        data() {
            return {
                windowWidth: document.documentElement.clientWidth
            }
        },
        computed: {
            smallCarouselSlide: function () {
                if (this.windowWidth >= 1200)
                    return {
                        'normal-carousel-slide': false,
                        'low-carousel-slide': true,
                        'thin-carousel-slide': false
                    };
                else if (this.windowWidth < 1200 && this.windowWidth >= 576)
                    return {
                        'normal-carousel-slide': true,
                        'low-carousel-slide': false,
                        'thin-carousel-slide': false
                    };
                else
                    return {
                        'normal-carousel-slide': true,
                        'low-carousel-slide': false,
                        'thin-carousel-slide': false
                    };
            },
            ...mapState([
                "navItem"
            ])
        },
        watch: {
            windowWidth() {
                this.$refs.mainCarousel.next();
            }
        },
        methods: {
            ...mapMutations([
                "changeNavItem"
            ])
        },
        created() {
            this.changeNavItem(0);
        },
        mounted() {
            const that = this;
            window.onresize = () => {
                return (() => {
                    that.windowWidth = document.body.clientWidth;
                })();
            }
        },
        components: {
            BCarousel,
            BCarouselSlide
        }
    }
</script>

<style lang="scss" scoped>

    .font-size-105 {
        font-size: 2rem;
    }

    .normal-carousel-slide {
        margin-top: 0;
        margin-bottom: 0
    }

    .normal-carousel-slide img {
        height: 50rem;
        width: 50rem;
    }

    .low-carousel-slide {
        margin-top: -120px;
        margin-bottom: -120px
    }

    .thin-carousel-slide {
        height: 30rem;
        background-repeat: repeat-y;
        background-position: center;
    }

</style>
