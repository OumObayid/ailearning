'use client';

import React from 'react';

export interface CertificateData {
  studentName: string;
  courseTitle: string;
  courseId: string;
  completionDate: string;
  certificateId: string;
  averageScore?: number;
}

interface CertificatePDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateData;
}

export const CertificatePDFModal: React.FC<CertificatePDFModalProps> = ({
  isOpen,
  onClose,
  certificate,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      {/* Barre d'actions non imprimable */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl transition cursor-pointer"
        >
          <span>📥 Télécharger / Imprimer en PDF</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 shadow-xl transition cursor-pointer"
        >
          Fermer ✕
        </button>
      </div>

      {/* Diplôme officiel au format A4 Paysage (Ratio standard) */}
      <div
        id="official-certificate-diploma"
        className="w-full max-w-4xl bg-white text-slate-950 rounded-2xl shadow-2xl p-8 sm:p-12 relative overflow-hidden border-8 border-double border-amber-600/40 print:w-full print:max-w-none print:shadow-none print:rounded-none print:m-0 print:p-10"
        style={{ aspectRatio: '1.414 / 1' }}
      >
        {/* Filigrane d'arrière-plan */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none text-[160px] font-black">
          AILEARNING
        </div>

        {/* Cadre intérieur doré */}
        <div className="h-full w-full border-2 border-amber-500/50 rounded-xl p-6 sm:p-8 flex flex-col justify-between text-center relative z-10">
          {/* En-tête */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-black text-[11px] sm:text-xs uppercase tracking-widest border border-amber-300">
              🎓 Certificat Officiel d&apos;Achèvement &amp; de Compétence
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight pt-2">
              AiLearning Academy
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-bold tracking-wide">
              Institut de Formation Supérieure en Intelligence Artificielle &amp; Ingénierie Logicielle
            </p>
          </div>

          {/* Corps principal : Attribution du diplôme */}
          <div className="space-y-4 my-auto py-4">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-500 font-bold">
              Ce certificat est décerné avec mention à
            </p>

            <div className="text-2xl sm:text-4xl font-black text-indigo-950 tracking-wide border-b-2 border-amber-400/80 pb-2 inline-block px-8 max-w-full break-words">
              {certificate.studentName}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-xl mx-auto leading-relaxed">
              Pour avoir validé avec succès l&apos;intégralité des modules d&apos;enseignement théoriques, pratiques et les épreuves certifiantes du cursus :
            </p>

            <div className="text-xl sm:text-2xl font-black text-amber-900 bg-amber-50/70 border border-amber-200/80 py-2.5 px-6 rounded-2xl inline-block max-w-2xl">
              {certificate.courseTitle}
            </div>
          </div>

          {/* Bas du certificat : Sceau, Date et Signature */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-3 items-center text-xs">
            {/* Colonne 1 : Date & Identifiant */}
            <div className="text-left space-y-1">
              <div className="text-slate-500 font-bold">Délivré le :</div>
              <div className="font-black text-slate-950">{certificate.completionDate}</div>
              <div className="font-mono text-[10px] text-slate-400 break-all">ID: {certificate.certificateId}</div>
            </div>

            {/* Colonne 2 : Sceau Doré Officiel */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 p-0.5 shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-amber-50 border border-amber-600/40 flex flex-col items-center justify-center text-[10px] font-black text-amber-950 text-center leading-tight">
                  <span className="text-base sm:text-lg">⭐</span>
                  <span>AI LEARNING</span>
                  <span className="text-[8px] text-amber-800">VALIDÉ</span>
                </div>
              </div>
            </div>

            {/* Colonne 3 : Signature de la Direction */}
            <div className="text-right space-y-1">
              <div className="text-slate-500 font-bold">Le Comité Académique :</div>
              <div className="font-serif italic text-base sm:text-lg font-bold text-slate-900">Direction Pédagogique</div>
              <div className="text-[10px] text-slate-400 font-semibold">AiLearning International</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

