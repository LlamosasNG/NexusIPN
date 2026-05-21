import { db } from '@/config/db'
import type {
  ContentSection,
  CreditsSection,
  DigitalBookSections,
  DigitalResourceType,
  EvaluationSection,
  HelpSection,
  IdentificationSection,
  LearningActivitiesSection,
  LearningObjectSection,
  MethodologySection,
  PedagogicalSection,
} from '@/interfaces/DigitalResourceInterfaces'
import DigitalDidacticResource from '@/models/DigitalDidacticResource'
import Subject from '@/models/Subject'
import User from '@/models/User'
import UserSubject from '@/models/UserSubject'
import colors from 'colors'
import { Transaction } from 'sequelize'

const MAX_RESOURCES_PER_TEACHER = 2

const resourceTypeSequence: DigitalResourceType[] = [
  'digital-book',
  'interactive-digital-book',
  'learning-object',
]

type AssignedSubject = Subject & {
  UserSubject?: UserSubject
}

const getResourceTypeLabel = (resourceType: DigitalResourceType) => {
  if (resourceType === 'digital-book') return 'Libro Digital'
  if (resourceType === 'interactive-digital-book')
    return 'Libro Digital Interactivo'
  return 'Objeto de Aprendizaje'
}

const buildThematicUnits = (subject: Subject) => {
  if (subject.units?.length) {
    return subject.units.slice(0, 3).map((unit) => unit.name)
  }

  return [
    `Fundamentos de ${subject.name}`,
    `Aplicaciones de ${subject.name}`,
    `Evaluación de ${subject.name}`,
  ]
}

const buildIdentification = (
  subject: Subject,
  resourceType: DigitalResourceType,
  resourceIndex: number
): IdentificationSection => ({
  coverImage: '',
  interactiveDescription:
    resourceType === 'interactive-digital-book'
      ? `Este recurso integra actividades interactivas, retroalimentación y navegación guiada para trabajar ${subject.name}.`
      : '',
  title: `${getResourceTypeLabel(resourceType)} de ${subject.name}`,
  preciseTopic: `Tema integrador ${resourceIndex + 1} de ${subject.name}`,
  academicProgramContexts:
    subject.studyPlanNames?.join(', ') ||
    'Contexto académico correspondiente al programa de estudios.',
  thematicUnits: buildThematicUnits(subject),
})

const buildPedagogical = (subject: Subject): PedagogicalSection => ({
  welcome: `Bienvenido al recurso didáctico digital de ${subject.name}. Este material acompaña el aprendizaje autónomo y guiado de la unidad de aprendizaje.`,
  generalCompetencies: [
    subject.generalObjective ||
      `Analiza los fundamentos de ${subject.name} para resolver situaciones académicas contextualizadas.`,
  ],
  specificCompetencies: [
    `Identifica conceptos centrales de ${subject.name}.`,
    `Aplica procedimientos y criterios de ${subject.name} en ejercicios guiados.`,
  ],
  diagnostic:
    'El diagnóstico inicial considera preguntas de recuperación de conocimientos previos y análisis de casos breves.',
})

const buildMethodology = (subject: Subject): MethodologySection => ({
  usage:
    'El RDD se utilizará como apoyo para el estudio independiente, la revisión de contenidos y el desarrollo de actividades de aprendizaje.',
  totalPeriod: '4 semanas',
  weeklyHours: '4 horas semanales',
  advisorWorkMethod:
    'El asesor dará seguimiento mediante revisión de evidencias, retroalimentación puntual y orientación en sesiones de acompañamiento.',
  strategies: [
    'Aprendizaje basado en problemas',
    'Análisis de casos',
    'Trabajo autónomo con retroalimentación',
  ],
  competencies:
    subject.generalObjective ||
    `Desarrolla habilidades para comprender y aplicar contenidos de ${subject.name}.`,
  generalObjectives: [
    `Fortalecer el aprendizaje de ${subject.name} mediante recursos digitales estructurados.`,
  ],
  specificObjectives: [
    'Reconocer conceptos y procedimientos clave.',
    'Resolver actividades relacionadas con situaciones académicas.',
  ],
  accompanimentFigures:
    'Participan el docente titular como asesor académico y el estudiante como responsable de su avance.',
})

