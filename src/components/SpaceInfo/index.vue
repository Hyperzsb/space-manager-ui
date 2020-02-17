<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <b-container fluid class="p-3">
        <b-row align-h="center">
            <b-col cols="12" lg="8" class="text-center">
                <b class="custom-h3 text-dark">睿信社区空间房间概况</b>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col cols="12">
                <b-card-group deck>
                    <b-container>
                        <b-row cols="1" cols-md="2" cols-xl="3" align-h="around">
                            <b-col v-for="(room, index) in rooms" :key="index" class="p-3">
                                <b-card no-body header-bg-variant="ruixin" header-text-variant="white"
                                        header-tag="header" footer-tag="footer" class="shadow">
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
            return {}
        },
        computed: {
            ...mapState([
                "navItem",
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
                "changeNavItem"
            ]),
            ...mapActions([
                "getRooms"
            ])
        },
        created() {
            this.getRooms();
            this.changeNavItem(1);
        },
        components: {
            BCarousel,
            BCarouselSlide
        }
    }
</script>

<style lang="scss" scoped>

    .custom-h3 {
        font-weight: bold;
        font-size: 1.5rem;
    }

    .font-size-09 {
        font-size: 0.9rem;
    }
</style>
