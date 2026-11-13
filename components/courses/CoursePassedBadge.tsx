'use client';

import React, { useState } from 'react';
import { useExamProgress } from '@/context/ExamProgressContext';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@/components/common/Icon';
import { CertificatePDFModal } from './CertificatePDFModal';
import { COURSES_CATALOG } from '@/lib/constants';

interface CoursePassedBadgeProps {
  courseId: string;
  className?: string;
  showDownloadButton?: boolean;
}

export const CoursePassedBadge: React.FC<CoursePassedBadgeProps> = ({
  courseId,
  className = '',
  showDownloadButton = true,
}) => {
  const { isCoursePassed } = useExamProgress();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const isPassed = isCoursePassed(courseId);

  if (!isPassed) return null;

  const courseMeta = COURSES_CATALOG.find((c) => c.id === courseId);
  const courseTitle = courseMeta?.title || courseId;

  const certificateData = {
    studentName: user?.name || 'Étudiant Certifié',
    courseTitle: courseTitle,
    courseId: courseId,
    completionDate: new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    certificateId: `AIL-${courseId.toUpperCase().slice(0, 4)}-${user?.id || 101}-${new Date().getFullYear()}`,
  };

  return (
    <>
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-black text-amber-950 shadow-xs select-none">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-900" />
          <span>Certification Obtenue</span>
        </span>

        {showDownloadButton && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3 py-1 text-xs transition shadow-sm cursor-pointer"
            title="Télécharger le Diplôme officiel en PDF"
          >
            <Icon name="arrow-down-tray" className="w-3.5 h-3.5" />
            <span>Diplôme (PDF)</span>
          </button>
        )}
      </div>

      <CertificatePDFModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        certificate={certificateData}
      />
    </>
  );
};
