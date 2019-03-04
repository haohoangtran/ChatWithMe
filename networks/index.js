const BASE_URL = "http://chatwithmee.herokuapp.com/api/";
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
            callback(null, responseJson)
        })
        .catch((error) => {
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
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error);
        });
}

export {post, get, setUserToken}
