import { readdir } from "node:fs/promises";
import { THEORY_DIR } from "./paths.js";

export interface Topic {
  file: string;
  domain: string;
  section: string | null;
  name: string;
}

export async function listTopics(): Promise<Topic[]> {
  const entries = await readdir(THEORY_DIR, { recursive: true });
  return entries
    .map((entry) => entry.replaceAll("\\", "/"))
    .filter((file) => file.endsWith(".md"))
    .map(toTopic)
    .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }));
}

export async function findTopic(file: string): Promise<Topic | undefined> {
  const normalized = file.replaceAll("\\", "/");
  return (await listTopics()).find((topic) => topic.file === normalized);
}

function toTopic(file: string): Topic {
  const parts = file.split("/");
  const name = parts.at(-1)!.replace(/\.md$/, "");
  return {
    file,
    domain: parts[0],
    section: parts.length > 2 ? parts[1] : null,
    name,
  };
}
