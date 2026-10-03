import type { SDKMessage } from "@anthropic-ai/claude-agent-sdk";

const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;

let midLine = false;

function newline() {
  if (midLine) process.stdout.write("\n");
  midLine = false;
}

function summarizeInput(input: unknown): string {
  if (!input || typeof input !== "object") return "";
  const { file_path, pattern, path } = input as Record<string, unknown>;
  return String(file_path ?? pattern ?? path ?? JSON.stringify(input));
}

export function render(message: SDKMessage): boolean {
  switch (message.type) {
    case "system":
      if (message.subtype === "init") {
        console.log(dim(`[init] model=${message.model} cwd=${message.cwd} tools=${message.tools.join(",")}`));
      }
      return false;

    case "stream_event": {
      const { event } = message;
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        process.stdout.write(event.delta.text);
        midLine = true;
      }
      return false;
    }

    case "assistant":
      for (const block of message.message.content) {
        if (block.type === "tool_use") {
          newline();
          console.log(dim(`→ ${block.name}(${summarizeInput(block.input)})`));
        }
      }
      return false;

    case "user": {
      const { content } = message.message;
      if (Array.isArray(content)) {
        for (const block of content) {
          if (block.type === "tool_result") {
            console.log(dim(`← ${block.is_error ? "error" : "ok"}`));
          }
        }
      }
      return false;
    }

    case "result":
      newline();
      console.log(
        dim(
          `[turno: ${message.subtype}, ${message.num_turns} turns, ${message.duration_ms} ms, ` +
            `costo acumulado $${message.total_cost_usd.toFixed(4)}]`,
        ),
      );
      return true;

    default:
      return false;
  }
}
