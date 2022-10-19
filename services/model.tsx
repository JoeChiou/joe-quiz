export interface IQuestion {
  category: string,
  difficulty: string,
  question: string,
  type: string,
  correct_answer: string,
  incorrect_answers: string[]
  answers: string[],
}