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