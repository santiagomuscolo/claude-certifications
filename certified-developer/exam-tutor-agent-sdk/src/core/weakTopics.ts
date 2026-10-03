import type { Topic } from "./notes.js";
import type { QuizResult } from "./results.js";

export interface TopicStats {
  file: string;
  attempts: number;
  accuracy: number;
}

export interface WeakTopicsReport {
  weakest: TopicStats[];
  unseen: string[];
}

export function getWeakTopics(topics: Topic[], results: QuizResult[], limit = 3): WeakTopicsReport {
  const stats = new Map<string, { attempts: number; total: number }>();
  for (const result of results) {
    const entry = stats.get(result.file) ?? { attempts: 0, total: 0 };
    entry.attempts += 1;
    entry.total += result.score;
    stats.set(result.file, entry);
  }

  const weakest = [...stats]
    .map(([file, { attempts, total }]) => ({ file, attempts, accuracy: round(total / attempts) }))
    .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts)
    .slice(0, limit);

  const unseen = topics.map((topic) => topic.file).filter((file) => !stats.has(file));

  return { weakest, unseen };
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}
