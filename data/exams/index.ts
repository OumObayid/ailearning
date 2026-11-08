import { ExamMetadata, ExamQuestion } from './types';
import { MODULE_1_QUESTIONS, MODULE_1_EXAM_METADATA } from './module-1';
import { MODULE_2_QUESTIONS, MODULE_2_EXAM_METADATA } from './module-2';
import { MODULE_3_QUESTIONS, MODULE_3_EXAM_METADATA } from './module-3';
import { MODULE_4_QUESTIONS, MODULE_4_EXAM_METADATA } from './module-4';
import { MODULE_5_QUESTIONS, MODULE_5_EXAM_METADATA } from './module-5';
import { MODULE_6_QUESTIONS, MODULE_6_EXAM_METADATA } from './module-6';
import { MODULE_7_QUESTIONS, MODULE_7_EXAM_METADATA } from './module-7';
import { MODULE_8_QUESTIONS, MODULE_8_EXAM_METADATA } from './module-8';

import { BACKEND_IA_MODULE_1_QUESTIONS, BACKEND_IA_MODULE_1_EXAM_METADATA } from './backend-ia-module-1';
import { BACKEND_IA_MODULE_2_QUESTIONS, BACKEND_IA_MODULE_2_EXAM_METADATA } from './backend-ia-module-2';
import { BACKEND_IA_MODULE_3_QUESTIONS, BACKEND_IA_MODULE_3_EXAM_METADATA } from './backend-ia-module-3';
import { BACKEND_IA_MODULE_4_QUESTIONS, BACKEND_IA_MODULE_4_EXAM_METADATA } from './backend-ia-module-4';
import { BACKEND_IA_MODULE_5_QUESTIONS, BACKEND_IA_MODULE_5_EXAM_METADATA } from './backend-ia-module-5';
import { BACKEND_IA_MODULE_6_QUESTIONS, BACKEND_IA_MODULE_6_EXAM_METADATA } from './backend-ia-module-6';
import { BACKEND_IA_MODULE_7_QUESTIONS, BACKEND_IA_MODULE_7_EXAM_METADATA } from './backend-ia-module-7';

import { PROMPT_ENGINEERING_MODULE_1_QUESTIONS, PROMPT_ENGINEERING_MODULE_1_EXAM_METADATA } from './prompt-engineering-module-1';
import { PROMPT_ENGINEERING_MODULE_2_QUESTIONS, PROMPT_ENGINEERING_MODULE_2_EXAM_METADATA } from './prompt-engineering-module-2';
import { PROMPT_ENGINEERING_MODULE_3_QUESTIONS, PROMPT_ENGINEERING_MODULE_3_EXAM_METADATA } from './prompt-engineering-module-3';
import { PROMPT_ENGINEERING_MODULE_4_QUESTIONS, PROMPT_ENGINEERING_MODULE_4_EXAM_METADATA } from './prompt-engineering-module-4';
import { PROMPT_ENGINEERING_MODULE_5_QUESTIONS, PROMPT_ENGINEERING_MODULE_5_EXAM_METADATA } from './prompt-engineering-module-5';
import { PROMPT_ENGINEERING_MODULE_6_QUESTIONS, PROMPT_ENGINEERING_MODULE_6_EXAM_METADATA } from './prompt-engineering-module-6';
import { PROMPT_ENGINEERING_MODULE_7_QUESTIONS, PROMPT_ENGINEERING_MODULE_7_EXAM_METADATA } from './prompt-engineering-module-7';
import { PROMPT_ENGINEERING_MODULE_8_QUESTIONS, PROMPT_ENGINEERING_MODULE_8_EXAM_METADATA } from './prompt-engineering-module-8';

import { DEBUGGING_MODULE_1_QUESTIONS, DEBUGGING_MODULE_1_EXAM_METADATA } from './debugging-module-1';
import { DEBUGGING_MODULE_2_QUESTIONS, DEBUGGING_MODULE_2_EXAM_METADATA } from './debugging-module-2';
import { DEBUGGING_MODULE_3_QUESTIONS, DEBUGGING_MODULE_3_EXAM_METADATA } from './debugging-module-3';
import { DEBUGGING_MODULE_4_QUESTIONS, DEBUGGING_MODULE_4_EXAM_METADATA } from './debugging-module-4';
import { DEBUGGING_MODULE_6_QUESTIONS, DEBUGGING_MODULE_6_EXAM_METADATA } from './debugging-module-6';
import { DEBUGGING_MODULE_7_QUESTIONS, DEBUGGING_MODULE_7_EXAM_METADATA } from './debugging-module-7';
import { DEBUGGING_MODULE_8_QUESTIONS, DEBUGGING_MODULE_8_EXAM_METADATA } from './debugging-module-8';

export interface ModuleExamBundle {
  metadata: ExamMetadata;
  questions: ExamQuestion[];
}

