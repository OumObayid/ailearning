import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { query } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export interface ExamHistoryRecord extends RowDataPacket {
  id: number;
  course_id: string;
  module_id: string;
  score: number;
  total_questions: number;
  correct_answers_count: number;
  passed: number | boolean;
  time_spent_seconds: number;
  created_at: string;
}

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({
        authenticated: false,
        history: [],
      });
    }

    let rows: ExamHistoryRecord[] = [];
    try {
      rows = await query<ExamHistoryRecord[]>(
        `SELECT id, course_id, module_id, score, total_questions, correct_answers_count, passed, time_spent_seconds, created_at
         FROM user_exams
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [session.userId]
      );
    } catch (dbError) {
      console.warn('Base de données MySQL inaccessible pour l’historique des examens :', (dbError as Error).message);
      return NextResponse.json({
        authenticated: true,
        userId: session.userId,
        history: [],
      }, { status: 200 });
    }

    const formattedHistory = rows.map((r) => ({
      id: r.id,
      courseId: r.course_id,
      moduleId: r.module_id,
      score: Number(r.score),
      totalQuestions: r.total_questions,
      correctAnswersCount: r.correct_answers_count,
      passed: Boolean(r.passed),
      timeSpentSeconds: r.time_spent_seconds,
      createdAt: r.created_at,
    }));

    return NextResponse.json({
      authenticated: true,
      userId: session.userId,
      history: formattedHistory,
    });
  } catch (error) {
    console.error('Erreur récupération historique des examens:', error);
    return NextResponse.json(
      { authenticated: false, history: [] },
      { status: 200 }
    );
  }
}

