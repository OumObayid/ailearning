'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { UserChapterProgressSummary, CourseChapterProgress } from '@/services/chapterProgressService';

interface ToggleResult {
  success: boolean;
  requiresAuth?: boolean;
  error?: string;
  isCompleted?: boolean;
}

interface ChapterProgressContextType {
  completedKeys: Set<string>;
  coursesProgress: CourseChapterProgress[];
  totalCompletedAllCourses: number;
  totalChaptersAllCourses: number;
  overallPercent: number;
  isLoading: boolean;
  isChapterCompleted: (courseId: string, moduleId: string, chapterSlug: string) => boolean;
  toggleChapter: (courseId: string, moduleId: string, chapterSlug: string) => Promise<ToggleResult>;
  getModuleProgress: (courseId: string, moduleId: string) => { completedCount: number; totalCount: number; percent: number };
  getCourseProgress: (courseId: string) => { completedCount: number; totalCount: number; percent: number };
  refreshProgress: () => Promise<void>;
  // Modale de connexion rapide déclenchée si non connecté
  authPromptOpen: boolean;
  setAuthPromptOpen: (open: boolean) => void;
}

const ChapterProgressContext = createContext<ChapterProgressContextType>({
  completedKeys: new Set(),
  coursesProgress: [],
  totalCompletedAllCourses: 0,
  totalChaptersAllCourses: 0,
  overallPercent: 0,
  isLoading: true,
  isChapterCompleted: () => false,
  toggleChapter: async () => ({ success: false }),
  getModuleProgress: () => ({ completedCount: 0, totalCount: 0, percent: 0 }),
  getCourseProgress: () => ({ completedCount: 0, totalCount: 0, percent: 0 }),
  refreshProgress: async () => {},
  authPromptOpen: false,
  setAuthPromptOpen: () => {},
});

