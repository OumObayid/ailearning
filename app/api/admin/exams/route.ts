import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const status = searchParams.get('status'); // 'passed' | 'failed' | null
    const search = searchParams.get('search'); // user name or email
    const userId = searchParams.get('userId');

    let sql = `
      SELECT 
        ue.id,
        ue.user_id,
        COALESCE(u.name, 'Utilisateur supprimé') as user_name,
        COALESCE(u.email, '-') as user_email,
        ue.course_id,
        ue.module_id,
        ue.score,
        ue.total_questions,
        ue.correct_answers_count,
        ue.passed,
        ue.time_spent_seconds,
        ue.created_at
      FROM user_exams ue
      LEFT JOIN users u ON ue.user_id = u.id
      WHERE 1=1
    `;
    const params: unknown[] = [];

    if (userId) {
      sql += ' AND ue.user_id = ?';
      params.push(Number(userId));
    }

    if (courseId && courseId !== 'all') {
      sql += ' AND ue.course_id = ?';
      params.push(courseId);
    }

    if (status === 'passed') {
      sql += ' AND ue.passed = 1';
    } else if (status === 'failed') {
      sql += ' AND ue.passed = 0';
    }

    if (search && search.trim()) {
      sql += ' AND (u.name LIKE ? OR u.email LIKE ? OR ue.module_id LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    sql += ' ORDER BY ue.created_at DESC LIMIT 100';

    const rows = await query<RowDataPacket[]>(sql, params as any);

    return NextResponse.json({
      success: true,
      exams: rows.map((r) => ({
        id: r.id,
        userId: r.user_id,
        userName: r.user_name,
        userEmail: r.user_email,
        courseId: r.course_id,
        moduleId: r.module_id,
        score: Number(r.score),
        totalQuestions: Number(r.total_questions),
        correctAnswersCount: Number(r.correct_answers_count),
        passed: Boolean(r.passed),
        timeSpentSeconds: Number(r.time_spent_seconds),
        createdAt: r.created_at,
      })),
    });
  } catch (error) {
    console.error('Erreur API Admin Exams GET:', error);
    return NextResponse.json({ error: 'Erreur récupération des épreuves.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs.' }, { status: 403 });
    }

    const body = await request.json();
    const { examId, passed, score } = body;

    if (!examId) {
      return NextResponse.json({ error: 'ID examen manquant.' }, { status: 400 });
    }

    const updates: string[] = [];
    const params: unknown[] = [];

    if (typeof passed === 'boolean') {
      updates.push('passed = ?');
      params.push(passed ? 1 : 0);
    }

    if (typeof score === 'number' && score >= 0 && score <= 100) {
      updates.push('score = ?');
      params.push(score);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'Aucune modification fournie.' }, { status: 400 });
    }

    params.push(Number(examId));

    await query<ResultSetHeader>(
      `UPDATE user_exams SET ${updates.join(', ')} WHERE id = ?`,
      params as any
    );

    return NextResponse.json({ success: true, message: 'Épreuve mise à jour avec succès.' });
  } catch (error) {
    console.error('Erreur API Admin Exams PATCH:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de l’épreuve.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const examId = searchParams.get('id');

    if (!examId) {
      return NextResponse.json({ error: 'ID examen manquant.' }, { status: 400 });
    }

    await query<ResultSetHeader>('DELETE FROM user_exams WHERE id = ?', [Number(examId)]);

    return NextResponse.json({ success: true, message: 'Tentative d’examen supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur API Admin Exams DELETE:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression de l’épreuve.' }, { status: 500 });
  }
}

