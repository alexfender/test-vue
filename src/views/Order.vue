<template>

  <div class="article">

  <div v-if="loading" class="d-flex justify-content-center" style="margin-top:80px">
    <div class="spinner-border text-danger"  style="width: 6rem; height: 6rem;" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <template v-else>




    <button class="btn btn-primary" @click="back"> Назад к списку товаров</button>
    <h1>Заказ № {{ order.id }}</h1>
    
    <h4>Клиент: {{ order.firstname }} {{ order.lastname }}</h4>

    <h4>Сумма заказа: {{ order.total }}</h4>

    <h4>Статус заказа: {{ order.status }}</h4>

    <h3>Список товаров</h3>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Артикул</th>
          <th scope="col">Цена</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prod in order.product" :key="prod.order_product_id">
          <td>{{ prod.order_product_id }}</td>
          <td>{{ prod.name }}</td>
          <td>{{ prod.art }}</td>
          <td>{{ prod.price }}</td>
          <td>{{ prod.quantity }}</td>
          <td>{{ prod.price * prod.quantity }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Итого</td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ order.count }}</td>
          <td>{{ order.summ }}</td>
        </tr>
      </tfoot>
    </table>




  </template>

  </div>
</template>


<script>

  import { mapGetters, mapActions } from 'vuex';
  import store from '../store';
  import router from '../router';

	export default {

		components: {
    },
    created() {
      this.load(this.id);
    },
		computed: {
      ...mapGetters('order', { orderProxy: 'order', loading: 'loading' }),
      id(){
				return this.$route.params.id;
      },
      getOrder(){
        this.load(this.id);
      },
    	order(){
        return this.orderProxy();
			},
    },
		methods: {
      ...mapActions('order', ['load']),
      back() {
        router.go(-1);
      }
		}
  }
</script>