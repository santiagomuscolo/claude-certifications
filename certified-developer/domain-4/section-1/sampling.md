**sampling terms**
- Sampling: el proceso en el que selecciona el proximo token mas probable (por ejemplo con greedy decoding).
- Probability distribution: Los tokens proximos rankeados por el modelo en base a probabilidad.
- non-determinism: como cada token se elige al azar en base a sus probabilidades un mismo prompt puede producir multiples resultados diferentes en cada ejecucion.
  
  **How sampling works**
  El sampling como bien nombramos previamente se basa en la seleccion del proximo token al azar en base a las probabilidades que este tiene adjudicadas de ser elegido, sin embargo, hay ciertos parametros configurables que producen variaciones en este:
  - Temperature: aplana o afila la distribucion (re evalua los tokens y el favoritismo que presenta cada uno por ende un favorito puede volverse aun mas favorito) mientras mas cerca de 0 mas concentra la probabilidad en los tokens con mayor %, mientras mas lejos de 0 mas variados y arriesgados son los resultados aplanando los porcentajes.
  - Top-k: limita/corta la eleccion a los k tokens mas probables
  - Top-p: Limita la eleccion al grupo cuya probabilidad acumulada llega a p (por ejemplo 0.9)

## one token at a time
El modelo no genera una respuesta entera de una y creo que queda claro en el concepto streams ya que estos simplemente permiten al usuario visualizar como el modelo va generando token a token dando esa sensacion de rapidez.

**General concepts**
- Next-token generation: el mecanismo en el que el modelo genera token a token hasta que finaliza.
- Autoregressive: los tokens se generan de izquierda a derecha cada uno sirviendo de input para el proximo.
- Conditioning: Cada token siguiente es elegido a partir de todos los tokens que lo preceden.