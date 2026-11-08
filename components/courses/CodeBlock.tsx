'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

interface CodeBlockProps {
  children?: React.ReactNode;
  code?: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  code,
  language = 'typescript',
  filename,
}) => {
  const [copied, setCopied] = useState(false);

  // Extract raw text from code prop or children for copying to clipboard
  const rawCode =
    code ||
    (typeof children === 'string'
      ? children
      : React.Children.toArray(children)
          .map((child) => (typeof child === 'string' ? child : ''))
          .join(''));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie :', err);
    }
  };

  const contentToDisplay = code || children;

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-lg ring-1 ring-white/5">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-3 text-sm backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
          </div>
          {filename && (
            <span className="ml-2 font-mono text-sm text-slate-300 font-medium">
              {filename}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-md bg-cyan-500/10 px-2.5 py-0.5 font-mono text-sm font-bold uppercase tracking-wider text-cyan-400 ring-1 ring-inset ring-cyan-500/30">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800/90 px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition shadow-xs"
            title="Copier le code"
          >
            {copied ? (
              <span className="text-emerald-400 font-bold">Copié !</span>
            ) : (
              <>
                <Icon name="document-text" className="w-4 h-4" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code body: wrapped in a <pre> with whitespace-pre so line breaks are strictly respected */}
      <div className="overflow-x-auto p-4 sm:p-5 text-sm sm:text-base font-mono text-slate-100 leading-relaxed">
        <pre className="font-mono whitespace-pre m-0 p-0 bg-transparent text-slate-100">
          <code>{contentToDisplay}</code>
        </pre>
      </div>
    </div>
  );
};
