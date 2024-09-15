import { Language } from "@/components/context/language-provider";

type Languages = {
  iso_639_1: Language;
  english_name: string;
  name: string;
};

export const languages: Languages[] = [
  {
    iso_639_1: "en",
    english_name: "English",
    name: "English",
  },
  {
    iso_639_1: "es",
    english_name: "Spanish",
    name: "Español",
  },
  {
    iso_639_1: "fr",
    english_name: "French",
    name: "Français",
  },
  {
    iso_639_1: "de",
    english_name: "German",
    name: "Deutsch",
  },
  {
    iso_639_1: "zh",
    english_name: "Chinese",
    name: "中文",
  },
  {
    iso_639_1: "ja",
    english_name: "Japanese",
    name: "日本語",
  },
  {
    iso_639_1: "ko",
    english_name: "Korean",
    name: "한국어",
  },
  {
    iso_639_1: "ru",
    english_name: "Russian",
    name: "Русский",
  },
  {
    iso_639_1: "pt",
    english_name: "Portuguese",
    name: "Português",
  },
  {
    iso_639_1: "hi",
    english_name: "Hindi",
    name: "हिन्दी",
  },
  {
    iso_639_1: "bn",
    english_name: "Bengali",
    name: "বাংলা",
  },
  {
    iso_639_1: "ar",
    english_name: "Arabic",
    name: "العربية",
  },
];
