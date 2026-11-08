'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@/components/common/Icon';

export function UserProfileSettings() {
  const { user, refreshUser } = useAuth();

  // État formulaire email
  const [newEmail, setNewEmail] = useState<string>('');
  const [emailCurrentPassword, setEmailCurrentPassword] = useState<string>('');
  const [emailLoading, setEmailLoading] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // État formulaire mot de passe
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!user) return null;

  // Gestion de la modification d'email
  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMessage(null);

    if (!newEmail.trim()) {
      setEmailMessage({ type: 'error', text: 'Veuillez saisir votre nouvelle adresse email.' });
      return;
    }
    if (!emailCurrentPassword) {
      setEmailMessage({ type: 'error', text: 'Veuillez saisir votre mot de passe actuel pour valider.' });
      return;
    }

    setEmailLoading(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_email',
          newEmail: newEmail.trim(),
          currentPassword: emailCurrentPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setEmailMessage({ type: 'error', text: data.error || 'Erreur lors de la modification de l\'email.' });
      } else {
        setEmailMessage({ type: 'success', text: data.message || 'Adresse email mise à jour avec succès.' });
        setNewEmail('');
        setEmailCurrentPassword('');
        await refreshUser();
      }
    } catch {
      setEmailMessage({ type: 'error', text: 'Erreur réseau lors de la mise à jour.' });
    } finally {
      setEmailLoading(false);
    }
  };

  // Gestion de la modification du mot de passe
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (!currentPassword) {
      setPasswordMessage({ type: 'error', text: 'Veuillez renseigner votre mot de passe actuel.' });
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Le nouveau mot de passe doit comporter au moins 6 caractères.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'La confirmation ne correspond pas au nouveau mot de passe.' });
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_password',
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPasswordMessage({ type: 'error', text: data.error || 'Erreur lors de la modification du mot de passe.' });
      } else {
        setPasswordMessage({ type: 'success', text: data.message || 'Mot de passe modifié avec succès !' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch {
      setPasswordMessage({ type: 'error', text: 'Erreur réseau lors de la mise à jour.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Formulaire : Modification de l'adresse email */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-7 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
                ✉️
              </div>
              <div>
                <h3 className="text-base font-black text-slate-950">Modifier l&apos;adresse email</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Adresse actuelle : <span className="font-bold text-slate-800">{user.email}</span>
                </p>
              </div>
            </div>

            {emailMessage && (
              <div
                className={`p-3 rounded-xl text-xs font-bold border ${
                  emailMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : 'bg-rose-50 text-rose-900 border-rose-300'
                }`}
              >
                {emailMessage.text}
              </div>
            )}

            <form onSubmit={handleUpdateEmail} autoComplete="off" className="space-y-3.5">
              {/* Leurres invisibles pour empêcher les navigateurs d'injecter automatiquement les identifiants enregistrés */}
              <input type="text" name="decoy_username" tabIndex={-1} aria-hidden="true" autoComplete="off" className="sr-only opacity-0 absolute -z-10 h-0 w-0" />
              <input type="password" name="decoy_password" tabIndex={-1} aria-hidden="true" autoComplete="new-password" className="sr-only opacity-0 absolute -z-10 h-0 w-0" />

              <div className="space-y-1">
                <label htmlFor="user_new_email_no_autofill" className="text-xs font-black text-slate-700 block">
                  Nouvelle adresse email
                </label>
                <input
                  id="user_new_email_no_autofill"
                  name="user_new_email_no_autofill"
                  type="email"
                  required
                  autoComplete="new-password"
                  data-lpignore="true"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="nouveau.email@exemple.com"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="user_current_password_for_email" className="text-xs font-black text-slate-700 block">
                  Mot de passe actuel (confirmation requise)
                </label>
                <input
                  id="user_current_password_for_email"
                  name="user_current_password_for_email"
                  type="password"
                  required
                  autoComplete="new-password"
                  data-lpignore="true"
                  value={emailCurrentPassword}
                  onChange={(e) => setEmailCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-black text-xs transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  {emailLoading ? (
                    <span>Mise à jour en cours...</span>
                  ) : (
                    <>
                      <Icon name="check-circle" className="w-4 h-4" />
                      <span>Enregistrer la nouvelle adresse email</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 3. Formulaire : Modification du mot de passe */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-7 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
                🔒
              </div>
              <div>
                <h3 className="text-base font-black text-slate-950">Changer de mot de passe</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Sécurisez l&apos;accès à votre espace avec un mot de passe robuste.
                </p>
              </div>
            </div>

            {passwordMessage && (
              <div
                className={`p-3 rounded-xl text-xs font-bold border ${
                  passwordMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : 'bg-rose-50 text-rose-900 border-rose-300'
                }`}
              >
                {passwordMessage.text}
              </div>
            )}

            <form onSubmit={handleUpdatePassword} autoComplete="off" className="space-y-3.5">
              {/* Leurres invisibles pour neutraliser l'autocomplétion du navigateur */}
              <input type="text" name="decoy_username_pwd" tabIndex={-1} aria-hidden="true" autoComplete="off" className="sr-only opacity-0 absolute -z-10 h-0 w-0" />
              <input type="password" name="decoy_password_pwd" tabIndex={-1} aria-hidden="true" autoComplete="new-password" className="sr-only opacity-0 absolute -z-10 h-0 w-0" />

              <div className="space-y-1">
                <label htmlFor="user_current_password_input" className="text-xs font-black text-slate-700 block">
                  Mot de passe actuel
                </label>
                <input
                  id="user_current_password_input"
                  name="user_current_password_input"
                  type="password"
                  required
                  autoComplete="new-password"
                  data-lpignore="true"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="user_new_password_input" className="text-xs font-black text-slate-700 block">
                  Nouveau mot de passe (min 6 caractères)
                </label>
                <input
                  id="user_new_password_input"
                  name="user_new_password_input"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  data-lpignore="true"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="user_confirm_new_password_input" className="text-xs font-black text-slate-700 block">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  id="user_confirm_new_password_input"
                  name="user_confirm_new_password_input"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  data-lpignore="true"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:bg-purple-400 text-white font-black text-xs transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  {passwordLoading ? (
                    <span>Modification en cours...</span>
                  ) : (
                    <>
                      <Icon name="shield-check" className="w-4 h-4" />
                      <span>Mettre à jour le mot de passe</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

