- tool_use: el bloque que claude retorna cuando una tool es invocada, posee un id, un nombre y un input object.
- tool_result: el bloque que retorna tu codigo luego de correr una tool.
- tool_use_id: el id que linkea el tool result con el tool use.

**Parallel tool calls**
- Multiple at once: si no dependen entre si se puede realizar multiples llamados a tools en paralelo
- One combined reply: retorna todos los tool_result blocks que matcheen en un solo mensaje.
- Mixed groups: se mixean server tools con client tools y se consolida tool_use para manejar el paralelismo de ambas.

**tool_choice values**
- Auto: deja que claude decida cual sera la siguiente tool a ejecutar.
- Any: Claude debe llamar a una de las tools que se le brindaron pero no se especifica cual.
- Tool: Apunta a una tool especifica.
- None: no ejecuta ninguna tool.

**Tools execution environment**
- Client-side: las tools corren y se ejecutan en tu entorno.
- Server-side: las tools se ejecutan en la infra de anthropic, no es necesario proveer handlers ni enviar tool_results.

**Anthropic-schema client tools**
- Bash: Permite correr shell commands en los que anthropic brinda el schema pero el comando se ejecuta en tu environment.
- computer_use: permite controlar la screen, keyboard y mouse y las acciones corren en tu maquina.
- Memory: lecturas, escrituras y notas persistentes, uno maneja su storage no anthropic.
- text_editor: ver y editar archivos, las operaciones corren en tu environment.