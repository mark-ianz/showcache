import { Language } from "@/types/language";
import { createContext, ReactNode, useContext, useState } from "react";

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const initialState: LanguageProviderState = {
  language: {
    iso_639_1: "en",
    english_name: "English",
    name: "English",
  },
  setLanguage: () => null,
};

const LanguageProviderContext =
  createContext<LanguageProviderState>(initialState);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const storageKey: string = "language";
  const defaultLanguage: Language = {
    iso_639_1: "en",
    english_name: "English",
    name: "English",
  };

  const [language, setLanguage] = useState<Language>(
    () =>
      (JSON.parse(localStorage.getItem(storageKey)!) as Language) ||
      defaultLanguage
  );

  const value: LanguageProviderState = {
    language,
    setLanguage: (language: Language) => {
      localStorage.setItem(storageKey, JSON.stringify(language));
      setLanguage(language);
    },
  };
  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