export function ChapterProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [data, setData] = useState<UserChapterProgressSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authPromptOpen, setAuthPromptOpen] = useState<boolean>(false);

  // Normaliser les clés : "courseId:moduleId:chapterSlug"
  const normalizeKey = useCallback((courseId: string, moduleId: string, chapterSlug: string) => {
    // Normaliser moduleId pour match indifféremment "module-1" ou "debugging-module-1"
    const orderMatch = moduleId.match(/\d+/);
    const modOrder = orderMatch ? `module-${orderMatch[0]}` : moduleId.toLowerCase();
    return `${courseId.toLowerCase()}:${modOrder}:${chapterSlug.toLowerCase()}`;
  }, []);

  const completedKeysSet = useMemo(() => {
    const set = new Set<string>();
    if (!data || !data.completedKeys) return set;
    data.completedKeys.forEach((key) => {
      const parts = key.split(':');
      if (parts.length >= 3) {
        const [cId, mId, ...slugParts] = parts;
        const slug = slugParts.join(':');
        set.add(normalizeKey(cId, mId, slug));
      } else {
        set.add(key.toLowerCase());
      }
    });
    return set;
  }, [data, normalizeKey]);

  const refreshProgress = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      const res = await fetch('/api/chapters/progress', { cache: 'no-store' });
      if (res.ok) {
        const json: UserChapterProgressSummary = await res.json();
        setData(json);
      }
    } catch (err) {
      console.warn('Erreur chargement progression chapitres :', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    let isMounted = true;
    const loadData = async () => {
      try {
        const res = await fetch('/api/chapters/progress', { cache: 'no-store' });
        if (res.ok && isMounted) {
          const json: UserChapterProgressSummary = await res.json();
          setData(json);
        }
      } catch (err) {
        console.warn('Erreur chargement progression chapitres :', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const isChapterCompleted = useCallback(
    (courseId: string, moduleId: string, chapterSlug: string) => {
      const key = normalizeKey(courseId, moduleId, chapterSlug);
      return completedKeysSet.has(key);
    },
    [completedKeysSet, normalizeKey]
  );

  const toggleChapter = useCallback(
    async (courseId: string, moduleId: string, chapterSlug: string): Promise<ToggleResult> => {
      if (!user) {
        setAuthPromptOpen(true);
        return {
          success: false,
          requiresAuth: true,
          error: 'Cette fonctionnalité n’est disponible que si vous êtes connecté.',
        };
      }

      const currentlyCompleted = isChapterCompleted(courseId, moduleId, chapterSlug);
      const targetState = !currentlyCompleted;
      const key = normalizeKey(courseId, moduleId, chapterSlug);

      // Mise à jour optimiste de l'UI
      setData((prev) => {
        if (!prev) return null;
        const updatedKeys = targetState
          ? [...prev.completedKeys, `${courseId}:${moduleId}:${chapterSlug}`]
          : prev.completedKeys.filter((k) => {
              const parts = k.split(':');
              if (parts.length >= 3) {
                return normalizeKey(parts[0], parts[1], parts.slice(2).join(':')) !== key;
              }
              return k !== key;
            });
        return {
          ...prev,
          completedKeys: updatedKeys,
        };
      });

      try {
        const res = await fetch('/api/chapters/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId,
            moduleId,
            chapterSlug,
            completed: targetState,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          // Revert optimiste
          await refreshProgress();
          return { success: false, error: err.error || 'Erreur lors de la mise à jour.' };
        }

        const json: UserChapterProgressSummary = await res.json();
        setData(json);
        return { success: true, isCompleted: targetState };
      } catch {
        await refreshProgress();
        return { success: false, error: 'Erreur réseau.' };
      }
    },
    [user, isChapterCompleted, normalizeKey, refreshProgress]
  );

  const getModuleProgress = useCallback(
    (courseId: string, moduleId: string) => {
      if (!data || !data.courses) return { completedCount: 0, totalCount: 0, percent: 0 };
      const course = data.courses.find((c) => c.courseId.toLowerCase() === courseId.toLowerCase());
      if (!course) return { completedCount: 0, totalCount: 0, percent: 0 };

      const orderMatch = moduleId.match(/\d+/);
      const modOrder = orderMatch ? `module-${orderMatch[0]}` : moduleId.toLowerCase();

      const mod = course.modules.find(
        (m) => m.moduleId.toLowerCase() === modOrder || m.moduleId.toLowerCase() === moduleId.toLowerCase()
      );
      if (!mod) return { completedCount: 0, totalCount: 0, percent: 0 };

      return {
        completedCount: mod.completedChaptersCount,
        totalCount: mod.totalChaptersCount,
        percent: mod.progressPercent,
      };
    },
    [data]
  );

  const getCourseProgress = useCallback(
    (courseId: string) => {
      if (!data || !data.courses) return { completedCount: 0, totalCount: 0, percent: 0 };
      const course = data.courses.find((c) => c.courseId.toLowerCase() === courseId.toLowerCase());
      if (!course) return { completedCount: 0, totalCount: 0, percent: 0 };

      return {
        completedCount: course.completedChaptersCount,
        totalCount: course.totalChaptersCount,
        percent: course.progressPercent,
      };
    },
    [data]
  );

  return (
    <ChapterProgressContext.Provider
      value={{
        completedKeys: completedKeysSet,
        coursesProgress: data?.courses || [],
        totalCompletedAllCourses: data?.totalCompletedAllCourses || 0,
        totalChaptersAllCourses: data?.totalChaptersAllCourses || 0,
        overallPercent: data?.overallPercent || 0,
        isLoading,
        isChapterCompleted,
        toggleChapter,
        getModuleProgress,
        getCourseProgress,
        refreshProgress,
        authPromptOpen,
        setAuthPromptOpen,
      }}
    >
      {children}
    </ChapterProgressContext.Provider>
  );
}

export function useChapterProgress() {
  return useContext(ChapterProgressContext);
}
