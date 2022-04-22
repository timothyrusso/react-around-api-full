import { apiConfig } from './constants.js';

/**
 * Class for handling API calls
 * @param {Object} config - Object containing the configuration info for the API call
 */
class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    // this._groupId = config.groupId;
    this._header = config.headers;
  }

  /**
   * Private method that handle the status of the response and show a status message on the console
   * @param {Object} res - Object response
   * @returns {Object} Returns a promise that resolves with the result of parsing the response body text as JSON
   */
  _checkResponse(res) {
    if (res.ok) {
      console.log(
        `URL: ${res.url}
  Status: ${res.statusText}
  Status code: ${res.status}`);
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  /**
   * Function that return the information object of the user, necessary for creating the profile
   * @returns {Object} Promise object containing all the information of the user
   */
  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me/`, {
      headers: this._header
    })
      .then(this._checkResponse)
  }

  /**
   * Function that save the new name and new job informations of the user on the API
   * @param {String} name - Name of the user
   * @param {String} about - Job of the user
   * @returns {Object} Promise object containing all the new information of the user
   */
  saveProfileInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse)
  }

  /**
   * Function that save the new profile image of the user on the API
   * @param {String} avatar - Link containing the new image of the user
   * @returns {Object} Promise object containing all the new information of the user
   */
  saveProfileImage({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse)
  }

  /**
   * Function that return an object with all the cards stored on the API
   * @returns {Object} Promise object containing all the cards
   */
  getCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._header
    })
      .then(this._checkResponse)
  }

  /**
   * Function that save the new card on the API
   * @param {String} name - Name of the new card
   * @param {String} imageLink - Image link of the new card
   * @returns {Object} Promise object containing all the information of the new card
   */
  saveCards({ name, imageLink }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify({
        name: name,
        link: imageLink
      })
    })
      .then(this._checkResponse)
  }

  /**
   * Function that delete the card from the API
   * @param {String} cardId - cardId necessary for the cancellation of the card
   * @returns {Object} Promise object containing the confirmation message of the cancellation
   */
  deleteCards({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._header
    })
      .then(this._checkResponse)
  }

  /**
   * Function that put a new like object on the API
   * @param {String} cardId - cardId necessary for the identification of the card
   * @returns {Object} Promise object containing all the information of the liked card
   */
  likeCards({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._header
    })
      .then(this._checkResponse)
  }

  /**
   * Function that delete the like object from the API
   * @param {String} cardId - cardId necessary for the identification of the card
   * @returns {Object} Promise object containing all the information of the disliked card
   */
  dislikeCards({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._header
    })
      .then(this._checkResponse)
  }

  /**
   * Function that delete or add the like object from the API
   * @param {String} cardId - cardId necessary for the identification of the card
   * @param {Boolean} isLiked - boolean property that identify if the card was already liked or not
   * @returns {Object} Promise object containing all the information of the disliked card
   */
  changeLikeCardStatus({ cardId, isLiked }) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._header
    })
      .then(this._checkResponse)
  }

}

const api = new Api(apiConfig)

export default api;
