import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const HomeSection = () => import('../components/Home');
const SpaceInfo = () => import('../components/SpaceInfo');
const BorrowingManager = () => import('../components/BorrowingManager');
const NewOrder = () => import('../components/BorrowingManager/NewOrder');
const OrderList = () => import('../components/BorrowingManager/OrderList');

const index = new VueRouter({
    routes: [{
        path: '/home',
        component: HomeSection
    }, {
        path: '/space',
        component: SpaceInfo
    }, {
        path: '/borrowing',
        component: BorrowingManager,
        children: [{
            path: 'newOrder/:roomName',
            component: NewOrder,
            props: true
        }, {
            path: 'orderList',
            component: OrderList
        }, {
            path: '',
            redirect: 'newOrder/'
        }, {
            path: 'newOrder',
            redirect: 'newOrder/null'
        }]
    }, {
        path: '/',
        redirect:
            '/home'
    }]
});
export default index;
