import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export const THEORY_DIR = path.resolve(projectRoot, "../theory");

export const DATA_DIR = path.join(projectRoot, "data");
