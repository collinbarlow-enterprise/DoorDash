import sendRequest from "./send-request";
const BASE_URL = '/api/restaurants'

export function getRestaurant() {
    console.log("made it inside restaurants-api")
    return sendRequest(BASE_URL)
}