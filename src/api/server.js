

export async function chatMessage(data) {
  const url = 'chatMessage.php';
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}`, {
    method: 'POST',
    body: data
  });
  return await response.json();
}

export async function getChat(data) {
  const url = 'getChat.php';
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}`);
  return await response.json();
}

export async function getChart(data) {
  const url = 'getChart.php';
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}`);
  return await response.json();
}

export async function createOrder(data) {
  const url = 'createOrder.php';
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}`, {
    method: 'POST',
    body: data
  });
  return await response.json();
}

export async function getProducts(data) {
  const url = 'getProducts.php';
  const page = data.page ? `?page=${data.page}` : '';
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}${page}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },   
    body: JSON.stringify(data)
  });
  
  return await response.json();
}

export async function addToCart(id, cart_id, count) {
  const url = 'updateCart.php';
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}?id=${id}&cart_id=${cart_id}&count=${count}&action=add`);
  return await response.json();
}

export async function cartSetCount(id, cart_id, action) {
  const url = 'updateCart.php';
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}?id=${id}&cart_id=${cart_id}&action=${action}`);
  return await response.json();
}

export async function cartRemove(id, cart_id) {
  const url = 'updateCart.php';
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}?id=${id}&cart_id=${cart_id}&action=remove`);
  return await response.json();
}

export async function getCart(cart_id) {
  const url = 'getCart.php';
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}?cart_id=${cart_id}`);
  return await response.json();
}

export async function getOrders(data) {
  const url = 'getOrders.php';
  const page = data.page ? `?page=${data.page}` : '';
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}${page}`);
  return await response.json();
}

export async function getOrder(id) {
  const url = 'getOrders.php';
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}?id=${id}`);
  return await response.json();
}

export async function removeOrder(id) {
  let url = `remove.php?id=${id}`;
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}`);
  return await response.json();
}

export async function getUsers(data) {
  const url = 'getUsers.php';
  const page = data.page ? `?page=${data.page}` : '';
  let response = await fetch(`${process.env.VUE_APP_BASE_URL}${url}${page}`);
  return await response.json();
}
