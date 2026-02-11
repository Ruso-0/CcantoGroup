export interface Course {
  slug: string
  title: string
  category: string
  iconName: string
  color: string
  price: string
  duration: string
  modality: string
  description: string
  image: string
  curriculum: string[]
  popular?: boolean
}

export const COURSES: Course[] = [
  {
    slug: 'trabajo-en-caliente',
    title: 'Trabajo en Caliente',
    category: 'Alto Riesgo',
    iconName: 'Flame',
    color: '#ff6b35',
    price: 'S/50',
    duration: '8 horas',
    modality: 'Presencial',
    description:
      'Capacitacion especializada en operaciones con llama abierta, soldadura, esmerilado y corte. Cubre identificacion de riesgos, permisos de trabajo, medidas preventivas y uso correcto de EPP en entornos mineros, industriales y de construccion.',
    image: '/images/courses/trabajo-en-caliente.jpg',
    curriculum: [
      'Definicion y tipos de trabajo en caliente',
      'Marco legal: DS 024-2016-EM y Ley 29783',
      'Identificacion de peligros y evaluacion de riesgos',
      'Permisos PETAR para trabajo en caliente',
      'Equipos de proteccion personal (EPP)',
      'Control de fuentes de ignicion',
      'Sistemas de extincion y respuesta a emergencias',
      'Evaluacion final y certificado',
    ],
    popular: true,
  },
  {
    slug: 'bloqueo-y-etiquetado',
    title: 'Bloqueo y Etiquetado',
    category: 'Alto Riesgo',
    iconName: 'Lock',
    color: '#00d4ff',
    price: 'S/50',
    duration: '8 horas',
    modality: 'Presencial',
    description:
      'Programa de control de energias peligrosas (LOTO). Aprende los procedimientos de bloqueo y etiquetado para aislar fuentes de energia electrica, mecanica, hidraulica, neumatica y termica durante actividades de mantenimiento.',
    image: '/images/courses/bloqueo-y-etiquetado.jpg',
    curriculum: [
      'Conceptos de energia peligrosa',
      'Normativa OSHA 1910.147 y DS 024-2016-EM',
      'Tipos de dispositivos de bloqueo y etiquetado',
      'Procedimiento LOTO paso a paso',
      'Verificacion de energia cero',
      'Bloqueo grupal y responsabilidades',
      'Practica con dispositivos reales',
      'Evaluacion final y certificado',
    ],
  },
  {
    slug: 'herramientas-de-poder',
    title: 'Herramientas de Poder',
    category: 'Seguridad Operacional',
    iconName: 'Wrench',
    color: '#00f0ff',
    price: 'S/50',
    duration: '4 horas',
    modality: 'Presencial',
    description:
      'Uso seguro de herramientas manuales y electricas de poder en entornos industriales, mineros y de construccion. Incluye inspeccion, mantenimiento, almacenamiento y procedimientos operativos para evitar lesiones.',
    image: '/images/courses/herramientas-de-poder.jpg',
    curriculum: [
      'Clasificacion de herramientas de poder',
      'Inspeccion previa al uso (checklist)',
      'Riesgos comunes y medidas de control',
      'EPP especifico para cada herramienta',
      'Mantenimiento y almacenamiento correcto',
      'Practica supervisada',
      'Evaluacion final y certificado',
    ],
  },
  {
    slug: 'excavaciones-y-zanjas',
    title: 'Excavaciones y Zanjas',
    category: 'Alto Riesgo',
    iconName: 'Construction',
    color: '#ff6b35',
    price: 'S/50',
    duration: '8 horas',
    modality: 'Presencial',
    description:
      'Seguridad en operaciones de excavacion y zanjas. Cubre sistemas de proteccion contra derrumbes, clasificacion de suelos, permisos de trabajo y rescate en espacios de excavacion para los sectores de construccion y mineria.',
    image: '/images/courses/excavaciones-y-zanjas.jpg',
    curriculum: [
      'Normativa legal para excavaciones',
      'Clasificacion y analisis de suelos',
      'Sistemas de proteccion: entibado, talud, escudos',
      'Identificacion de servicios subterraneos',
      'Permisos PETAR y evaluacion de riesgos',
      'Procedimientos de ingreso y salida segura',
      'Plan de rescate en excavaciones',
      'Evaluacion final y certificado',
    ],
  },
  {
    slug: 'espacios-confinados',
    title: 'Espacios Confinados',
    category: 'Alto Riesgo',
    iconName: 'Wind',
    color: '#00f0ff',
    price: 'S/50',
    duration: '8 horas',
    modality: 'Presencial',
    description:
      'Capacitacion para ingreso seguro a espacios confinados: tanques, silos, ductos, pozos y camaras. Incluye monitoreo de atmosferas, ventilacion, permisos, y tecnicas de rescate en entornos mineros e industriales.',
    image: '/images/courses/espacios-confinados.jpg',
    curriculum: [
      'Definicion y clasificacion de espacios confinados',
      'Marco legal: OSHA y DS 024-2016-EM',
      'Monitoreo de atmosferas (O2, LEL, CO, H2S)',
      'Equipos de ventilacion y deteccion',
      'Permisos de ingreso y roles del equipo',
      'EPP y sistemas de recuperacion',
      'Plan de rescate y simulacro practico',
      'Evaluacion final y certificado',
    ],
    popular: true,
  },
  {
    slug: 'escaleras-y-andamios',
    title: 'Escaleras y Andamios',
    category: 'Seguridad Operacional',
    iconName: 'Scaling',
    color: '#8b5cf6',
    price: 'S/50',
    duration: '8 horas',
    modality: 'Presencial',
    description:
      'Armado, uso seguro e inspeccion de escaleras portatiles y sistemas de andamios. Aprende las normas tecnicas, capacidades de carga, arriostramiento y procedimientos de trabajo seguro en alturas con estos equipos.',
    image: '/images/courses/escaleras-y-andamios.jpg',
    curriculum: [
      'Tipos de escaleras y andamios',
      'Normativa OSHA y nacional aplicable',
      'Inspeccion y lista de verificacion',
      'Armado seguro de andamios multidireccionales',
      'Capacidades de carga y arriostramiento',
      'Proteccion contra caidas en andamios',
      'Practica de armado y desarmado',
      'Evaluacion final y certificado',
    ],
  },
  {
    slug: 'riesgos-electricos',
    title: 'Riesgos Electricos',
    category: 'Higiene y Seguridad Laboral',
    iconName: 'Zap',
    color: '#f59e0b',
    price: 'S/50',
    duration: '8 horas',
    modality: 'Presencial',
    description:
      'Prevencion de accidentes por contacto electrico directo e indirecto. Cubre normativas, distancias de seguridad, EPP dielectrico, procedimientos de desenergizacion y respuesta ante emergencias electricas.',
    image: '/images/courses/riesgos-electricos.jpg',
    curriculum: [
      'Fundamentos de electricidad y peligros asociados',
      'Efectos de la corriente electrica en el cuerpo',
      'Normativa NFPA 70E y Codigo Nacional de Electricidad',
      'Distancias de seguridad y limites de aproximacion',
      'EPP dielectrico: seleccion y uso',
      'Procedimientos de desenergizacion (5 pasos)',
      'Primeros auxilios en accidentes electricos',
      'Evaluacion final y certificado',
    ],
    popular: true,
  },
  {
    slug: 'materiales-peligrosos',
    title: 'Materiales Peligrosos',
    category: 'Higiene y Seguridad Laboral',
    iconName: 'Biohazard',
    color: '#84cc16',
    price: 'Gratis',
    duration: '16 horas',
    modality: 'Presencial',
    description:
      'Programa completo de manejo de materiales peligrosos niveles I, II y III. Identificacion, clasificacion ONU, hojas de seguridad (SDS), transporte, almacenamiento y respuesta a derrames y emergencias HAZMAT.',
    image: '/images/courses/materiales-peligrosos.jpg',
    curriculum: [
      'Clasificacion ONU de materiales peligrosos (9 clases)',
      'Sistema Globalmente Armonizado (SGA/GHS)',
      'Lectura e interpretacion de hojas SDS',
      'Rombos NFPA 704 y etiquetado DOT',
      'Transporte seguro de MATPEL',
      'Almacenamiento y compatibilidad quimica',
      'Respuesta a derrames y descontaminacion',
      'Evaluacion final y certificado (Niveles I, II, III)',
    ],
    popular: true,
  },
  {
    slug: 'iperc-ats-petar',
    title: 'IPERC / ATS / PETAR',
    category: 'Gestion de Seguridad',
    iconName: 'FileSearch',
    color: '#8b5cf6',
    price: 'Gratis',
    duration: '8 horas',
    modality: 'Presencial / Virtual',
    description:
      'Elaboracion e implementacion de herramientas de gestion de seguridad: IPERC (Identificacion de Peligros y Evaluacion de Riesgos), ATS (Analisis de Trabajo Seguro) y PETAR (Permiso Escrito para Trabajo de Alto Riesgo).',
    image: '/images/courses/iperc-ats-petar.jpg',
    curriculum: [
      'Marco legal: Ley 29783 y DS 024-2016-EM',
      'IPERC linea base y continuo',
      'Metodologia de evaluacion de riesgos',
      'Elaboracion de matriz IPERC',
      'ATS: procedimiento y formato',
      'PETAR: tipos y requisitos',
      'Casos practicos con formatos reales',
      'Evaluacion final y certificado',
    ],
    popular: true,
  },
  {
    slug: 'trabajos-en-altura',
    title: 'Trabajos en Altura',
    category: 'Alto Riesgo',
    iconName: 'MountainSnow',
    color: '#00d4ff',
    price: 'S/50',
    duration: '8 horas',
    modality: 'Presencial',
    description:
      'Prevencion de caidas en trabajos realizados a 1.80 metros o mas de altura. Incluye sistemas de proteccion contra caidas, puntos de anclaje, lineas de vida, arnes y tecnicas de rescate en altura.',
    image: '/images/courses/trabajos-en-altura.jpg',
    curriculum: [
      'Definicion y normativa (OSHA, DS 024-2016-EM)',
      'Jerarquia de controles contra caidas',
      'Sistemas de restriccion y detencion de caidas',
      'Seleccion e inspeccion de arnes y eslingas',
      'Puntos de anclaje y lineas de vida',
      'Calculo de distancia de caida libre',
      'Tecnicas de rescate en altura',
      'Evaluacion final y certificado',
    ],
    popular: true,
  },
  {
    slug: 'primeros-auxilios',
    title: 'Primeros Auxilios',
    category: 'Respuesta a Emergencias',
    iconName: 'HeartPulse',
    color: '#f43f5e',
    price: 'S/50',
    duration: '8 horas',
    modality: 'Presencial',
    description:
      'Curso de primeros auxilios y RCP basico para respuesta inicial ante emergencias en el trabajo. Atencion de heridas, fracturas, quemaduras, intoxicaciones, shock y reanimacion cardiopulmonar con DEA.',
    image: '/images/courses/primeros-auxilios.jpg',
    curriculum: [
      'Principios de accion de emergencia (PAS)',
      'Evaluacion primaria y secundaria de la victima',
      'RCP basico adulto y uso de DEA',
      'Control de hemorragias y heridas',
      'Fracturas, luxaciones y esguinces',
      'Quemaduras y lesiones termicas',
      'Intoxicaciones y mordeduras',
      'Evaluacion practica y certificado',
    ],
  },
  {
    slug: 'sbc-seguridad-basada-comportamiento',
    title: 'SBC - Seguridad Basada en el Comportamiento',
    category: 'Gestion de Seguridad',
    iconName: 'BrainCircuit',
    color: '#8b5cf6',
    price: 'S/50',
    duration: '8 horas',
    modality: 'Presencial / Virtual',
    description:
      'Programa de observacion y modificacion de comportamientos inseguros. Aprende a implementar un programa SBC efectivo, realizar observaciones, dar retroalimentacion positiva y construir una cultura de seguridad proactiva.',
    image: '/images/courses/sbc.jpg',
    curriculum: [
      'Fundamentos de la seguridad basada en el comportamiento',
      'Modelo ABC: Antecedente, Comportamiento, Consecuencia',
      'Observacion de comportamientos criticos',
      'Tarjetas de observacion y registro de datos',
      'Retroalimentacion positiva y correctiva',
      'Indicadores proactivos de seguridad',
      'Implementacion de un programa SBC',
      'Evaluacion final y certificado',
    ],
  },
]

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug)
}

export function getPopularCourses(): Course[] {
  return COURSES.filter((c) => c.popular)
}
