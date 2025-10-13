// lib/get-dictionary.ts

import en from "@/app/locales/en.json";
import fr from "@/app/locales/fr.json";

const dictionaries = {
  en,
  fr,
};

export async function getDictionary(locale: string) {
  return dictionaries[locale as keyof typeof dictionaries] || dictionaries.en;
}
