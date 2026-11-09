import { NextResponse } from 'next/server';
import { TutorService, SelectionTutorAction } from '@/services/tutorService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, action = 'explain', courseContext, chapterTitle, surroundingContext } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Texte manquant ou invalide.' },
        { status: 400 }
      );
    }

    const validAction: SelectionTutorAction =
      action === 'synonym' ? 'synonym' : action === 'example' ? 'example' : 'explain';

    const data = await TutorService.explainSelection({
      text: text.trim(),
      action: validAction,
      courseContext: typeof courseContext === 'string' ? courseContext : undefined,
      chapterTitle: typeof chapterTitle === 'string' ? chapterTitle : undefined,
      surroundingContext: typeof surroundingContext === 'string' ? surroundingContext : undefined,
    });

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('Erreur API Assistant Sélection :', error);
    return NextResponse.json(
      { error: "Erreur lors du traitement de l'analyse." },
      { status: 500 }
    );
  }
}
