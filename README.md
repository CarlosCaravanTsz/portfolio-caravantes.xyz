# Caravantes AI — Carlos Caravantes

Portafolio estático bilingüe (español e inglés). Abre `index.html` directamente o sirve esta carpeta:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Visita http://127.0.0.1:4173/. La entrada principal es `index.html`; el CV imprimible está en `cv.html`.

## Identidad Caravantes AI

Caravantes AI es la marca personal de Carlos: símbolo entrelazado, esmeralda de marca y firma original. El estilo visual final retoma el de `V2/v3.html`: fondo casi negro, universo de partículas, paneles de vidrio, haces de luz hacia un núcleo e índigo como atmósfera; el esmeralda queda para la marca y las acciones principales. Tipografía Inter y JetBrains Mono (Space Grotesk solo en el logotipo). La identidad está incorporada en el HTML y CSS y se muestra también sin JavaScript.

`brand-concept.html` conserva la comparación de rutas visuales y los assets. Consulta `BRAND-PROPOSAL.md` para los criterios de la ruta elegida y el alcance de los SVG. `PRODUCT.md` recoge la audiencia (reclutadores primero, clientes después), los hechos confirmados y lo que no debe inventarse.

## Contenido y edición

- `index.html`: portada con nombre y puesto sobre las partículas, franja de empresas, hub de especialidades, arsenal técnico, proyectos, experiencia convergente, formación, sobre mí y contacto. El texto en español vive aquí.
- `cv.html` y `assets/cv.css`: CV en inglés, en orden cronológico inverso y listo para imprimir o guardar como PDF. Usa solo datos de `CV.txt`.
- `assets/i18n.js`: textos en inglés y textos generados por JavaScript en ambos idiomas.
- `assets/styles.css`: paleta, escala tipográfica, estructura y diseño adaptable.
- `assets/universe.js`: universo de partículas de la portada (canvas, sin librerías), apariciones al hacer scroll, cabecera translúcida y haces de luz del hub y de la experiencia. Todo es decorativo: se pausa fuera de vista y con movimiento reducido.
- `assets/brand-theme.css`: logotipo y wordmark de Caravantes AI.
- `assets/brand/caravantes-mark.svg`: símbolo usado en cabecera, atlas y favicon.
- `assets/projects.js`: catálogo de proyectos, áreas y casos de estudio en ambos idiomas.
- `assets/app.js`: filtros, catálogo, casos, laboratorios, menú y formulario.
- `assets/project-map.js` y `assets/project-map.css`: mapa editable, conexiones y partículas del cursor.
- `CV.txt`: CV original en texto plano, conservado sin cambios y enlazado desde `cv.html`.

### Idiomas

El español está en el HTML para que la página funcione sin JavaScript. Los elementos traducibles llevan `data-i18n` (texto), `data-i18n-html` (texto con marcado) o `data-i18n-attr="atributo:clave"`. Para añadir un texto, márcalo en el HTML y añade la clave en el diccionario `en` de `assets/i18n.js`; el español se lee del HTML automáticamente.

El idioma se elige en este orden: `?lang=es|en` en la URL, la elección guardada y el idioma del navegador. El selector ES/EN guarda la elección y actualiza la URL, de modo que un enlace como `?lang=en` abre la versión en inglés.

### Proyectos

Cada entrada de `PORTFOLIO_PROJECTS` tiene un `id` único, `kind` (`pro`, `lab` o `personal`), título, áreas, tecnologías, descripción, contexto, nodos de arquitectura, `decisions`, `outcomes` y `learning`. El objeto opcional `en` sustituye cualquier campo en inglés; los nodos se combinan por posición.

Las áreas de `PORTFOLIO_AREAS` pertenecen a uno de dos anillos: `pro` (experiencia profesional: datos y DataOps, automatización con IA, integración y microservicios) o `explore` (ML, visión, seguridad, web). Los casos profesionales aparecen primero y con ilustración; los laboratorios y el proyecto personal forman el grupo «Exploración». Los contadores del menú, los filtros y la evidencia de cada nodo del atlas se calculan a partir del catálogo. `demo` es opcional y corresponde a `vision`, `classification` o `network`.

