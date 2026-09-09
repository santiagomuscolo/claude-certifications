## Context isolation with scoped subagents

El punto de que cada agente maneje su propio contexto (no mas ni menos) viene de la tendencia de obtener mejores resultados, con menor cantidad de errores y con un mejor manejo de los tokens.

El aislamiento del contexto se basa de 3 pilares claves:

- Cada agente maneja su propio contexto.
- Los agentes no heredan la historia del manager/orquestador.
- Solamente el mensaje final del agente es devuelto al manager todo ruido intermedio vive y muere en el subagente.

## Agentic loop
receive prompt -> claude responds -> execute tools -> read results & repeat -> return answer with a success subtype on it

## Query agent example

```
import { query } from "@anthropic-ai/claude-agent-sdk";

// Agentic loop: streams messages as Claude works
for await (const message of query({
  prompt: "Review utils.py for bugs that would cause crashes. Fix any issues you find.",
  options: {
    allowedTools: ["Read", "Edit", "Glob"], // Auto-approve these tools
    permissionMode: "acceptEdits" // Auto-approve file edits
  }
})) {
  // Print human-readable output
  if (message.type === "assistant" && message.message?.content) {
    for (const block of message.message.content) {
      if ("text" in block) {
        console.log(block.text); // Claude's reasoning
      } else if ("name" in block) {
        console.log(`Tool: ${block.name}`); // Tool being called
      }
    }
  } else if (message.type === "result") {
    console.log(`Done: ${message.subtype}`); // Final result
  }
}
```
