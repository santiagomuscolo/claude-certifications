La API de mensajes de anthropic nos brinda un mayor control de los mensajes enviados y tools usadas, sin embargo, se esclarecen una serie de topicos para poder hacer una request valida a la misma.
Empecemos por los 3 campos basicos requeridos: model, max_tokens (la cantidad maxima de tokens que se pueden usar para responder) & messages (un array ordenado de los mensajes producidos durante los turnos de la conversacion).
Cuando hablamos de mensajes hablamos de "turnos" pero como funcionan realmente estos turnos es lo importante... los turnos son etiquetados con un tag por rol y en base al mismo se van concatenando (si se emiten 2 tags iguales uno detras del otro se unifican) y siempre el primer tag es del usuario. Por otro lado, saltamos a los mensajes estos pueden ser enviados como un texto plano o como bloques para concatenar imagenes, texto, resultados de tools, etc... a esto se le suelen llamar bloques.
La API de messages es stateless esto implica pasar todo el historial de mensajes en cada request, aqui no contamos al system prompts ese se pasa una vez y se tiene en cuenta en toda la request.

## Reading a response
Aca voy a detallar las cosas que me parecieron interesantes de la respuesta de la API:
- stop_reason: tiene varios tipos y indica la razon por la que se freno el turno (end_turn, max_tokens, tool_use, refusal).
- type: las responses traen consigo diferentes tipos que indican que se realizo en dicho turno (thinking, tool_use, text, other).
- usage: los input (tokens no cacheados billeados en la call) y output tokens (tokens usados para la respuesta en el margen de tus max_tokens).

La forma correcta de interpretar una stop reason al leer un mensaje es revisando el content, el content es un arreglo de objetos que contiene el loop que el agente realizo en su razonamiento durante el turno, mostrando cada accion y permitiendo entender granularmente el proceso.

Consideraciones: si la stop_reason es tool_use hay que ejecutar la tool para que continue el loop.
