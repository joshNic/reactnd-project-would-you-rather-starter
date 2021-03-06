import {
    RECEIVE_QUESTIONS,
  } from '../actions/questions';
  
  export default function questions(state = {}, action) {
    switch (action.type) {
      case RECEIVE_QUESTIONS:
        const {questions} = action
        return {
          ...state,
          ...questions
        };
      default:
        return state;
    }
  }