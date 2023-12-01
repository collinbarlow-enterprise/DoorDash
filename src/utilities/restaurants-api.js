import sendRequest from "./send-request";
const BASE_URL = '/api/restaurants'

export function getRestaurant() {
    console.log("made it inside restaurants-api")
    return sendRequest(BASE_URL)
}

export function getOneRestaurant(id) {
    console.log(id, 'ID made it inside getOneRestaurant api')
    return sendRequest(`${BASE_URL}/getOneRestaurant/${id}`)
}

export function getMenuItem(id, menuId) {
    console.log(id, 'ID made it inside getMenuItem api')
    console.log(menuId, 'menuID made it inside getMenuItem api')
    return sendRequest(`${BASE_URL}/getMenuItem/${id}/${menuId}`, 'GET')
}