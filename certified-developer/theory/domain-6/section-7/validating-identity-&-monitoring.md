Sin controles de acceso, un agente podría ejecutar acciones peligrosas sobre nuestro sistema. Hay tres capas a considerar:

- **Authentication:** verificar que quien emite la request es quien dice ser (el agente, el usuario o el servicio).
- **Authorization:** validar que esa identidad tiene permiso para la acción, aplicando mínimo privilegio.
- **Human approval:** exigir confirmación humana antes de acciones destructivas, irreversibles o de alto impacto (por ejemplo, deploys a producción o borrado de datos).
- **Monitoring:** registrar cada acción con su identidad, parámetros y aprobador, para poder auditar después.

## JSON schemas for tool inputs

El JSON Schema define el **formato de los parámetros** de una tool: nombres, tipos, campos obligatorios y valores válidos. Es el contrato entre el modelo y la tool.

```json
{
  "name": "search_orders",
  "description": "Busca pedidos de un cliente por estado. Usar solo para consultas, no modifica datos.",
  "input_schema": {
    "type": "object",
    "properties": {
      "customer_id": { "type": "string", "description": "ID del cliente" },
      "status": { "type": "string", "enum": ["pending", "shipped", "delivered"] }
    },
    "required": ["customer_id"],
    "additionalProperties": false
  }
}
```

**Para qué sirve**
- **Guiar al modelo:** le indica cómo armar la llamada correctamente.
- **Validar antes de ejecutar:** nunca confiar en los parámetros que manda el modelo; `enum`, `maximum`, `pattern` y `additionalProperties: false` limitan lo que puede pedir.

### Routing contract

El modelo decide **qué tool llamar** leyendo únicamente el `name` y la `description`. Ese es el *routing contract*: el schema dice *cómo* llamar, y name + description dicen *cuándo* y *cuál*.

- **Names claros y específicos** (`search_orders`, no `get_data`) evitan ambigüedad entre tools parecidas.
- **Descriptions que explican cuándo usarla y cuándo no** reducen elecciones erróneas, sobre todo entre tools con funciones cercanas (consultar vs. modificar).
- **Descriptions por parámetro** mejoran la calidad de los argumentos.
- Un routing incorrecto no lo arregla ninguna validación de schema: la tool equivocada recibe parámetros perfectamente válidos.