const buildContent = (subject: Subject): ContentSection => {
  const units = subject.units?.length
    ? subject.units.slice(0, 2)
    : [
        {
          name: `Fundamentos de ${subject.name}`,
          competency: `Reconoce fundamentos de ${subject.name}.`,
        },
        {
          name: `Aplicaciones de ${subject.name}`,
          competency: `Aplica contenidos de ${subject.name}.`,
        },
      ]

  return {
    unidades: units.map((unit, unitIndex) => ({
      id: `unidad-${unitIndex + 1}`,
      nombreUnidad: unit.name,
      objetivoUnidad: unit.competency,
      temas: [
        {
          id: `unidad-${unitIndex + 1}-tema-1`,
          tituloTema: `Introducción a ${unit.name}`,
          contenidoInicio:
            'Se presenta el contexto del tema y su relación con la unidad de aprendizaje.',
          contenidoDesarrollo:
            'Se desarrollan conceptos, procedimientos y ejemplos representativos del tema.',
          contenidoConclusion:
            'Se sintetizan los elementos centrales y se plantean preguntas de cierre.',
          subtemas: [
            {
              id: `unidad-${unitIndex + 1}-tema-1-subtema-1`,
              tituloSubtema: `Conceptos clave de ${unit.name}`,
              contenidoInicio:
                'El subtema inicia con una breve recuperación de conocimientos previos.',
              contenidoDesarrollo:
                'Se explican los conceptos clave mediante ejemplos y situaciones de aplicación.',
              contenidoConclusion:
                'El estudiante identifica los puntos más relevantes para continuar con la actividad.',
            },
          ],
        },
      ],
    })),
  }
}

const buildLearningActivities = (
  subject: Subject
): LearningActivitiesSection => ({
  activities: [
    {
      proposito: `Aplicar los conceptos principales de ${subject.name}.`,
      modalidad: 'individual',
      estrategiaDidactica: 'casos',
      instrucciones:
        'Analiza el caso propuesto, identifica los elementos relevantes y elabora una respuesta fundamentada.',
      evidenciaEsperada:
        'Documento breve con análisis, procedimiento y conclusión del caso.',
      porcentaje: 40,
      espacioComunicacion: true,
      esAutomatizada: false,
      puntajeProgramado: 0,
      numeroIntentos: 1,
      mecanismoRetroalimentacion:
        'Retroalimentación cualitativa del docente con criterios de logro.',
      preguntas: [
        {
          texto: `¿Cuál es el concepto más relevante de ${subject.name} para resolver el caso?`,
        },
      ],
    },
    {
      proposito: `Verificar aprendizajes de ${subject.name}.`,
      modalidad: 'individual',
      estrategiaDidactica: 'problemas',
      instrucciones:
        'Resuelve el ejercicio de comprobación y registra el procedimiento utilizado.',
      evidenciaEsperada:
        'Respuesta del ejercicio y justificación del resultado.',
      porcentaje: 60,
      espacioComunicacion: false,
      esAutomatizada: true,
      puntajeProgramado: 10,
      numeroIntentos: 2,
      mecanismoRetroalimentacion:
        'Retroalimentación automática basada en la respuesta seleccionada.',
      preguntas: [
        {
          texto: `Selecciona la opción que mejor describe la aplicación de ${subject.name}.`,
        },
      ],
    },
  ],
})

const buildEvaluation = (): EvaluationSection => ({
  evaluacionFinal:
    'La evaluación final integra el producto de aprendizaje, la participación en actividades y la resolución de ejercicios.',
  autoevaluacion:
    'El estudiante realizará una autoevaluación sobre su desempeño, organización y cumplimiento de evidencias.',
  momentosEvaluacion:
    'Se consideran evaluación diagnóstica al inicio, formativa durante las actividades y sumativa al cierre del RDD.',
})

const buildHelp = (subject: Subject): HelpSection => ({
  resources: [
    {
      tituloRecurso: `Guía de estudio de ${subject.name}`,
      urlRecurso: 'https://www.ipn.mx/',
      tipoRecurso: 'guia',
    },
    {
      tituloRecurso: `Video introductorio de ${subject.name}`,
      urlRecurso: 'https://www.ipn.mx/',
      tipoRecurso: 'video',
    },
  ],
  references: [
    {
      referenciaAPA: `${subject.name}. (2026). Material académico de apoyo. Instituto Politécnico Nacional.`,
    },
  ],
  glossary: [
    {
      termino: 'Recurso didáctico digital',
      definicion:
        'Material educativo estructurado para apoyar procesos de enseñanza y aprendizaje mediante medios digitales.',
    },
    {
      termino: subject.name,
      definicion:
        'Unidad de aprendizaje abordada mediante actividades, contenidos y evaluación dentro del RDD.',
    },
  ],
})

