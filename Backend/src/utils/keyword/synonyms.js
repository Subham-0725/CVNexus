/**
 * Canonical skill/term -> list of equivalent surface forms (lowercase).
 * Used to match JD requirements to resume text without inflating unique counts.
 */
export const SYNONYM_GROUPS = [
  ["javascript", "js", "ecmascript"],
  ["typescript", "ts"],
  ["react", "reactjs", "react.js"],
  ["node", "nodejs", "node.js"],
  ["vue", "vuejs", "vue.js"],
  ["angular", "angularjs"],
  ["postgres", "postgresql", "psql"],
  ["mongodb", "mongo"],
  ["aws", "amazon web services"],
  ["gcp", "google cloud"],
  ["azure", "microsoft azure"],
  ["kubernetes", "k8s"],
  ["docker", "containerization", "containers"],
  ["ci", "cd", "cicd", "continuous integration", "continuous deployment"],
  ["ml", "machine learning"],
  ["ai", "artificial intelligence"],
  ["nlp", "natural language processing"],
  ["etl", "extract transform load"],
  ["api", "rest", "restful", "graphql"],
  ["sql", "rdbms", "relational database"],
  ["nosql", "non relational"],
  ["oop", "object oriented"],
  ["ui", "ux", "user interface", "user experience"],
  ["html", "html5"],
  ["css", "css3"],
  ["csharp", "c#", "dotnet", ".net"],
  ["cpp", "c++"],
  ["golang", "go lang", "go"],
  ["rb", "ruby"],
  ["py", "python"],
  ["tf", "tensorflow"],
  ["pytorch", "torch"],
  ["scrum", "agile", "kanban"],
  ["jira", "confluence"],
  ["git", "github", "gitlab", "version control"],
];

/** term -> canonical representative */
const termToCanonical = new Map();
for (const group of SYNONYM_GROUPS) {
  const canonical = group.reduce((a, b) => (a.length <= b.length ? a : b));
  for (const term of group) {
    termToCanonical.set(term, canonical);
  }
}

export function canonicalizeTerm(term) {
  const t = String(term).toLowerCase().trim();
  return termToCanonical.get(t) || t;
}

/** All forms in the same group as `term` (including self). */
export function expandSynonyms(term) {
  const t = String(term).toLowerCase().trim();
  for (const group of SYNONYM_GROUPS) {
    if (group.includes(t)) return new Set(group);
  }
  return new Set([t]);
}
