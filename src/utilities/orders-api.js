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

export function addToCartFromItemPage(itemId, restaurantId) {
    console.log(itemId, 'itemId in orders api FOR ITEM PAGE')
    console.log(restaurantId, 'restaurantID for add to Order Item Page')
    return sendRequest(`${BASE_URL}/cart/items/itemPage/${itemId}`, 'POST', {itemId, restaurantId});
}

export function setItem(itemId, newQty) {
    console.log(itemId, 'itemId in ordersAPI');
    console.log(newQty, 'newQty in ordersAPI');
    return sendRequest(`${BASE_URL}/cart/quantity`, 'PUT', {itemId, newQty });
}

export function getTotal() {
    console.log(`made it inside getTotal API`);
    // does anything need to be passed into this? 
    return sendRequest(`${BASE_URL}/cart/total`);
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

export function checkPromoCode(promoCode) {
    console.log(promoCode, 'promoCode in utilities')
    return sendRequest(`${BASE_URL}/checkPromoCode`, 'POST', {promoCode})
}