import readline from "node:readline/promises";
import { query, type Query, type SDKUserMessage } from "@anthropic-ai/claude-agent-sdk";
import { buildOptions } from "./agent/options.js";
import { render } from "./agent/render.js";

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("Missing ANTHROPIC_API_KEY in .env");
  process.exit(1);
}

const args = process.argv.slice(2);

if (args[0] === "--once") {
  await runOnce(args.slice(1).join(" ") || "Haceme 3 preguntas de domain-4, sin las respuestas.");
} else {
  await runInteractive();
}

async function runOnce(prompt: string) {
  for await (const message of query({ prompt, options: buildOptions() })) {
    render(message);
  }
}

async function runInteractive() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  let endTurn: (() => void) | undefined;
  let turnInProgress = false;
  let q: Query | undefined;

  rl.on("SIGINT", () => {
    if (turnInProgress && q) {
      console.log("\n[interrumpido]");
      void q.interrupt();
    } else {
      rl.close();
      process.exit(0);
    }
  });

  async function* userTurns(): AsyncGenerator<SDKUserMessage> {
    console.log("Tutor listo. Pedí un tema (ej: \"preguntame de domain-1\"). /salir para terminar.");
    while (true) {
      const text = (await rl.question("\nvos> ")).trim();
      if (text === "/salir") return;
      if (!text) continue;

      const turnEnded = new Promise<void>((resolve) => (endTurn = resolve));
      turnInProgress = true;
      yield { type: "user", message: { role: "user", content: text }, parent_tool_use_id: null };
      await turnEnded;
      turnInProgress = false;
    }
  }

  q = query({ prompt: userTurns(), options: buildOptions() });
  for await (const message of q) {
    if (render(message)) endTurn?.();
  }
  rl.close();
}
