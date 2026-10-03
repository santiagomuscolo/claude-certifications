## Workflow vs Agent
- Workflow: el codigo decide que se va a ejecutar y en que orden se va a ejecutar, y el modelo solamente sigue cada paso.
- Agent: en el caso del agente el modelo decide que accion realizara en runtime hasta que se tope con una stop action.

La diferencia radica en quien toma la siguiente decision, si tu codigo o el agente.

Hay un punto muy interesante en todo esto que es el espectro entre un flujo deterministico o no deterministico, y usualmente se basa en que tan claro y predecible es el flujo sobre el que estamos trabajando.
Muchos problemas suelen resolverse mediante workflows que se disfrazan de agentes, y se pueden plantear en 3 formas muy conocidas:
- Prompt chaining: se parte una tarea en multiples subtareas ejecutadas secuencialmente en las que cada llamado trabaja sobre el output previo.
- Routing: Se clasifica una request y se deriva a un handler construido para es caso
- Parallelization: Se corren varias piezas independientes en simultaneo o se corre la misma pieza multiples veces para comparar resultados.

Es ideal ir de lo mas simple a lo mas complejo:
1. Secuencia
2. Workflow (pueden tener agentes dentro en casos complejos, esto es un design hibrido)
3. Agente


**The augmented LLM**
- Retrieval: En el proceso de retrieval se obtiene informacion relevante para enriquecer el prompt en lugar de que el modelo adivine.
- Tools: Mediante las tools se le permite al agente ejecutar acciones como realizar una query a una DB o llamar a un servicio.
- Memory: La memoria permite persistir el estado entre diferentes tareas.

## Cost, Latency and reliability tradeoffs
- Latencia: un loop que ejecuta multiples calls en secuencia puede tardar mas de lo que deberia en responder.
- Costo: Cada turno re-envia el contexto que continua creciendo aumentando el costo de la request en cada vuelta.
- Performance: Con la combinacion de los dos items previos obtenemos la performance final, y se concatena en la capacidad de un modelo de responder inputs desordenados.

Estos 3 puntos aplicados a Agente vs Workflow yace en la flexibilidad, control y confiabilidad de los mismos:
- Agente: Es flexible pero acarrea un coste, debe interpretar el input desordenado, realizar los steps que sean necesarios para poder brindar una respuesta y puede acarrear un error a lo largo de la construccion del contexto.
- Workflow: Al ser predecible se tiene un mayor control del coste, performance y manejo del contexto del modelo en cada paso, se puede controlar de forma mas efectiva los errores pero a veces no es suficiente.
  
La propuesta siempre radica en ir de lo mas simple a lo mas complejo, una secuencia, un workflow, un agente, un esquema hibrido.

## Manager and subagent orchestration
Un tipo de design muy utilizado en las arquitecturas de agentes es el patron orquestador, basado en un agente orquestador que crea sub-tareas en runtime y delega a subagentes la realizacion de las mismas, luego sintetiza todas las respuestas y brinda el output final.
Este patron tiene varios principios a tener en cuenta como:
- Los agentes deben hacer una cosa para poder hacerla lo mejor posible.
- Los agentes deben centrarse en su tarea y no sobre-cargarse de contexto.
- Los agentes no deben estar cargados de tareas ya que pierden efectividad.
- El manager debe chequear todas las respuestas y validarlas de forma concreta.

**Orchestrator vs Parallel**
No esta de mas marcar esta diferencia... un orquestador genera las subtasks dinamicamente en runtime como bien comente antes en base al input recibido mientras que el Parallel ya pre-define las tareas en el codigo y hace el split antes de llamar a cualquier modelo.