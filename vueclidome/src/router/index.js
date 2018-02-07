import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由页面
import Shop from '@/views/shop'
import Item from '@/views/item'
import Cart from '@/views/cart'
import Checkout from '@/views/checkout'
import Paryment from '@/views/paryment'
import Account from '@/views/account'
import Address from '@/views/account/address'
import Order from '@/views/account/order'

let vueRouter =  new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/item',
      name: 'Item',
      component: Item
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/paryment',
      name: 'Paryment',
      component: Paryment
    },
    {
      path: '/account',
      component: Account,
      children: [
        {
          path: '/',
          name: 'Account',
          component: Order
        },
        {
          path: 'address',
          name: 'Address',
          component: Address
        }
      ] 
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default vueRouter;