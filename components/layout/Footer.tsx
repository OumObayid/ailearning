import React from 'react';
import { Container } from './Container';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 mt-auto">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-semibold text-slate-700">
          <p>© 2026 AiLearning — Plateforme de formation au développement d&apos;applications IA.</p>
          <div className="flex items-center space-x-6">
            <span>Next.js App Router</span>
            <span>TypeScript</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
