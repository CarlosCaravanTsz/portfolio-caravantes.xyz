/* Edit this catalog to add projects. Professional cases summarize CV.txt;
   architectures are explanatory models, not confidential production diagrams.

   kind: "pro" (professional case), "lab" (synthetic in-browser lab) or
   "personal". Labs and personal projects form the "Exploración" ring.
   Spanish is the base text; the optional `en` object overrides any field
   (nodes are matched by position). */
window.PORTFOLIO_AREAS = {
  data: {
    es: "Data Engineering & DataOps",
    en: "Data Engineering & DataOps",
    ring: "pro",
  },
  ai: { es: "Automatización con IA", en: "AI automation", ring: "pro" },
  integration: {
    es: "Integración y microservicios",
    en: "Integration & microservices",
    ring: "pro",
  },
  ml: { es: "Machine Learning", en: "Machine learning", ring: "explore" },
  vision: {
    es: "Visión por computadora",
    en: "Computer vision",
    ring: "explore",
  },
  security: { es: "Ciberseguridad", en: "Cybersecurity", ring: "explore" },
  web: { es: "Desarrollo web", en: "Web development", ring: "explore" },
};
window.PORTFOLIO_PROJECTS = [
  {
    id: "enterprise-lakehouse",
    number: "01",
    kind: "pro",
    title: "Enterprise Lakehouse",
    subtitle: "De sistemas empresariales a datos listos para decidir.",
    areas: ["data"],
    tech: ["Azure", "Microsoft Fabric", "PySpark", "SAP"],
    type: "Experiencia profesional",
    context: "GLOBANT",
    color: "green",
    art: "lakehouse",
    description:
      "Ingestión guiada por metadatos, arquitectura Medallion y modelos analíticos sobre el ecosistema Azure.",
    problem:
      "Integrar información de distintos sistemas empresariales con consistencia, trazabilidad y procesos de ingestión reutilizables.",
    contribution:
      "Diseñé e implementé frameworks de ingestión guiados por metadatos e integraciones con SAP. Arquitecté soluciones Lakehouse en Microsoft Fabric y lideré las prácticas DataOps: CI/CD, control de versiones y promoción de entornos. También doy soporte y optimizo modelos de Power BI.",
    disclosure:
      "Caso resumido a partir de mi experiencia en Globant. El diagrama es una representación explicativa; no reproduce una arquitectura interna ni expone datos de clientes.",
    nodes: [
      {
        name: "Fuentes",
        tech: "SAP / Enterprise",
        detail:
          "Fuentes empresariales como SAP ECC, BW/4HANA, Datasphere y S/4HANA. La ingestión debe conservar el contexto y la trazabilidad del origen.",
      },
      {
        name: "Ingestión",
        tech: "Azure Data Factory",
        detail:
          "Pipelines guiados por metadatos para estandarizar la extracción. La configuración reutilizable permite incorporar dominios sin duplicar toda la lógica.",
      },
      {
        name: "Bronze",
        tech: "Lakehouse",
        detail:
          "En este modelo Medallion, Bronze conserva una representación de los datos de origen para apoyar la trazabilidad y los reprocesamientos.",
      },
      {
        name: "Silver",
        tech: "Spark / SQL",
        detail:
          "Capa de limpieza, estandarización y transformación. Las reglas de calidad separan datos válidos de registros que requieren revisión.",
      },
      {
        name: "Gold",
        tech: "Semantic models",
        detail:
          "Datos preparados para consumo analítico y modelos semánticos compartidos, con definiciones de negocio consistentes.",
      },
      {
        name: "Consumo",
        tech: "Power BI",
        detail:
          "Dashboards y modelos analíticos para las unidades de negocio. Mi experiencia incluye soporte técnico y optimización de modelos y reportes.",
      },
    ],
    decisions: [
      "Ingestión guiada por metadatos para favorecer la reutilización.",
      "Separación de capas para mantener trazabilidad y claridad en las transformaciones.",
      "Versionado y promoción de entornos mediante prácticas DataOps.",
    ],
    outcomes:
      "El trabajo descrito incluye frameworks reutilizables, integración de fuentes SAP y soluciones Lakehouse. No se publican cifras de rendimiento ni datos internos.",
    learning:
      "Una arquitectura de datos también se diseña para quien debe operarla, depurarla y evolucionarla.",
    en: {
      subtitle: "From enterprise systems to decision-ready data.",
      type: "Professional work",
      description:
        "Metadata-driven ingestion, Medallion architecture and analytical models on the Azure ecosystem.",
      problem:
        "Bring data from several enterprise systems together with consistency, traceability and reusable ingestion processes.",
      contribution:
        "I designed and implemented metadata-driven ingestion frameworks and SAP integrations. I architected Lakehouse solutions on Microsoft Fabric and led DataOps practices: CI/CD, version control and environment promotion. I also support and optimize Power BI models.",
      disclosure:
        "Summarized from my work at Globant. The diagram is an explanatory model; it does not reproduce an internal architecture or expose client data.",
      nodes: [
        {
          name: "Sources",
          detail:
            "Enterprise sources such as SAP ECC, BW/4HANA, Datasphere and S/4HANA. Ingestion has to keep the context and traceability of the origin.",
        },
        {
          name: "Ingestion",
          detail:
            "Metadata-driven pipelines that standardize extraction. Reusable configuration lets new domains join without duplicating the logic.",
        },
        {
          name: "Bronze",
          detail:
            "In this Medallion model, Bronze keeps a representation of the source data to support traceability and reprocessing.",
        },
        {
          name: "Silver",
          detail:
            "Cleansing, standardization and transformation. Quality rules separate valid data from records that need review.",
        },
        {
          name: "Gold",
          detail:
            "Data prepared for analytics and shared semantic models, with consistent business definitions.",
        },
        {
          name: "Consumption",
          detail:
            "Dashboards and analytical models for business units. My work includes technical support and optimization of models and reports.",
        },
      ],
      decisions: [
        "Metadata-driven ingestion to favor reuse.",
        "Separate layers to keep transformations traceable and clear.",
        "Versioning and environment promotion through DataOps practices.",
      ],
      outcomes:
        "The work includes reusable frameworks, SAP source integration and Lakehouse solutions. Performance figures and internal data are not published.",
      learning:
        "A data architecture is also designed for the people who operate, debug and evolve it.",
    },
  },
  {
    id: "conversational-operations",
    number: "02",
    kind: "pro",
    title: "Conversational Operations",
    subtitle: "IA y automatización para conectar conversaciones con procesos.",
    areas: ["ai", "integration"],
    tech: ["n8n", "Chatwoot", "Pydantic", "Nginx"],
    type: "Experiencia profesional",
    context: "ZENTROL LLC",
    color: "purple",
    art: "agents",
    description:
      "Agentes conversacionales e integraciones de negocio sobre una infraestructura de herramientas abiertas.",
    problem:
      "Conectar la atención de primer nivel y los procesos internos con múltiples canales y herramientas de negocio.",
    contribution:
      "Desarrollé agentes conversacionales con n8n para atención de primer nivel. Diseñé y desplegué la infraestructura abierta con Chatwoot, Portainer y Nginx, y automaticé procesos internos integrando servicios de Google y Microsoft, APIs REST y GoHighLevel.",
    disclosure:
      "Caso resumido a partir de mi experiencia en Zentrol LLC. El flujo es ilustrativo y no representa una conversación real ni un agente conectado en esta página.",
    nodes: [
      {
        name: "Canales",
        tech: "Web / Social",
        detail:
          "Entrada de conversaciones desde web y plataformas sociales. La integración debe conservar el contexto de cada conversación.",
      },
      {
        name: "Conversación",
        tech: "Chatwoot",
        detail:
          "Infraestructura de atención para reunir las interacciones de distintos canales en un espacio operativo común.",
      },
      {
        name: "Orquestación",
        tech: "n8n",
        detail:
          "Workflows que conectan eventos, agentes conversacionales y acciones de negocio mediante servicios y APIs.",
      },
      {
        name: "Herramientas",
        tech: "REST / CRM",
        detail:
          "Integraciones con GoHighLevel, servicios de Google y Microsoft y otras APIs. Este nodo explica el papel de las herramientas en el flujo.",
      },
      {
        name: "Respuesta",
        tech: "Atención",
        detail:
          "El resultado regresa al canal de conversación. La experiencia profesional se centra en automatización de atención de primer nivel.",
      },
    ],
    decisions: [
      "Herramientas abiertas para componer la infraestructura de atención.",
      "Workflows para expresar y mantener automatizaciones de negocio.",
      "Integraciones mediante APIs para conectar herramientas existentes.",
    ],
    outcomes:
      "Desarrollo de atención conversacional y automatizaciones internas conectadas con herramientas de negocio. No hay métricas públicas verificadas de ahorro o resolución.",
    learning:
      "La utilidad de un agente depende tanto de sus integraciones como de la experiencia que ofrece a las personas.",
    en: {
      subtitle: "AI and automation connecting conversations to processes.",
      type: "Professional work",
      description:
        "Conversational agents and business integrations on top of open-source infrastructure.",
      problem:
        "Connect first-level customer support and internal processes with several channels and business tools.",
      contribution:
        "I built n8n conversational agents for first-level support. I designed and deployed the open-source infrastructure with Chatwoot, Portainer and Nginx, and automated internal processes by integrating Google and Microsoft services, REST APIs and GoHighLevel.",
      disclosure:
        "Summarized from my work at Zentrol LLC. The flow is illustrative; it is not a real conversation or an agent connected to this page.",
      nodes: [
        {
          name: "Channels",
          detail:
            "Conversations arrive from the web and social platforms. The integration has to keep the context of each conversation.",
        },
        {
          name: "Conversation",
          detail:
            "Support infrastructure that gathers interactions from different channels into one shared workspace.",
        },
        {
          name: "Orchestration",
          detail:
            "Workflows that connect events, conversational agents and business actions through services and APIs.",
        },
        {
          name: "Tools",
          detail:
            "Integrations with GoHighLevel, Google and Microsoft services and other APIs. This node explains the role of tools in the flow.",
        },
        {
          name: "Response",
          tech: "Support",
          detail:
            "The result returns to the conversation channel. The professional work focused on first-level support automation.",
        },
      ],
      decisions: [
        "Open-source tools to compose the support infrastructure.",
        "Workflows to express and maintain business automations.",
        "API integrations to connect existing tools.",
      ],
      outcomes:
        "Conversational support and internal automations connected to business tools. There are no verified public metrics on savings or resolution.",
      learning:
        "An agent is only as useful as its integrations and the experience it gives people.",
    },
  },
  {
    id: "integration-platform",
    number: "03",
    kind: "pro",
    title: "Connected Systems",
    subtitle: "Servicios, flujos y formatos hablando un mismo idioma.",
    areas: ["integration", "data"],
    tech: ["Docker", "Apache NiFi", "Airflow", "JavaScript", "Java"],
    type: "Experiencia profesional",
    context: "AXITY",
    color: "blue",
    art: "systems",
    description:
      "Microservicios y flujos de integración para orquestar procesos y transformar datos entre sistemas.",
    problem:
      "Integrar aplicaciones con protocolos y formatos diferentes, haciendo explícitas las transformaciones y la orquestación.",
    contribution:
      "Como Tech Lead, desarrollé microservicios en JavaScript y Java con Docker, orquestación con Apache Airflow con patrones serverless e integración con Apache NiFi. Conversión entre XML, JSON, AVRO, XSD e IDOC.",
    disclosure:
      "Síntesis de mi experiencia como Tech Lead en Axity. El diagrama muestra responsabilidades generales y no una topología de producción.",
    nodes: [
      {
        name: "Origen",
        tech: "XML / IDOC",
        detail:
          "Sistemas que intercambian datos en distintos formatos. Entender el contrato de entrada es el primer paso de la integración.",
      },
      {
        name: "Integración",
        tech: "Apache NiFi",
        detail:
          "Flujos de integración que conectan fuentes y destinos, haciendo visible el recorrido del dato.",
      },
      {
        name: "Servicios",
        tech: "Java / JavaScript",
        detail:
          "Microservicios que encapsulan lógica y transformaciones. Docker permite empaquetar su ejecución.",
      },
      {
        name: "Orquestación",
        tech: "Airflow",
        detail:
          "Coordinación de tareas y dependencias de los procesos. El diagrama representa responsabilidades, no un orden obligatorio de despliegue.",
      },
      {
        name: "Destino",
        tech: "JSON / AVRO",
        detail:
          "Salida adaptada al contrato que necesita el sistema consumidor.",
      },
    ],
    decisions: [
      "Separar integración, lógica de servicios y orquestación.",
      "Hacer explícitos los contratos de datos entre sistemas.",
      "Empaquetar servicios con Docker para facilitar su ejecución.",
    ],
    outcomes:
      "Desarrollo de microservicios, procesos de integración y transformaciones entre formatos empresariales. Las implementaciones internas no están publicadas.",
    learning:
      "Los contratos entre componentes son tan importantes como el código de cada servicio.",
    en: {
      subtitle: "Services, flows and formats speaking the same language.",
      type: "Professional work",
      description:
        "Microservices and integration flows that orchestrate processes and transform data between systems.",
      problem:
        "Integrate applications with different protocols and formats, making transformations and orchestration explicit.",
      contribution:
        "As Tech Lead, I developed JavaScript and Java microservices with Docker, orchestration with Apache Airflow using serverless patterns, and integration with Apache NiFi. Conversion between XML, JSON, AVRO, XSD and IDOC.",
      disclosure:
        "Summary of my work as Tech Lead at Axity. The diagram shows general responsibilities, not a production topology.",
      nodes: [
        {
          name: "Source",
          detail:
            "Systems exchanging data in different formats. Understanding the input contract is the first step of an integration.",
        },
        {
          name: "Integration",
          detail:
            "Integration flows that connect sources and targets and make the data's path visible.",
        },
        {
          name: "Services",
          detail:
            "Microservices that encapsulate logic and transformations. Docker packages how they run.",
        },
        {
          name: "Orchestration",
          detail:
            "Coordination of tasks and process dependencies. The diagram shows responsibilities, not a required deployment order.",
        },
        {
          name: "Target",
          detail: "Output shaped to the contract the consuming system needs.",
        },
      ],
      decisions: [
        "Separate integration, service logic and orchestration.",
        "Make data contracts between systems explicit.",
        "Package services with Docker so they are easy to run.",
      ],
      outcomes:
        "Microservices, integration processes and transformations between enterprise formats. Internal implementations are not published.",
      learning:
        "Contracts between components matter as much as the code inside each service.",
    },
  },
  {
    id: "vision-security-lab",
    number: "04",
    kind: "lab",
    title: "Vision / Perimeter",
    subtitle: "De una detección a un evento de seguridad.",
    areas: ["vision", "security", "ml"],
    tech: ["SVG", "JavaScript", "Geometría"],
    type: "Laboratorio interactivo",
    context: "CARAVANTES LAB",
    color: "green",
    art: "vision",
    demo: "vision",
    description:
      "Explora cómo una zona virtual convierte posiciones de objetos en eventos de entrada al perímetro.",
    problem:
      "Una detección aislada necesita contexto espacial para convertirse en un evento útil para seguridad.",
    contribution:
      "Demostración interactiva en este portafolio: un objeto sintético se desplaza sobre un plano y una regla geométrica determina si entra en una zona.",
    disclosure:
      "Simulación educativa con una escena SVG y coordenadas sintéticas. No usa cámara, no ejecuta un modelo de visión y no acredita un despliegue de videovigilancia.",
    nodes: [
      {
        name: "Escena",
        tech: "SVG sintético",
        detail:
          "Un plano generado con SVG sustituye a una cámara. No se capturan imágenes ni información personal.",
      },
      {
        name: "Posición",
        tech: "Control manual",
        detail:
          "El deslizador cambia la posición horizontal de un objeto. Su trayectoria y dimensiones son conocidas.",
      },
      {
        name: "Zona",
        tech: "Regla geométrica",
        detail:
          "Se comprueba si el centro inferior del objeto se encuentra entre los límites horizontales y verticales del perímetro.",
      },
      {
        name: "Evento",
        tech: "Estado local",
        detail:
          "La interfaz indica presencia dentro o fuera de la zona. Es una regla demostrativa; un sistema real necesitaría detección, tracking y evaluación.",
      },
    ],
    decisions: [
      "Separar la detección de la regla de negocio.",
      "Usar coordenadas conocidas para explicar el comportamiento.",
      "Identificar explícitamente la simulación.",
    ],
    outcomes:
      "Laboratorio ejecutable en el navegador. Permite mover un objeto y activar o desactivar la zona para observar el evento.",
    learning:
      "La precisión de detección y la calidad de una alerta son problemas relacionados, pero distintos.",
    en: {
      subtitle: "From a detection to a security event.",
      type: "Interactive lab",
      tech: ["SVG", "JavaScript", "Geometry"],
      description:
        "See how a virtual zone turns object positions into perimeter-entry events.",
      problem:
        "An isolated detection needs spatial context before it becomes a useful security event.",
      contribution:
        "An interactive demo on this site: a synthetic object moves across a plane and a geometric rule decides whether it enters a zone.",
      disclosure:
        "Educational simulation with an SVG scene and synthetic coordinates. It uses no camera, runs no vision model and does not claim a video-surveillance deployment.",
      nodes: [
        {
          name: "Scene",
          tech: "Synthetic SVG",
          detail:
            "An SVG plane replaces a camera. No images or personal information are captured.",
        },
        {
          name: "Position",
          tech: "Manual control",
          detail:
            "The slider changes the object's horizontal position. Its path and size are known.",
        },
        {
          name: "Zone",
          tech: "Geometric rule",
          detail:
            "The rule checks whether the object's bottom center falls inside the perimeter's horizontal and vertical bounds.",
        },
        {
          name: "Event",
          tech: "Local state",
          detail:
            "The interface shows presence inside or outside the zone. It is a demonstration rule; a real system would need detection, tracking and evaluation.",
        },
      ],
      decisions: [
        "Keep detection separate from the business rule.",
        "Use known coordinates to explain the behavior.",
        "Label the simulation explicitly.",
      ],
      outcomes:
        "A lab that runs in the browser. Move an object and toggle the zone to watch the event.",
      learning:
        "Detection accuracy and alert quality are related problems, but different ones.",
    },
  },
  {
    id: "classification-lab",
    number: "05",
    kind: "lab",
    title: "The Decision Boundary",
    subtitle: "Un umbral. Distintas decisiones.",
    areas: ["ml"],
    tech: ["JavaScript", "Precision / Recall", "Clasificación"],
    type: "Laboratorio interactivo",
    context: "CARAVANTES LAB",
    color: "purple",
    art: "classification",
    demo: "classification",
    description:
      "Ajusta un umbral de clasificación y observa el equilibrio entre precisión, recall y falsos positivos.",
    problem:
      "El umbral de un clasificador cambia qué casos se consideran positivos y el coste de sus errores.",
    contribution:
      "Simulador con veinte muestras sintéticas, etiquetas conocidas y puntuaciones fijas. Las métricas se recalculan localmente al mover el umbral.",
    disclosure:
      "Experimento educativo con datos sintéticos. Las puntuaciones son predefinidas; no se entrena ni se ejecuta un modelo de machine learning.",
    nodes: [
      {
        name: "Muestras",
        tech: "20 ejemplos",
        detail:
          "Cada muestra tiene una etiqueta real sintética y una puntuación entre 0 y 1.",
      },
      {
        name: "Umbral",
        tech: "0.00 → 1.00",
        detail:
          "Una puntuación mayor o igual que el umbral se interpreta como predicción positiva.",
      },
      {
        name: "Decisión",
        tech: "TP / FP / FN / TN",
        detail:
          "Se compara la predicción con la etiqueta conocida para contar verdaderos y falsos positivos y negativos.",
      },
      {
        name: "Evaluación",
        tech: "Precision / Recall",
        detail:
          "Precisión = TP / (TP + FP). Recall = TP / (TP + FN). La precisión se muestra como no definida cuando no hay predicciones positivas.",
      },
    ],
    decisions: [
      "Mantener el conjunto fijo para aislar el efecto del umbral.",
      "Mostrar ejemplos y métricas en la misma vista.",
      "Tratar explícitamente el caso sin predicciones positivas.",
    ],
    outcomes:
      "Métricas y predicciones interactivas calculadas sobre un conjunto sintético reproducible.",
    learning:
      "Elegir un umbral requiere comprender qué errores son más costosos en el contexto del producto.",
    en: {
      subtitle: "One threshold. Different decisions.",
      type: "Interactive lab",
      tech: ["JavaScript", "Precision / Recall", "Classification"],
      description:
        "Move a classification threshold and watch the trade-off between precision, recall and false positives.",
      problem:
        "A classifier's threshold changes which cases count as positive and what its errors cost.",
      contribution:
        "A simulator with twenty synthetic samples, known labels and fixed scores. Metrics are recalculated locally as the threshold moves.",
      disclosure:
        "Educational experiment with synthetic data. Scores are predefined; no machine learning model is trained or run.",
      nodes: [
        {
          name: "Samples",
          tech: "20 examples",
          detail:
            "Each sample has a synthetic true label and a score between 0 and 1.",
        },
        {
          name: "Threshold",
          detail:
            "A score greater than or equal to the threshold counts as a positive prediction.",
        },
        {
          name: "Decision",
          detail:
            "Each prediction is compared with the known label to count true and false positives and negatives.",
        },
        {
          name: "Evaluation",
          detail:
            "Precision = TP / (TP + FP). Recall = TP / (TP + FN). Precision is shown as undefined when there are no positive predictions.",
        },
      ],
      decisions: [
        "Keep the dataset fixed to isolate the effect of the threshold.",
        "Show samples and metrics in the same view.",
        "Handle the no-positive-predictions case explicitly.",
      ],
      outcomes:
        "Interactive metrics and predictions computed on a reproducible synthetic set.",
      learning:
        "Choosing a threshold means understanding which errors cost more in the product's context.",
    },
  },
  {
    id: "resilience-lab",
    number: "06",
    kind: "lab",
    title: "Built for Failure",
    subtitle: "¿Qué pasa cuando un nodo deja de responder?",
    areas: ["integration"],
    tech: ["JavaScript", "Colas", "Round-robin"],
    type: "Laboratorio interactivo",
    context: "CARAVANTES LAB",
    color: "blue",
    art: "network",
    demo: "network",
    description:
      "Simula la distribución de tareas, desconecta un consumidor y observa cómo cambia el reparto.",
    problem:
      "Un flujo distribuido debe considerar la disponibilidad de sus consumidores y el trabajo que queda pendiente.",
    contribution:
      "Modelo local de una cola y tres consumidores. Cada lote distribuye seis tareas entre los nodos disponibles mediante round-robin.",
    disclosure:
      "Simulación determinista en memoria. No representa un clúster real ni mide latencia, throughput o garantías de entrega.",
    nodes: [
      {
        name: "Productor",
        tech: "Lote de 6",
        detail:
          "Cada pulsación genera seis tareas sintéticas y las añade a la cola del navegador.",
      },
      {
        name: "Cola",
        tech: "Memoria local",
        detail:
          "Las tareas pendientes se conservan mientras no haya consumidores activos. El estado se reinicia al cerrar el caso.",
      },
      {
        name: "Distribución",
        tech: "Round-robin",
        detail:
          "Las tareas se asignan por turnos a los consumidores activos. Este modelo simplificado completa las tareas inmediatamente.",
      },
      {
        name: "Consumidores",
        tech: "3 nodos",
        detail:
          "Puedes desactivar un nodo o todos. Al recuperar consumidores, un nuevo lote también procesa el trabajo pendiente.",
      },
    ],
    decisions: [
      "Hacer visibles cola, disponibilidad y tareas completadas.",
      "Permitir una caída total para observar acumulación.",
      "Mantener las limitaciones del modelo explícitas.",
    ],
    outcomes:
      "Se puede experimentar con disponibilidad parcial y total, acumulación de tareas y recuperación.",
    learning:
      "La tolerancia a fallos necesita decisiones explícitas sobre reintentos, persistencia y duplicados; esta demo solo ilustra el reparto.",
    en: {
      subtitle: "What happens when a node stops responding?",
      type: "Interactive lab",
      tech: ["JavaScript", "Queues", "Round-robin"],
      description:
        "Simulate task distribution, disconnect a consumer and watch how the work is redistributed.",
      problem:
        "A distributed flow has to account for consumer availability and the work still pending.",
      contribution:
        "A local model of one queue and three consumers. Each batch spreads six tasks across the available nodes with round-robin.",
      disclosure:
        "Deterministic in-memory simulation. It does not represent a real cluster or measure latency, throughput or delivery guarantees.",
      nodes: [
        {
          name: "Producer",
          tech: "Batch of 6",
          detail:
            "Each click creates six synthetic tasks and adds them to the in-browser queue.",
        },
        {
          name: "Queue",
          tech: "Local memory",
          detail:
            "Pending tasks are kept while no consumer is active. The state resets when you close the case.",
        },
        {
          name: "Distribution",
          detail:
            "Tasks are assigned in turn to the active consumers. This simplified model completes tasks immediately.",
        },
        {
          name: "Consumers",
          tech: "3 nodes",
          detail:
            "You can switch off one node or all of them. Once consumers are back, the next batch also processes the pending work.",
        },
      ],
      decisions: [
        "Make queue, availability and completed tasks visible.",
        "Allow a total outage to observe the backlog.",
        "Keep the model's limits explicit.",
      ],
      outcomes:
        "Experiment with partial and total availability, task backlog and recovery.",
      learning:
        "Fault tolerance needs explicit decisions about retries, persistence and duplicates; this demo only illustrates distribution.",
    },
  },
  {
    id: "engineering-atlas",
    number: "07",
    kind: "personal",
    title: "Engineering Atlas",
    subtitle: "El portafolio como una experiencia de exploración.",
    areas: ["web"],
    tech: ["HTML", "CSS", "JavaScript", "SVG"],
    type: "Proyecto personal",
    context: "ESTÁS AQUÍ",
    color: "purple",
    art: "portfolio",
    description:
      "Un explorador de proyectos con mapas, arquitecturas interactivas y laboratorios en el navegador.",
    problem:
      "Presentar una trayectoria multidisciplinaria de forma clara, visual y fácil de explorar.",
    contribution:
      "Diseño y construcción de este portafolio bilingüe: catálogo por tipo y especialidad, búsqueda por tecnología, casos enlazables, diagramas y demos locales.",
    disclosure:
      "Proyecto personal: este mismo sitio. Los casos profesionales se basan en el CV y los laboratorios se identifican como simulaciones.",
    nodes: [
      {
        name: "Contenido",
        tech: "Catálogo JS",
        detail:
          "Los proyectos se definen en un catálogo independiente con áreas, tecnologías, decisiones y nodos de arquitectura, en español e inglés.",
      },
      {
        name: "Exploración",
        tech: "Filtros / Mapa",
        detail:
          "Una única selección filtra las vistas de tarjetas y mapa. La búsqueda también encuentra tecnologías y áreas.",
      },
      {
        name: "Casos",
        tech: "HTML dialog",
        detail:
          "Cada caso tiene un identificador enlazable en la URL y se abre en un diálogo con soporte nativo de teclado.",
      },
      {
        name: "Interacción",
        tech: "SVG / JavaScript",
        detail:
          "Diagramas y simulaciones se ejecutan en el navegador sin servicios externos ni captura de datos.",
      },
    ],
    decisions: [
      "HTML, CSS y JavaScript sin dependencias de ejecución.",
      "Diagramas SVG para explicar sistemas con poco peso.",
      "Navegación por teclado y respeto a movimiento reducido.",
    ],
    outcomes:
      "Un catálogo de siete entradas con dos vistas, búsqueda, siete casos enlazables y tres laboratorios interactivos.",
    learning:
      "La interacción funciona mejor cuando ayuda a entender algo que el texto por sí solo no muestra.",
    en: {
      subtitle: "A portfolio built as something to explore.",
      type: "Personal project",
      context: "YOU ARE HERE",
      description:
        "A project explorer with maps, interactive architectures and in-browser labs.",
      problem:
        "Present a multidisciplinary career in a way that is clear, visual and easy to explore.",
      contribution:
        "Design and build of this bilingual portfolio: catalog by type and specialty, search by technology, linkable cases, diagrams and local demos.",
      disclosure:
        "Personal project: this very site. Professional cases are based on my CV and labs are labeled as simulations.",
      nodes: [
        {
          name: "Content",
          tech: "JS catalog",
          detail:
            "Projects live in a separate catalog with areas, technologies, decisions and architecture nodes, in Spanish and English.",
        },
        {
          name: "Exploration",
          tech: "Filters / Map",
          detail:
            "One selection filters both the card and map views. Search also matches technologies and areas.",
        },
        {
          name: "Cases",
          detail:
            "Each case has a linkable ID in the URL and opens in a dialog with native keyboard support.",
        },
        {
          name: "Interaction",
          detail:
            "Diagrams and simulations run in the browser with no external services and no data capture.",
        },
      ],
      decisions: [
        "HTML, CSS and JavaScript with no runtime dependencies.",
        "SVG diagrams to explain systems with little weight.",
        "Keyboard navigation and respect for reduced motion.",
      ],
      outcomes:
        "A seven-entry catalog with two views, search, seven linkable cases and three interactive labs.",
      learning:
        "Interaction works best when it helps people understand something text alone cannot show.",
    },
  },
];
