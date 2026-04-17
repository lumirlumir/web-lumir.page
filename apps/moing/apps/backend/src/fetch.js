/**
 * @fileoverview fetch.js
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import OpenAI from 'openai';
import { questionMain, questionSub, answer, feedback } from './prompt.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * @import { CustomChatCompletionMessageParam, QuestionType } from './types.js';
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const openaiInstance = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Fetches a response from OpenAI's chat completion API.
 * @param {Array<CustomChatCompletionMessageParam>} messages
 * @returns {Promise<string>}
 * @async
 * @private
 */
async function fetching(messages) {
  const response = await openaiInstance.chat.completions.create({
    ...{
      model: 'gpt-4.1-nano',
      temperature: 1,
      top_p: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_completion_tokens: 2048,
    },
    messages,
  });

  return response?.choices?.[0]?.message?.content;
}

/**
 * Creates a message object for OpenAI API.
 * @param {'system' | 'assistant' | 'user'} role
 * @param {string} text
 * @returns {CustomChatCompletionMessageParam}
 * @private
 */
function createMessageObject(role, text) {
  return {
    role,
    content: [
      {
        text,
        type: 'text',
      },
    ],
  };
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Fetches the main question.
 * @param {QuestionType} type
 * @param {string[]} history
 * @returns {Promise<string>}
 * @async
 */
export async function fetchQuestionMain(type, history) {
  return fetching([
    ...questionMain[type].messages,
    ...history.map(text => createMessageObject('assistant', text)),
  ]);
}

/**
 * Fetches the sub question.
 * @param {string} question
 * @param {string} answerUser
 * @returns {Promise<string>}
 * @async
 */
export async function fetchQuestionSub(question, answerUser) {
  return fetching([
    ...questionSub.messages,
    createMessageObject(
      'user',
      `Previous Question\n\n${question}\n\nUSER's Answer\n\n${answerUser}`,
    ),
  ]);
}

/**
 * Fetches the answer.
 * @param {string} question
 * @returns {Promise<string>}
 * @async
 */
export async function fetchAnswer(question) {
  return fetching([...answer.messages, createMessageObject('user', question)]);
}

/**
 * Fetches the feedback.
 * @param {string} answerSystem
 * @param {string} answerUser
 * @returns {Promise<string>}
 * @async
 */
export async function fetchFeedback(answerSystem, answerUser) {
  return fetching([
    ...feedback.messages,
    createMessageObject(
      'user',
      `Correct Answer\n\n${answerSystem}\n\nUSER's Answer\n\n${answerUser}`,
    ),
  ]);
}
