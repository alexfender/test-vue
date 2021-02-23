import { createStore } from 'vuex'
import orders from './orders';
import order from './order';
import products from './products';
import cart from './cart';
import users from './users';

export default createStore({
  modules: {
    orders,
    order,
    products,
    cart,
    users
  },
  strict: process.env.NODE_ENV !== 'production',
});