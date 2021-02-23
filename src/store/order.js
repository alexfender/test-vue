import { getOrder } from '@/api/server';

export default {
  namespaced: true,
  state: {
    order: {},
    loading: false
  },
  getters: {
    order: state => id => state.order,
    loading: state => state.loading
  },
  mutations: {
    setOrder(state, order) {
      state.order = order;
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    async load({ getters, commit }, id) {

      commit('setLoading', true);
      commit('setOrder', {});
      //console.log(id);
      let order = await getOrder(id);

      //return order;
      commit('setOrder', order);

      commit('setLoading', false);

      console.log(this.state.order);
    }
  }
}