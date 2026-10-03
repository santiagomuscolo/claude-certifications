**Faces of injection**
- Prompt injection: Contenido no confiable que es interpretado como instrucciones para el modelo, provocando que el mismo las siga como comandos.
- Direct injection: El usuario de la app trata mediante prompts de cambiar el comportamiento del modelo.
- Indirect injection: El usuario es confiable, pero alguna herramienta de teceros, una pagina o un archivo poseen instrucciones hostiles.

**Injection vs Jailbreak**
- Injection: El usuario intenta mediante data no confiable que el modelo ejecute comandos hostiles.
- Jailbreak: Mediante prompts el usuario intenta que el modelo ignore sus politicas de seguridad para producir outputs prohibidos.

**Defenses**
- El contenido no confiable debe ponerse en el bloque de resultado de tools, esto permite que claude las trate con precaucion.
- Encodear a JSON el payload, esto evita errores de delimitacion, pero igual el modelo puede interpretar texto plano como instrucciones.
- Las instrucciones del desarrollador van luego del user input nunca en el mismo.
- Siempre verificar las tool results con algun clasificador para que claude trabaje sobre resultados limpios.
- Isolar el contenido no confiable.
- Brindar el minimo privilegio, nunca dar mas autoridad de la necesaria.

**Safety layers**
- Layer model safety: Hace referencia a los mecanismos que rodean al modelo y operan sobre las entradas y salidas (clasificadores que detectan prompt injections, filtros, etc...). 
- Model layer defense: Hace referencia al entrenamiento que el mismo modelo tiene para rechazar solcitudes perjudiciales.
- Environment layer: La capa deterministica que limita al modelo en lo que puede hacer dentro de su "mundo" independientemente de lo que quiera hacer.