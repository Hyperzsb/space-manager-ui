import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        token: null,
        loginStatus: false,
        clientNavItem: -1,
        managerNavItem: -1,
        rooms: [],
        orders: []
    },
    getters: {
        availableRooms: state => {
            return state.rooms.filter(room => room.availabilityValue === 1);
        },
        availableOrders: state => {
            return state.orders.filter(order => order != null);
        }
    },
    mutations: {
        commitUser(state, user) {
            state.user = user;
        },
        commitToken(state, token) {
            state.toke = token;
        },
        changeLoginStatus(state, isLogin) {
            state.loginStatus = isLogin;
        },
        changeClientNavItem(state, index) {
            state.clientNavItem = index;
        },
        changeManagerNavItem(state, index) {
            state.managerNavItem = index;
        },
        commitRooms(state, rooms) {
            state.rooms = rooms;
        },
        commitOrders(state, orders) {
            state.orders = orders;
        }
    },
    actions: {
        getRooms() {
            return axios.get('/api/room/');
        },
        getOrders() {
            return axios.get('/api/borrowing/');
        },
        addOrder(context, order) {
            return axios({
                method: 'post',
                url: '/api/borrowing/',
                data: order,
                transformRequest: [function (data) {
                    return JSON.stringify(data).toString();
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
});
