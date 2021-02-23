<template>
	<div class="article" :class="{ loading }">
		<h1>Товары</h1>
		
		<div class="row mt-3 mb-3">
			<div class="col-md-4">
				<p>Фильтр по цене</p>
				<vue-slider 
					v-model="value"
					:lazy="true"
					@drag-end="filter"
					:min="100"
					:max="8000" 
				></vue-slider>
				<div class="input-group">
					<input type="text" aria-label="Цена от" :value="`${value[0]} р.`" id="price_from"  class="form-control">
					<input type="text" aria-label="Цена до" :value="`${value[1]} р.`" id="price_to" class="form-control">
				</div>
			</div>
			<div class="col-md-4">
				<p>Категория</p>

				<div v-for="cat in category" :key="cat.id" class="form-check form-switch">
					<input class="form-check-input" type="checkbox" 
						:id="cat.id"
						v-model="selectedFilters.category"
						:value="cat.name"
						@change="filter"
					>
					<label class="form-check-label" :for="cat.id">{{ cat.name }}</label>
				</div>
			
			</div>
			<div class="col-md-4">
				<p>Наличие</p>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" 
						id="nal"
						v-model="selectedFilters.nal"
						:value="1"
						@change="filter"
					>
					<label class="form-check-label" for="nal">Показывать только в наличии</label>
				</div>					
			</div>			
		</div>


		<div class="row row-cols-1 row-cols-md-3 g-4">


			<div v-for="product in products" :key="product.id" class="col ">
				<div  class="card h-100">
					<svg class="bd-placeholder-img card-img-top" width="100%" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false">
					<title>Placeholder</title>
					<rect width="100%" height="100%" fill="#868e96"></rect>
					<text x="50%" y="50%" fill="#dee2e6" dy=".3em">Фото нет</text>
					</svg>

					<div class="card-body">
						<p class="card-text">{{ product.art }}</p>
						<p class="card-text">
							<span v-if="product.stock==1" style="color:green">в наличии</span>
							<span v-else style="color:red">Не в наличии</span>
						</p>
						<h5 class="card-title">{{ product.name }}</h5>
						<p class="card-title category">{{ product.category }}</p>
						<h4 class="card-title">{{ product.price }} р.</h4>
						<button type="button" class="btn btn-primary" @click="addToCart({ id: product.id, count :'1'})">В корзину</button>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-5">
			<pagination 
				v-model="page" 
				:records="total" 
				:per-page="6"
				@paginate="paginate"/>

		</div>

		<div v-if="loading" class="d-flex justify-content-center spinner">
			<div class="spinner-border text-danger" role="status" style="width: 6rem; height: 6rem;">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>


	</div>
</template>



<script>
	import { mapGetters, mapActions } from 'vuex';

	import VueSlider from 'vue-slider-component';
	import 'vue-slider-component/theme/default.css';

	export default {
		components: {
			VueSlider
		},
		data() {
      return {
				page: 1,
				value: [100, 8000],
				category: [
					{
						name: "ферби коннект", 
						id: "connect"
					},
					{
						name: "ферби кристалл", 
						id: "cristall"
					},
					{
						name: "VIP", 
						id: "vip"
					},
					{
						name: "ферби бум русифицированные", 
						id: "boom_rus"
					},
					{
						name: "ферблинги", 
						id: "furbling"
					},
					{
						name: "аксессуары", 
						id: "acc"
					},
				],
				selectedFilters: {
					category: [],
					nal: false
				}
      }    
    },
		computed: {
			...mapGetters('products', { products: 'all', total: 'total', loading: 'loading' }),
			...mapGetters('cart', { cart: 'all' }),
			n_page(){
				return this.$route.query.page ? this.$route.query.page : 1;
      },
		},
		created() {
			this.setPage(this.n_page);
			this.load({page : this.n_page});
      this.getCart(this.id);
    },
		methods: {
			...mapActions('products', ['load']),
			...mapActions('cart', ['addToCart', 'getCart']),
			paginate(page) {
				this.load({page});
			},
			setPage(page) {
				this.page = page;
			},
			filter(event) {
				this.load({ price: this.value, filters: this.selectedFilters });
			}
		}
	}

</script>

<style>
	p.category {
		font-size:12px;
		color:rgb(119, 119, 119)
	}
</style>