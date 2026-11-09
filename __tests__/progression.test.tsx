import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProgressionTabs, type ProgressionTabKey } from '@/components/progression/ProgressionTabs';
import { ChapterHistoryTable } from '@/components/progression/ChapterHistoryTable';
import { UserProgressionView } from '@/components/progression/UserProgressionView';
import type { UserProgressionResponse } from '@/services/progressionService';

const mockProgressionData: UserProgressionResponse = {
  user: {
    id: 1,
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'user',
    createdAt: '2026-01-01T00:00:00Z',
  },
  courses: [
    {
      id: 'ai-engineering',
      title: 'AI Engineering',
      slug: 'ai-engineering',
      modulesCount: 8,
      evaluatedModulesCount: 2,
      passedCount: 2,
      averageScore: 90,
      modules: [
        {
          order: 1,
          moduleId: 'module-1',
          title: 'Fondations des LLM',
          description: 'Introduction aux modèles de fondation',
          score: 95,
          avgScore: 95,
          attemptsCount: 1,
          passed: true,
          status: 'passed',
        },
      ],
    },
  ],
  exams: [
    {
      id: 101,
      courseId: 'ai-engineering',
      moduleId: 'module-1',
      moduleOrder: 1,
      moduleTitle: 'Fondations des LLM',
      score: 95,
      passed: true,
      timeSpentSeconds: 180,
      totalQuestions: 10,
      correctAnswersCount: 9,
      createdAt: '2026-03-01T10:00:00Z',
    },
  ],
  readingProgress: {
    completedKeys: ['ai-engineering:module-1:chapitre-1'],
    totalChaptersAllCourses: 310,
    totalCompletedAllCourses: 12,
    overallPercent: 4,
    courses: [
      {
        courseId: 'ai-engineering',
        title: 'AI Engineering',
        totalChaptersCount: 80,
        completedChaptersCount: 12,
        progressPercent: 15,
        modules: [
          {
            courseId: 'ai-engineering',
            moduleId: 'module-1',
            completedChaptersCount: 5,
            totalChaptersCount: 10,
            progressPercent: 50,
            completedSlugs: ['chapitre-1'],
          },
        ],
      },
    ],
    history: [
      {
        courseId: 'ai-engineering',
        courseTitle: 'AI Engineering',
        moduleId: 'module-1',
        moduleTitle: 'Fondations',
        chapterId: 'chapitre-1',
        chapterNumber: 1,
        chapterTitle: 'Introduction aux Transformers',
        completedAt: '2026-03-01T12:00:00Z',
        formattedDate: '01/03/2026 à 12:00',
        href: '/cours/ai-engineering/module-1/chapitre-1',
        chapterUrl: '/cours/ai-engineering/module-1/chapitre-1',
      },
    ],
  },
};

describe('Progression UI Components', () => {
  it('renders ProgressionTabs and handles tab clicks', () => {
    let selected: ProgressionTabKey = 'overview';
    const onSelect = (tab: ProgressionTabKey) => {
      selected = tab;
    };

    render(
      <ProgressionTabs
        activeTab="overview"
        onSelectTab={onSelect}
        readingCount={12}
        examsCount={1}
      />
    );

    expect(screen.getByText("Vue d'ensemble")).toBeDefined();
    expect(screen.getByText('Lectures & Chapitres')).toBeDefined();
    expect(screen.getByText('Examens & Notes')).toBeDefined();

    const readingBtn = screen.getByRole('button', { name: /Lectures & Chapitres/i });
    fireEvent.click(readingBtn);
    expect(selected).toBe('reading');
  });

  it('renders ChapterHistoryTable with completed chapter details and link', () => {
    const history = mockProgressionData.readingProgress!.history;
    render(<ChapterHistoryTable history={history} />);

    expect(screen.getByText('Ch. 1')).toBeDefined();
    expect(screen.getByText('Introduction aux Transformers')).toBeDefined();
    expect(screen.getByText(/2026/)).toBeDefined();
    const relireLink = screen.getByRole('link', { name: /Relire/i });
    expect(relireLink.getAttribute('href')).toBe('/cours/ai-engineering/module-1/chapitre-1');
  });

  it('renders UserProgressionView and displays tabs and overview content', () => {
    render(<UserProgressionView data={mockProgressionData} isAdminView={false} />);

    // Shows overview metrics
    expect(screen.getByText(/Lecture Théorique/i)).toBeDefined();
    expect(screen.getByText('4%')).toBeDefined();
    expect(screen.getByText(/Examens Validés/i)).toBeDefined();
  });

  it('switches to reading tab and displays reading breakdown and chapter history', () => {
    render(<UserProgressionView data={mockProgressionData} isAdminView={false} />);

    const readingTabBtn = screen.getByRole('button', { name: /Lectures & Chapitres/i });
    fireEvent.click(readingTabBtn);

    // Should now see reading specific section
    expect(screen.getByText(/Avancement de Lecture par Cursus/i)).toBeDefined();
    expect(screen.getByText(/Historique chronologique des chapitres validés/i)).toBeDefined();
    expect(screen.getByText('Introduction aux Transformers')).toBeDefined();
  });

  it('switches to exams tab and displays certification schemas and exam attempts', () => {
    render(<UserProgressionView data={mockProgressionData} isAdminView={false} />);

    const examsTabBtn = screen.getByRole('button', { name: /Examens & Notes/i });
    fireEvent.click(examsTabBtn);

    // Should now see exam specific section
    expect(screen.getByText(/Historique des épreuves passées/i)).toBeDefined();
    expect(screen.getByText(/Évaluations & Certifications par formation/i)).toBeDefined();
  });

  it('hides retake exam action button when isAdminView is true', () => {
    render(<UserProgressionView data={mockProgressionData} isAdminView={true} initialTab="exams" />);

    // In admin view, "Refaire" button should not be rendered
    expect(screen.queryByRole('link', { name: /Refaire/i })).toBeNull();
  });
});
