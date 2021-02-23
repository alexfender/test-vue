import { createRouter, createWebHistory } from 'vue-router'; 

import Orders from '@/views/Orders';
import Order from '@/views/Order';
import Users from '@/views/Users';
import Products from '@/views/Products';
import Cart from '@/views/Cart';
import Chat from '@/views/Chat';
import Chart from '@/views/Chart';


let routes = [
  {
    name: 'orders',
    path: '/orders',
    component: Orders
  },
  {
    name: 'users',
    path: '/users',
    component: Users
  },
	{		
		name: 'order',
		path: '/orders/:id',
		component: Order
  },
	{		
		name: 'products',
		path: '/products',
		component: Products
	},
	{		
		name: 'cart',
		path: '/cart',
		component: Cart
	},
	{
		name: 'chat',
		path: '/chat',
		component: Chat
	},
	{
		name: 'chart',
		path: '/',
		component: Chart
	},
];

export default createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
});