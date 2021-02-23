import { getOrders, removeOrder } from '@/api/server';
import router from '../router';

export default {
  namespaced: true,
  state: {
    items: [],
    total: 0,
    loading: false,
    page: 1
  },
  getters: {
    all: state => state.items,
    total: state => state.total,
    page: state => state.page,
    loading: state => state.loading,
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setTotal(state, total) {
      state.total = total;
    }, 
    setPage1(state, page) {
      state.page = page;

      console.log(page);
    },      
    remove(state, id) {
      state.items = state.items.filter(order => order.id !== id);
    },
    loading(state, action) {
      state.loading = action;
    }, 
  },
  actions: {
    async load({ getters, commit }, data={}) {
      commit('loading', true);
      if (data.page) {
        let query = data.page > 1 ? `?page=${data.page}` : 'orders';
        router.push(query);
      }
      let orders = await getOrders(data);
      commit('setItems', orders.items);
      commit('setTotal', orders.total);
      commit('loading', false);


    },
    async remove({ getters, commit }, id) {

      commit('loading', true);

    
      let res = await removeOrder(id);
      res && this.dispatch('orders/load', { page: getters.page }).then(() => {
        commit('loading', false);
      });
    },
  }
} 