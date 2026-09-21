Dentro del concepto bondaries tenemos un conjunto de design basics:
- Content boundaries: Representa la linea explicita que separa las instrucciones confiables de el desarrollador de el contenido externo no confiable.
- Untrusted input: Representa cualquier cosa que no sea definida por tu aplicacion, como por ejemplo el input de un usuario, contenido web, resultado de tools.
- Trusted context: Representa tu system prompt y las instrucciones confiables definidas por el desarrollador, es el contenido sobre el que se tiene control.

Este concepto de data boundaries es sumamente importante ya que permite entender la sensibilidad de la informacion tratada, protegiendola prevenimos de:
- Data leaks
- PII Handling

Entonces es correcto pensar en buenos habitos para tratar estos boundaries, por ejemplo:
- Least privilege: Cada llamado solo debe recibir la data necesaria que necesita.
- Separate instructions: Separar las instrucciones confiables y no confiables en diferentes roles y tags para evitar text injection y que este se lea como comando.
- Validate output: Antes de efectuar una accion sobre el output parsearlo/validarlo.

**Context and session state**
Dentro del manejo del contexto en la session tenemos 3 terminos principales:
- Context window: El contexto acarreado durante la session (system prompts, history, tool definitions y tools results)
- Durable state: El estado que se persiste por fuera del context window en un archivo o config file.
- Session boundary: El punto donde una session termina y comienza un nuevo context window.

Algo interesante del manejo del contexto es que existe contexto efimero y contexto duradero:
- Contexto efimero: el contexto efimero representa todo lo que se encuentre dentro del context window de nuestra session, que luego de finalizada la misma se borrara.
- Contexto duradero: representa todo el contexto que se persistira cuando finalice la session (puede guardarse en un memory.md o mismo los claude.md files son contexto duradero).

El contexto presenta una particularidad y es que es compatable, esto quiere decir que podemos "comprimir/resumir" todo el contexto window y tener un nuevo context window a partir del summarize del context window anterior, si no se desea compactarlo puede iniciarse una nueva session de 0 a partir del claude.md o limpiar el context window actual en la session abierta.