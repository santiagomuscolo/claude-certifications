- cache_control breakpoint: un marcador especifico en un bloque que termina siendo un prefijo cacheable.
- Rendered prefix: incluye todo desde el inicio de la request hasta el breakpoint.
- Cache key: los bytes exactos renderizados byte a byte.

**What silently invalidates a cache**
- Volatile system text: un timestamp, un uuid o un session ID en el system prompt provocan que este cambie sus bytes cada call.
- Unsorted JSON: serializar tools o data con una key inestable provoca que el cache no matchee.
- Shifting tools: la cache va por delante de las tools por lo que realizar un cambio en ellas invalida todo.
- Model switch: un cambio de modelo supone una invalidacion total de la cache.

**Frozen prefix vs volatile tail**
- Frozen prefix: Simboliza la parte estable de la request, siendo este las tools, el system prompt y el historial.
- Volatile tail: Simboliza la parte cambiante, cada nuevo turno del usuario y la data por request, es ubicado posteriormente a los breakpoints de cache para que no la invalide innecesariamente.

**Per model minimum prefix**
Un prefijo tiene que tener una cantidad minima de tokens para cachear, en opus 4.8 es de 1024 tokens (ejemplo). Varia por modelo algunos piden menos, sin embargo, si su valor es 0 no cacheara nada.
