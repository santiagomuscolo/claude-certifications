Cuando hablamos de untrusted inputs nos referimos a todo el contenido que no proviene de nuestro control como por ejemplo: mensajes de usuarios, documentos, resultados de tools... estos deben ser tratados con adversariales y validados antes de ser pasados al modelo.
El termino correcto para esto seria "sanitizar" el input (limpiarlo, validarlo, delimitarlo a contenido exclusivamente brindado por el usuario).

**Data versus instructions**
- Trusted instructions: Tu system prompt y las instrucciones definidas por el developer sobre lo que el modelo debe hacer, estas estan definidas por nosotros y tienen autoridad sobre la tarea.
- Untrusted data: Textos externos, inputs del usuario, resultados de tools sobre las que esta trabajando el modelo. Nunca deben ser leidas como comando, solo como material a procesar.

Dentro de la delimitacion se utilizan tags (ejemplo <user_data>data del usuerio</user_data>, para poder indicar que contenido corresponde al usuario, sin embargo, esta "delimitacion" no previene al 100% de prompt injections, es un conjunto de responsabilidades para reducir los posibles riesgos.

**Otros detalles a tener en cuenta**
- Las instrucciones dadas por los developers no deben mandarse en el mismo bloque que la data no confiable, deben mandarse en su correspondiente turno de forma separada.
- El contenido no confiable no debe incluirse en tu system prompt, ya que el mismo obtendria autoridad no deseada sobre la tarea.