import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

export const getInitialData = () =>
  Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => ({
    users,
    questions,
  }));

export const saveQuestion = (question) => _saveQuestion(question);

export const saveQuestionAnswer = (authedUser, question_id, answer) =>
  _saveQuestionAnswer({ authedUser, question_id, answer });
