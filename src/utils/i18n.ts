import en from "../locales/en.json";
import it from "../locales/it.json";
import ar from "../locales/ar.json";
import es from "../locales/es.json";

export type Lang = "en" | "it" | "ar" | "es";

const dictionaries: Record<Lang, Record<string, any>> = { en, it, ar, es };

export function getLangFromPath(pathname: string, fallback: Lang = "en"): Lang {
  const seg = pathname.split("/").filter(Boolean)[0] as Lang | undefined;
  if (seg && ["en", "it", "ar", "es"].includes(seg)) return seg as Lang;
  const stored = (localStorage.getItem("lang") || "") as Lang;
  if (stored && ["en", "it", "ar", "es"].includes(stored)) return stored;
  return fallback;
}

function getByPath(obj: Record<string, any>, path: string): any {
  return path
    .split(".")
    .reduce(
      (acc: any, key: string) =>
        acc && acc[key] != null ? acc[key] : undefined,
      obj
    );
}

export function t(lang: Lang, key: string): string {
  const dict = dictionaries[lang] || dictionaries.en;
  const value = getByPath(dict, key);
  if (typeof value === "string") return value;
  // Fallback to English
  const fallback = getByPath(dictionaries.en, key);
  return typeof fallback === "string" ? fallback : key;
}

export function tObject(lang: Lang, key: string): any {
  const dict = dictionaries[lang] || dictionaries.en;
  const value = getByPath(dict, key);
  if (value !== undefined) return value;
  // Fallback to English
  const fallback = getByPath(dictionaries.en, key);
  return fallback !== undefined ? fallback : null;
}
