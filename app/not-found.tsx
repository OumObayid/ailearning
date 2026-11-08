import Link from 'next/link';
import { Icon } from '@/components/common/Icon';

export default function NotFound() {
  return (
    <div className="py-16 text-center space-y-5">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4 ring-8 ring-indigo-50/50">
        <Icon name="info" className="w-8 h-8" />
      </div>

      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
        Erreur 404
      </span>

      <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
        Page introuvable
      </h1>

      <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
        La page ou le module que vous recherchez n&apos;existe pas ou a été déplacé.
      </p>

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
        >
          <Icon name="home" className="w-4 h-4" />
          <span>Retour au tableau de bord</span>
        </Link>
      </div>
    </div>
  );
}
