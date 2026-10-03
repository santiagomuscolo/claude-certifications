import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR } from "./paths.js";
import type { Topic } from "./notes.js";

const RESULTS_FILE = path.join(DATA_DIR, "results.json");

export interface QuizResult {
  timestamp: string;
  file: string;
  domain: string;
  section: string | null;
  question: string;
  correct: boolean;
  score: number;
}

export async function loadResults(): Promise<QuizResult[]> {
  try {
    return JSON.parse(await readFile(RESULTS_FILE, "utf8")) as QuizResult[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function saveResult(
  topic: Topic,
  answer: { question: string; correct: boolean; score: number },
): Promise<QuizResult> {
  const result: QuizResult = {
    timestamp: new Date().toISOString(),
    file: topic.file,
    domain: topic.domain,
    section: topic.section,
    ...answer,
  };
  const results = await loadResults();
  results.push(result);
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(RESULTS_FILE, JSON.stringify(results, null, 2));
  return result;
}