Los tres casos profesionales sintetizan la experiencia descrita en `CV.txt`; sus diagramas son explicativos. No incluyen métricas, repositorios ni despliegues no verificados. Los tres laboratorios utilizan datos sintéticos y se ejecutan localmente; no entrenan modelos, no acceden a cámaras ni conectan clústeres. El séptimo proyecto es el propio portafolio.

## Interacciones

- Los nodos del atlas filtran el catálogo por área; «Exploración» muestra los laboratorios y el proyecto personal. El filtro de área aparece como una etiqueta que se puede quitar.
- Los filtros por tipo (Todo, Experiencia profesional, Exploración) y la búsqueda por nombre, tecnología o especialidad se combinan.
- Las etiquetas de tecnología buscan en todo el catálogo.
- Tarjetas y mapa comparten los resultados de búsqueda.
- La franja de trayectoria bajo la portada enlaza con cada etapa de la experiencia.
- En el mapa, arrastra las cabeceras para mover tarjetas o el núcleo. Las flechas del teclado también permiten moverlos; Mayús aumenta el paso.
- Conecta dos nodos pulsando sus botones `+`, o arrastra un conector hasta otra tarjeta. Escape cancela la edición.
- Selecciona una línea y pulsa «Eliminar conexión», o elimínala desde la lista desplegable. Con una línea enfocada, Suprimir también la elimina. Se evitan conexiones duplicadas y conexiones de un nodo consigo mismo.
- «Organizar» alterna entre órbita y cuadrícula; «Trazado» cambia curvas por rectas. «Deshacer» conserva hasta 30 operaciones. «Restaurar» recupera posiciones y conexiones originales de todos los proyectos.
- Las posiciones y conexiones se mantienen durante los filtros, los cambios de vista y de idioma, dentro de la página actual. Al recargar se vuelve a la distribución original; los cambios no modifican el catálogo.
- La estela de partículas se limita al lienzo, se puede desactivar y se detiene fuera de vista, al abrir un caso o al ocultar la pestaña. Se desactiva con movimiento reducido. En móvil, el lienzo se desplaza horizontalmente y las cabeceras admiten arrastre táctil.
- Cada caso se puede compartir mediante `/#project/enterprise-lakehouse` (u otro `id`). Cambiar de idioma con un caso abierto lo traduce sin cerrarlo.
- Los diagramas permiten seleccionar componentes o recorrer el flujo. Con movimiento reducido, el recorrido avanza manualmente.
- `/` enfoca el buscador; `Esc` cierra el caso o el menú móvil.
- El correo es el canal principal de contacto. El formulario abre un borrador en WhatsApp; el visitante decide enviarlo. No hay backend de contacto.

Sin dependencias de JavaScript, compilación, claves ni instalación. Las fuentes (Inter, JetBrains Mono y Space Grotesk recortada a las letras del logotipo) están alojadas en `assets/fonts/`; no hay peticiones a terceros. Las ilustraciones, los iconos y el favicon son SVG locales. Si JavaScript está desactivado, la portada, el atlas, la trayectoria, la experiencia, la formación, el contacto por correo y el CV siguen disponibles (en español); los controles que necesitan JavaScript se ocultan.

Antes de publicar, revisa que las fechas, cargos y estudios del CV sigan vigentes, y añade evidencias públicas a los casos cuando estén disponibles.

## Despliegue (Cloudflare)

El sitio se sirve como Worker de archivos estáticos (`wrangler.jsonc`). `npx wrangler deploy` ejecuta `scripts/build-dist.mjs`, que copia a `dist/` solo lo público (`index.html`, `cv.html`, `CV.txt`, `assets/`, `_headers`) y añade `?v=<hash>` a los CSS, JS e imágenes enlazados desde el HTML; por eso `_headers` puede guardar `/assets/*` en caché un día. Las carpetas de herramientas, `V2/`, `ref/` y los `.md` nunca se publican.
