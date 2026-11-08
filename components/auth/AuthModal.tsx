'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  // Synchronisation du mode et reset des états lors de l'ouverture
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
      setPassword('');
      setShowPassword(false);
    }
  }, [isOpen, initialMode]);

  // Fermeture via la touche Échap
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (res.success) {
          onSuccess?.();
          onClose();
        } else {
          setError(res.error || 'Identifiants invalides. Vérifiez votre email et mot de passe.');
        }
      } else {
        const res = await register(name, email, password);
        if (res.success) {
          onSuccess?.();
          onClose();
        } else {
          setError(res.error || 'Erreur lors de l’inscription.');
        }
      }
    } catch {
      setError('Une erreur imprévue est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        // Clic sur l'arrière-plan sombre pour fermer la modale
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-[600px] max-h-[92vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-slate-300 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* En-tête : Titre + Bouton Fermer (sans les deux boutons du haut) */}
        <div className="flex items-center justify-between pb-3.5 border-b-2 border-slate-100 mb-4">
          <h2 className="text-xl font-black text-slate-950 tracking-tight">
            {mode === 'login' ? 'Connexion Espace Membre' : 'Création de Compte Membre'}
          </h2>

          <button
            onClick={onClose}
            type="button"
            className="h-8 w-8 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-950 transition flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Fermer la boîte de dialogue"
            title="Fermer (Échap)"
          >
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        {/* Message d'erreur compact avec bouton dismiss */}
        {error && (
          <div className="mb-4 rounded-xl border-2 border-rose-300 bg-rose-50 px-3.5 py-2.5 text-xs font-bold text-rose-950 flex items-center justify-between gap-2 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-rose-600 shrink-0 font-black text-sm">⚠️</span>
              <span className="leading-snug">{error}</span>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-rose-700 hover:text-rose-950 p-1 rounded-md hover:bg-rose-100 transition shrink-0 cursor-pointer"
              title="Fermer l'alerte"
            >
              <Icon name="x" className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Ex. Alexandre Martin"
                className="w-full rounded-xl border-2 border-slate-300 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-950 placeholder-slate-400 focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700/20 transition"
              />
            </div>
          )}

          {/* Adresse email & Mot de passe (alignés côte à côte en mode inscription) */}
          {mode === 'register' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="nom@exemple.com"
                  className="w-full rounded-xl border-2 border-slate-300 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-950 placeholder-slate-400 focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700/20 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full rounded-xl border-2 border-slate-300 bg-white pl-3.5 pr-10 py-2.5 text-sm font-bold text-slate-950 placeholder-slate-400 focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition cursor-pointer p-1"
                    title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    <Icon name={showPassword ? 'eye-off' : 'eye'} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="nom@exemple.com"
                  className="w-full rounded-xl border-2 border-slate-300 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-950 placeholder-slate-400 focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700/20 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full rounded-xl border-2 border-slate-300 bg-white pl-3.5 pr-10 py-2.5 text-sm font-bold text-slate-950 placeholder-slate-400 focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition cursor-pointer p-1"
                    title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    <Icon name={showPassword ? 'eye-off' : 'eye'} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Boutons d'action garantissant qu'on peut TOUJOURS sortir de la page */}
          <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 rounded-xl border-2 border-slate-300 bg-white py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer text-center"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 rounded-xl bg-indigo-700 py-2.5 text-sm font-black text-white shadow-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-60 transition cursor-pointer text-center"
            >
              {loading
                ? 'Traitement...'
                : mode === 'login'
                ? 'Se connecter'
                : 'Créer mon compte'}
            </button>
          </div>
        </form>

        {/* Lien de bascule discret en bas */}
        <div className="mt-4 text-center border-t border-slate-100 pt-3">
          {mode === 'login' ? (
            <p className="text-xs text-slate-600 font-medium">
              Pas encore de compte membre ?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError(null);
                }}
                className="font-black text-indigo-700 hover:text-indigo-900 underline ml-1 transition cursor-pointer"
              >
                Inscrivez-vous ici
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-600 font-medium">
              Vous possédez déjà un compte ?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                }}
                className="font-black text-indigo-700 hover:text-indigo-900 underline ml-1 transition cursor-pointer"
              >
                Connectez-vous
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
