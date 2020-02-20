<template>
    <b-container fluid>
        <b-row align-h="center">
            <b-col cols="12" md="10" lg="8" class="p-3 m-3 p-sm-5 m-sm-5">
                <b-card title="管理员登出" body-class="text-center" class="p-3 p-sm-5">
                    <b-row align-h="center" class="text-left font-weight-bold">
                        <b-col cols="12" sm="10" md="8" lg="6">
                            <b-alert :show="dismissCountDown"
                                     dismissible
                                     :variant="alertVariant"
                                     @dismissed="dismissCountDown=0"
                                     @dismiss-count-down="countDownChanged">
                                <p>{{alertContent}}</p>
                                <b-progress variant="info"
                                            :max="dismissSecs"
                                            :value="dismissCountDown"
                                            height="3px">
                                </b-progress>
                            </b-alert>
                        </b-col>
                    </b-row>
                    <b-row align-h="center" class="text-left font-weight-bold">
                        <b-col cols="12" sm="10" md="8" lg="6">
                            <b-form>
                                <b-row>
                                    <b-col cols="6">
                                        <b-button block variant="danger"
                                                  @click="onSubmit()">
                                            登出
                                        </b-button>
                                    </b-col>
                                    <b-col cols="6">
                                        <b-button block variant="info"
                                                  @click="onCancel()">
                                            取消
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios'
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "Logout",
        data() {
            return {
                alertVariant: '',
                alertContent: '',
                dismissSecs: 3,
                dismissCountDown: 0
            }
        },
        computed: {
            ...mapState([
                "loginStatus"
            ])
        },
        methods: {
            ...mapMutations([
                "commitUser",
                "commitToken",
                "changeLoginStatus",
                "changeManagerNavItem"
            ]),
            onSubmit: function () {
                axios({
                    method: 'post',
                    url: '/api/manager/logout',
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(() => {
                    this.changeLoginStatus(false);
                    this.commitUser(null);
                    this.commitToken(null);
                    sessionStorage.setItem('user', null);
                    sessionStorage.setItem('token', null);
                    this.alertVariant = 'success';
                    this.alertContent = '登出成功！';
                    this.dismissSecs = 3;
                    this.dismissCountDown = this.dismissSecs;
                    setTimeout(() => {
                        this.$router.push('/manager/borrowing');
                    }, 3000);
                }).catch(reject => {
                    this.changeLoginStatus(true);
                    this.alertVariant = 'danger';
                    this.alertContent = '登出失败！（' + reject.toString() + '）请稍后再试！';
                    this.dismissSecs = 10;
                    this.dismissCountDown = this.dismissSecs;
                });
            },
            onCancel: function () {
                this.$router.push('/manager/borrowing');
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            }
        },
        created() {
            this.changeManagerNavItem(3);
        }
    }
</script>

<style scoped>

</style>
