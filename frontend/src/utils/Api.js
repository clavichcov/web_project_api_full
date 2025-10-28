

export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }


    _makeRequest(endpoint, method, body = null) {
        const options = {
            method,
            headers: this._headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        return fetch(`${this._baseUrl}${endpoint}`, options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            });


    }
    getUserInfo() {
        return this._makeRequest('/users/me', 'GET');
    }

    updateUserInfo(name, about) {
        return this._makeRequest('/users/me', 'PATCH', { name, about });

    }

    updateUserAvatar(avatar) {
        return this._makeRequest('/users/me/avatar', 'PATCH', { avatar });

    }

    getInitialCards() {
        return this._makeRequest('/cards', 'GET');

    }

    addCard(name, link) {
        return this._makeRequest('/cards', 'POST', { name, link });

    }

    deleteCard(cardId) {
        return this._makeRequest(`/cards/${cardId}`, 'DELETE');

    }

    likeCard(cardId) {
        return this._makeRequest(`/cards/${cardId}/likes`, 'PUT');

    }
    dislikeCard(cardId) {
        return this._makeRequest(`/cards/${cardId}/likes`, 'DELETE');

    }

}

export default Api;

/*const apiAcces = new Api({
    baseUrl: "https://se-register-api.en.tripleten-services.com/v1",
    headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
    }
});*/


/*export const apiAcces = new Api ( {
    baseUrl : "https://around-api.es.tripleten-services.com/v1",
    headers : {
        Authorization: "7d6605b4-d435-4af1-8d05-f10a54b28ea3",
        id: "4a1374e06fad7fc5cf6291ae",
        'Content-Type': 'application/json'
      }
   });*/