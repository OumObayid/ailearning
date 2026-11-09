'use client';

import React, { useState } from 'react';
import type { UserProgressionResponse } from '@/services/progressionService';
import { ProgressionTabs, type ProgressionTabKey } from './ProgressionTabs';
import { OverviewSection } from './OverviewSection';
import { ReadingProgressSection } from './ReadingProgressSection';
import { ExamProgressSection } from './ExamProgressSection';

interface UserProgressionViewProps {
  data: UserProgressionResponse;
  isAdminView?: boolean;
  initialTab?: ProgressionTabKey;
}

export function UserProgressionView({
  data,
  isAdminView = false,
  initialTab = 'overview',
}: UserProgressionViewProps) {
  const [activeTab, setActiveTab] = useState<ProgressionTabKey>(initialTab);

  return (
    <div className="space-y-6">
      {/* Barre de navigation modulaire par onglets */}
      <ProgressionTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        showProfileTab={false}
        readingCount={data.readingProgress?.totalCompletedAllCourses}
        examsCount={data.exams?.length}
      />

      {/* 1. Espace Vue d'ensemble */}
      {activeTab === 'overview' && (
        <OverviewSection
          data={data}
          isAdminView={isAdminView}
          onGoToReading={() => setActiveTab('reading')}
          onGoToExams={() => setActiveTab('exams')}
        />
      )}

      {/* 2. Espace Progression des Lectures & Historique des Chapitres */}
      {activeTab === 'reading' && (
        <ReadingProgressSection
          readingProgress={data.readingProgress}
          isAdminView={isAdminView}
        />
      )}

      {/* 3. Espace Examens, Schémas des Modules & Épreuves */}
      {activeTab === 'exams' && (
        <ExamProgressSection
          courses={data.courses}
          exams={data.exams}
          isAdminView={isAdminView}
        />
      )}
    </div>
  );
}
