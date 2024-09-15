import { createContext, ReactNode, useContext, useState } from "react";

type Language =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "zh"
  | "ja"
  | "ko"
  | "ru"
  | "pt"
  | "hi"
  | "bn"
  | "sw"
  | "ar";

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
};

const LanguageProviderContext =
  createContext<LanguageProviderState>(initialState);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const storageKey = "language";
  const defaultLanguage: Language = "en";

  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage
  );

  const value = {
    language,
    setLanguage: (language: Language) => {
      localStorage.setItem(storageKey, language);
      setLanguage(language);
    },
  };
  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
