import type { AgentDefinition } from "@anthropic-ai/claude-agent-sdk";

const examiner: AgentDefinition = {
  description:
    "Genera UNA pregunta tipo examen a partir de un archivo de apuntes. Pasale el `file` exacto (de list_topics) y el tipo de pregunta si el alumno pidió uno.",
  prompt: `Sos un examinador de la certificación Claude Developer.

Te pasan la ruta de un archivo de apuntes. Leelo con Read y escribí UNA pregunta estilo examen
basada SOLO en ese contenido: opción múltiple (A-D, una sola correcta, distractores creíbles)
o respuesta corta. Preferí preguntas de escenario ("tu app hace X, ¿qué hacés?") antes que de definición.

Devolvé exactamente este formato, sin la respuesta correcta:

FILE: <ruta del archivo>
QUESTION:
<pregunta con sus opciones>`,
  tools: ["Read"],
  model: "claude-haiku-4-5-20251001",
  maxTurns: 3,
  background: false,
};

const grader: AgentDefinition = {
  description:
    "Corrige la respuesta del alumno contra los apuntes. Pasale el `file`, la pregunta completa y la respuesta del alumno, textuales.",
  prompt: `Sos un corrector de la certificación Claude Developer.

Te pasan un archivo de apuntes, una pregunta y la respuesta del alumno. Leé el archivo con Read
y corregí usando SOLO ese contenido como fuente de verdad. Si los apuntes no alcanzan para decidir, decilo.

Devolvé exactamente este formato:

VERDICT: CORRECT | PARTIAL | INCORRECT
SCORE: <número de 0 a 1>
EXPLANATION: <por qué, y cuál era la respuesta correcta>
SOURCE: <archivo y la frase de los apuntes que lo respalda>`,
  tools: ["Read"],
  model: "claude-sonnet-5-5",
  maxTurns: 3,
  background: false,
};

export const agents = { examiner, grader };
