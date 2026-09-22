Las reglas del CLAUDE.md pueden presentarse en 4 formatos:
- User: tu archivo CLAUDE.md personal.
- Project: el archivo claude.md commiteado al repo para compartirlo con el resto del equipo.
- Local: un archivo personal gitignored para un proyecto especifico.
- Managed policy: una policy de alto nivel implementada por los administradores.

**Layering facts**
- Concatenation: cada archivo descubierto es concatenado en el contexto
- Root-down order: Los archivos se cargar desde la raiz del repositorio hacia adentro en tu working directory.
- Composition: divir la jerarquia por capas estrictamente definidas.

**Imports**
- Import syntax: con un at-path reference concatena un archivo con el contexto actual.
- Four hop limit: los imports pueden encadenarse pero la recursion permite un limite maximo de 4 archivos.

**Control layers**
- Config layer: contiene todos los archivos relacionados a la configuracion legible por la maquina (permissions deny, defer, ask, allow, hooks, environment variables, settings).
- Instructions layer: contiene todas las instrucciones a seguir por el modelo en lenguaje natural (claude.md, instructions, context, prose).

**Predecence order**
1. Managed policy
2. Command-line arguments
3. Local settings
4. Project settings
5. User settings