import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { ProgressionService } from '@/services/progressionService';

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: 'Vous devez être connecté.' }, { status: 401 });
    }

    const data = await ProgressionService.getUserProgression(session.userId);
    if (!data) {
      return NextResponse.json({ error: 'Données utilisateur introuvables.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Erreur API User Progression:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de votre progression.' },
      { status: 500 }
    );
  }
}

