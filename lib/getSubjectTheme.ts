import { subjects } from "./subjects";

export function getSubjectTheme(slug?: string) {
  return (
    subjects.find((s) => s.slug === slug)?.theme ||
    subjects[0].theme
  );
}