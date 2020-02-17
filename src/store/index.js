import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        navItem: -1,
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
        changeNavItem(state, index) {
            state.navItem = index;
        },
        getRooms(state, rooms) {
            state.rooms = rooms;
        },
        getOrders(state, orders) {
            state.orders = orders;
        }
    },
    actions: {
        getRooms(context) {
            if (context.state.rooms.length === 0) {
                axios.get('/api/room/')
                    .then(response => {
                        context.commit('getRooms', response.data);
                    }).catch(() => {
                    context.commit('getRooms', null);
                });
            }
        },
        getAsyncOrders() {
            // if (context.state.orders.length === 0) {
            //     axios.get('/api/order/')
            //         .then(response => {
            //             context.commit('getOrders', response.data);
            //         }).catch(() => {
            //         context.commit('getRooms', null);
            //     })
            // }
            return axios.get('/api/order/');
        },
        addOrder(context, order) {
            return axios({
                method: 'post',
                url: '/api/order/',
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
