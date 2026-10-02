**Where data leaks**
- Leakeage paths: Rutas a traves de las cuales se expone informacion sensible
- Shared-context bleed: la informacion del usuario es compartida en otro contexto por mala isolacion.
- Sensitive info disclosure: Se exponen datos de tipo PII como credenciales o informacion confidencial en las respuestas.

**PII Controls**
- Minimize collection: Solo brindar al informacion personal necesaria para la tarea.
- Redact or tokenize: Enmascarar o reemplazar datos PII reales con placeholders.
- Restrict access: Limitar quien y que puede acceder a la informacion sensible.
- Output filtering: Escanear las salidas en busqueda de datos sensible antes de enviarlos.

Lo ideal en la securizacion de estos sistemas es utilizar una estrategia por capas, esto no deniega todos los jailbreaks del mundo pero permite tener un control en profundidad de las solicitudes y podriamos separarlo en:
- Input screening/validation (previo a llegar al modelo)
- Output validation (previo a que el modelo ejecute un tool result)
- Code enforcement: Mediante el codigo debemos dejar claras las reglas de negocio, deny cases y todo caso que el modelo debe rechazar en adicion a limitar el accionar del mismo.

**Confidentiality, Integrity & Privacy**
- Confidentiality: Evitar que la data sensible pueda ser leida por terceros no autorizados.
- Integrity: Evitar que la data sensible pueda ser mutada por terceros no autorizados.
- Privacy: Manejar la data sensible bajo consentimiento.