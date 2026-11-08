import { NextResponse } from 'next/server';
import { getCurrentUser, hashPassword } from '@/lib/auth';
import { query } from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs.' }, { status: 403 });
    }

    const users = await query<RowDataPacket[]>(
      `SELECT 
        u.id,
        u.name,
        u.email,
        u.role,
        u.avatar_url,
        u.created_at,
        COUNT(ue.id) as total_exams,
        SUM(CASE WHEN ue.passed = 1 THEN 1 ELSE 0 END) as passed_exams,
        MAX(ue.created_at) as last_exam_at
       FROM users u
       LEFT JOIN user_exams ue ON u.id = ue.user_id
       GROUP BY u.id
       ORDER BY u.created_at DESC`
    );

    return NextResponse.json({
      success: true,
      users: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        avatarUrl: u.avatar_url,
        createdAt: u.created_at,
        totalExams: Number(u.total_exams || 0),
        passedExams: Number(u.passed_exams || 0),
        lastExamAt: u.last_exam_at,
      })),
    });
  } catch (error) {
    console.error('Erreur API Admin Users GET:', error);
    return NextResponse.json({ error: 'Erreur récupération des utilisateurs.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs.' }, { status: 403 });
    }

    const body = await request.json();
    const { userId, role, name, email, password } = body;

    if (!userId) {
      return NextResponse.json({ error: 'ID utilisateur manquant.' }, { status: 400 });
    }

    // Protection : empêcher un admin de se rétrograder lui-même
    if (session.userId === Number(userId) && role && role !== 'admin') {
      return NextResponse.json(
        { error: 'Vous ne pouvez pas rétrograder votre propre compte administrateur.' },
        { status: 400 }
      );
    }

    const updates: string[] = [];
    const params: unknown[] = [];

    if (role && (role === 'admin' || role === 'student')) {
      updates.push('role = ?');
      params.push(role);
    }

    if (name && typeof name === 'string' && name.trim().length > 0) {
      updates.push('name = ?');
      params.push(name.trim());
    }

    if (email && typeof email === 'string' && email.trim().length > 0) {
      const trimmedEmail = email.trim().toLowerCase();
      // Vérifier si l'email est déjà utilisé par un autre utilisateur
      const existing = await query<RowDataPacket[]>(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [trimmedEmail, Number(userId)]
      );
      if (existing.length > 0) {
        return NextResponse.json(
          { error: 'Cette adresse email est déjà associée à un autre compte.' },
          { status: 400 }
        );
      }
      updates.push('email = ?');
      params.push(trimmedEmail);
    }

    if (password && typeof password === 'string' && password.trim().length > 0) {
      if (password.trim().length < 6) {
        return NextResponse.json(
          { error: 'Le nouveau mot de passe doit comporter au moins 6 caractères.' },
          { status: 400 }
        );
      }
      const hashed = await hashPassword(password.trim());
      updates.push('password_hash = ?');
      params.push(hashed);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'Aucune modification fournie.' }, { status: 400 });
    }

    params.push(Number(userId));

    await query<ResultSetHeader>(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      params as any
    );

    return NextResponse.json({ success: true, message: 'Utilisateur mis à jour avec succès.' });
  } catch (error) {
    console.error('Erreur API Admin Users PATCH:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de l’utilisateur.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json({ error: 'ID utilisateur manquant.' }, { status: 400 });
    }

    if (session.userId === Number(userId)) {
      return NextResponse.json(
        { error: 'Vous ne pouvez pas supprimer votre propre compte administrateur.' },
        { status: 400 }
      );
    }

    await query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [Number(userId)]);

    return NextResponse.json({ success: true, message: 'Compte utilisateur supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur API Admin Users DELETE:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression de l’utilisateur.' }, { status: 500 });
  }
}

