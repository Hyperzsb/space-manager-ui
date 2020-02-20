<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <b-container fluid class="p-3">
        <b-row align-h="center">
            <b-col cols="12" lg="8" class="text-center">
                <b class="custom-h3 text-dark">睿信社区空间房间概况</b>
            </b-col>
        </b-row>
        <b-row align-h="center" class="m-5 p-5" :class="{'d-none': !isLoading}">
            <b-col cols="6" class="text-ruixin text-right">
                <b-spinner style="width: 3.5rem; height: 3.5rem;" label="Large Spinner"></b-spinner>
            </b-col>
            <b-col cols="6" class="text-ruixin text-left pt-3">
                <strong>Loading...</strong>
            </b-col>
        </b-row>
        <b-row align-h="center" :class="{'d-none': isLoading}">
            <b-col cols="12">
                <b-card-group deck>
                    <b-container>
                        <b-row cols="1" cols-md="2" cols-xl="3" align-h="around">
                            <b-col v-for="(room, index) in rooms" :key="index" class="p-3">
                                <b-card no-body header-bg-variant="ruixin" header-text-variant="white"
                                        header-tag="header" footer-tag="footer" class="custom-card">
                                    <template v-slot:header>
                                        <b class="custom-h5 text-white">
                                            <b-icon :icon="houseIcon(room)"></b-icon>
                                            &nbsp;&nbsp;{{room.name}}
                                        </b>
                                    </template>
                                    <b-carousel img-width="1024" img-height="480" :interval="randomIntervalTime()"
                                                fade indicators class="progress-bar-striped">
                                        <b-carousel-slide :img-src="'https://picsum.photos/1024/480/?image='+3*index">
                                        </b-carousel-slide>
                                        <b-carousel-slide
                                                :img-src="'https://picsum.photos/1024/480/?image='+(3*index+1)">
                                        </b-carousel-slide>
                                        <b-carousel-slide
                                                :img-src="'https://picsum.photos/1024/480/?image='+(3*index+2)">
                                        </b-carousel-slide>
                                    </b-carousel>
                                    <b-card-body>
                                        <b-card-text class="font-size-09 font-weight-bold">
                                            {{room.note}}
                                        </b-card-text>
                                        <b-button :to="'borrowing/newOrder/'+room.name"
                                                  @click="gotoBorrowing()"
                                                  block
                                                  variant="primary"
                                                  :disabled="!room.availabilityValue">
                                            立即预约&nbsp;<b-icon icon="box-arrow-right"></b-icon>
                                        </b-button>
                                        <b-button block href="#" variant="info">
                                            房间详情&nbsp;<b-icon icon="box-arrow-right"></b-icon>
                                        </b-button>
                                    </b-card-body>
                                    <template v-slot:footer>
                                        <b-row fluid>
                                            <b-col cols="8" class="pt-2">
                                                <b class="font-weight-bold font-size-09">是否可借用：</b>
                                            </b-col>
                                            <b-col clos="4" class="pt-2 text-right">
                                                <b-icon class="h4" :icon="availabilityIcon(room.availabilityValue)"
                                                        :variant="availabilityIconVariant(room.availabilityValue)"></b-icon>
                                            </b-col>
                                        </b-row>
                                    </template>
                                </b-card>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-card-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    //TODO: Room details
    import {mapState, mapMutations, mapActions} from 'vuex'
    import {BCarousel, BCarouselSlide} from 'bootstrap-vue/src/components/carousel'

    export default {
        name: "OldIndex.vue",
        data() {
            return {
                isLoading: true
            }
        },
        computed: {
            ...mapState([
                "clientNavItem",
                "rooms"
            ])
        },
        methods: {
            availabilityIcon(availabilityValue) {
                if (availabilityValue)
                    return "check-circle";
                else
                    return "x-circle";
            },
            availabilityIconVariant(availabilityValue) {
                if (availabilityValue)
                    return "success";
                else
                    return "danger";
            },
            houseIcon(room) {
                if (room.availabilityValue === 1)
                    return "house-fill";
                else
                    return "house";
            },
            randomIntervalTime() {
                return Math.round(Math.random() * 3000 + 3000);
            },
            ...mapMutations([
                "changeClientNavItem",
                "commitRooms"
            ]),
            ...mapActions([
                "getRooms"
            ])
        },
        created() {
            if (this.rooms.length !== 0) {
                setTimeout(() => {
                    this.isLoading = false;
                }, 500);
            } else {
                let that = this;
                this.getRooms().then(resolve => {
                    this.commitRooms(resolve.data);
                    setTimeout(() => {
                        that.isLoading = false;
                    }, 500);
                });
            }
            this.changeClientNavItem(1);
        },
        components: {
            BCarousel,
            BCarouselSlide
        }
    }
</script>

<style lang="scss" scoped>
    // Import custom SASS variable overrides, or alternatively
    // define your variable overrides here instead
    @import '../../../assets/custom';
    // Import Bootstrap and BootstrapVue source SCSS files
    @import '../../../../node_modules/bootstrap/scss/bootstrap';
    @import '../../../../node_modules/bootstrap-vue/src/index';

    .custom-card {
        box-shadow: 0 .125rem .25rem rgba($black, .075);
        transition: 0.5s;

        &:hover {
            box-shadow: 0 1rem 3rem rgba($black, .175);
        }
    }

    @keyframes card-frames {
        from {
            box-shadow: 0 .125rem .25rem rgba($black, .075);
        }
        to {
            box-shadow: 0 1rem 3rem rgba($black, .175);
        }
    }

    .custom-h3 {
        font-weight: bold;
        font-size: 1.5rem;
    }

    .font-size-09 {
        font-size: 0.9rem;
    }
</style>
