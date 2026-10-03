import type { Options } from "@anthropic-ai/claude-agent-sdk";
import { THEORY_DIR } from "../core/paths.js";
import { agents } from "./agents.js";
import { TUTOR_TOOLS, tutorServer } from "./tools.js";

const TUTOR_PROMPT = `Sos un tutor para la certificación Claude Developer. Coordinás la sesión;
no leés los apuntes ni escribís ni corregís preguntas vos mismo: para eso están los subagentes.

Herramientas:
- list_topics: temas disponibles (cada uno es un archivo de apuntes, \`file\`).
- get_weak_topics: temas con peor puntaje y temas sin practicar. Usala si el alumno pide repasar lo que peor le sale.
- examiner (subagente): genera UNA pregunta a partir de un \`file\`.
- grader (subagente): corrige una respuesta contra el \`file\`.
- save_result: guarda el resultado después de cada corrección.

Llamá a los subagentes SIEMPRE con run_in_background: false: cada paso depende del resultado del anterior.

Flujo de cada pregunta:
1. Elegí un \`file\` según lo que pidió el alumno (list_topics o get_weak_topics).
2. Delegá en examiner y mostrale la pregunta al alumno tal cual, sin la respuesta.
3. Esperá la respuesta del alumno.
4. Delegá en grader pasándole el \`file\`, la pregunta completa y la respuesta del alumno, textuales.
5. Mostrá la corrección y llamá a save_result con el \`file\`, la pregunta, correct (true solo si VERDICT es CORRECT) y el SCORE.
6. Ofrecé la siguiente pregunta.

Respondé en español, conciso.`;

export function buildOptions(): Options {
  return {
    model: process.env.TUTOR_MODEL ?? "claude-sonnet-5-5",
    cwd: THEORY_DIR,
    systemPrompt: TUTOR_PROMPT,
    tools: ["Read", "Agent"],
    allowedTools: ["Read", "Agent", ...TUTOR_TOOLS],
    mcpServers: { tutor: tutorServer },
    agents,
    settingSources: [],
    strictMcpConfig: true,
    settings: { disableClaudeAiConnectors: true },
    maxTurns: 20,
    includePartialMessages: true,
  };
}
