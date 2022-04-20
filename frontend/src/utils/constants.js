export const apiConfig = {
  baseUrl: 'https://api.aroundtheus-timothyrusso.students.nomoreparties.sbs',
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    'Content-Type': 'application/json'
  }
}
