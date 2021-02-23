<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">Navbar</a>

      <router-link v-if="cartCount>0" :to="{ name: 'cart' }" class="btn btn-success btn-sm">
        <div>Корзина</div>
        <div>Товаров <b>{{ cartCount }}</b> на сумму <b>{{ cartSumm }} р.</b></div>
      </router-link>
      <div v-else class="btn btn-primary btn-sm">Корзина пока пуста</div>
    </div>
  </nav>

  <div class="container" style="margin-top: 70px;">
    <div class="row">
      <div class="col-md-3">
        <ul class="nav flex-column">
          <router-link 
            v-for="item in menu"
            :key="item.route"
            :to="{ name: item.route }" 
            v-slot="{ route, navigate, isActive }" 
            :custom="true"
          >
            <li class="nav-item" :class="isActive ? 'active' : ''"  >
              <a class="nav-link" :href="route.fullPath" @click="navigate">{{ item.title }}</a>
            </li>
          </router-link>
        </ul>
      </div>
      <div class="col-md-9">
        <router-view v-slot="{ Component }">
          <transition name="section" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
	export default {
		data: () => ({
			menu: [
        { route: 'chart', title: 'Графики' },
				{ route: 'orders', title: 'Заказы' },
        { route: 'users', title: 'Пользователи' },
        { route: 'products', title: 'Товары' },
        { route: 'cart', title: 'Корзина' },
        { route: 'chat', title: 'Чат с клиентом' }
			]
    }),
    computed: {
      ...mapGetters('cart', { cartCount: 'count', cartSumm: 'summ'})
    },
		methods: {
      
		}
	}
</script>

<style>
  li.nav-item.active {
      background: #0d6efd;
  }
  li.nav-item.active a{
    color: #fff;
  }
  .section-enter-active {
    animation: fadeIn  0.2s;
  }
  .section-leave-active {
    animation: fadeOut  0.2s;
  }
  @keyframes fadeIn{
    from {opacity: 0;}
    to { opacity: 1;}
  }
  @keyframes fadeOut{
    from {opacity: 1;}
    to { opacity: 0;}
  }
</style>


