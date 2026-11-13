import { describe, it, expect } from 'vitest';
import { TutorService } from '@/services/tutorService';

describe('TutorService - Interactive Selection Tutor with 3 Options', { timeout: 15000 }, () => {
  it('returns exactly two words (1 French, 1 Arabic) with no filler text for "Mémoire"', async () => {
    const res = await TutorService.explainSelection({
      text: 'Mémoire',
      action: 'synonym',
      chapterTitle: 'Chapitre 1 — Mémoire (RAM), Stack, Heap et Event Loop avec Node.js',
    });

    expect(res.action).toBe('synonym');
    expect(res.isWord).toBe(true);
    expect(res.frenchWord).toBe('RAM');
    expect(res.arabicWord).toBe('الذاكرة');
    expect(res.arabicWord).not.toBe('المصطلح');
    expect(res.result).toBe('');
  });

  it('normalizes elisions like "la mémoire" or "l\'inférence" and never returns "المصطلح"', async () => {
    const res = await TutorService.explainSelection({
      text: 'la mémoire',
      action: 'synonym',
      chapterTitle: 'Chapitre 1 — Mémoire',
    });

    expect(res.action).toBe('synonym');
    expect(res.arabicWord).toBe('الذاكرة');
    expect(res.arabicWord).not.toBe('المصطلح');
  });

  it('translates dynamic words into real Arabic and never returns "المصطلح"', async () => {
    const res = await TutorService.explainSelection({
      text: 'exécution',
      action: 'synonym',
      chapterTitle: 'Architecture système',
    });

    expect(res.action).toBe('synonym');
    expect(res.arabicWord).toBeDefined();
    expect(res.arabicWord).not.toBe('المصطلح');
    expect(res.arabicWord?.length).toBeGreaterThan(1);
  });

  it('explains "Mémoire" directly without starting with "Dans le contexte du chapitre"', async () => {
    const res = await TutorService.explainSelection({
      text: 'Mémoire',
      action: 'explain',
      chapterTitle: 'Chapitre 1 — Mémoire (RAM), Stack, Heap et Event Loop avec Node.js',
    });

    expect(res.action).toBe('explain');
    expect(res.isWord).toBe(true);
    expect(res.result).not.toMatch(/^Dans le contexte du chapitre/i);
    expect(res.result).not.toMatch(/^Dans ce chapitre/i);
    expect(res.result.length).toBeGreaterThan(15);
    expect(res.arabicWord).toBe('الذاكرة');
  });

  it('returns French synonym and Arabic word for "Inférence"', async () => {
    const res = await TutorService.explainSelection({
      text: 'Inférence',
      action: 'synonym',
      chapterTitle: 'Module 1 - Architecture des Modèles de Langage',
    });

    expect(res.action).toBe('synonym');
    expect(res.isWord).toBe(true);
    expect(res.arabicWord).toBe('الاستدلال');
    expect(res.frenchWord).toBe('Prédiction');
  });

  it('explains "Inférence" directly without chapter preamble', async () => {
    const res = await TutorService.explainSelection({
      text: 'Inférence',
      action: 'explain',
      chapterTitle: 'Module 1 - Architecture des Modèles',
    });

    expect(res.action).toBe('explain');
    expect(res.isWord).toBe(true);
    expect(res.arabicWord).toBe('الاستدلال');
    expect(res.result).not.toMatch(/^Dans le contexte du chapitre/i);
    expect(res.result).not.toMatch(/^Dans ce chapitre/i);
    expect(res.result.length).toBeGreaterThan(15);
  });

  it('returns short example when action is example', async () => {
    const res = await TutorService.explainSelection({
      text: 'RAG',
      action: 'example',
      chapterTitle: 'Module 3 - Retrieval Augmented Generation',
    });

    expect(res.action).toBe('example');
    expect(res.isWord).toBe(true);
    expect(res.result).toBeDefined();
    expect(res.result.length).toBeGreaterThan(10);
  });

  it('returns direct summary for a sentence or paragraph without preamble', async () => {
    const longText =
      "Le mécanisme d'Attention Multi-Têtes projette simultanément les requêtes, clés et valeurs dans plusieurs sous-espaces de dimension réduite afin de capturer des dépendances sémantiques variées.";
    const res = await TutorService.explainSelection({
      text: longText,
      action: 'explain',
      chapterTitle: 'Module 2 - Mécanisme d Attention',
    });

    expect(res.isWord).toBe(false);
    expect(res.result).toBeDefined();
    expect(res.result).not.toMatch(/^Dans le contexte du chapitre/i);
    expect(res.result).not.toContain('Ce passage définit la règle technique régissant directement');
    expect(res.result.length).toBeGreaterThan(10);
  });

  it('explains technical expressions like "Risque de fuite mémoire" without generic repeated sentence', async () => {
    const res = await TutorService.explainSelection({
      text: 'Risque de fuite mémoire',
      action: 'explain',
      chapterTitle: 'Chapitre 1 — Mémoire (RAM), Stack, Heap et Event Loop avec Node.js',
    });

    expect(res.result).not.toContain('Ce passage définit la règle technique régissant directement');
    expect(res.result).not.toMatch(/^Dans le contexte du chapitre/i);
    expect(res.result.length).toBeGreaterThan(20);
  });

  it('explains "Mémoire & Event Loop" without generic repeated sentence', async () => {
    const res = await TutorService.explainSelection({
      text: 'Mémoire & Event Loop',
      action: 'explain',
      chapterTitle: 'Chapitre 1 — Mémoire (RAM), Stack, Heap et Event Loop avec Node.js',
    });

    expect(res.result).not.toContain('Ce passage définit la règle technique régissant directement');
    expect(res.result).not.toMatch(/^Dans le contexte du chapitre/i);
    expect(res.result.length).toBeGreaterThan(20);
  }, 15000);

  it('handles empty or whitespace text gracefully', async () => {
    const res = await TutorService.explainSelection({
      text: '   ',
      action: 'explain',
    });

    expect(res.result).toContain('Veuillez sélectionner');
  });
});
