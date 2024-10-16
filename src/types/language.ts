export type LanguageCode =
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

export type Language = {
  iso_639_1: LanguageCode;
  english_name: string;
  name: string;
};