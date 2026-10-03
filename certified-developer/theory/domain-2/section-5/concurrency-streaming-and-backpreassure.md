Cuando se quieren lanzar multiples llamadas de claude al mismo tiempo comienzan a aparecer algunos inconvenientes como el throttling ya que al estar sobre saturando al server de requests este nos pone un freno. Existen 3 herramientas claves que se nos brindan para manejar la concurrencia:
- Gather: un llamado que inicia multiples co-rutinas y espera a que todas terminen para devolver un set como resultado.
- Semaphore: Un contaodr que indica cuantas requests pueden realizarse al mismo tiempo, forzando al resto a esperar.
- Bounded parallelism: Correr concurrentemente N tareas al mismo tiempo pero limitadamente.

Utilizando estas herramientas existen multiples estrategias para llevarlas a la practica:
- Backpressure: es una estrategia por parte del consumidor que procesa las tareas para "ejercer presion hacia atras" y evitar sobrecargarse con mas tareas de las que puede procesar.
- Retry with backoff: cuando se llegan a errores de rate limiting se vuelve a intentar en el tiempo indicado por el error 429.

**Async concurrency vs batches API**
- Async concurrency: multiples llamados real-time a precio completo controladas por el rate limit, se suele usar cuando el usuario necesita respuestas inmediatas.
- Batches API: un solo trabajo asincrono a mitad del precio original con un periodo de 24 horas para completarse y una ventana de 29 dias de retencion, muy usado cuando nadie esta esperando una respuesta inmediata del mismo.