<template>
    <b-container fluid>
        <b-row align-h="center">
            <b-col cols="12" md="10" lg="8" class="p-3 m-3 p-sm-5 m-sm-5">
                <b-card title="管理员登录" body-class="text-center" class="p-3 p-sm-5">
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
                                <b-form-group label="用户名：" label-for="username-input">
                                    <b-form-input id="username-input"
                                                  v-model="form.username"
                                                  type="username"
                                                  required
                                                  placeholder="请输入用户名">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label="密码：" label-for="password-input">
                                    <b-form-input id="password-input"
                                                  v-model="form.password"
                                                  type="password"
                                                  required
                                                  placeholder="请输入密码">
                                    </b-form-input>
                                </b-form-group>
                                <b-row align-v="center" align-h="center">
                                    <b-col cols="6" sm="4" class="text-center p-3">
                                        <b-button block variant="primary"
                                                  @click="onSubmit()">
                                            提交
                                        </b-button>
                                    </b-col>
                                    <b-col cols="6" sm="4" class="text-center">
                                        <b-button block variant="danger"
                                                  @click="onReset()">
                                            重置
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
        name: "Login",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
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
                    url: '/api/manager/login',
                    params: {
                        username: this.form.username,
                        password: this.form.password
                    },
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(resolve => {
                    this.changeLoginStatus(true);
                    this.commitUser(resolve.data.name);
                    this.commitToken(resolve.data.details.sessionId);
                    sessionStorage.setItem('user', resolve.data.name);
                    alert(resolve.data.details.sessionId);
                    sessionStorage.setItem('token', resolve.data.details.sessionId);
                    alert(sessionStorage.getItem('token'));
                    this.alertVariant = 'success';
                    this.alertContent = '登录成功！将在3秒内跳转至首页...';
                    this.dismissCountDown = this.dismissSecs;
                    setTimeout(() => {
                        this.$router.push('/manager/borrowing');
                    }, 3000);
                }).catch(reject => {
                    this.changeLoginStatus(false);
                    alert(JSON.stringify(reject));
                })
            },
            onReset: function () {
                this.form.username = '';
                this.form.password = '';
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            }
        },
        created() {
            /*
            if (this.loginStatus) {
                axios({
                    methods: 'get',
                    url: '/api/manager/authentication'
                }).then(resolve => {
                    if (resolve.status === 200 && resolve.data.authenticated) {
                        this.commitUser(resolve.data.name);
                        this.commitToken(resolve.data.details.sessionId);
                        if (!sessionStorage.getItem('user'))
                            sessionStorage.setItem('user', resolve.data.name);
                        if (!sessionStorage.getItem('token'))
                            sessionStorage.setItem('token', resolve.data.details.sessionId);
                        this.$router.push('/manager/borrowing');
                    } else {
                        this.changeLoginStatus(false);
                        this.commitUser(null);
                        this.commitToken(null);
                        sessionStorage.setItem('user', null);
                        sessionStorage.setItem('token', null);
                        this.changeManagerNavItem(3);
                    }
                }).catch(reject => {
                    if (reject.response.status === 403) {
                        this.changeLoginStatus(false);
                    } else if (reject.response.status === 500) {
                        this.changeLoginStatus(false);
                    } else {
                        this.changeLoginStatus(false);
                    }
                    this.commitUser(null);
                    this.commitToken(null);
                    sessionStorage.setItem('user', null);
                    sessionStorage.setItem('token', null);
                    this.changeManagerNavItem(3);
                });
            } else
             */
            this.changeManagerNavItem(3);
        }
    }
</script>

<style scoped>

</style>
