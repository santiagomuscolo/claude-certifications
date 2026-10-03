## Hooks as deterministic guardrails
Como bien dijimos previamente los hooks son piezas de codigo independientes del agente que se puede ejecutar pre execution tool o post execution tool con la finalidad de loggear o de prevenir al agente de realizar acciones inseguras, en este caso se los referencia como guardrail indagemos en eso:
- Guardrail: deniega o hace de puente frente a acciones peligrosas antes de que estas corran.
Dentro de los guardrails tenemos preventivos (preToolUse), luego tenemos postToolUse para ver el resultado del modelo y producir informacion relevante del sistema en base a ello.

## The tool-loop
Sin el uso de tools el modelo solo puede devolver texto, con el uso de tools se le habilita la posibilidad de realizar acciones en base al contexto que este posee (augmented LLM), el loop consta de: el modelo decide que accion tomar -> selecciona una tool -> ejecuta la call y captura el resultado -> se retorna el resultado al modelo.
Existen diferentes tipos de tools:
- Read-only tools: sirven para leer archivos, buscar, realizar queries, pero no traen efectos secundarios.
- State-modifying tools: tools que permiten al modelo escribir, editar o correr comandos que cambian el estado.

Esto promueve la DELEGACION: el uso de un manager/orquestador con subagents con el minimo privilegio posible y con contexto isolado, buscando la mas alta efectividad y seguridad en los mismos.