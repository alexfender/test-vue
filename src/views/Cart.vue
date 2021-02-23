<template>
<div class="article" :class="{ loading }">

	<div v-if="loading" class="d-flex justify-content-center spinner">
		<div class="spinner-border text-danger" role="status" style="width: 6rem; height: 6rem;">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>

	<h1>Корзина</h1>

	<div v-if="orderDone" class="alert alert-success" role="alert">
		Ваш заказ № {{ order_id }} успешно оформлен!
	</div>

	<div v-else-if="cartCount==0" class="alert alert-primary" role="alert">
		Корзина пока пуста!
	</div>

	<template v-else>
		<table  class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Товар</th>
					<th scope="col">Цена</th>
					<th scope="col">Кол-во</th>
					<th scope="col">Сумма</th>
					<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="cart in productsCart" :key="cart.product.id">
					<td>{{ cart.product.id }}</td>
					<td>{{ cart.product.name }}</td>
					<td>{{ cart.product.price }} р.</td>
					<td>{{ cart.count }}</td>
					<td>{{ cart.count * cart.product.price }} р.</td>
					<td>
						<div class="btn-group" role="group">
							<button 
								class="btn btn-warning" 
								@click="decrease(cart.product.id)">-
								</button>
							<button 
								class="btn btn-success" 
								@click="increase(cart.product.id)">+
								</button>
							<button 
								class="btn btn-danger" 
								@click="remove(cart.product.id)">X
								</button>
						</div>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td>Итого:</td>
					<td></td>
					<td></td>
					<td>{{ cartCount }}</td>
					<td>{{ cartSumm }} р.</td>
					<td></td>
				</tr>
			</tfoot>
		</table>




		<div class="mb-3" v-for="field in fields" :key="field.name">
			<label for="firstname" class="form-label">{{ field.label }}</label>
			<input type="text" class="form-control"
				:placeholder="field.placeholder" 
				:id="field.name"
				:name="field.name"
				:value="field.value"
				@input="onInput"
				:class="field.valid"
				>
				<div v-if="field.valid=='is-invalid'" id="validationServerUsernameFeedback" class="invalid-feedback">
					Это поле обязательно для заполнения
				</div>
		</div>

		<button type="button" class="btn btn-primary btn-lg" @click="createOrder()">Оформить заказ</button>

	</template>


</div>


</template>


<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	export default {
		computed: {
			...mapGetters('cart', { productsCart: 'all', cartCount: 'count', cartSumm: 'summ', loading: 'loading', fields: 'fields', orderDone: 'orderDone', order_id: 'order_id' }),
		},
		methods: {
			...mapActions('cart', ['remove', 'increase', 'decrease', 'createOrder']),
			...mapMutations('cart', { onInput: 'setField' })
		}
	}

</script>
<style>
.article {
    position: relative;
}
.spinner {
	position: absolute;
	left: calc( 50% - 48px);
	top: calc( 50% - 18px);
}

.article.loading {
    opacity: 0.6;
}

</style>