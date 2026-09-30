Dentro de la validacion existen 3 conceptos principales:
- Response validation: validar la response contra tu schema y tus reglas de negocio para validar el significado y no solo la sintaxis.
- Semantic check: Corroborar que los valores hacen sentido y estan completos.
- Re-prompt: luego de validar la respuesta re-promptear con los errores para que el modelo pueda fixear el resultado.

**Syntax vs semantic check**
- Syntax check: La respuesta parsea y matchea con el schema?
- Semantic check: Los valores hacen sentido con las reglas de negocio?

**Four structured-output edge cases**
- Refusal: si el modelo rechaza por razones de seguridad el output no matcheara el schema.
- Max tokens: si se llega al limite de tokens para el modelo el objeto se vera truncado por lo que no matcheara el schema.
- Enum capitalization: Los enum strings deben ser case insensitive.
- Property ordering: el modelo puede no responder en el orden que definimos las propiedades.

**parsing output defensively**
- Tolerant extraction: nunca se debe asumir que el output del modelo es correcto, siempre debe parsearse y ver que falta.
- Explicit failure handling: se debe indicar que hacer en caso de un output erroneo.