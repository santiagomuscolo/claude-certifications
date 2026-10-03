Dependiendo de la experiencia de usuario que se busque puede optarse por un streaming output por parte del modelo como vimos en el dominio previo, esto implica que el modelo ira liberando content_block_deltas para que nosotros vayamos construyendo el bloque final (en agregado con metadatos como message_delta, message_stop, content_block_start, etc...), la forma de llevar esto al sistema es con server sent events.

El otro topico que trata este dominio son los vision inputs, esto nos permite que el modelo razone imagenes, la imagen se divide en patches de 28px x 28px en el que cada patch cuesta 1 visual token y se establecen ciertos limites de size de imagen, resolution y dimensiones.

## Adaptive thinking and effort control
Los Modelos viejos y nuevos traen consigo una funcionalidad llamada "pensamiento adaptativo" la misma permite que los modelos razonen en profundidad para llegar a respuestas mas enriquecedoras y estadisticamente correctas, sin embargo, es importante aclarar que en los nuevos modelos este tipo de razonamiento no permite poner limites, el modelo razonara hasta que lo considere necesario y/o ejecutara tools segun considere necesario en el camino (si se lo permitimos), el razonamiento se guia por grados de esfuerzo:
- Low
- Medium
- High
- Xhigh
- Max

Los nuevos modelos exceptuando sonnet traen este deep thinking apagado por defecto y sin posibilidad de establecer un limite de tokens en sus nuevas versiones (en viejas se podia esclarecer y en todo caso recibir un 400).

## Cache and TTLs
Este topico me parece importante, claude divide la cache en 3 bloques claves: prompt caching, cache_control breakpoints, cache ttl.
- Prompt caching: nos permite re-utilizar prefijos ya usados mediante marcado, por lo que un contexto largo y estable no deberia ser procesado en cada call.
- Cache_control breakpoints: un marcador especifico en un bloque, se permiten hasta 4 por request y se puede invalidar uno sin que afecte al resto.
- Cache ttl: el tiempo maximo de vida del cache 5 min por defecto y hasta 1 hora configurable,

Aca hay que tener en cuenta algo importante un cache read cuesta 0.1x del precio base del input y la ganancia viene de la re-utilizacion de esta cache, mientras mas ventana de cache (TTL) tengamos mas nos costara el input creation o escrituras en 5 minutos son 1.25x del precio base del input y en 1 hora 2x del precio base del input.

Aclaracion: El prompt caching matchea en un prefijo exacto construido en un orden especifico: primero tools definitions, luego system prompt, luego los mensajes y por ultimo el retrieval context.