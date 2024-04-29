'use client';
import useQuizStore from '../../../../../store/QuizStore';

export default function CorrectAnswer() {
  const { correctQuiz } = useQuizStore();

  return (
    <div>
      <div>정답 수::</div>
      <div>{correctQuiz}</div>
    </div>
  );
}
