'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCourseDisplay } from '@/context/CourseDisplayContext';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { Icon } from '@/components/common/Icon';
import { CourseThemeKey, resolveCourseTheme } from '@/components/courses/CourseFullWidthToggle';
import { SelectionTutorPopover } from '@/components/courses/SelectionTutorPopover';
import { cn } from '@/lib/utils';

interface CourseChapterLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  sidebar: React.ReactNode;
  theme?: 'emerald' | 'blue' | 'amber' | 'purple' | 'indigo' | 'lime';
}

const EXIT_THEME_STYLES: Record<CourseThemeKey, string> = {
  amber:
    'border-amber-300 bg-amber-50/95 text-amber-950 hover:bg-amber-100 hover:border-amber-400 focus-visible:ring-amber-500',
  blue:
    'border-blue-300 bg-blue-50/95 text-blue-950 hover:bg-blue-100 hover:border-blue-400 focus-visible:ring-blue-500',
  purple:
    'border-purple-300 bg-purple-50/95 text-purple-950 hover:bg-purple-100 hover:border-purple-400 focus-visible:ring-purple-500',
  emerald:
    'border-emerald-300 bg-emerald-50/95 text-emerald-950 hover:bg-emerald-100 hover:border-emerald-400 focus-visible:ring-emerald-500',
  lime:
    'border-lime-300 bg-lime-50/95 text-lime-950 hover:bg-lime-100 hover:border-lime-400 focus-visible:ring-lime-500',
  default:
    'border-slate-300 bg-white/95 text-slate-800 hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-slate-400',
};

interface ThemeAccent {
  border: string;
  badge: string;
  iconBg: string;
  primaryBtn: string;
}

const THEME_ACCENTS: Record<CourseThemeKey, ThemeAccent> = {
  amber: {
    border: 'border-amber-200',
    badge: 'bg-amber-100 border-amber-200 text-amber-950',
    iconBg: 'bg-amber-100 text-amber-900 border-amber-300',
    primaryBtn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20',
  },
  blue: {
    border: 'border-blue-200',
    badge: 'bg-blue-100 border-blue-200 text-blue-950',
    iconBg: 'bg-blue-100 text-blue-900 border-blue-300',
    primaryBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20',
  },
  purple: {
    border: 'border-purple-200',
    badge: 'bg-purple-100 border-purple-200 text-purple-950',
    iconBg: 'bg-purple-100 text-purple-900 border-purple-300',
    primaryBtn: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20',
  },
  emerald: {
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 border-emerald-200 text-emerald-950',
    iconBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    primaryBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20',
  },
  lime: {
    border: 'border-lime-300',
    badge: 'bg-lime-100 border-lime-300 text-lime-950',
    iconBg: 'bg-lime-100 text-lime-900 border-lime-300',
    primaryBtn: 'bg-lime-700 hover:bg-lime-800 text-white shadow-lime-700/20',
  },
  default: {
    border: 'border-slate-200',
    badge: 'bg-indigo-100 border-indigo-200 text-indigo-950',
    iconBg: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    primaryBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20',
  },
};

