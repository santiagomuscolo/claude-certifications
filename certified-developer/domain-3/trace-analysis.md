**Foundations**
- Trace Analysis: lectura del historial del orden de ejecucion, prompts, llamadas a tools, resultados de tools, pensamiento y errores.
- Problem-origin isolation: localizar el origen del error hasta entender si viene de la capa del modelo o del codigo.
- Origin evidence: La trace debe indicar a una capa y el origen del error en esa capa (un llamado a una tool, un argumento mal pasado, el resultado vacio de una tool o una respuesta truncada).

**Integration layer vs model output**
- integration layer: todo lo que este wrappeado dentro de tu harness (el modelo, la api request, el endpoint, la autenticacion, el parseo de la respuesta y las tools)
- Model output: la generacion en si misma, partiendo de una respuesta 200 base con el detalle de las stop_reasons para los problemas.

**Where failure announce themselves**
- HTTP status code: un erorr 4xx o 5xx que significa que la request nunca produjo una respuesta usable.
- SSE error event: despues de un 200 un error en el stream del evento sigue significando un error en la capa de integracion.
- stop_reason: es un 200 limpio pero trae consigo esta rason en el model_output con diferentes motivos por el cual el modelo se detuvo (truncated, refused, finished con contenido erroneo)