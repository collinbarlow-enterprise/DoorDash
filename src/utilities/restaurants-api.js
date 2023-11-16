import sendRequest from "./send-request";

export function getRestaurant() {
    console.log("made it inside restaurants-api")
    return sendRequest(`${BASE_URL}`)
}