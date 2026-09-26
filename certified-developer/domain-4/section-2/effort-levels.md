El esfuerzo puede resumirse en 3 ideas principales:
- Effort: el control de cuanto trabajo el modelo invertira en su respuesta, a mayor esfuerzo mayor razonamiento, mayor latencia, y mayor costo.
- Where it lives: vive en un archivo output_config.effort no en un top-level field.
- The default: por defecto el modelo utiliza un effort high, que esta en la parte superior del coste, no la media, no la baja.

**Effort levels**
- Low
- Medium
- High
- xhigh: fable 5, opus 5, opus 4.8, sonnet 5.
- max: sonet 5, sonnet 4.6, fable 5, opust 4.6 (solo los mas costosos)

**Effort vs switching models**
- Tune effort: siempre se aconseja mantenerse inicialmente en un mismo modelo y modificar su effort para obtener las respuestas adecuadas.
- Switch model: Como ultimo recurso si el modelo previo no satisface nuestras necesiadades ni aun asi tuneando el effort es preferible pasar a otro modelo.

**different levels**
- Real time & cost sensitive -> low effort
- Latency-critical on big model -> fast mode on higher models
- Hard reasoning: Adaptive thinking + higher effort