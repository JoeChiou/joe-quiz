import axios from 'axios';
import { IQuestion } from './model';

export const getQuestions = async () => {
  try {
    const rsp = await axios.get(`https://opentdb.com/api.php?amount=1&encode=url3986`)
    let data: IQuestion[] = rsp.data.results;
    data.forEach(ele => {
      ele.question = decodeURIComponent(ele.question);
      ele.category = decodeURIComponent(ele.category);
      ele.incorrect_answers = ele.incorrect_answers.map(ans => decodeURIComponent(ans));
      ele.correct_answer = decodeURIComponent(ele.correct_answer);

      ele.answers = ele.type === 'boolean' ?
        ['True', 'False']
        : [...ele.incorrect_answers, ele.correct_answer].sort(() => Math.random() - 0.5)
    })
    return data;
  } catch (err) {
    throw new Error(err.message)
  }
};

export const $percentage = (number?: number) => {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }
  ).format(number || 0);
}