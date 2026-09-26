## Events that bracket a stream

- message_start: abre el stream con un mensaje con contenido vacio, es el primer evento que se recibe.
- content_block_delta: cada uno de estos acarrea un bloque de texto o un input tool.
- message_stop: el evento final, una vez que es emitido significa que la respuesta ha finalizado.

## three delta-level terms
- content_block_delta: un evento que agrega un chunk de output al content block (usualmente es donde vienen los fragmentos de texto).
- message_delta: un evento que trae consigo top-level updates como por ejemplo la stop_reason o el token usage.
- input_json_delta: un evento que trae un partial JSON con los argumentos de las tools pieza a pieza.