const baseURL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const getUsers = (page) => {
  return fetch(`${baseURL}/users?page=${page}&count=6&sort=desc`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

export const getToken = () => {
  return fetch(`${baseURL}/token`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

export const getPositions = () => {
  return fetch(`${baseURL}/positions`)
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const sendUser = (data, token) => {
  return fetch(`${baseURL}/users`, {
    method: 'POST',
    body: data,
    headers: {
      'Token': token,
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};
