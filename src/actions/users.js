import { saveQuestionAnswer } from '../utils/api';
import {handleInitialData} from "./shared";


export const RECEIVE_USERS = 'RECEIVE_USERS';
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function handleSaveQuestionAnswer(authedUser, question_id, answer) {
  return async dispatch => {
    try {
      await saveQuestionAnswer(authedUser, question_id, answer);
      dispatch(handleInitialData());
    }
    catch (e) {
      console.warn('Error in handleSaveQuestionAnswer:', e);
      alert("Error in handleSaveQuestionAnswer");
    }
  };
}
