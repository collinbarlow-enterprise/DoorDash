import sendRequest from './send-request';
const BASE_URL = '/api/paidOrders';

export function getPaidOrders() {
    return sendRequest(`${BASE_URL}/getPaidOrders`)
}

export function convertOrderToPaidOrder(cart) {
    console.log(cart, 'cart in convert To Paid Order')
    return sendRequest (`${BASE_URL}/convertToPaidOrder`, 'PUT', {cart})
}

export function updateOrderStatusAPI(ordersInProgress){
    console.log(ordersInProgress, 'orders in progress API');
    return sendRequest (`${BASE_URL}/updateOrderStatus`, 'PUT', {ordersInProgress})
    
}