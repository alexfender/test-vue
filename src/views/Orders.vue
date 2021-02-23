<template>
<div class="article" :class="{ loading }">
	<h1>Заказы</h1>
	<table class="table">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Дата</th>
				<th scope="col">Клиент</th>
				<th scope="col">Статус</th>
				<th scope="col">Сумма</th>
				<th scope="col"></th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="order in orders" 
				:key="order.id">
				<th scope="row">{{ order.id }}</th>
				<td>{{ order.date }}</td>
				<td>{{ order.firstname }} {{ order.lastname }}</td>
				<td>{{ order.status }}</td>
				<td>{{ order.total>0 ? `${order.total} р.` : ''}}</td>
				<td>
					<div class="btn-group" role="group" aria-label="Basic mixed styles example">
						<router-link 
							:to="`/orders/${order.id}`"
            	v-slot="{ route, navigate }" 
            	:custom="true"
						>
							<a type="button" class="btn btn-success" :href="route.fullPath" @click="navigate">Ред.</a>
						</router-link>
						

						<button v-if="!order.loading" type="button" class="btn btn-danger" @click="remove(order.id)">X</button>
						<button v-else type="button" class="btn btn-danger" @click="remove(order.id)">
							<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  						<span class="visually-hidden">Loading...</span>
						</button>
					</div>
				</td>
			</tr>

		</tbody>
	</table>

	<div v-if="loading" class="d-flex justify-content-center spinner">
		<div class="spinner-border text-danger" role="status" style="width: 6rem; height: 6rem;">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>

	<div class="mt-5">
		<pagination 
			v-model="page" 
			:records="total" 
			:per-page="10"
			@paginate="paginate"/>

	</div>

</div>
</template>


<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	export default {
		data() {
      return {
        page: 1
      }    
    },
		computed: {
			...mapGetters('orders', { orders: 'all' , total: 'total', loading: 'loading' }),
			n_page(){
				return this.$route.query.page ? this.$route.query.page : 1;
      },
		},
		created() {
			this.setPage(this.n_page);
			this.setPage1(this.n_page);
			this.load({page : this.n_page});
    },
		methods: {
			...mapActions('orders', ['remove', 'load']),
			...mapMutations('orders', ['setPage1']),
			paginate(page) {
				this.load({page});
				this.setPage1(page);
			},
			setPage(page) {
				this.page = page;
			}
		}
	}

</script>