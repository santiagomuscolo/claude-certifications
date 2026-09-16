Esta seccion es bastante sencilla si ya conocemos topicos de arquitectura basicos (failover, retries, degradation, availability, etc...), se trata un poco 3 pilares claves:
1. Availability: La aplicacion debe estar disponible asi sea que nuestra instancia primaria se caiga.
2. Failover: Un punto de backup para cuando nuestro recurso primario se cae.
3. Degradation: Se brinda una respuesta util para el usuario aunque incompleta antes que mostrar un error y frenar todo.

En este caso lo bajamos usualmente a sistemas agenticos pero acentuamos lo mismo:
1. Fallback model: Un modelo alternativo para utilizar cuando nuestro modelo principal no se encuentra disponible.
2. Retry with backoff: Re-intentar una request fallida luego de un determinado tiempo (errores de rate-limiting, server blips).
3. Graceful degradation: retornar una respuesta cacheada, simple o parcial para que el usuario obtenga algo util en lugar de un simple error.

## The four life-cycle phases
1. Develop: Prototipar la idea contra el messages API, ver si funciona antes de conectar nada.
2. Implement: Una vez probada la idea debemos afinarla, conectar secrets, auth, error handling y manejar el deployment.
3. Operate: Correr la implementacion en produccion, y trackear su rendimiento.
4. Mantain: Mantener el desarrollo, agregar nuevas features y/o corregir existentes, migrar modelos, versionar prompts y schemas y realizar regresion test en cada upgrade.