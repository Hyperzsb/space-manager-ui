import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from '../store'

Vue.use(VueRouter);

const ClientUi = () => import('../components/ClientUi');
const Home = () => import('../components/ClientUi/Home');
const Space = () => import('../components/ClientUi/Space');
const Borrowing = () => import('../components/ClientUi/Borrowing');
const NewOrder = () => import('../components/ClientUi/Borrowing/NewOrder');
const OrderList = () => import('../components/ClientUi/Borrowing/OrderList');
const ManagerUi = () => import('../components/ManagerUi');
const Login = () => import('../components/ManagerUi/Login');
const Logout = () => import('../components/ManagerUi/Logout');
const BorrowingManager = () => import('../components/ManagerUi/Borrowing');
const SpaceManager = () => import('../components/ManagerUi/Space');
const Guide = () => import('../components/ManagerUi/Guide');

const index = new VueRouter({
    routes: [{
        path: '/',
        component: ClientUi,
        children:
            [{
                path: 'home',
                component: Home
            }, {
                path: 'space',
                component: Space
            }, {
                path: 'borrowing',
                component: Borrowing,
                children: [{
                    path: 'newOrder/:roomName',
                    component: NewOrder,
                    props: true
                }, {
                    path: 'orderList',
                    component: OrderList
                }, {
                    path: '',
                    redirect: 'newOrder'
                }, {
                    path: 'newOrder',
                    redirect: 'newOrder/null'
                }]
            }, {
                path: '/',
                redirect: '/home'
            }]
    }, {
        path: '/manager',
        component: ManagerUi,
        children: [{
            path: 'login',
            component: Login
        }, {
            path: 'logout',
            component: Logout
        }, {
            path: 'borrowing',
            component: BorrowingManager,
            meta: {
                requiresAuth: true
            }
        }, {
            path: 'space',
            component: SpaceManager,
            meta: {
                requiresAuth: true
            }
        }, {
            path: 'guide',
            component: Guide,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '',
            redirect: 'borrowing'
        }]
    }]
});
index.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (store.state.loginStatus) {
            next();
        } else {
            if (sessionStorage.getItem('user') === 'null' && sessionStorage.getItem('token') === 'null') {
                next('/manager/login');
            } else {
                axios({
                    method: 'get',
                    url: '/api/manager/authentication'
                }).then(() => {
                    store.commit('changeLoginStatus', true);
                    store.commit('commitUser', sessionStorage.getItem('user'));
                    store.commit('commitToken', sessionStorage.getItem('token'));
                    next();
                }).catch(() => {
                    sessionStorage.setItem('user', null);
                    sessionStorage.setItem('token', null);
                    next('/manager/login');
                });
            }
        }
    } else {
        next();
    }
});

export default index;
