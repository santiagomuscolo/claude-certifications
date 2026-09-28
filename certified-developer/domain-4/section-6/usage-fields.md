- input_tokens: Todo lo que el modelo lee antes de que el cache entre en juego, tu system prompt, el mensaje actual, el historial de la conversacion, la definicion de las tools.
- output_tokens: Todo lo que el modelo genera en la respuesta, incluyendo los thinking tokens y la respuesta visible.
- cache_creation_input_tokens: los tokens del prompt que fueron escritos en cache.
- cache_read_input_tokens: los tokens servidos de cache en lugar de ser re-procesados.

el valor de los output tokens varia segun el modelo por lo que es importante realizar un conteo de tokens con el modelo que querramos probar para estimar su precio (los modelos pueden usar diferente tokenizer)