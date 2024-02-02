import sendRequest from './send-request';
const BASE_URL = '/api/paidOrders';

export function getPaidOrders() {
    return sendRequest(`${BASE_URL}/paidOrders`)
}

export function convertOrderToPaidOrder({cart}) {
    console.log(cart, 'cart in convert To Paid Order')
    return sendRequest (`${BASE_URL}/convertToPaidOrder`, 'PUT', {cart})
}