Durante el desarrollo con claude iremos integrando/creando una serie de archivos que compartiremos en el control de versiones con el resto del equipo
y otros que mantendremos en nuestro local.

la base es que toda config que todos los developers deban re-utilizar debe ser compartida (CLAUDE.md/AGENTS.md & settings).

Ademas de esto hay una serie de factores que tambien son compartidos cross proyecto:
- The model ID: para cargas estables.
- Version prompts and config: con versionado semantico.
- CI that validates config: para evitar errores en toda la configuracion antes de mergear.