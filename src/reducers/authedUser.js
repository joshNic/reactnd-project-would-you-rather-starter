import { SET_AUTHED_USER } from '../actions/authedUser';

export default function authUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      const {id} = action
      return id;
    default:
      return state;
  }
}