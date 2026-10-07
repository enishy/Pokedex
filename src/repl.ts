import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const trimmed = input.trim();

  if (trimmed === "") {
    return [];
  }

  return trimmed.toLowerCase().split(/\s+/);
}

export async function startREPL(state: State): Promise<void> {
  state.readline.prompt();

  state.readline.on("line", async (input: string) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      state.readline.prompt();
      return;
    }

    const commandName = words[0];
    const command = state.commands[commandName];

    if (!command) {
      console.log("Unknown command");
      state.readline.prompt();
      return;
    }

    try {
      await command.callback(state, ...words.slice(1));
    } catch (err) {
      console.error(err);
    }

    state.readline.prompt();
  });
}
