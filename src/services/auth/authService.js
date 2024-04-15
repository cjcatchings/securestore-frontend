
const AUTH_URL = process.env.AUTH_URL;
const AUTH_CLIENT_ID = process.env.AUTH_CLIENT_ID;
const AUTH_CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET;
const AUTH_REDIRECT_URI = process.env.AUTH_REDIRECT_URI;

export async function authenticateUser(username, password){

    const reqBody = {
        username: username,
        password: password,
        client_id: AUTH_CLIENT_ID,
        client_secret: AUTH_CLIENT_SECRET,
        redirect_uri: AUTH_REDIRECT_URI,
        grant_type: 'password'
    };

    const reqBodyForm = [];
    for(let prop in reqBody){
        const encodedKey = encodeURIComponent(prop);
        const encodedValue = encodeURIComponent(reqBody[prop]);
        reqBodyForm.push(encodedKey + '=' + encodedValue);
    }

    const authResp = await fetch(`${AUTH_URL}`, {
        method: "POST",
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Access-Control-Request-Headers': process.env.ACCESS_CONTROL_HEADERS
        },
        body: reqBodyForm.join('&')
    })

    if(!authResp.ok){
        console.error(authResp.error);
        throw new Error("Failed to authenticate user.");
    }
    return authResp.json();

};

export async function validateUserToken(token, withPayload, withFirstName){

    const tokenToValidate = token;
    const withPayloadStr = withPayload ? "True": "False";
    const withFirstNameStr = withFirstName ? "True": "False";

    if(tokenToValidate == null){
        return {
            authenticated: false,
            name: null
        };
    }

    return fetch(`${AUTH_URL}/validate_token?withPayload=${withPayloadStr}&withName=${withFirstNameStr}`, {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + tokenToValidate
        }
    })
    .then(resp => {return resp.json()})
    .then(data => {
        const tokenValid = data.authenticated;
        const resp = {};
        resp['authenticated'] = tokenValid;
        if(!tokenValid){
            resp['reason'] = data.reason;
        }else{
            resp['name'] = data.name;
        }
        return resp;
    })
    .catch(err => {
        console.error("Verification of access token failed.", err);
        return {
            authenticated: false,
            name: null
        };
    });

}
