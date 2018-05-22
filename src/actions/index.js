import axios from 'axios';

export const SUMBIT_USER = 'SUMBIT_USER';
export const GET_USERS = 'GET_USERS';

//LOCALHOST OR ANY OTHER API
const ROOT_URL = 'http://localhost:3000';

export function getUsers(){
  const request = axios.get(`${ROOT_URL}/users`);

  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: GET_USERS, payload: data})
    })
  }
}

export function submitUser(values) {
  const request = axios.post(`${ROOT_URL}/users`, values)

  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: SUMBIT_USER, payload: data})
    })
  }
}
