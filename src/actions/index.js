import axios from 'axios';

export const SUMBIT_USER = 'SUMBIT_USER';

//LOCALHOST OR ANY OTHER API
const ROOT_URL = 'http://localhost:3000';

export function submitUser(values) {
  const request = axios.post(`${ROOT_URL}/users`, values)

  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: SUMBIT_USER, payload: data})
    })
  }
}