export const CourseChapterLayout: React.FC<CourseChapterLayoutProps> = ({
  header,
  children,
  sidebar,
  theme,
}) => {
  const { isFullWidth, exitFullWidth } = useCourseDisplay();
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const currentTheme = resolveCourseTheme(pathname, theme);
  const accent = THEME_ACCENTS[currentTheme];

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const renderAccessGate = () => (
    <div
      className={cn(
        'rounded-3xl border-2 bg-white p-6 sm:p-10 shadow-sm text-center relative overflow-hidden',
        accent.border
      )}
    >
      {/* Badge cadenas / icone d'accès */}
      <div
        className={cn(
          'mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 shadow-xs mb-5',
          accent.iconBg
        )}
      >
        <Icon name="lock" className="w-8 h-8" />
      </div>

      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border mb-3',
          accent.badge
        )}
      >
        🔒 Contenu réservé aux apprenants
      </span>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-3">
        Connectez-vous pour lire ce chapitre
      </h2>

      <p className="max-w-xl mx-auto text-slate-600 text-sm sm:text-base font-medium leading-relaxed mb-8">
        La consultation des leçons complètes, l&apos;accès aux travaux pratiques et la sauvegarde
        automatique de votre progression sont réservés aux membres inscrits. L&apos;inscription est
        gratuite et immédiate.
      </p>

      {/* Grille des bénéfices */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto mb-8 text-left">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-2xs">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-800 text-sm font-bold">
              📖
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900">Leçons Complètes</h3>
          </div>
          <p className="text-xs text-slate-600 leading-normal">
            Accès illimité à l&apos;ensemble des chapitres, architectures et explications pas à pas.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-2xs">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-sm font-bold">
              📊
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900">Suivi &amp; Acquis</h3>
          </div>
          <p className="text-xs text-slate-600 leading-normal">
            Enregistrement automatique de votre avancement et préparation aux examens de certification.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-2xs">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-800 text-sm font-bold">
              🧪
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900">Labs &amp; Pratique</h3>
          </div>
          <p className="text-xs text-slate-600 leading-normal">
            Codes sources annotés, bacs à sable et exercices de mise en situation réelle.
          </p>
        </div>
      </div>

      {/* Actions de connexion */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => {
            setAuthMode('register');
            setIsAuthOpen(true);
          }}
          className={cn(
            'w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-md active:scale-98 cursor-pointer',
            accent.primaryBtn
          )}
        >
          <Icon name="sparkles" className="w-4 h-4" />
          <span>Créer un compte gratuit</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setAuthMode('login');
            setIsAuthOpen(true);
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border-2 border-slate-300 bg-white hover:bg-slate-100/80 hover:border-slate-400 text-slate-800 font-bold text-sm transition-all shadow-xs active:scale-98 cursor-pointer"
        >
          <Icon name="user" className="w-4 h-4" />
          <span>Se connecter</span>
        </button>
      </div>
    </div>
  );

  const renderLoadingSkeleton = () => (
    <div className="rounded-3xl border-2 border-slate-200 bg-white p-12 shadow-sm flex flex-col items-center justify-center min-h-[360px] text-center">
      <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-semibold text-slate-500">Vérification de la session...</p>
    </div>
  );

  const activeContent = isLoading ? renderLoadingSkeleton() : !user ? renderAccessGate() : children;

  return (
    <div className="space-y-6">
      {/* In Full Width: exit button fixed at the top-right */}
      {isFullWidth && (
        <button
          type="button"
          onClick={exitFullWidth}
          title="Quitter la pleine largeur (Échap)"
          aria-label="Quitter la pleine largeur"
          className={cn(
            'fixed top-3 right-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-xl border shadow-md backdrop-blur-sm active:scale-95 cursor-pointer transition-all duration-150 outline-hidden focus-visible:ring-2',
            EXIT_THEME_STYLES[currentTheme]
          )}
        >
          <Icon name="minimize" className="w-5 h-5" />
        </button>
      )}

      {/* Header (Breadcrumbs, Title with toggle button) */}
      {header && <div className="w-full">{header}</div>}

      {/* Layout: Full screen width vs standard 2-column layout */}
      {isFullWidth ? (
        <div className="w-full min-w-0">{activeContent}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 min-w-0">{activeContent}</div>
          <aside className="space-y-6 lg:sticky lg:top-20">{sidebar}</aside>
        </div>
      )}

      {/* Modal d'authentification intégrée (s'ouvre et débloque le contenu immédiatement au login) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onSuccess={() => setIsAuthOpen(false)}
      />

      {/* Tuteur IA Interactif au surlignage de mot ou texte */}
      <SelectionTutorPopover />
    </div>
  );
};
