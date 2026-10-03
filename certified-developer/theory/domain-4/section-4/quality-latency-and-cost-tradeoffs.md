**Balancing factors**
- Quality: La capacidad del modelo, su precision y su profundidad en el razonamiento, coding y/o analisis de las tareas demandadas.
- Latencia: Cuanto puede tardar en responder el modelo (importa mucho en flujos de trabajo orientados a real-time).
- Cost: El precio que se paga por token.

**Quality vs Speed**
- Higher tiers: Opus & Fable son muy utilizados en la resolucion de problemas complejos pero tienen un coste alto en latencia (suele moderarse) por que razonan con mayor profundidad.
- Lighter tiers: Haiku & Sonnet responden mas rapido y haiku es precisamente uno de los mas usados para flujos real-time o trabajo interactivo.

**How cost scales**
- Haiku, the baseline: Es el modelo con menos costo por token.
- Sonnet: Cuesta un par de veces mas por token que haiku pero acarrea una mejor calidad para trabajo productivo.
- Opus: Cuesta muchas veces mas que haiku pero es top en razonamiento y coding.

**Cost selection traps**
- Picking by prestige
- Picking by price
- Ignoring latency