import { query } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';
import { CourseService } from '@/services/courseService';
import { COURSES_CATALOG } from '@/lib/constants';
import { ChapterProgressService, type UserChapterProgressSummary } from '@/services/chapterProgressService';

export interface DbUserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface DbExamRow extends RowDataPacket {
  id: number;
  course_id: string;
  module_id: string;
  score: number;
  total_questions: number;
  correct_answers_count: number;
  time_spent_seconds: number;
  created_at: string;
}

export interface ModuleScore {
  order: number;
  moduleId: string;
  title: string;
  description: string;
  score: number | null;
  avgScore: number | null;
  attemptsCount: number;
  passed: boolean;
  status: 'passed' | 'failed' | 'not_attempted';
}

export interface CourseProgression {
  id: string;
  title: string;
  slug: string;
  modulesCount: number;
  evaluatedModulesCount: number;
  passedCount: number;
  averageScore: number;
  modules: ModuleScore[];
}

export interface ExamItem {
  id: number;
  courseId: string;
  moduleId: string;
  moduleOrder: number;
  moduleTitle: string;
  score: number;
  passed: boolean;
  timeSpentSeconds: number;
  totalQuestions: number;
  correctAnswersCount: number;
  createdAt: string;
}

export interface ProgressionUserData {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface UserProgressionResponse {
  user: ProgressionUserData;
  courses: CourseProgression[];
  exams: ExamItem[];
  readingProgress?: UserChapterProgressSummary;
}

export class ProgressionService {
  /**
   * Calcule et retourne la progression complète d'un utilisateur
   */
  static async getUserProgression(userId: number): Promise<UserProgressionResponse | null> {
    // 1. Informations utilisateur
    const userRows = await query<DbUserRow[]>(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (userRows.length === 0) {
      return null;
    }

    const user = userRows[0];

    // 2. Examens de l'utilisateur
    let examRows: DbExamRow[] = [];
    try {
      examRows = await query<DbExamRow[]>(
        `SELECT id, course_id, module_id, score, total_questions, correct_answers_count, time_spent_seconds, created_at
         FROM user_exams
         WHERE user_id = ?
         ORDER BY course_id ASC, module_id ASC, created_at DESC`,
        [userId]
      );
    } catch (err) {
      console.warn('Erreur lecture table user_exams pour la progression :', (err as Error).message);
      examRows = [];
    }

    // Dictionnaire des tentatives indexées par "course_id:module_order"
    const attemptsByModule: Record<string, DbExamRow[]> = {};
    examRows.forEach((ex) => {
      const orderMatch = ex.module_id.match(/\d+/);
      const modOrder = orderMatch ? Number(orderMatch[0]) : 1;
      const key = `${ex.course_id}:${modOrder}`;
      if (!attemptsByModule[key]) {
        attemptsByModule[key] = [];
      }
      attemptsByModule[key].push(ex);
    });

    // 3. Calcul pour les 4 cursus du catalogue
    const coursesProgression: CourseProgression[] = COURSES_CATALOG.map((course) => {
      const catalogModules = CourseService.getModulesByCourse(course.id);
      let totalScores = 0;
      let evaluatedModulesCount = 0;
      let passedCount = 0;

      const modulesProgression: ModuleScore[] = catalogModules.map((mod) => {
        const key = `${course.id}:${mod.order}`;
        const attempts = attemptsByModule[key] || [];

        let bestScore: number | null = null;
        let avgScore: number | null = null;
        let isPassed = false;

        if (attempts.length > 0) {
          const sum = attempts.reduce((acc, curr) => acc + Number(curr.score), 0);
          avgScore = Math.round(sum / attempts.length);
          bestScore = Math.max(...attempts.map((a) => Number(a.score)));
          isPassed = bestScore >= 80;

          totalScores += bestScore;
          evaluatedModulesCount++;
          if (isPassed) {
            passedCount++;
          }
        }

        return {
          order: mod.order,
          moduleId: `module-${mod.order}`,
          title: mod.title,
          description: mod.description,
          score: bestScore,
          avgScore,
          attemptsCount: attempts.length,
          passed: isPassed,
          status: isPassed ? 'passed' : attempts.length > 0 ? 'failed' : 'not_attempted',
        };
      });

      // Moyenne générale du cours rapportée à la totalité des modules du cursus
      const totalModules = catalogModules.length;
      const courseAverage = totalModules > 0 ? Math.round(totalScores / totalModules) : 0;

      return {
        id: course.id,
        title: course.title,
        slug: course.slug,
        modulesCount: catalogModules.length,
        evaluatedModulesCount,
        passedCount,
        averageScore: courseAverage,
        modules: modulesProgression,
      };
    });

    // 4. Liste ordonnée de tous les examens classés par cours puis par module
    const sortedExams: ExamItem[] = [...examRows].sort((a, b) => {
      if (a.course_id !== b.course_id) {
        return a.course_id.localeCompare(b.course_id);
      }
      const orderA = Number(a.module_id.replace(/\D/g, '')) || 0;
      const orderB = Number(b.module_id.replace(/\D/g, '')) || 0;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }).map((ex) => {
      const orderMatch = ex.module_id.match(/\d+/);
      const modOrder = orderMatch ? Number(orderMatch[0]) : 1;
      const internalId =
        ex.course_id === 'prompt-engineering-ide'
          ? `prompt-engineering-module-${modOrder}`
          : ex.course_id === 'backend-ia'
            ? `backend-ia-module-${modOrder}`
            : ex.course_id === 'debugging'
              ? `debugging-module-${modOrder}`
              : `module-${modOrder}`;
      const modInfo = CourseService.getModuleById(internalId);

      return {
        id: ex.id,
        courseId: ex.course_id,
        moduleId: ex.module_id,
        moduleOrder: modOrder,
        moduleTitle: modInfo ? `Module ${modOrder} : ${modInfo.title}` : `Module ${modOrder}`,
        score: Number(ex.score),
        passed: Number(ex.score) >= 80,
        timeSpentSeconds: Number(ex.time_spent_seconds || 0),
        totalQuestions: Number(ex.total_questions || 0),
        correctAnswersCount: Number(ex.correct_answers_count || 0),
        createdAt: ex.created_at,
      };
    });

    // 3. Progression de lecture des chapitres et historique
    let readingProgress: UserChapterProgressSummary | undefined;
    try {
      readingProgress = await ChapterProgressService.getUserProgress(userId);
    } catch (err) {
      console.warn('Erreur récupération progression chapitres dans ProgressionService :', (err as Error).message);
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at,
      },
      courses: coursesProgression,
      exams: sortedExams,
      readingProgress,
    };
  }
}

