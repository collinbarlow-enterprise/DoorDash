import sendRequest from './send-request';
const BASE_URL = '/api/orders';

export function getCart() {
    return sendRequest(`${BASE_URL}/cart`);
}
export function addToCart(itemId) {
    console.log(itemId, 'itemID in ORDERS API')
    return sendRequest(`${BASE_URL}/cart/items/${itemId}`, 'POST');
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