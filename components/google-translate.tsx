"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Globe2 } from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages: string;
              layout?: number;
              autoDisplay?: boolean;
            },
            elementId: string
          ): void;
          InlineLayout?: {
            SIMPLE: number;
          };
        };
      };
    };
  }
}

export function GoogleTranslate() {
  const [language, setLanguage] = useState<"es" | "pt" | "en">("es");

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )googtrans=\/es\/([^;]+)/);
    if (match?.[1] === "pt" || match?.[1] === "en") {
      setLanguage(match[1]);
      return;
    }

    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith("pt")) {
      setLanguage("pt");
    } else if (browserLanguage.startsWith("en")) {
      setLanguage("en");
    }
  }, []);

  const changeLanguage = (nextLanguage: "es" | "pt" | "en") => {
    const value = `/es/${nextLanguage}`;
    const expires = "expires=Fri, 31 Dec 9999 23:59:59 GMT";

    document.cookie = `googtrans=${value}; path=/; ${expires}`;
    if (window.location.hostname.includes(".")) {
      document.cookie = `googtrans=${value}; domain=${window.location.hostname}; path=/; ${expires}`;
    }
    setLanguage(nextLanguage);
    window.location.reload();
  };

  return (
    <label className="relative inline-flex h-9 items-center">
      <span className="sr-only">Idioma</span>
      <Globe2 className="pointer-events-none absolute left-3 h-4 w-4 text-foreground" />
      <select
        aria-label="Idioma"
        value={language}
        onChange={(event) =>
          changeLanguage(event.target.value as "es" | "pt" | "en")
        }
        className="h-9 cursor-pointer appearance-none rounded-full border border-border bg-background py-1.5 pl-9 pr-8 text-sm font-medium text-foreground shadow-xs outline-none transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring"
      >
        <option value="es">ES</option>
        <option value="pt">PT</option>
        <option value="en">EN</option>
      </select>
      <span className="pointer-events-none absolute right-3 text-xs text-foreground">
        ▾
      </span>
    </label>
  );
}

export function GoogleTranslateProvider() {
  return (
    <>
      <div id="google_translate_element" className="google-translate-element" />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          window.googleTranslateElementInit = function() {
            if (!window.google || !window.google.translate) return;
            if (document.getElementById('google_translate_element')?.dataset.initialized === 'true') return;
            document.getElementById('google_translate_element').dataset.initialized = 'true';
            new window.google.translate.TranslateElement({
              pageLanguage: 'es',
              includedLanguages: 'es,pt,en',
              autoDisplay: false
            }, 'google_translate_element');
          };
        `}
      </Script>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
