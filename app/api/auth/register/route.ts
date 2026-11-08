import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword, signUserToken, COOKIE_NAME } from '@/lib/auth';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Le nom doit contenir au moins 2 caractères.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Veuillez fournir une adresse email valide.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit comporter au moins 6 caractères.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    // Vérifier si l'utilisateur existe déjà
    const existing = await query<RowDataPacket[]>(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [cleanEmail]
    );

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: 'Un compte existe déjà avec cette adresse email.' },
        { status: 409 }
      );
    }

    // Hasher le mot de passe
    const passwordHash = await hashPassword(password);

    // Insérer l'utilisateur
    const result = await query<ResultSetHeader>(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [cleanName, cleanEmail, passwordHash, 'student']
    );

    const userId = result.insertId;

    // Créer la session JWT
    const token = await signUserToken({
      userId,
      email: cleanEmail,
      name: cleanName,
      role: 'student',
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: userId,
        name: cleanName,
        email: cleanEmail,
        role: 'student',
      },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    return response;
  } catch (error) {
    console.error('Erreur inscription:', error);
    return NextResponse.json(
      { error: 'Une erreur interne est survenue lors de l’inscription.' },
      { status: 500 }
    );
  }
}

