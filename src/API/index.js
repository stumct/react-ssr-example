const parseResponse = response => {
    console.log('parseResponse', response);
    if (response.ok) {
        return response[response.status == 204 || response.status === 401 ? 'text' : 'json']();
    }
    if (response.status == 422) {
        return response.json().then(err => {
            throw err;
        });
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

const parseError = err => console.log('ERROR', err);

export const _login = (email, password) => {
    var myHeaders = new Headers();
    myHeaders.append('content-type', 'application/x-www-form-urlencoded');
    return fetch('/auth/login',
        {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: `email=${email}&password=${password}`
        })
        .then(parseResponse)
};
export const _register = (email, password) => {
    var myHeaders = new Headers();
    myHeaders.append('content-type', 'application/x-www-form-urlencoded');
    return fetch('/auth/register',
        {
            method: 'POST',
            headers: myHeaders,
            credentials: 'same-origin',
            body: `email=${email}&password=${password}`
        })
        .then(parseResponse)
};