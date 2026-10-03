Claude pese a ser el mismo "modelo" por detras nos ofrece multiples surfaces para poder llegar a el, siendo estas:
- Raw API: La API que nos permite tener un control de la ejecucion de las tools, guardrails, agent loop, entre otros.
- Agent SDK: El SDK de claude para desarrollar agentes, nos provee una abstraccion en el control del agent loop y ejecucion de las tools (contrario al raw api que nos brinda mas control con mas codigo).
- Claude code: el agente de codigo command line de claude, carga el system prompt completo, la jerarquia completa del CLAUDE.md, y el auto memory en el arranque.

**Choosing the right surface**
Aqui conviene ver que son 3 casos de uso diferentes y no mezclarlos, son 3 formas diferentes de usar claude basadas en la misma API por detras, expandamos esto:
- RAW API/SDK: si tenemos que manejar las requests a claude en nuestro codigo y tener un control sobre el agent loop + tools, la raw api o el sdk es la solucion ideal.
- Claude Code: si necesitamos trabajar sobre un repo y que Claude ya traiga las herramientas, el CLAUDE.eeeeeeeeemd y los archivos, claude code es nuestra solucion (mas orientado a asistente de codigo y exclusivamente orientado al trabajo sobre repositorio).
- Hosted chat: Un chat hosteado es el resultado final de la integracion con la API de claude y no requiere configurar nada a diferencia de los otros casos pero tampoco te da integracion persistente ni acceso a tus archivos.