export const EXAMS_REGISTRY: Record<string, ModuleExamBundle> = {
  // Cursus 1 : AI Engineering & Google Gemini (8 Modules)
  'module-1': {
    metadata: MODULE_1_EXAM_METADATA,
    questions: MODULE_1_QUESTIONS,
  },
  'module-2': {
    metadata: MODULE_2_EXAM_METADATA,
    questions: MODULE_2_QUESTIONS,
  },
  'module-3': {
    metadata: MODULE_3_EXAM_METADATA,
    questions: MODULE_3_QUESTIONS,
  },
  'module-4': {
    metadata: MODULE_4_EXAM_METADATA,
    questions: MODULE_4_QUESTIONS,
  },
  'module-5': {
    metadata: MODULE_5_EXAM_METADATA,
    questions: MODULE_5_QUESTIONS,
  },
  'module-6': {
    metadata: MODULE_6_EXAM_METADATA,
    questions: MODULE_6_QUESTIONS,
  },
  'module-7': {
    metadata: MODULE_7_EXAM_METADATA,
    questions: MODULE_7_QUESTIONS,
  },
  'module-8': {
    metadata: MODULE_8_EXAM_METADATA,
    questions: MODULE_8_QUESTIONS,
  },

  // Cursus 2 : Parcours Backend IA & Architecture Haute Performance (7 Modules)
  'backend-ia-module-1': {
    metadata: BACKEND_IA_MODULE_1_EXAM_METADATA,
    questions: BACKEND_IA_MODULE_1_QUESTIONS,
  },
  'backend-ia-module-2': {
    metadata: BACKEND_IA_MODULE_2_EXAM_METADATA,
    questions: BACKEND_IA_MODULE_2_QUESTIONS,
  },
  'backend-ia-module-3': {
    metadata: BACKEND_IA_MODULE_3_EXAM_METADATA,
    questions: BACKEND_IA_MODULE_3_QUESTIONS,
  },
  'backend-ia-module-4': {
    metadata: BACKEND_IA_MODULE_4_EXAM_METADATA,
    questions: BACKEND_IA_MODULE_4_QUESTIONS,
  },
  'backend-ia-module-5': {
    metadata: BACKEND_IA_MODULE_5_EXAM_METADATA,
    questions: BACKEND_IA_MODULE_5_QUESTIONS,
  },
  'backend-ia-module-6': {
    metadata: BACKEND_IA_MODULE_6_EXAM_METADATA,
    questions: BACKEND_IA_MODULE_6_QUESTIONS,
  },
  'backend-ia-module-7': {
    metadata: BACKEND_IA_MODULE_7_EXAM_METADATA,
    questions: BACKEND_IA_MODULE_7_QUESTIONS,
  },

  // Cursus 3 : Prompt Engineering pour les Agents IA dans les IDE (8 Modules)
  'prompt-engineering-module-1': {
    metadata: PROMPT_ENGINEERING_MODULE_1_EXAM_METADATA,
    questions: PROMPT_ENGINEERING_MODULE_1_QUESTIONS,
  },
  'prompt-engineering-module-2': {
    metadata: PROMPT_ENGINEERING_MODULE_2_EXAM_METADATA,
    questions: PROMPT_ENGINEERING_MODULE_2_QUESTIONS,
  },
  'prompt-engineering-module-3': {
    metadata: PROMPT_ENGINEERING_MODULE_3_EXAM_METADATA,
    questions: PROMPT_ENGINEERING_MODULE_3_QUESTIONS,
  },
  'prompt-engineering-module-4': {
    metadata: PROMPT_ENGINEERING_MODULE_4_EXAM_METADATA,
    questions: PROMPT_ENGINEERING_MODULE_4_QUESTIONS,
  },
  'prompt-engineering-module-5': {
    metadata: PROMPT_ENGINEERING_MODULE_5_EXAM_METADATA,
    questions: PROMPT_ENGINEERING_MODULE_5_QUESTIONS,
  },
  'prompt-engineering-module-6': {
    metadata: PROMPT_ENGINEERING_MODULE_6_EXAM_METADATA,
    questions: PROMPT_ENGINEERING_MODULE_6_QUESTIONS,
  },
  'prompt-engineering-module-7': {
    metadata: PROMPT_ENGINEERING_MODULE_7_EXAM_METADATA,
    questions: PROMPT_ENGINEERING_MODULE_7_QUESTIONS,
  },
  'prompt-engineering-module-8': {
    metadata: PROMPT_ENGINEERING_MODULE_8_EXAM_METADATA,
    questions: PROMPT_ENGINEERING_MODULE_8_QUESTIONS,
  },

  // Cursus 4 : Ingénierie du Débogage
  'debugging-module-1': {
    metadata: DEBUGGING_MODULE_1_EXAM_METADATA,
    questions: DEBUGGING_MODULE_1_QUESTIONS,
  },
  'debugging-module-2': {
    metadata: DEBUGGING_MODULE_2_EXAM_METADATA,
    questions: DEBUGGING_MODULE_2_QUESTIONS,
  },
  'debugging-module-3': {
    metadata: DEBUGGING_MODULE_3_EXAM_METADATA,
    questions: DEBUGGING_MODULE_3_QUESTIONS,
  },
  'debugging-module-4': {
    metadata: DEBUGGING_MODULE_4_EXAM_METADATA,
    questions: DEBUGGING_MODULE_4_QUESTIONS,
  },
  'debugging-module-6': {
    metadata: DEBUGGING_MODULE_6_EXAM_METADATA,
    questions: DEBUGGING_MODULE_6_QUESTIONS,
  },
  'debugging-module-7': {
    metadata: DEBUGGING_MODULE_7_EXAM_METADATA,
    questions: DEBUGGING_MODULE_7_QUESTIONS,
  },
  'debugging-module-8': {
    metadata: DEBUGGING_MODULE_8_EXAM_METADATA,
    questions: DEBUGGING_MODULE_8_QUESTIONS,
  },
};

export function getExamByModuleId(moduleId: string): ModuleExamBundle | null {
  return EXAMS_REGISTRY[moduleId] || null;
}
