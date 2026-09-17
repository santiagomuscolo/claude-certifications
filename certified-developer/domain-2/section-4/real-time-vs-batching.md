Para comenzar con esta seccion tenemos el debate sobre batching vs real-time, este punto creo yo agrega valor al manejo de las requests:
- Real-time: cuando necesitamos procesos interactivos, streaming, latency bound requests gana el Synchronous messages API.
- Batching: cuando tenemos largas cargas de trabajo asincronas offline usualmente el batching (message batches API) es idoneo ya que nos permite hasta un 50% menos del coste original por request pero con un leve trade off, los batching processes pueden tardar hasta 24h y tienen un periodo de retencion de 29 dias.

## Whats inside a batch request
La idea aca es ir un poco mas alla en las batch requests, cada batch request posee un custom_id unico dentro del batch, el mismo se utiliza para poder matchear los diferentes resultados que el procesamiento produjo, en adicion a esto tambien tenemos params (model, max_tokens, messages y todo lo que posee una call normal).

Ponele que decidimos en lugar de usar el custom_id buscar agrupar requests por indexacion, a simple vista uno pensaria que no hay problema pero las batch requests son asincronas y se procesan concurrentemente por lo que el indice de la respuesta no necesariamente coincide con el orden en el que enviamos cada request.

La idea no es pensar las batch requests como un monstruo diferente de las requests sincronas, si bien se procesan diferente soportan la mayoria de cosas que una request normal nos permite por ejemplo:
- Vision.
- Tools.
- System and multi-turn.
- Extended thinking/deep thinking.

Y creo que nos quedo algo solido de todo esto y es que si se presentan algunas diferencias como por ejemplo: no se puede usar streams, no se puede habilitar la flag fast-mode, store y cache-hints estan deshabilitados.

> [!info] Batch jobs requests si soporta cache pero se deben tener en cuenta topicos como la concurrencia y el tiempo de cache.

## AWS Bedrock & Vertex AI
Hay unos servicios dando vueltas por los topicos de anthropic y son AWS bedrock & Vertex AI, este servicio nos permite consumir modelos de distintos proveedores sin la necesidad de alojarlo uno mismo en su propia infraestructura y abstrayendo parte de las capacidades que se tendrian que gestionar de forma manual al integrarse directamente con cada proveedor, esto tiene pros como el caching, thinking (deep), tool use y pricing predecible pero tradeoffs como por ejemplo el no funcionamiento de la Files API, server tools y batches. Aunque radica una leve diferencia entre ambos y es que vertex permite web search basicas.

