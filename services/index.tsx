import axios from 'axios';

interface question {
  category: string,
  difficulty: string,
  question: string[],
  type: string,
  correct_answer: string,
  incorrect_answers: string[]
  answer: string[],
}
interface questionOptions {
  amount?: number,
  category?: number,
  difficulty?: 'easy' | 'medium' | 'hard',
  type?: 'multiple' | 'boolean',
}
export const getQuestions = async () => {
  try {
    const rsp = await axios.get(`https://opentdb.com/api.php?amount=10`)
    let data: question[] = rsp.data.results;

    data.forEach(ele => {
      ele.answer = ele.type === 'boolean' ?
        ['ture', 'false']
        : [...ele.incorrect_answers, ele.correct_answer].sort(() => Math.random() - 0.5)
    })
    return data;
  } catch (err) {
    throw new Error(err.message)
  }

}