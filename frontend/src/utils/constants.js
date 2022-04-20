export const apiConfig = {
    baseUrl: 'https://api.aroundtheus-timothyrusso.students.nomoreparties.sbs',
    // groupId: 'group-12',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
    }
  }
