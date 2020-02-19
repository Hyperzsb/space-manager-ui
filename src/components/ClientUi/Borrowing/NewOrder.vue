<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <b-container fluid>
        <b-row align-h="center">
            <b-col cols="12" md="10" xl="8">
                <b-form @submit="onSubmit" @reset="onReset" class="text-left">
                    <b-row align-h="center" align-v="center">
                        <b-col cols="12">
                            <b-form-group label="房间" label-for="room-name" label-class="font-weight-bold">
                                <b-form-select id="room-name"
                                               required
                                               v-model="form.roomName"
                                               :class="placeHolderClass(form.roomName)">
                                    <template v-slot:first>
                                        <b-form-select-option :value="'null'" disabled>
                                            -- 请选择你想预约的房间 --
                                        </b-form-select-option>
                                    </template>
                                    <b-form-select-option v-for="room in availableRooms" :key="room.name"
                                                          :value="room.name"
                                                          class="text-gray-700">
                                        {{room.name}}
                                    </b-form-select-option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-v="center" align-h="center">
                        <b-col cols="12">
                            <b-form-group label="借用用途：" label-for="note" label-class="font-weight-bold">
                                <b-form-textarea id="note"
                                                 ref="note-textarea"
                                                 required
                                                 rows="3"
                                                 :state="noteValidation"
                                                 aria-describedby="note-feedback"
                                                 v-model="form.note"
                                                 placeholder="请输入借用房间的用途"
                                                 :class="placeHolderClass(form.note)">
                                </b-form-textarea>
                                <b-form-invalid-feedback id="note-feedback">
                                    请输入至少二十字的借用用途
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-h="center" align-v="center">
                        <b-col cols="12" lg="6">
                            <b-form-group label="你的学号：" label-for="borrower-id" label-class="font-weight-bold">
                                <b-form-input id="borrower-id"
                                              ref="borrower-id-input"
                                              required
                                              v-model="form.borrower.id"
                                              :state="borrowerIdValidation"
                                              aria-describedby="borrower-id-feedback"
                                              placeholder="请输入你的学号"
                                              :class="placeHolderClass(form.borrower.id)">
                                </b-form-input>
                                <b-form-invalid-feedback id="borrower-id-feedback">
                                    请输入十位数字学号
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" lg="6">
                            <b-form-group label="你的名字：" label-for="borrower-name" label-class="font-weight-bold">
                                <b-form-input id="borrower-name"
                                              required
                                              v-model="form.borrower.name"
                                              placeholder="请输入你的姓名"
                                              :class="placeHolderClass(form.borrower.name)">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-v="center" align-h="center">
                        <b-col cols="12">
                            <b-form-group label="所在书院" label-for="borrower-academy" label-class="font-weight-bold">
                                <b-form-select id="borrower-academy"
                                               required
                                               v-model="form.borrower.academy"
                                               :class="placeHolderClass(form.borrower.academy)">
                                    <template v-slot:first>
                                        <b-form-select-option :value="''" disabled>
                                            -- 请选择你所在的书院 --
                                        </b-form-select-option>
                                    </template>
                                    <b-form-select-option v-for="academy in academies" :key="academy.name"
                                                          :value="academy.name"
                                                          class="text-gray-700">
                                        {{academy.name}}
                                    </b-form-select-option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-v="center" align-h="center">
                        <b-col cols="12" md="8">
                            <b-form-group label="借用开始时间：" label-for="start-time" label-class="font-weight-bold">
                                <date-pick id="start-time"
                                           required
                                           v-model="form.startTime"
                                           :weekdays="weekdays"
                                           :months="months"
                                           :startWeekOnSunday="true"
                                           :format="'YYYY-MM-DD HH:mm'"
                                           :pickTime="true"
                                           :pick-minutes="false"
                                           :hasInputElement="true"
                                           :inputAttributes="{readonly: true}"
                                           :input-place-holder="'请选择开始时间'"
                                           :set-time-caption="'开始时间（24h）'">
                                </date-pick>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="4">
                            <b-form-group label="借用时长：" label-for="last-time" label-class="font-weight-bold">
                                <b-form-select id="last-time"
                                               required
                                               v-model="form.lastHours">
                                    <b-form-select-option v-for="i in 6" :key="i" :value="i">
                                        {{i + '小时'}}
                                    </b-form-select-option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-v="center" align-h="center">
                        <b-col cols="6" class="text-center p-3">
                            <b-button block type="submit" variant="primary">提交</b-button>
                        </b-col>
                        <b-col cols="6" class="text-center">
                            <b-button block type="reset" variant="danger">重置</b-button>
                        </b-col>
                    </b-row>
                    <b-toast id="submit-toast"
                             :variant="toastVariant"
                             toaster="b-toaster-top-center"
                             solid
                             auto-hide-delay="3000">
                        <template v-slot:toast-title>
                            <div class="d-flex flex-grow-1 align-items-baseline">
                                <p class="h5 pt-2">
                                    <b-icon :icon="toastIcon"></b-icon>
                                </p>
                                <strong class="m-auto">{{toastTitle}}</strong>
                                <small class="text-muted mr-2">刚刚</small>
                            </div>
                        </template>
                        <template v-slot:default>
                            <p>
                                {{toastContent}}
                            </p>
                        </template>
                    </b-toast>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    const DatePick = () => import('vue-date-pick/src/vueDatePick');

    export default {
        name: "NewOrder",
        props: [
            'roomName'
        ],
        data() {
            return {
                form: {
                    roomName: '',
                    note: '',
                    borrower: {
                        id: '',
                        name: '',
                        academy: ''
                    },
                    startTime: '',
                    lastHours: 2
                },
                academies: [{
                    name: '睿信书院'
                }, {
                    name: '求是书院'
                }, {
                    name: '精工书院'
                }, {
                    name: '徐特立书院'
                }, {
                    name: '明德书院'
                }],
                weekdays: [
                    '周一', '周二', '周三', '周四', '周五', '周六', '周日'
                ],
                months: [
                    '一月', '二月', '三月', '四月', '五月', '六月',
                    '七月', '八月', '九月', '十月', '十一月', '十二月'
                ],
                toastVariant: '',
                toastIcon: '',
                toastTitle: '',
                toastContent: ''
            }
        },
        computed: {
            ...mapGetters([
                'availableRooms'
            ]),
            noteValidation: function () {
                if (this.form.note.length === 0)
                    return null;
                else return this.form.note.length >= 20;
            },
            borrowerIdValidation: function () {
                if (this.form.borrower.id.length === 0)
                    return null;
                else if (this.form.borrower.id.length !== 10)
                    return false;
                else {
                    for (let i = 0; i < 10; i++)
                        if (!(this.form.borrower.id[i] - '0' >= 0 && this.form.borrower.id[i] - '0' <= 9))
                            return false;
                    return true;
                }
            }
        },
        methods: {
            ...mapMutations([
                "commitRooms"
            ]),
            ...mapActions([
                "getRooms",
                "addOrder"
            ]),
            async onSubmit(evt) {
                evt.preventDefault();
                if (!this.noteValidation) {
                    this.$refs['note-textarea'].reportValidity();
                    return false;
                }
                if (!this.borrowerIdValidation) {
                    this.$refs['borrower-id-input'].reportValidity();
                    return false;
                }
                let order = {};
                order.roomName = this.form.roomName;
                order.borrowerId = this.form.borrower.id;
                order.borrowerName = this.form.borrower.name;
                order.borrowerAcademyName = this.form.borrower.academy;
                order.note = this.form.note;
                const startTime = new Date(this.form.startTime);
                const tmpTime = startTime.getTime() + Number(this.form.lastHours) * 1000 * 60 * 60;
                const endTime = new Date(tmpTime);
                order.startTime = this.timeFormat(startTime);
                order.endTime = this.timeFormat(endTime);
                order.time = this.timeFormat(new Date());
                this.addOrder(order).then(() => {
                    this.toastVariant = 'info';
                    this.toastIcon = 'check';
                    this.toastTitle = '成功！';
                    this.toastContent = '预约成功！请等待审批！';
                    this.$bvToast.show('submit-toast');
                }).catch(error => {
                    switch (error.response.headers.success) {
                        case 'C': {
                            let order = JSON.parse(decodeURI(error.response.headers.message));
                            this.toastVariant = 'danger';
                            this.toastIcon = 'x';
                            this.toastTitle = '失败！';
                            this.toastContent = '预约失败！您的预约同预约序号' + order.orderId + '的预约冲突!';
                            this.$bvToast.show('submit-toast');
                            break;
                        }
                        default: {
                            this.toastVariant = 'info';
                            this.toastIcon = 'x';
                            this.toastTitle = '失败！';
                            this.toastContent = '服务器异常，请稍后再试！';
                            this.$bvToast.show('submit-toast');
                        }
                    }
                });
            },
            onReset(evt) {
                evt.preventDefault();
                this.form.roomName = '';
                this.form.note = '';
                this.form.borrower.id = '';
                this.form.borrower.name = '';
                this.form.borrower.academy = '';
                this.form.startTime = '';
                this.form.lastHours = '2';
            },
            placeHolderClass(str) {
                if (str === 'null')
                    return {
                        'font-weight-bold': false,
                        'text-gray-500': true
                    };
                else
                    return {
                        'font-weight-bold': str.length !== 0,
                        'text-gray-500': str.length === 0
                    };
            },
            timeFormat(time) {
                let str = time.getFullYear();
                str += '-' + (Number(time.getMonth()) + 1);
                str += '-' + time.getDate();
                str += ' ' + time.getHours();
                str += ':' + (Number(time.getMinutes()) >= 10 ? time.getMinutes() : '0' + time.getMinutes());
                str += ':00';
                return str;
            },
        },
        created() {
            if (this.roomName !== '')
                this.form.roomName = this.roomName;

            let date = new Date();
            let dateString = date.getFullYear();
            if (date.getMonth().toString().length === 1)
                dateString += '-0' + (Number(date.getMonth()) + 1);
            else
                dateString += '-' + (Number(date.getMonth()) + 1);
            if (date.getDate().toString().length === 1)
                dateString += '-0' + date.getDate();
            else
                dateString += '-' + date.getDate();
            dateString += ' 12:00';
            this.form.startTime = dateString;

            if (this.availableRooms.length === 0)
                this.getRooms().then(response => {
                    this.commitRooms(response.data);
                }).catch(() => {
                    this.commitRooms(null);
                });
        },
        components: {
            DatePick
        }
    }
</script>

<style lang="scss" scoped>

    .text-gray-300 {
        color: #DEE2E6;
    }

    .text-gray-500 {
        color: #ADB5BD;
    }

    .text-gray-700 {
        color: #495057;
    }
</style>
