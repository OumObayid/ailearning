import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { ChapterProgressService } from '@/services/chapterProgressService';

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({
        authenticated: false,
        completedKeys: [],
        courses: [],
        totalCompletedAllCourses: 0,
        totalChaptersAllCourses: 0,
        overallPercent: 0,
      });
    }

    const progress = await ChapterProgressService.getUserProgress(session.userId);

    return NextResponse.json({
      authenticated: true,
      ...progress,
    });
  } catch (error) {
    console.error('Erreur GET /api/chapters/progress:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la progression de lecture.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json(
        { authenticated: false, error: 'Vous devez être connecté pour marquer un chapitre comme terminé.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { courseId, moduleId, chapterSlug, completed } = body;

    if (!courseId || !moduleId || !chapterSlug || typeof completed !== 'boolean') {
      return NextResponse.json(
        { error: 'Paramètres incomplets (courseId, moduleId, chapterSlug et completed requis).' },
        { status: 400 }
      );
    }

    const ok = await ChapterProgressService.setChapterCompleted(
      session.userId,
      String(courseId),
      String(moduleId),
      String(chapterSlug),
      completed
    );

    if (!ok) {
      return NextResponse.json(
        { error: 'Impossible de mettre à jour le statut du chapitre.' },
        { status: 500 }
      );
    }

    const updatedProgress = await ChapterProgressService.getUserProgress(session.userId);

    return NextResponse.json({
      success: true,
      authenticated: true,
      ...updatedProgress,
    });
  } catch (error) {
    console.error('Erreur POST /api/chapters/progress:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du statut du chapitre.' },
      { status: 500 }
    );
  }
}

