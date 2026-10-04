Los hooks son scripts que se registran en el settings.json y se disparan durante los lifecycle events, corren fuera del modelo y funcionan como guardrails mediante el preToolUse (fuerza una validacion determinista antes de ejecutar una accion de una tool) y permite brindarle a una tool solo los permisos minimos que esta necesita.

**Type of hooks**
- PreToolUse: el hook definido como preToolUse es ejecutado previo a disparar una accion de una tool y puede devolver deny, defer (solo aplica en modo headless), ask, allow.
- PostToolUse: el hook definido como postToolUse se ejecuta después de que la tool terminóy permite loguear, chequear la respuesta de la ejecucion o reaccionar a ella.

**Enforcement independent of the model**
- permissionDecision: Hace referencia al campo que utiliza preToolUse para determinar el estado de una pending call (deny, defer, ask & allow).
- Deterministic Enforcement: el resultado no depende del modelo; si el script/hook es determinista, la misma entrada siempre da la misma decisión
- Exit Code 2: Es una alternativa al JSON output, un hook que finaliza con exit code 2 bloquea la call y retorna el error (a diferencia de code 0 o 1 que se toman como error del hook y la accion sigue).

**API keys exposure (claude code)** 
Algo a tener en cuenta con este tipo de integraciones es el cuidado de nuestros secrets ya que una exposure erronea puede comprometer todo un sistema, frente a esto se recomienda guardar las api keys en secret stores en runtime del OS o variables de entorno pero nunca pasarlas directo en un prompt.

**Three ways claude code authenticates**
- Direct API_KEY: se pasa la api key directamente como un header (manejado todo por claude, nosotros solo definimos ANTHROPIC_API_KEY), es comun en entornos de desarrollo.
- apiKeyHelper: se ejecuta un script que devuelve un token de vida corta para rotaciones regulares de secretos en produccion.
- setup-token: un comando que devuelve un OAuth token de vida larga para CI/automation donde no existe interaccion del browser.

