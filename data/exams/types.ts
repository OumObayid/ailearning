export interface ExamOption {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface ExamQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  isMultiSelect?: boolean;
  options: ExamOption[];
  correctAnswers: ('A' | 'B' | 'C' | 'D')[];
  explanation: string;
}

export interface ExamMetadata {
  moduleId: string;
  title: string;
  durationMinutes: number;
  passingScorePercent: number;
  totalQuestions: number;
}

