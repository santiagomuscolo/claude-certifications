- Context isolation: Corresponde a la delegacion de una subtarea a un subagente que retorna un unico resultado, manteniendo los tokens intermedios utilizados para la realizacion de la subtask por fuera del main agent.
- Distilled summary: El resultado condensado que devuelve el subagent.
- Blast radius: Hace referencia al aislamiento de un problema, al utilizar subagents los errores quedan acotados al scope del subagent.

**When to delegate**
- Verbose discovery: La subtarea requiere de busquedas o lecturas amplias y datos que el main agent no necesita.
- Independent workstream: El paso puede correr por su cuenta compartiendo el summary con el main agent.
- Bounded blast radius: Necesitas aislar los posibles errores de la subtarea.

**Anti-patterns**
- Overly broad scope: Implica darle al subagente una subtarea confusa provocando un mal resultado.
- Starved Context: Implica no dar el suficiente contexto sobre la subtarea provocando que el subagente trabaje sin ver.
- Parallel-only thinking: Ignorar que la isolacion es la ventaja de los subagents y pensarlos como meros trabajadores concurrentes.