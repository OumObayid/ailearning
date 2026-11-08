import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { query } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

interface UserRecord extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar_url: string | null;
  created_at: string;
}

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    // Tentative de récupération des données à jour en base MySQL
    try {
      const users = await query<UserRecord[]>(
        'SELECT id, name, email, role, avatar_url, created_at FROM users WHERE id = ? LIMIT 1',
        [session.userId]
      );

      if (users && users.length > 0) {
        const user = users[0];
        return NextResponse.json({
          authenticated: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatarUrl: user.avatar_url,
            createdAt: user.created_at,
          },
        });
      }
    } catch (dbError) {
      // Si la base MySQL est arrêtée (ECONNREFUSED) ou inaccessible, on utilise les données du token JWT sans bloquer l'application
      console.warn('Base de données MySQL inaccessible (serveur éteint), repli sur la session JWT :', (dbError as Error).message);
      return NextResponse.json({
        authenticated: true,
        user: {
          id: session.userId,
          name: session.name,
          email: session.email,
          role: session.role,
          avatarUrl: null,
          createdAt: new Date().toISOString(),
        },
      }, { status: 200 });
    }

    return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
  } catch (error) {
    console.error('Erreur get me:', error);
    return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
  }
}
