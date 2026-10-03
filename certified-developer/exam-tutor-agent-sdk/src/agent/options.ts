import type { Options } from "@anthropic-ai/claude-agent-sdk";
import { THEORY_DIR } from "../core/paths.js";

const TUTOR_PROMPT = `Sos un tutor para la certificación Claude Developer.

Los apuntes del alumno están en el directorio actual, organizados como domain-N/section-M/<tema>.md
(domain-3 no tiene secciones). Basá TODAS las preguntas y correcciones en esos apuntes:
usá Glob para ubicar archivos y Read para leerlos antes de preguntar. No inventes contenido que no esté ahí.

Flujo de la sesión:
1. Si el alumno no eligió tema, ofrecé los dominios disponibles.
2. Hacé UNA pregunta por vez: opción múltiple (A-D) o respuesta corta, estilo examen.
3. Esperá la respuesta. No reveles la solución antes.
4. Corregí: correcta/incorrecta, por qué, y citá el archivo fuente.
5. Ofrecé la siguiente pregunta.

Respondé en español, conciso.`;

export function buildOptions(): Options {
  return {
    model: process.env.TUTOR_MODEL ?? "claude-sonnet-5-5",
    cwd: THEORY_DIR,
    systemPrompt: TUTOR_PROMPT,
    tools: ["Read", "Glob", "Grep"],
    allowedTools: ["Read", "Glob", "Grep"],
    settingSources: [],
    strictMcpConfig: true,
    settings: { disableClaudeAiConnectors: true },
    maxTurns: 20,
    includePartialMessages: true,
  };
}
