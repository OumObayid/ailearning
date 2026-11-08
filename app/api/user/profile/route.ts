import { NextResponse } from 'next/server';
import { getCurrentUser, signUserToken, verifyPassword, hashPassword, COOKIE_NAME } from '@/lib/auth';
import { query } from '@/lib/db';
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
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: 'Vous devez être connecté.' }, { status: 401 });
    }

    const body = await request.json();
    const { action } = body;

    // Récupérer l'utilisateur courant en base avec son mot de passe haché
    const users = await query<UserRecord[]>(
      'SELECT id, name, email, password_hash, role FROM users WHERE id = ? LIMIT 1',
      [session.userId]
    );

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 });
    }

    const currentUser = users[0];

    // ====================================================================
    // 1. CHANGEMENT D'ADRESSE EMAIL
    // ====================================================================
    if (action === 'update_email') {
      const { newEmail, currentPassword } = body;

      if (!newEmail || typeof newEmail !== 'string') {
        return NextResponse.json({ error: 'La nouvelle adresse email est requise.' }, { status: 400 });
      }

      const cleanEmail = newEmail.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        return NextResponse.json({ error: 'Format d\'adresse email invalide.' }, { status: 400 });
      }

      if (cleanEmail === currentUser.email.toLowerCase()) {
        return NextResponse.json({ error: 'La nouvelle adresse email est identique à l\'actuelle.' }, { status: 400 });
      }

      if (!currentPassword) {
        return NextResponse.json({ error: 'Le mot de passe actuel est requis pour confirmer la modification.' }, { status: 400 });
      }

      const passwordValid = await verifyPassword(String(currentPassword), currentUser.password_hash);
      if (!passwordValid) {
        return NextResponse.json({ error: 'Mot de passe actuel incorrect.' }, { status: 401 });
      }

      // Vérifier si l'email est déjà utilisé par un autre utilisateur
      const existing = await query<RowDataPacket[]>(
        'SELECT id FROM users WHERE email = ? AND id != ? LIMIT 1',
        [cleanEmail, currentUser.id]
      );

      if (existing && existing.length > 0) {
        return NextResponse.json({ error: 'Cette adresse email est déjà associée à un autre compte.' }, { status: 400 });
      }

      // Mettre à jour l'email
      await query('UPDATE users SET email = ? WHERE id = ?', [cleanEmail, currentUser.id]);

      // Régénérer le token JWT avec la nouvelle adresse
      const token = await signUserToken({
        userId: currentUser.id,
        email: cleanEmail,
        name: currentUser.name,
        role: currentUser.role,
      });

      const response = NextResponse.json({
        success: true,
        message: 'Votre adresse email a été modifiée avec succès.',
        user: {
          id: currentUser.id,
          name: currentUser.name,
          email: cleanEmail,
          role: currentUser.role,
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
    }

    // ====================================================================
    // 2. CHANGEMENT DE MOT DE PASSE
    // ====================================================================
    if (action === 'update_password') {
      const { currentPassword, newPassword, confirmPassword } = body;

      if (!currentPassword || !newPassword) {
        return NextResponse.json({ error: 'Le mot de passe actuel et le nouveau mot de passe sont requis.' }, { status: 400 });
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json({ error: 'La confirmation du mot de passe ne correspond pas au nouveau mot de passe.' }, { status: 400 });
      }

      if (String(newPassword).length < 6) {
        return NextResponse.json({ error: 'Le nouveau mot de passe doit comporter au moins 6 caractères.' }, { status: 400 });
      }

      const passwordValid = await verifyPassword(String(currentPassword), currentUser.password_hash);
      if (!passwordValid) {
        return NextResponse.json({ error: 'Mot de passe actuel incorrect.' }, { status: 401 });
      }

      // Hachage du nouveau mot de passe
      const newHash = await hashPassword(String(newPassword));
      await query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, currentUser.id]);

      return NextResponse.json({
        success: true,
        message: 'Votre mot de passe a été modifié avec succès.',
      });
    }

    // ====================================================================
    // 3. MISE À JOUR DU NOM (OPTIONNEL)
    // ====================================================================
    if (action === 'update_name') {
      const { name } = body;
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json({ error: 'Le nom ne peut pas être vide.' }, { status: 400 });
      }

      const cleanName = name.trim();
      await query('UPDATE users SET name = ? WHERE id = ?', [cleanName, currentUser.id]);

      const token = await signUserToken({
        userId: currentUser.id,
        email: currentUser.email,
        name: cleanName,
        role: currentUser.role,
      });

      const response = NextResponse.json({
        success: true,
        message: 'Votre nom a été mis à jour avec succès.',
        user: {
          id: currentUser.id,
          name: cleanName,
          email: currentUser.email,
          role: currentUser.role,
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
    }

    return NextResponse.json({ error: 'Action non reconnue.' }, { status: 400 });
  } catch (error) {
    console.error('Erreur API update user profile:', error);
    return NextResponse.json(
      { error: 'Une erreur interne est survenue lors de la mise à jour.' },
      { status: 500 }
    );
  }
}

