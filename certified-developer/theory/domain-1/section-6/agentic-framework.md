## Langraph
Langraph esta construido para resolver un problema clave en la construccion de agentes, la orquestacion de agentes complejos donde se deben definir workflows con multiples pasos, decisiones, loops, herramientas, etc... mientras se mantiene el estado y la ejecucion persistente para que puedan pausarse, recuperarse entre errores y continuar desde donde quedaron.
Con Langraph tenemos 3 pilares:
- StateGraph: el grafo central parametrizado por un esquema definido por el usuario.
- Node: Una funcion que recibe el estado actual y devuelve una actualizacion parcial.
- Edge: Una nodo conector que decide que funcion sera la siguiente en ejecutarse.

Ahora el punto clave, langraph permite que persistamos el estado entre agentes y estos puedan frenar y retomar sus tareas respectivamente, pero como hace esto? la respuesta es CHECKPOINTERS.
Los checkpointers son componentes que guardan snapshots del estado del workflow durante su ejecucion, permitiendo esta persistencia del agente que nombrabamos.

## Strands and PydanticAI
Dentro de los diferentes frameworks que se encuentran en la industria encontramos algunos como langraph (visto previamente) o como pydanticAI, aunque parezcan similares la base de la idea es totalmente diferente...
PydanticAI es un framework que nos trae a la mesa la idea de tener un flujo model-driven con outputs tipados para proveer seguridad al momento del write time, ese es su core, ahora bien es esta la unica manera de usar model-driven design? absolutamente no... model-driven design en si es un concepto (cosa que creo entendimos todos) para diseñar un flujo agentico, la cuestion es que este tipo de diseño se basa en la libertad que tiene el modelo de poder decidir cual sera la proxima tool que usara, cuando respondera, con la finalidad de que sea rapido, en base a esta libertad existe el termino "Strands".
Los "strands" son un framework model-driven de AWS, con un estilo ReAct loops creados con la finalidad de la simpleza en el flujo

>[!info] Un ReAct loop es un patron de diseño que consta de que el agente alterne entre razonar (reasoning) y actuar (acting) hasta llegar a un resultado final, en lugar de dar la respuesta de una sola vez.

## When each one?
La pregunta del millon... hablamos de 3 frameworks diferentes pero cuando debo usar cada uno?
- Langraph: Cuando necesitamos tener una maquina de estados con transiciones en los mismos visibles, con un control human in the loop o time travel definido en el codigo, con ciclos, retries, branching en el codigo, no solo prompts, pausas desde las cuales el agente pueda retomar cuando corresponda, ahi langraph es poderoso.
- Pydantic: Cuando la forma del output debe ser estrictamente como la definimos pydantic gana con su type structured safety.
- Strands: cuando no necesitamos ninguno de los dos previos sino velocidad, simpleza y a demas usamos el entorno de AWS, strands gana.