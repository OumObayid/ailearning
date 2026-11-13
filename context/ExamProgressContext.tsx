'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

interface ExamProgressContextType {
  passedModules: Record<string, string[]>;
  passedCourses: string[];
  moduleScores: Record<string, Record<string, number>>;
  isModulePassed: (courseId: string, moduleIdentifier: string | number) => boolean;
  getModuleBadgeType: (courseId: string, moduleIdentifier: string | number) => 'royal' | 'success' | null;
  isCoursePassed: (courseId: string) => boolean;
  refreshProgress: () => Promise<void>;
  isLoading: boolean;
}

const ExamProgressContext = createContext<ExamProgressContextType>({
  passedModules: {},
  passedCourses: [],
  moduleScores: {},
  isModulePassed: () => false,
  getModuleBadgeType: () => null,
  isCoursePassed: () => false,
  refreshProgress: async () => {},
  isLoading: true,
});

function normalizeModuleIdentifier(input: string | number): string {
  if (typeof input === 'number') {
    return `module-${input}`;
  }
  const str = String(input).toLowerCase();
  const match = str.match(/module-(\d+)/);
  if (match) {
    return `module-${match[1]}`;
  }
  return str;
}

export function ExamProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [passedModules, setPassedModules] = useState<Record<string, string[]>>({});
  const [passedCourses, setPassedCourses] = useState<string[]>([]);
  const [moduleScores, setModuleScores] = useState<Record<string, Record<string, number>>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshProgress = useCallback(async () => {
    if (!user) {
      setPassedModules({});
      setPassedCourses([]);
      setModuleScores({});
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/exams/progress', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setPassedModules(data.passedModules || {});
          setPassedCourses(data.passedCourses || []);
          setModuleScores(data.moduleScores || {});
        } else {
          setPassedModules({});
          setPassedCourses([]);
          setModuleScores({});
        }
      }
    } catch (err) {
      console.error('Erreur de chargement de la progression:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    if (!user) {
      return;
    }

    const fetchProgress = async () => {
      try {
        const res = await fetch('/api/exams/progress', { cache: 'no-store' });
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.authenticated) {
            setPassedModules(data.passedModules || {});
            setPassedCourses(data.passedCourses || []);
            setModuleScores(data.moduleScores || {});
          } else {
            setPassedModules({});
            setPassedCourses([]);
            setModuleScores({});
          }
        }
      } catch (err) {
        console.error('Erreur de chargement de la progression:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProgress();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const isModulePassed = useCallback(
    (courseId: string, moduleIdentifier: string | number): boolean => {
      const targetSlug = normalizeModuleIdentifier(moduleIdentifier);
      const list = passedModules[courseId] || [];
      return list.includes(targetSlug);
    },
    [passedModules]
  );

  const getModuleBadgeType = useCallback(
    (courseId: string, moduleIdentifier: string | number): 'royal' | 'success' | null => {
      const courseScores = moduleScores[courseId];
      if (!courseScores) return null;
      const targetSlug = normalizeModuleIdentifier(moduleIdentifier);
      const score = courseScores[targetSlug];
      if (typeof score !== 'number' || score < 80) return null;
      return score >= 100 ? 'royal' : 'success';
    },
    [moduleScores]
  );

  const isCoursePassed = useCallback(
    (courseId: string): boolean => {
      return passedCourses.includes(courseId);
    },
    [passedCourses]
  );

  return (
    <ExamProgressContext.Provider
      value={{
        passedModules,
        passedCourses,
        moduleScores,
        isModulePassed,
        getModuleBadgeType,
        isCoursePassed,
        refreshProgress,
        isLoading,
      }}
    >
      {children}
    </ExamProgressContext.Provider>
  );
}

export function useExamProgress() {
  return useContext(ExamProgressContext);
}
