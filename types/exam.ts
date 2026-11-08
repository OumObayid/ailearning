export interface UserExamAnswer {
  questionId: string | number;
  selectedOption: string;
  isCorrect?: boolean;
}

export interface UserExam {
  id: number;
  userId: number;
  courseId: string;
  moduleId: string;
  score: number;
  totalQuestions: number;
  correctAnswersCount: number;
  passed: boolean;
  timeSpentSeconds: number;
  answers?: UserExamAnswer[] | null;
  createdAt: string;
  updatedAt: string;
}

