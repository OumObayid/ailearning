import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import { COURSES_CATALOG } from '@/lib/constants';
import { CourseService } from '@/services/courseService';
import { getChaptersForModule } from '@/lib/courseNavigation';

export interface DbChapterProgressRow extends RowDataPacket {
  id: number;
  user_id: number;
  course_id: string;
  module_id: string;
  chapter_slug: string;
  completed_at: string;
}

export interface ModuleChapterProgress {
  courseId: string;
  moduleId: string;
  completedChaptersCount: number;
  totalChaptersCount: number;
  progressPercent: number;
  completedSlugs: string[];
}

export interface CourseChapterProgress {
  courseId: string;
  title: string;
  completedChaptersCount: number;
  totalChaptersCount: number;
  progressPercent: number;
  modules: ModuleChapterProgress[];
}

export interface UserChapterProgressSummary {
  completedKeys: string[]; // "courseId:moduleId:chapterSlug"
  courses: CourseChapterProgress[];
  totalCompletedAllCourses: number;
  totalChaptersAllCourses: number;
  overallPercent: number;
}

let tableInitialized = false;

export class ChapterProgressService {
  /**
   * Crée la table MySQL si elle n'existe pas encore
   */
  static async ensureTable(): Promise<void> {
    if (tableInitialized) return;
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS user_chapter_progress (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          course_id VARCHAR(50) NOT NULL,
          module_id VARCHAR(50) NOT NULL,
          chapter_slug VARCHAR(120) NOT NULL,
          completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_user_chapters_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          UNIQUE KEY uq_user_chapter (user_id, course_id, module_id, chapter_slug),
          INDEX idx_user_course_module (user_id, course_id, module_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
      tableInitialized = true;
    } catch (err) {
      console.warn('Erreur initialisation table user_chapter_progress :', (err as Error).message);
    }
  }

  /**
   * Récupère la progression de lecture complète de l'utilisateur
   */
  static async getUserProgress(userId: number): Promise<UserChapterProgressSummary> {
    await this.ensureTable();

    let rows: DbChapterProgressRow[] = [];
    try {
      rows = await query<DbChapterProgressRow[]>(
        `SELECT id, user_id, course_id, module_id, chapter_slug, completed_at
         FROM user_chapter_progress
         WHERE user_id = ?`,
        [userId]
      );
    } catch (err) {
      console.warn('Erreur lecture progression chapitres :', (err as Error).message);
      rows = [];
    }

    // Indexation par "course_id:module_id" -> Set de chapter_slug
    const completedByModule: Record<string, Set<string>> = {};
    const completedKeys: string[] = [];

    rows.forEach((r) => {
      const key = `${r.course_id}:${r.module_id}`;
      if (!completedByModule[key]) {
        completedByModule[key] = new Set();
      }
      completedByModule[key].add(r.chapter_slug);
      completedKeys.push(`${r.course_id}:${r.module_id}:${r.chapter_slug}`);
    });

    let totalCompletedAllCourses = 0;
    let totalChaptersAllCourses = 0;

    const coursesProgress: CourseChapterProgress[] = COURSES_CATALOG.map((course) => {
      const modules = CourseService.getModulesByCourse(course.id);
      let courseCompleted = 0;
      let courseTotal = 0;

      const modulesProgress: ModuleChapterProgress[] = modules.map((mod) => {
        // Obtenir l'identifiant interne de module selon le cours
        const internalModuleId =
          course.id === 'prompt-engineering-ide'
            ? `prompt-engineering-module-${mod.order}`
            : course.id === 'backend-ia'
              ? `backend-ia-module-${mod.order}`
              : course.id === 'debugging'
                ? `debugging-module-${mod.order}`
                : `module-${mod.order}`;

        const chapters = getChaptersForModule(internalModuleId);
        const totalChaptersCount = chapters.length;

        // Clé pour vérifier les chapitres terminés
        // Supporte à la fois `module-${mod.order}` et `internalModuleId`
        const keyStandard = `${course.id}:module-${mod.order}`;
        const keyInternal = `${course.id}:${internalModuleId}`;
        const setStandard = completedByModule[keyStandard] || new Set();
        const setInternal = completedByModule[keyInternal] || new Set();
        const mergedSlugs = Array.from(new Set([...setStandard, ...setInternal]));

        const completedCount = mergedSlugs.length;
        const progressPercent = totalChaptersCount > 0
          ? Math.round((completedCount / totalChaptersCount) * 100)
          : 0;

        courseCompleted += completedCount;
        courseTotal += totalChaptersCount;

        return {
          courseId: course.id,
          moduleId: `module-${mod.order}`,
          completedChaptersCount: completedCount,
          totalChaptersCount,
          progressPercent,
          completedSlugs: mergedSlugs,
        };
      });

      const courseProgressPercent = courseTotal > 0
        ? Math.round((courseCompleted / courseTotal) * 100)
        : 0;

      totalCompletedAllCourses += courseCompleted;
      totalChaptersAllCourses += courseTotal;

      return {
        courseId: course.id,
        title: course.title,
        completedChaptersCount: courseCompleted,
        totalChaptersCount: courseTotal,
        progressPercent: courseProgressPercent,
        modules: modulesProgress,
      };
    });

    const overallPercent = totalChaptersAllCourses > 0
      ? Math.round((totalCompletedAllCourses / totalChaptersAllCourses) * 100)
      : 0;

    return {
      completedKeys,
      courses: coursesProgress,
      totalCompletedAllCourses,
      totalChaptersAllCourses,
      overallPercent,
    };
  }

  /**
   * Bascule ou définit l'état d'un chapitre (terminé ou non terminé)
   */
  static async setChapterCompleted(
    userId: number,
    courseId: string,
    moduleId: string,
    chapterSlug: string,
    completed: boolean
  ): Promise<boolean> {
    await this.ensureTable();

    // Normaliser moduleId pour cohérence (ex: "module-1" ou "debugging-module-1")
    const cleanCourse = courseId.trim().toLowerCase();
    const cleanModule = moduleId.trim().toLowerCase();
    const cleanSlug = chapterSlug.trim().toLowerCase();

    try {
      if (completed) {
        await query<ResultSetHeader>(
          `INSERT INTO user_chapter_progress (user_id, course_id, module_id, chapter_slug)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE completed_at = CURRENT_TIMESTAMP`,
          [userId, cleanCourse, cleanModule, cleanSlug]
        );
      } else {
        await query<ResultSetHeader>(
          `DELETE FROM user_chapter_progress
           WHERE user_id = ? AND course_id = ? AND module_id = ? AND chapter_slug = ?`,
          [userId, cleanCourse, cleanModule, cleanSlug]
        );
      }
      return true;
    } catch (err) {
      console.error('Erreur setChapterCompleted :', err);
      return false;
    }
  }
}

