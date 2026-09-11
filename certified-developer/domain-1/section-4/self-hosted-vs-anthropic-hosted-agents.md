## Self-hosted vs Anthropic-hosted agents
Cuando concatenamos un poco las ideas previas nos toca entrar en el campo del hosting del agent, y aca se nos presentan 2 opciones: self-hosted y anthropic-hosted.
Diferenciemos estos dos tipos de hosting:
- Self-hosted agent: Cuando necesitamos que el agente ejecute tools que accedan a recursos privados de nuestra infraestructura, cuando necesitamos guardar recursos en nuestra infraestructura (logs, audit, etc...) un self-hosted agent en nuestra propia infra es ideal ya que nos permite tener un control total de las tools que se ejecutaran y a que recursos accederan como bien se nombro previamente, sin embargo, cabe aclarar que el agent loop, el rasonamiento del modelo y el input/output de las tools sigue en manos de Anthropic, esto no representa un mayor riesgo pero si esta bueno dejar claro que solo queda totalmente en nuestro control las ejecucion de las tools.
- Anthropic-hosted: Cuando las tools que el agente ejecuta pueden acceder a recursos publicos, no necesitamos guardar recursos en una infra propia y/o tener un mayor control sobre las mismas delegarle el hosting a Anthropic puede ser interesante, ya que se encarga automaticamente de generar el Sandbox auto-aprovisionado y manejar su ciclo de vida (efimero) y acceder a los recursos que el mismo necesita todo en su nube sin necesidad de aprovisionar ningun recurso en infra propia.


## Configure a managed agent
Esta seccion sera breve, un agente se divide en 5 piezas claves:
- El modelo: que modelo correra el agente
- El system prompt: contiene el rol, las instrucciones y el comportamiento del agente
- Las tools: Herramientas que el agente puede llamar para por ejemplo: acceder a internet, comandos para archivos, etc...
- El MCP (Model context protocol): Servidores MCP externos que exponen tools y recursos extra para nuestro agente.
- Las skills: las capacidades de un agente que se referencian al momento que este debe realizar una tarea.

Ahora la clave, la idea de todo esto es la re-utilizacion de un agente independientemente del host (self vs Anthropic) poder tener diferentes sessions/processes del agente corriendo sin necesidad de modificar el codigo del mismo.

## Hooks (preToolUser & postToolUse)
Los hooks son bloques de codigo determinastas que se ejecutan en nuestro propio codigo por fuera del agente y pueden aparecer antes de una tool use o despues, los hooks constan de 4 permisos claves en su utilizacion como pilares:
- Allow: Aprobar la call y permitir que corra.
- Deny: Rechazar la call y frenar su ejecucion.
- Ask: pausa y preguntar al usuario si lo aprueba o rechaza.
- Defer: se termina la query para luego retomarla.

Hooks precedence:
- Deny
- Defer
- Ask
- Allow