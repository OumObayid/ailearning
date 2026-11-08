import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyPassword, signUserToken, COOKIE_NAME } from '@/lib/auth';
import type { RowDataPacket } from 'mysql2';

interface UserRecord extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const users = await query<UserRecord[]>(
      'SELECT id, name, email, password_hash, role FROM users WHERE email = ? LIMIT 1',
      [cleanEmail]
    );

    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: 'Identifiants invalides (email ou mot de passe incorrect).' },
        { status: 401 }
      );
    }

    const user = users[0];
    const passwordMatch = await verifyPassword(String(password), user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Identifiants invalides (email ou mot de passe incorrect).' },
        { status: 401 }
      );
    }

    // Créer la session JWT
    const token = await signUserToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Erreur connexion:', error);
    return NextResponse.json(
      { error: 'Une erreur interne est survenue lors de la connexion.' },
      { status: 500 }
    );
  }
}

