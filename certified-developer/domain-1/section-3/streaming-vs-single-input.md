## Streaming vs single message input
Hay diferentes formas de pasarle prompts a los modelos, cada una cubre un caso de uso diferente y presenta trade-offs diferentes:
- Streaming input: el streaming input permite manejar gran contexto sin la necesidad de mandar todo en un solo prompt, habilitando el uso de tools, el loop del agente, interrupciones... suele ser la opcion default elegida en la mayoria de casos
- Single-message (only for stateless): un solo prompt y una respuesta/accion directa, suele ser util en webhooks simples o cron tasks.
- Streaming output: el streaming output representa la posibilidad de que el modelo brinde los deltas a medida que va generando respuestas parciales, no necesariamente esta acoplado al streaming input y esto es importante, puede haber streaming input y no streaming output y suele usarse cuando se necesita mostrarle al usuario respuestas parciales frente a respuestas/procesos mas largos.

## Custom agent loop
Cuando necesitamos tener un control fino/granular sobre el loop del agente tenemos la posibilidad de mediante codigo definir el mismo, en el caso de CLAUDE se nos ofrece el Client SDK.

Listare brevemente nuestras opciones:
- Client SDK (message API): provee el endpoint pelado del modelo, nosotros definimos cuando el modelo parara para ejecutar una tool (stop_reason), correremos las tools nosotros mismos (debemos encargarnos de ejecutarla y proveer un retorno de la misma) y re-invocar de forma manual.
- Agent SDK: este es el caso contrario, CLAUDE CODE nos provee un SDK que nos ahorrara el manejo del codigo en su mayoria pero el loop y como se corren las tools lo decide claude.
- Managed Agents: son agentes completamente hosteados por Anthropic, Anthropic corre el loop del agente y el sandbox en su propia infraestructura.
  
En conclusion, siempre que se necesite un control granular del cuando, como y donde el agente ejecutara x tool o como maneja su loop gana el control del dominio del mismo, sino permitir que claude lo maneje es lo mejor.

## Harness design: Turns, State & Control
El manejar un loop custom es solo una punta de lo que puede llegar a customizarse, alrededor del mismo se encuentras los harneses o en ingles "Harness", en palabras simples es la infraestructura que permite que el loop sea seguro y observable.

En el Harness existen 3 terminos claves:
- Harness: el loop + la infraestructura alrededor de el (contempla el contexto, envio de requests, run de las tools y enriquecimiento de resultados).
- Turn accounting: Cada round trip de las tools usadas se cuenta, para que el runtime (no el modelo) pueda calcular un budget.
- Stop condition: Una regla explicita que frena/termina el loop del agente (una tarea finalizada, un error)

Las 4 responsabilidades claves del harness:
1. Turn accounting: Contar cada tool use para poder frenar al modelo cuando se llegue al limite.
2. State tracking: Manejar todo el contexto de mensajes y data que se acarrea en cada turno.
3. Error handling: Controlar fallas, errores del modelo y ahi decidir si re-intentar, frenarlo o skippearlo.
4. Stop conditions: Definir exactamente en el loop del agente cuando termina, de esa manera mantenerlo controlado.

**Harness a mano vs Harness por el SDK**
Cuando tenemos que evaluar los trade-offs entre estas dos opciones puede resultar hasta obvio que la mayoria dejaria en manos del framework el control del harness, pero evaluemos que implica cada uno:
- Harness a mano: se tiene un control granular de los turnos del loop del agente, el estado, la logica de stop. Estas vamos a llamarle "ventajas" traen consigo un menor manejo de dependencias pero mayor cantidad de codigo qeu mantener y escribir.
- Harness by SDK: el loop, la ejecucion de las tools, el manejo del contexto y los limites estan construidos dentro del SDK (built-in). Esto trae ventajas como menor codigo a implementar y manter pero se pierde el control al cederle el mantenimiento al framework aceptando su estructura y actualizaciones.