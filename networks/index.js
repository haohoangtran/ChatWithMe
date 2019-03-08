const BASE_URL = "http://chatwithmee.herokuapp.com/api/";
// const BASE_URL = "http://172.30.4.17:6969/api/";
// const BASE_URL = "http://192.168.43.194:6969/api/";
let USER_TOKEN = "";

function setUserToken(token) {
    USER_TOKEN = token;
}

function post(sublink, body, header, callback) {
    fetch(`${BASE_URL}${sublink}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            UserToken: USER_TOKEN,
            ...header
        },
        body: JSON.stringify(body),
    }).then((response) => response.json())
        .then((responseJson) => {

            console.log("res", responseJson)
            callback(null, responseJson)
        })
        .catch((error) => {

            console.log("err", error)
            callback(error);
        });
}

function get(sublink, header, callback) {
    fetch(`${BASE_URL}${sublink}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            UserToken: USER_TOKEN,
            ...header
        },
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log("res", responseJson)
            callback(null, responseJson)
        })
        .catch((error) => {
            console.log("err", error)
            callback(error);
        });
}
export {post, get, setUserToken}
