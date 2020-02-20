<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <b-container fluid class="p-3">
        <b-row align-h="center">
            <b-col cols="12" lg="8" class="text-center">
                <b class="custom-h3 text-dark">预约审批</b>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col cols="10" md="8">
                <b-row align-h="center" class="mb-3">
                    <b-col cols="12" lg="8" xl="6" class="my-1">
                        <b-form-group label="查找"
                                      label-for="filter-input"
                                      label-class="font-weight-bold"
                                      class="mb-0">
                            <b-input-group>
                                <b-form-input v-model="filter"
                                              type="search"
                                              id="filterI-input"
                                              placeholder="请输入查找信息"
                                ></b-form-input>
                                <b-input-group-append>
                                    <b-button :disabled="!filter" @click="filter = ''">清除</b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row align-h="center" class="mb-3">
                    <b-col cols="12" lg="8" xl="6" class="my-1">
                        <b-form-group label="限定查找区域："
                                      label-for="filter-on-checkbox"
                                      label-class="font-weight-bold"
                                      description="不选择将在所有信息中查找"
                                      class="mb-0">
                            <b-form-checkbox-group id="filter-on-checkbox" v-model="filterOn" class="mt-1">
                                <b-form-checkbox value="orderId">预约序号</b-form-checkbox>
                                <b-form-checkbox value="borrowerName">借用人姓名</b-form-checkbox>
                                <b-form-checkbox value="borrowerId">借用人学号</b-form-checkbox>
                                <b-form-checkbox value="note">借用信息</b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col cols="10" md="8">
                <b-table id="order-table"
                         bordered
                         :items="ordersSortedByTime"
                         :fields="fields"
                         :filter="filter"
                         :filterIncludedFields="filterOn"
                         @filtered="onFiltered"
                         :busy="isBusy"
                         stacked="md"
                         per-page="7"
                         :current-page="currentPage"
                         :tbody-tr-class="tableRowClass">
                    <template v-slot:cell(borrowerName)="data">
                        <b-link :id="'borrower-details-' + data.item.orderId"
                                class="font-weight-bold">
                            {{data.item.borrowerName}}
                        </b-link>
                        <b-popover :target="'borrower-details-' + data.item.orderId"
                                   placement="auto"
                                   triggers="hover focus">
                            <template v-slot:title>
                                <div class="pt-2 pb-2">
                                    <strong>{{data.item.borrowerName}}</strong>
                                </div>
                            </template>
                            <div class="mt-2">
                                <strong>学号：</strong>
                                {{data.item.borrowerId}}
                            </div>
                            <hr/>
                            <div class="mb-2">
                                <strong>所在书院：</strong>
                                {{data.item.borrowerAcademyName}}
                            </div>
                        </b-popover>
                    </template>
                    <template v-slot:cell(note)="data">
                        <b-link :id="'order-details-' + data.item.orderId"
                                class="font-weight-bold">
                            详情
                        </b-link>
                        <b-popover :target="'order-details-' + data.item.orderId"
                                   placement="auto"
                                   triggers="hover">
                            <template v-slot:title>
                                <div class="pt-2 pb-2">
                                    <strong>借用信息</strong>
                                </div>
                            </template>
                            <div class="mt-2">
                                <strong>预约创建时间：</strong>
                                {{getOrderCreateTime(data.item.time)}}
                            </div>
                            <hr/>
                            <div>
                                <strong>用途：</strong>
                                {{data.item.note}}
                            </div>
                            <hr/>
                            <div class="mb-2">
                                <strong>借用时间：</strong>
                                {{getOrderLastTime(data.item.startTime,data.item.endTime)}}
                            </div>
                        </b-popover>
                    </template>
                    <template v-slot:cell(orderStatus)="data">
                        <b>{{getOrderStatusLabel(data.item.orderStatus)}}</b>&nbsp;
                        <b-icon :icon="getOrderStatusIcon(data.item.orderStatus)"></b-icon>
                    </template>
                    <template v-slot:cell(approve)="data">
                        <b-link :id="'borrower-approve-' + data.item.orderId"
                                class="font-weight-bold">
                            {{data.item.orderStatus === 2 ? '审批' : '修改审批'}}
                        </b-link>
                        <b-popover :target="'borrower-approve-' + data.item.orderId"
                                   placement="auto"
                                   triggers="hover focus">
                            <template v-slot:title>
                                <div class="pt-2 pb-2">
                                    <strong>预约审批</strong>
                                </div>
                            </template>
                            <b-form-select v-model="data.item.approve" size="sm" class="mt-2">
                                <template v-slot:first>
                                    <b-form-select-option :value="-1" disabled>-- 请选择 --</b-form-select-option>
                                </template>
                                <b-form-select-option :value="1">批准</b-form-select-option>
                                <b-form-select-option :value="0">驳回</b-form-select-option>
                            </b-form-select>
                            <hr/>
                            <div class="mb-2">
                                <b-button block variant="info" size="sm" @click="onSubmit(data.item)">
                                    确认
                                </b-button>
                                <b-button block variant="danger" size="sm" @click="data.item.approve=-1">
                                    取消
                                </b-button>
                            </div>
                        </b-popover>
                    </template>
                    <template v-slot:table-busy>
                        <div class="text-center text-info my-2">
                            <b-spinner class="align-middle m-3"></b-spinner>
                            <strong>加载中...</strong>
                        </div>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col cols="12" md="8" lg="6" xl="4">
                <b-pagination v-model="currentPage"
                              :total-rows="totalRows"
                              per-page="7"
                              aria-controls="order-table"
                              align="fill">
                    <template v-slot:page="{ page, active }">
                        <b v-if="active">{{ page }}</b>
                        <i v-else>{{ page }}</i>
                    </template>
                </b-pagination>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios'
    import {mapState, mapMutations, mapActions} from 'vuex'

    String.prototype.toDate = function () {
        const tempStr = this.split(" ");
        const dateStr = tempStr[0].split("-");
        const year = parseInt(dateStr[0], 10);
        const month = parseInt(dateStr[1], 10) - 1;
        const day = parseInt(dateStr[2], 10);
        const timeStr = tempStr[1].split(":");
        const hour = parseInt(timeStr[0], 10);
        const minute = parseInt(timeStr[1], 10);
        const second = parseInt(timeStr[2], 10);
        return new Date(year, month, day, hour, minute, second);
    };

    export default {
        name: "index",
        data() {
            return {
                orders: [],
                fields: [{
                    key: 'orderId',
                    label: '序号',
                    sortable: true,
                    class: 'text-center',
                    tdClass: 'font-weight-bold'
                }, {
                    key: 'roomName',
                    label: '预约房间',
                    sortable: true,
                    class: 'text-center',
                    tdClass: 'font-weight-bold'
                }, {
                    key: 'borrowerName',
                    label: '借用人',
                    sortable: true,
                    class: 'text-center'
                }, {
                    key: 'note',
                    label: '借用信息',
                    class: 'text-center'
                }, {
                    key: 'orderStatus',
                    label: '预约状态',
                    sortable: true,
                    class: 'text-center',
                }, {
                    key: 'approve',
                    label: '审批',
                    class: 'text-center',
                }],
                isBusy: false,
                totalRows: 0,
                currentPage: 1,
                filter: '',
                filterOn: []
            }
        },
        computed: {
            ...mapState([
                "loginStatus",
                "managerNavItem",
            ]),
            ordersSortedByTime() {
                let sortedOrders = this.orders.slice();
                return sortedOrders.sort(function (a, b) {
                    return a.time > b.time ? -1 : 1;
                })
            }
        },
        methods: {
            ...mapMutations([
                "changeManagerNavItem",
                "commitOrders"
            ]),
            ...mapActions([
                "getOrders"
            ]),
            tableRowClass(item) {
                if (item === undefined || item == null)
                    return '';
                else
                    switch (item.orderStatus) {
                        case 0:
                            return 'table-danger';
                        case 1:
                            return 'table-success';
                        default:
                            return '';
                    }
            },
            getOrderStatusLabel(orderStatus) {
                switch (orderStatus) {
                    case 0:
                        return '未批准';
                    case 1:
                        return '已批准';
                    default:
                        return '审批中'
                }
            },
            getOrderStatusIcon(status) {
                switch (status) {
                    case 0:
                        return 'x-circle';
                    case 1:
                        return 'check-circle';
                    default:
                        return 'arrow-clockwise';
                }
            },
            getOrderCreateTime(createTime) {
                const createDate = createTime.toDate();
                let str = createDate.getFullYear();
                str += '年' + (Number(createDate.getMonth()) + 1);
                str += '月' + createDate.getDate();
                str += '日 ' + createDate.getHours();
                str += ':' +
                    (Number(createDate.getMinutes()) >= 10 ? createDate.getMinutes() : '0' + createDate.getMinutes());
                return str;
            },
            getOrderLastTime(startTime, endTime) {
                const startDate = startTime.toDate();
                const endDate = endTime.toDate();
                let str = startDate.getFullYear();
                str += '年' + (Number(startDate.getMonth()) + 1);
                str += '月' + startDate.getDate();
                str += '日 ' + startDate.getHours();
                str += ':' +
                    (Number(startDate.getMinutes()) >= 10 ? startDate.getMinutes() : '0' + startDate.getMinutes());
                str += ' ~ ' + endDate.getHours();
                str += ':' +
                    (Number(endDate.getMinutes()) >= 10 ? endDate.getMinutes() : '0' + endDate.getMinutes());
                return str;
            },
            onFiltered(filteredItems) {
                this.totalRows = filteredItems.length;
                this.currentPage = 1;
            },
            onSubmit(borrowingOrder) {
                if (borrowingOrder.approve === -1) {
                    this.$bvToast.toast(`请选择预约状态！`, {
                        title: '出错！',
                        toaster: 'b-toaster-top-center',
                        solid: true
                    });
                    return;
                }
                axios({
                    method: 'put',
                    url: '/api/manager/borrowing/id/' + borrowingOrder.orderId + '/orderStatusValue/' + borrowingOrder.approve
                }).then(() => {
                    this.isBusy = true;
                    this.getOrders().then(response => {
                        this.commitOrders(response.data);
                        this.orders = response.data;
                        this.orders.forEach(item => {
                            item.approve = -1;
                        });
                        this.totalRows = this.orders.length;
                        this.currentPage = 1;
                        this.isBusy = false;
                    }).catch(reject => {
                        this.$bvToast.toast(`发生意外错误（状态码${reject.response.status}），请刷新页面或重新载入！`, {
                            title: '出错！',
                            toaster: 'b-toaster-top-center',
                            solid: true
                        })
                    });
                }).catch(reject => {
                    this.$bvToast.toast(`发生意外错误（状态码${reject.response.status}），请刷新页面或重新载入！`, {
                        title: '出错！',
                        toaster: 'b-toaster-top-center',
                        solid: true
                    })
                });
            }
        },
        created() {
            if (this.loginStatus)
                this.changeManagerNavItem(0);
            else
                this.$router.push('/manager/login');

            this.isBusy = true;
            this.getOrders().then(response => {
                this.commitOrders(response.data);
                this.orders = response.data;
                this.orders.forEach(item => {
                    item.approve = -1;
                });
                this.totalRows = this.orders.length;
                this.currentPage = 1;
                this.isBusy = false;
            }).catch(error => {
                this.$bvToast.toast(`发生意外错误（状态码${error.response.status}），请刷新页面或重新载入！`, {
                    title: '出错！',
                    toaster: 'b-toaster-top-center',
                    solid: true
                })
            });
        }
    }

</script>

<style lang="scss" scoped>

    .custom-h3 {
        font-weight: bold;
        font-size: 1.5rem;
    }

</style>
