'use client';

import { useEffect } from 'react';

// Neutralisation préventive des attributs injectés par des extensions (ex: Bitdefender TrafficLight)
if (typeof window !== 'undefined') {
  try {
    const origSetAttr = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (name: string, value: string) {
      if (
        name === 'bis_skin_checked' ||
        name === 'bis_register' ||
        name.startsWith('__processed_') ||
        name.startsWith('bis_')
      ) {
        return;
      }
      return origSetAttr.apply(this, [name, value]);
    };
  } catch {}
}

export function ExtensionCleanUp() {
  useEffect(() => {
    try {
      document.querySelectorAll?.('[bis_skin_checked]').forEach((el) => {
        el.removeAttribute('bis_skin_checked');
      });
      document.body?.removeAttribute('bis_register');
    } catch {}
  }, []);

  return null;
}

