/**
 * @fileoverview use-interview-obj
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useState } from 'react';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const INTERVIEW_OBJ = Object.freeze({
  question: null,
  answerSystem: null,
  answerUser: null,
  feedback: null,
});

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useInterviewObj() {
  const [interviewObjState, setInterviewObjState] = useState(INTERVIEW_OBJ);

  const initInterviewObj = () => {
    setInterviewObjState(prevState => ({
      ...prevState,
      ...INTERVIEW_OBJ,
    }));
  };
  const addInterviewObj = obj => {
    setInterviewObjState(prevState => ({
      ...prevState,
      ...obj,
    }));
  };
  const isInterviewObjEmpty = () =>
    interviewObjState.question === null &&
    interviewObjState.answerSystem === null &&
    interviewObjState.answerUser === null &&
    interviewObjState.feedback === null;
  const isInterviewObjFull = () =>
    interviewObjState.question !== null &&
    interviewObjState.answerSystem !== null &&
    interviewObjState.answerUser !== null &&
    interviewObjState.feedback !== null;
  const isOnlyFeedbackEmpty = () =>
    interviewObjState.question !== null &&
    interviewObjState.answerSystem !== null &&
    interviewObjState.answerUser !== null &&
    interviewObjState.feedback === null;
  const getQuestion = () => interviewObjState.question;

  return {
    interviewObjState,
    initInterviewObj,
    addInterviewObj,
    isInterviewObjEmpty,
    isInterviewObjFull,
    isOnlyFeedbackEmpty,
    getQuestion,
  };
}
