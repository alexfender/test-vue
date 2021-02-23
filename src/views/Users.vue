<template>
<div class="article" :class="{ loading }">
	<h1>Покупатели</h1>
	<table class="table">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Дата</th>
				<th scope="col">Имя</th>
				<th scope="col">Фамилия</th>
				<th scope="col"></th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="user in users" 
				:key="user.customerid">
				<th scope="row">{{ user.customerid }}</th>
				<td>{{ user.date }}</td>
				<td>{{ user.firstname }}</td>
				<td>{{ user.lastname }}</td>
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
			...mapGetters('users', { users: 'all' , total: 'total', loading: 'loading' }),
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
			...mapActions('users', ['load']),
			...mapMutations('users', ['setPage1']),
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