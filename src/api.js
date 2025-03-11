const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
  headers: {
    authorization: '56c8df6c-a03d-4a8b-a647-4dc13aedaa37',
    'Content-Type': 'application/json'
  }
}

//4. берем начальные карточки)
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
}
//3. берем профиль
const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
}
//5.обновляем профиль
const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then((res) => checkResponse(res))
}
//6. Добавляем новую карточку
const addNewCard= (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then((res) => checkResponse(res))
}

// 8. удалить крточки пользователя
const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
}

// 9.лайк карточки,A - API
const likeCardA = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
}

// 9.анлайк карточки ,A - API
const unlikeCardA = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => checkResponse(res))
}

// 10. обновляем аватар
const editProfileAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then((res) => checkResponse(res))
}

//проверяем что ответик.ок
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export {
  getProfile,
  editProfile,
  addNewCard,
  removeCard,
  likeCardA,
  unlikeCardA,
  editProfileAvatar
}