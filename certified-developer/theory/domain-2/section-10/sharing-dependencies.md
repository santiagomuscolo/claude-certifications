Dentro de los conceptos de programacion que ya conocemos, le compartir recursos entre desarrolladores de un mismo repo es importante, para que no diverga excesivamente la base sobre la que cada uno trabaja, con el tema plugins es lo mismo y existen formas de resolverlo siendo una el versionado.
- Git-tag resolution: Promueve un rango de versiones de un plugin con la semantica "plugin--v2.1.0" para tener un control mas detallado del mismo.
- plugin tag --push: comando para pushear tags de las versiones de un plugin.
- no-matching-tag: cuando no existe un range que satisfaga las necesidades del proyecto el plugin dependiente es deshabilitado.

**dependency error codes**
- dependency-unsatisfied: Una dependencia requerida no fue encontrada o se encuentra deshabilitada.
- dependency-version-unsatisfied: el rango de versiones de una dependencia no satisface las versiones solicitadas en x rango.
- no-matching-tag: no existe un tag de version de la dependency para utilizar.
- range-conflict: dos o mas dependencias utilizan diferentes versiones que no pueden ser reconciliadas.

**same marketplace vs cross marketplace**
- same-marketplace: el plugin y sus dependencias viven dentro del mismo catalogo, es la opcion que menos friccion genera.
- cross-marketplace: el plugin y las dependencias del mismo viven en catalogos diferentes y a no ser que se habilite el target se producira un error de cross-marketplace.