import { createSdkMcpServer, tool } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import { findTopic, listTopics } from "../core/notes.js";
import { loadResults, saveResult } from "../core/results.js";
import { getWeakTopics } from "../core/weakTopics.js";

const json = (value: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }] });
const error = (message: string) => ({ content: [{ type: "text" as const, text: message }], isError: true });

const listTopicsTool = tool(
  "list_topics",
  "Lista todos los temas de estudio disponibles. Cada tema es un archivo de apuntes (`file`) con su dominio y sección.",
  {},
  async () => json(await listTopics()),
);

const saveResultTool = tool(
  "save_result",
  "Guarda el resultado de una pregunta ya corregida. Llamala una vez por pregunta, después de la corrección.",
  {
    file: z.string().describe("Archivo de apuntes de la pregunta, tal como lo devuelve list_topics"),
    question: z.string().describe("Texto de la pregunta"),
    correct: z.boolean().describe("true si la respuesta fue correcta"),
    score: z.number().min(0).max(1).describe("Puntaje de 0 a 1 (las respuestas parciales van en el medio)"),
  },
  async ({ file, ...answer }) => {
    const topic = await findTopic(file);
    if (!topic) return error(`Tema desconocido: ${file}. Usá un \`file\` de list_topics.`);
    return json(await saveResult(topic, answer));
  },
);

const getWeakTopicsTool = tool(
  "get_weak_topics",
  "Devuelve los temas con peor puntaje del alumno (`weakest`) y los que todavía no practicó (`unseen`).",
  { limit: z.number().int().min(1).max(10).default(3).describe("Cuántos temas débiles devolver") },
  async ({ limit }) => json(getWeakTopics(await listTopics(), await loadResults(), limit)),
);

export const tutorServer = createSdkMcpServer({
  name: "tutor",
  version: "1.0.0",
  tools: [listTopicsTool, saveResultTool, getWeakTopicsTool],
});

export const TUTOR_TOOLS = ["mcp__tutor__list_topics", "mcp__tutor__save_result", "mcp__tutor__get_weak_topics"];
