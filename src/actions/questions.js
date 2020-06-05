import { saveQuestion } from '../utils/api';
import {handleInitialData} from "./shared";
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return async (dispatch) => {
    await saveQuestion({ optionOneText, optionTwoText, author });
    dispatch(handleInitialData());
  };
}