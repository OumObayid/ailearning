'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'ailearning_course_full_width';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('course-full-width-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('course-full-width-change', callback);
  };
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

interface CourseDisplayContextType {
  isFullWidth: boolean;
  toggleFullWidth: () => void;
  setFullWidth: (value: boolean) => void;
  exitFullWidth: () => void;
  isSidebarHidden: boolean;
  toggleSidebarHidden: () => void;
}

const CourseDisplayContext = createContext<CourseDisplayContextType | undefined>(undefined);

export const CourseDisplayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isFullWidth = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);

  const setFullWidth = useCallback((value: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
      window.dispatchEvent(new Event('course-full-width-change'));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleFullWidth = useCallback(() => {
    setFullWidth(!isFullWidth);
  }, [isFullWidth, setFullWidth]);

  const exitFullWidth = useCallback(() => {
    setFullWidth(false);
  }, [setFullWidth]);

  const toggleSidebarHidden = useCallback(() => {
    setIsSidebarHidden((prev) => !prev);
  }, []);

  // Listen for Escape key to exit full-width mode cleanly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullWidth) {
        exitFullWidth();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullWidth, exitFullWidth]);

  return (
    <CourseDisplayContext.Provider
      value={{
        isFullWidth,
        toggleFullWidth,
        setFullWidth,
        exitFullWidth,
        isSidebarHidden,
        toggleSidebarHidden,
      }}
    >
      {children}
    </CourseDisplayContext.Provider>
  );
};

export const useCourseDisplay = (): CourseDisplayContextType => {
  const context = useContext(CourseDisplayContext);
  if (!context) {
    throw new Error('useCourseDisplay must be used within a CourseDisplayProvider');
  }
  return context;
};
