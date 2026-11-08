import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { ProgressionService } from '@/services/progressionService';

export async function GET(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Accès réservé aux administrateurs.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get('userId');

    if (!userIdParam) {
      return NextResponse.json({ error: 'Identifiant utilisateur manquant.' }, { status: 400 });
    }

    const userId = Number(userIdParam);
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Identifiant utilisateur invalide.' }, { status: 400 });
    }

    const data = await ProgressionService.getUserProgression(userId);
    if (!data) {
      return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Erreur API Admin User Progression:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la progression.' },
      { status: 500 }
    );
  }
}
