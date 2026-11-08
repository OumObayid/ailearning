import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { query } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';
import { COURSES_CATALOG } from '@/lib/constants';

interface PassedRecord extends RowDataPacket {
  course_id: string;
  module_id: string;
  best_score: number;
}

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({
        authenticated: false,
        passedModules: {},
        passedCourses: [],
      });
    }

    let rows: PassedRecord[] = [];
    try {
      rows = await query<PassedRecord[]>(
        `SELECT course_id, module_id, MAX(score) as best_score
         FROM user_exams
         WHERE user_id = ? AND passed = 1
         GROUP BY course_id, module_id`,
        [session.userId]
      );
    } catch (dbError) {
      console.warn('Base de données MySQL inaccessible (serveur éteint), repli sur progression vide :', (dbError as Error).message);
      return NextResponse.json({
        authenticated: true,
        userId: session.userId,
        passedModules: {
          'ai-engineering': [],
          'backend-ia': [],
          'prompt-engineering-ide': [],
          'debugging': [],
        },
        passedCourses: [],
      }, { status: 200 });
    }

    const passedModules: Record<string, string[]> = {
      'ai-engineering': [],
      'backend-ia': [],
      'prompt-engineering-ide': [],
      'debugging': [],
    };

    rows.forEach((r) => {
      if (!passedModules[r.course_id]) {
        passedModules[r.course_id] = [];
      }
      if (!passedModules[r.course_id].includes(r.module_id)) {
        passedModules[r.course_id].push(r.module_id);
      }
    });

    // Calcul des cours entièrement réussis (tous les modules validés)
    const passedCourses: string[] = [];

    COURSES_CATALOG.forEach((course) => {
      const coursePassed = passedModules[course.id] || [];
      if (course.modulesCount > 0 && coursePassed.length >= course.modulesCount) {
        passedCourses.push(course.id);
      }
    });

    return NextResponse.json({
      authenticated: true,
      userId: session.userId,
      passedModules,
      passedCourses,
    });
  } catch (error) {
    console.error('Erreur récupération progression examens:', error);
    return NextResponse.json(
      { authenticated: false, passedModules: {}, passedCourses: [] },
      { status: 200 }
    );
  }
}
