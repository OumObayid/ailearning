import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { query } from '@/lib/db';
import type { ResultSetHeader } from 'mysql2';

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Vous devez être connecté pour enregistrer vos résultats d’examen.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      courseId,
      moduleId,
      score,
      totalQuestions,
      correctAnswersCount,
      passed,
      timeSpentSeconds,
      answers,
    } = body;

    if (!courseId || !moduleId || typeof score !== 'number' || typeof totalQuestions !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Paramètres manquants ou invalides.' },
        { status: 400 }
      );
    }

    // Normaliser moduleId si besoin (ex: "module-1")
    const normalizedModuleId = String(moduleId).startsWith('module-')
      ? String(moduleId)
      : `module-${moduleId}`;

    // Le statut passed découle du score ou du booléen fourni
    const isPassed = typeof passed === 'boolean' ? passed : score >= 80;
    const answersJson = answers ? JSON.stringify(answers) : null;

    const result = await query<ResultSetHeader>(
      `INSERT INTO user_exams (
        user_id, course_id, module_id, score, total_questions,
        correct_answers_count, passed, time_spent_seconds, answers
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        session.userId,
        courseId,
        normalizedModuleId,
        score,
        totalQuestions,
        correctAnswersCount || 0,
        isPassed ? 1 : 0,
        timeSpentSeconds || 0,
        answersJson,
      ]
    );

    return NextResponse.json({
      success: true,
      examId: result.insertId,
      passed: isPassed,
      score,
      courseId,
      moduleId: normalizedModuleId,
    });
  } catch (error) {
    console.error('Erreur soumission examen:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur interne est survenue lors de l’enregistrement de l’examen.' },
      { status: 500 }
    );
  }
}
