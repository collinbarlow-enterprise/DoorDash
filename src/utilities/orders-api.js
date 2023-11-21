import sendRequest from './send-request';
const BASE_URL = '/api/orders';

export function getCart() {
    return sendRequest(`${BASE_URL}/cart`);
}
export function addToCart(itemId, index, restaurant) {
    console.log(itemId, 'itemID in ORDERS API')
    console.log(index, 'index in ORDERS API')
    console.log(restaurant, 'restaurant in ORDERS API')
    return sendRequest(`${BASE_URL}/cart/items/${itemId}`, 'POST', {itemId, index, restaurant});
}

export function setItem(itemId, newQty) {
    return sendRequest(`${BASE_URL}/cart/quantity`, 'PUT', {itemId, newQty });
}
export function checkout() {
    return sendRequest(`${BASE_URL}/cart/checkout`, 'POST');
}

export function getPaidOrder() {
    return sendRequest(`${BASE_URL}/previousOrders`)
}

export function deleteOrder(order) {
    return sendRequest(`${BASE_URL}/deleteOrder`, 'DELETE', order );
}