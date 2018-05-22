import { GET_USERS } from '../actions'

export default function(state = [], action) {
  switch(action.type){
    case GET_USERS:
      return Object.assign({}, action.payload);
    default:
    return state;
  }
}
