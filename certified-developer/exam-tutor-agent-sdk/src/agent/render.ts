import type {
  SDKAssistantMessage,
  SDKMessage,
  SDKPartialAssistantMessage,
  SDKUserMessage,
} from "@anthropic-ai/claude-agent-sdk";

const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;

let midLine = false;

function newline() {
  if (midLine) process.stdout.write("\n");
  midLine = false;
}

function summarizeInput(input: unknown): string {
  if (!input || typeof input !== "object") return "";
  const { file_path, pattern, path, subagent_type, description, file } = input as Record<string, string | undefined>;
  if (subagent_type) {
    const background = (input as { run_in_background?: boolean }).run_in_background !== false;
    return `${subagent_type}: ${description ?? ""}${background ? " [background]" : ""}`;
  }
  return file_path ?? pattern ?? path ?? file ?? "";
}

const indent = (parentToolUseId: string | null) => (parentToolUseId ? "    " : "");

function renderStreamEvent(message: SDKPartialAssistantMessage) {
  if (message.parent_tool_use_id) return;
  const { event } = message;
  if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
    process.stdout.write(event.delta.text);
    midLine = true;
  }
}

function renderToolCalls(message: SDKAssistantMessage) {
  for (const block of message.message.content) {
    if (block.type !== "tool_use") continue;
    newline();
    console.log(dim(`${indent(message.parent_tool_use_id)}→ ${block.name}(${summarizeInput(block.input)})`));
  }
}

function renderToolResults(message: SDKUserMessage) {
  const { content } = message.message;
  if (!Array.isArray(content)) return;
  for (const block of content) {
    if (block.type !== "tool_result") continue;
    console.log(dim(`${indent(message.parent_tool_use_id)}← ${block.is_error ? "error" : "ok"}`));
  }
}

export function render(message: SDKMessage): boolean {
  switch (message.type) {
    case "system":
      if (message.subtype === "init") {
        console.log(dim(`[init] model=${message.model} cwd=${message.cwd} tools=${message.tools.join(",")}`));
      }
      return false;

    case "stream_event":
      renderStreamEvent(message);
      return false;

    case "assistant":
      renderToolCalls(message);
      return false;

    case "user":
      renderToolResults(message);
      return false;

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