const buildCredits = (teacher: User): CreditsSection => ({
  fechaReferencia: new Date().toISOString().slice(0, 10),
  authors: [
    {
      nombreAutor: teacher.name,
      semblanzaAutor:
        'Docente del Instituto Politécnico Nacional participante en la elaboración del recurso didáctico digital.',
    },
  ],
})

const buildLearningObject = (subject: Subject): LearningObjectSection => ({
  precisionTema: `Objeto de aprendizaje sobre ${subject.name}`,
  temaConsecutivoUno: `Antecedentes de ${subject.name}`,
  temaConsecutivoDos: `Aplicación de ${subject.name}`,
  objetivoAprendizaje:
    'Resolver una actividad focalizada a partir de conceptos y ejemplos del recurso.',
  competenciaEspecifica:
    subject.generalObjective ||
    `Aplica conocimientos específicos de ${subject.name} en una situación contextualizada.`,
  contextoAplicacion:
    'Actividad aplicable en sesiones de estudio independiente o como reforzamiento de clase.',
  microcontenido:
    'Resumen breve de conceptos, pasos de aplicación y ejemplo resuelto.',
  ejemploAplicado:
    'Caso guiado con planteamiento, análisis, procedimiento y conclusión.',
  actividadFocalizada:
    'Ejercicio individual con respuesta argumentada y evidencia breve.',
  evidencia: 'Producto escrito con solución del ejercicio y reflexión final.',
  criterioLogro:
    'Claridad conceptual, pertinencia del procedimiento y coherencia en la conclusión.',
  tiempoEstimado: '45 minutos',
  reutilizacion:
    'Puede reutilizarse como actividad de diagnóstico, práctica o reforzamiento.',
})

const buildResourceSections = (
  subject: Subject,
  teacher: User,
  resourceType: DigitalResourceType,
  resourceIndex: number
): DigitalBookSections => ({
  identification: buildIdentification(subject, resourceType, resourceIndex),
  pedagogical: buildPedagogical(subject),
  methodology: buildMethodology(subject),
  content: buildContent(subject),
  learningActivities: buildLearningActivities(subject),
  evaluation: buildEvaluation(),
  help: buildHelp(subject),
  credits: buildCredits(teacher),
  learningObject: buildLearningObject(subject),
})

const createResource = async ({
  teacher,
  subject,
  resourceType,
  resourceIndex,
  transaction,
}: {
  teacher: User
  subject: Subject
  resourceType: DigitalResourceType
  resourceIndex: number
  transaction: Transaction
}) => {
  const sections = buildResourceSections(
    subject,
    teacher,
    resourceType,
    resourceIndex
  )

  await DigitalDidacticResource.create(
    {
      userId: teacher.id,
      subjectId: subject.id,
      resourceType,
      ...sections,
    },
    { transaction }
  )
}

export async function seedSampleDigitalResources({ closeConnection = false } = {}) {
  const transaction = await db.transaction()

  try {
    await db.authenticate()

    const teachers = await User.findAll({
      where: { role: 'Docente' },
      include: [
        {
          model: Subject,
          through: {
            attributes: ['active'],
          },
        },
      ],
      order: [['id', 'ASC']],
      transaction,
    })

    let createdCount = 0
    let skippedCount = 0

    for (const [teacherIndex, teacher] of teachers.entries()) {
      const activeSubjects = (teacher.subjects as AssignedSubject[]).filter(
        (subject) => subject.UserSubject?.active !== false
      )

      const resourcesToSeed = activeSubjects.slice(0, MAX_RESOURCES_PER_TEACHER)

      for (const [subjectIndex, subject] of resourcesToSeed.entries()) {
        const resourceType =
          resourceTypeSequence[
            (teacherIndex + subjectIndex) % resourceTypeSequence.length
          ]

        const existingResource = await DigitalDidacticResource.findOne({
          where: {
            userId: teacher.id,
            subjectId: subject.id,
            resourceType,
          },
          transaction,
        })

        if (existingResource) {
          skippedCount++
          continue
        }

        await createResource({
          teacher,
          subject,
          resourceType,
          resourceIndex: subjectIndex,
          transaction,
        })

        createdCount++
      }
    }

    await transaction.commit()

    console.log(colors.green(`RDDs creados: ${createdCount}`))
    console.log(colors.yellow(`RDDs omitidos por duplicado: ${skippedCount}`))

    if (closeConnection) {
      await db.close()
    }
  } catch (error) {
    await transaction.rollback()
    console.error(colors.red('Error generando RDDs de ejemplo:'), error)

    if (closeConnection) {
      await db.close()
      process.exit(1)
    }

    throw error
  }
}

if (require.main === module) {
  seedSampleDigitalResources({ closeConnection: true })
}
