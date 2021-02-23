import { getProducts } from '@/api/server';
import router from '../router';
export default {
  namespaced: true,
  state: {
    items: [],
    total: 0,
    loading: false
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
    loading(state, action) {
      state.loading = action;
    },     
    remove(state, id) {
      state.items = state.items.filter(product => product.id !== id);
    }
  },
  actions: {
    async load({ getters, commit }, data={}) {
      commit('loading', true);
      if (data.page) {
        let query = data.page > 1 ? `?page=${data.page}` : 'products';
        router.push(query);
      }
      let products = await getProducts(data);
      commit('setItems', products.items);
      commit('setTotal', products.total);
      commit('loading', false);
    },
    async remove({ getters, commit }, id) {

      // commit('loading', id);

      // let res = await removeOrder(id);
      // res && this.dispatch('orders/load').then(() => {});
    }
  }
} 