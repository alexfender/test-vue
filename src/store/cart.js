import { addToCart, getCart, cartSetCount, cartRemove, createOrder } from '@/api/server';
import { v4 as uuidv4 } from 'uuid';
import store from '../store';

export default {
  namespaced: true,
  state: {
    items: [],
    loading: false,
    fields: [
      { 
        name: 'firstname',
        label: 'Имя',
        placeholder: 'Иван',
        value: '' 
      },
      { 
        name: 'lastname',
        label: 'Фамилия',
        placeholder: 'Иванов',
        value: ''  
      },
      { 
        name: 'phone',
        label: 'Телефон',
        placeholder: '+7 999 999 99 99',
        value: ''   
      },
      { 
        name: 'email',
        label: 'E-mail',
        placeholder: 'name@example.com',
        value: ''   
      }
    ],
    orderDone: false,
    order_id: ''
  },
  getters: {
    all: state => state.items,
    count: state => state.items.reduce((result, cartItem) => result + parseFloat(cartItem.count), 0),
    summ: state => state.items.reduce((result, cartItem) => result + parseFloat(cartItem.product.price * cartItem.count), 0),
    loading: state => state.loading,
    fields: state => state.fields,
    orderDone: state => state.orderDone,
    order_id: state => state.order_id
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    loading(state, action ) {
      state.loading = action;
    },
    setField(state, e) {
      let field = state.fields.filter(field => field.name == e.target.name);
      field[0].value = e.target.value;
      field[0].valid = e.target.value.length ? 'is-valid' : 'is-invalid';
    },
    cleanFields(state) {
      state.fields.forEach(field => {
        field.value = '';
        field.valid = '';
      });
    },
    orderDone(state) {
      state.orderDone = true;
    },
    order_id(state, order_id ) {
      state.order_id = order_id;
    },
    setInvalid(state, name) {
      let field = state.fields.filter(field => field.name == name);
      field[0].valid = 'is-invalid';
    }
  },
  actions: {
    async getCart({ getters, commit }) {
      let cart_id = localStorage.getItem('cart_id');
      if (cart_id) {
        let items = await getCart(cart_id);
        commit('setItems', items);
      }
    },
    async decrease({ getters, commit }, id) {
      commit('loading', true );
      let cart_id = localStorage.getItem('cart_id');
      let cart = await cartSetCount(id, cart_id, 'decrease');
      cart && this.dispatch('cart/getCart').then(() => { 
        commit('loading', false ); 
      });
    },
    async increase({ getters, commit }, id) {
      commit('loading', true );
      let cart_id = localStorage.getItem('cart_id');
      let cart = await cartSetCount(id, cart_id, 'increase');
      cart && this.dispatch('cart/getCart').then(() => {
        commit('loading', false ); 
      });
    },
    async remove({ getters, commit }, id) {
      commit('loading', true );
      let cart_id = localStorage.getItem('cart_id');
      let cart = await cartRemove(id, cart_id);
      cart && this.dispatch('cart/getCart').then(() => {
        commit('loading',  false ); 
      });
    },
    async addToCart({ getters, commit }, { id, count }) {
      let cart_id = localStorage.getItem('cart_id');
      if (!cart_id) {
        let cart_id = uuidv4();
        localStorage.setItem('cart_id', cart_id);
      }
      let cart = await addToCart(id, cart_id, count);
      cart && this.dispatch('cart/getCart').then(() => {});
    },
    async createOrder({ getters, commit }) {

      let error = false;
      for (var key in getters.fields) {
        if (!getters.fields[key].value.length) {
          commit('setInvalid', getters.fields[key].name); 
          error = true;
        };
      }

      if (!error) {
        let form_data = new FormData();
        for (var key in getters.fields) {
          form_data.append(getters.fields[key].name, getters.fields[key].value);
        }
        let cart_id = localStorage.getItem('cart_id');
        form_data.append('cart_id', cart_id);
        let res = await createOrder(form_data);

        if (res.order_id) {
          commit('orderDone', true);
          commit('order_id', res.order_id);
          commit('cleanFields');

          store.dispatch('orders/load').then(() => {});
          store.dispatch('cart/getCart').then(() => {});

        }
      }
    }
  }
} 