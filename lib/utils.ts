/**
 * Utilitaire pour concaténer conditionnellement des classes CSS Tailwind
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

