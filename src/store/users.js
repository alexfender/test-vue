import { getUsers } from '@/api/server';
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
        let query = data.page > 1 ? `?page=${data.page}` : 'users';
        router.push(query);
      }
      let users = await getUsers(data);
      console.log(data);
      commit('setItems', users.items);
      commit('setTotal', users.total);
      commit('loading', false);

    }
  }
} 