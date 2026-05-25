import {
  getDigitalResource,
  getPublicDigitalResource,
} from '@/api/DigitalResourceAPI'
import { LoadingApp } from '@/components/LoadingApp'
import { Button } from '@/components/ui/button'
import type {
  ActivityValues,
  ContentFormValues,
  DigitalBookResource,
  DigitalResourceType,
} from '@/types'
import { getDigitalResourceTitle } from '@/utils/digitalResource'
import {
  ArrowLeftIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'

const supportedResourceTypes: DigitalResourceType[] = [
  'digital-book',
  'interactive-digital-book',
  'learning-object',
]

const resourceTypeLabels: Record<DigitalResourceType, string> = {
  'digital-book': 'Libro Digital',
  'interactive-digital-book': 'Libro Digital Interactivo',
  'learning-object': 'Objeto de Aprendizaje',
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Sin fecha'

  return new Date(dateString).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatList = (items?: string[] | null) =>
  items?.filter((item) => item.trim().length > 0) || []

const getLicenseYear = (resource: DigitalBookResource) => {
  const referenceDate = resource.credits?.fechaReferencia || resource.updatedAt
  const year = new Date(referenceDate).getFullYear()

  return Number.isFinite(year) ? year : new Date().getFullYear()
}

const getAuthorNames = (resource: DigitalBookResource) => {
  const authors =
    resource.credits?.authors
      .map((author) => author.nombreAutor.trim())
      .filter(Boolean) ?? []

  return authors.length > 0 ? authors : ['Autor no registrado']
}

const bookChapters = [
  { id: 'encuadre', label: 'Encuadre' },
  { id: 'metodologia', label: 'Metodología' },
  { id: 'contenido', label: 'Contenido' },
  { id: 'actividades', label: 'Actividades' },
  { id: 'evaluacion', label: 'Evaluación' },
  { id: 'ayuda', label: 'Ayuda' },
  { id: 'creditos', label: 'Créditos' },
]

function ReaderSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="scroll-mt-8 break-inside-avoid rounded-4xl border border-[#d8c8aa] bg-[#fffdf7] p-7 shadow-[0_24px_80px_rgba(53,38,30,0.10)]"
    >
      <p className="text-xs font-black uppercase tracking-[0.32em] text-[#B38A24]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-3xl font-black text-[#2d241a]">
        {title}
      </h2>
      <div className="mt-5 space-y-5 text-[15px] leading-7 text-[#51463a]">
        {children}
      </div>
    </section>
  )
}

function ProseBlock({
  title,
  children,
}: {
  title: string
  children?: string | null
}) {
  if (!children) return null

  return (
    <div>
      <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[#7C2855]">
        {title}
      </h3>
      <p className="mt-2 whitespace-pre-line font-serif text-[17px] leading-8">
        {children}
      </p>
    </div>
  )
}

function BulletList({
  title,
  items,
}: {
  title: string
  items?: string[] | null
}) {
  const values = formatList(items)
  if (values.length === 0) return null

  return (
    <div>
      <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[#7C2855]">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {values.map((item, index) => (
          <li key={`${title}-${index}`} className="flex gap-3 leading-7">
            <CheckCircleIcon className="mt-1 h-5 w-5 shrink-0 text-[#7C2855]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CreativeCommonsIcon({
  children,
  size = 'sm',
}: {
  children: ReactNode
  size?: 'sm' | 'lg'
}) {
  const sizing = size === 'lg' ? 'h-20 w-20 text-4xl' : 'h-6 w-6 text-xs'

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-[3px] border-[#2f4257] font-black leading-none text-[#2f4257] ${sizing}`}
    >
      {children}
    </span>
  )
}

function CreativeCommonsLicense({
  resource,
}: {
  resource: DigitalBookResource
}) {
  const title = getDigitalResourceTitle(resource)
  const year = getLicenseYear(resource)
  const authors = getAuthorNames(resource)

  return (
    <section className="rounded-4xl border border-[#d8c8aa] bg-white px-6 py-9 text-center shadow-[0_24px_80px_rgba(53,38,30,0.12)] md:px-10">
      <h2 className="text-2xl font-black tracking-tight text-[#2f4257] md:text-3xl">
        Licencia Creative Commons
      </h2>

      <div className="mt-8 flex justify-center">
        <CreativeCommonsIcon size="lg">cc</CreativeCommonsIcon>
      </div>

      <p className="mx-auto mt-7 max-w-5xl text-base leading-8 text-[#557086]">
        <span className="text-[#2b8aa4] underline decoration-[#2b8aa4]/45 underline-offset-4">
          {title}
        </span>{' '}
        © {year} by{' '}
        {authors.map((author, index) => (
          <span key={author}>
            <span className="text-[#2b8aa4] underline decoration-[#2b8aa4]/45 underline-offset-4">
              {author}
            </span>
            {index < authors.length - 1 ? ', ' : ' '}
          </span>
        ))}
        is licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by-nc/4.0/"
          target="_blank"
          rel="noreferrer"
          className="text-[#2b8aa4] underline decoration-[#2b8aa4]/45 underline-offset-4"
        >
          Creative Commons Attribution-NonCommercial 4.0 International
        </a>
        <span className="ml-1 inline-flex translate-y-1 items-center gap-1">
          <CreativeCommonsIcon>cc</CreativeCommonsIcon>
          <CreativeCommonsIcon>BY</CreativeCommonsIcon>
          <CreativeCommonsIcon>NC</CreativeCommonsIcon>
        </span>
      </p>
    </section>
  )
}

function ContentUnit({
  unit,
}: {
  unit: ContentFormValues['unidades'][number]
}) {
  return (
    <article className="rounded-[1.75rem] border border-[#e5d7bd] bg-[#f7f1e4] p-5">
      <h3 className="font-serif text-2xl font-black text-[#7C2855]">
        {unit.nombreUnidad}
      </h3>
      <p className="mt-2 font-serif text-[17px] leading-8 text-[#51463a]">
        {unit.objetivoUnidad}
      </p>

      <div className="mt-5 space-y-4">
        {unit.temas.map((topic) => (
          <div
            key={topic.id}
            className="rounded-2xl border border-[#eadfc9] bg-[#fffdf7] p-5"
          >
            <h4 className="font-serif text-xl font-bold text-[#2d241a]">
              {topic.tituloTema}
            </h4>
            <div className="mt-3 grid gap-4 lg:grid-cols-3">
              <ProseBlock title="Inicio" children={topic.contenidoInicio} />
              <ProseBlock
                title="Desarrollo"
                children={topic.contenidoDesarrollo}
              />
              <ProseBlock
                title="Conclusión"
                children={topic.contenidoConclusion}
              />
            </div>

            {topic.subtemas.length > 0 && (
              <div className="mt-5 space-y-3">
                {topic.subtemas.map((subtopic) => (
                  <div
                    key={subtopic.id}
                    className="rounded-2xl border border-[#eadfc9] bg-[#fbf6ea] p-4"
                  >
                    <h5 className="font-bold text-stone-900">
                      {subtopic.tituloSubtema}
                    </h5>
                    <div className="mt-3 grid gap-4 lg:grid-cols-3">
                      <ProseBlock
                        title="Inicio"
                        children={subtopic.contenidoInicio}
                      />
                      <ProseBlock
                        title="Desarrollo"
                        children={subtopic.contenidoDesarrollo}
                      />
                      <ProseBlock
                        title="Conclusión"
                        children={subtopic.contenidoConclusion}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  )
}

function InteractiveQuiz({
  activity,
  activityIndex,
}: {
  activity: ActivityValues
  activityIndex: number
}) {
  const questions =
    activity.preguntas?.filter((question) => question.texto.trim()) ?? []
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (questions.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-[#eadfc9] bg-[#fffdf7] p-4">
        <p className="text-sm font-bold text-stone-500">
          Actividad automatizada
        </p>
        <p className="mt-1 text-sm">
          {activity.numeroIntentos} intentos · {activity.puntajeProgramado}{' '}
          puntos
        </p>
      </div>
    )
  }

  const answeredCount = questions.filter((_, index) =>
    answers[index]?.trim()
  ).length
  const canSubmit = answeredCount === questions.length

  return (
    <div className="mt-5 overflow-hidden rounded-3xl border border-[#7C2855]/20 bg-[#fffdf7] shadow-inner">
      <div className="bg-linear-to-r from-[#7C2855] to-[#5a1d3f] px-5 py-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f7df91]">
              Cuestionario interactivo
            </p>
            <h4 className="mt-1 font-serif text-2xl font-black">
              Actividad {activityIndex + 1}
            </h4>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold">
            {questions.length} preguntas · {activity.puntajeProgramado} puntos
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-white/80">
          Responde las preguntas en pantalla. Tus respuestas no se guardan en
          esta versión.
        </p>
      </div>

      <div className="space-y-4 p-5">
        {questions.map((question, questionIndex) => (
          <label
            key={`${question.texto}-${questionIndex}`}
            className="block rounded-2xl border border-[#eadfc9] bg-[#f7f1e4] p-4"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#7C2855]">
              Pregunta {questionIndex + 1}
            </span>
            <span className="mt-2 block font-serif text-lg font-bold leading-7 text-[#2d241a]">
              {question.texto}
            </span>
            <textarea
              value={answers[questionIndex] ?? ''}
              onChange={(event) => {
                setAnswers((current) => ({
                  ...current,
                  [questionIndex]: event.target.value,
                }))
                setIsSubmitted(false)
              }}
              rows={3}
              placeholder="Escribe tu respuesta..."
              className="mt-3 w-full resize-none rounded-2xl border border-[#d8c8aa] bg-[#fffdf7] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#7C2855] focus:ring-2 focus:ring-[#7C2855]/15"
            />
          </label>
        ))}

        <div className="flex flex-col gap-3 border-t border-[#eadfc9] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-[#51463a]">
            {answeredCount} de {questions.length} respuestas completadas
          </p>
          <Button
            type="button"
            onClick={() => setIsSubmitted(true)}
            disabled={!canSubmit}
            className="rounded-xl bg-[#7C2855] text-white hover:bg-[#5a1d3f]"
          >
            Enviar respuestas
          </Button>
        </div>

        {isSubmitted && (
          <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/12 p-4">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#7C2855]">
              Retroalimentación
            </p>
            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#51463a]">
              {activity.mecanismoRetroalimentacion ||
                'Tus respuestas fueron registradas localmente para esta consulta. Revisa tus argumentos y compáralos con el contenido del recurso.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function ReaderCover({ resource }: { resource: DigitalBookResource }) {
  const isInteractive = resource.resourceType === 'interactive-digital-book'
  const title = getDigitalResourceTitle(resource)

  return (
    <header className="relative overflow-hidden rounded-[3rem] bg-[#241a20] text-white shadow-[0_35px_120px_rgba(42,24,31,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(212,175,55,0.36),transparent_25%),radial-gradient(circle_at_88%_12%,rgba(255,255,255,0.14),transparent_20%),linear-gradient(135deg,#21171f,#7C2855_58%,#2d1e23)]" />
      <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px)] bg-size-[44px_44px]" />
      <div className="absolute -right-14 top-16 hidden h-72 w-52 rotate-6 rounded-2xl border border-[#D4AF37]/40 bg-[#f5ead1]/10 shadow-2xl md:block" />
      <div className="absolute right-20 top-28 hidden h-72 w-52 -rotate-3 rounded-2xl border border-white/20 bg-white/8 shadow-2xl md:block" />
      <div className="relative grid gap-10 px-8 py-14 md:grid-cols-[1.15fr_0.85fr] md:px-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-black/18 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#f7df91]">
            {isInteractive && <SparklesIcon className="h-4 w-4" />}
            {resourceTypeLabels[resource.resourceType]}
          </span>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl leading-9 text-white/82">
            {resource.identification?.preciseTopic ||
              resource.learningObject?.objetivoAprendizaje ||
              'Material diseñado para apoyar el proceso de aprendizaje.'}
          </p>
          {isInteractive && resource.identification?.interactiveDescription && (
            <div className="mt-7 rounded-3xl border border-[#D4AF37]/25 bg-black/18 p-5 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f7df91]">
                Elementos interactivos
              </p>
              <p className="mt-2 leading-7 text-white/85">
                {resource.identification.interactiveDescription}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-end rounded-4xl border border-[#D4AF37]/30 bg-[#fff7dd]/10 p-6 backdrop-blur-md">
          <BookOpenIcon className="h-14 w-14 text-[#D4AF37]" />
          <div className="mt-8 space-y-4 text-sm">
            <div>
              <p className="text-white/50">Unidad de aprendizaje</p>
              <p className="mt-1 font-serif text-lg font-bold">
                {resource.subject?.name || 'N/D'}
              </p>
            </div>
            <div>
              <p className="text-white/50">Código</p>
              <p className="mt-1 font-bold">
                {resource.subject?.code || 'N/D'}
              </p>
            </div>
            <div>
              <p className="text-white/50">Fecha de realización</p>
              <p className="mt-1 font-bold">
                {formatDate(
                  resource.credits?.fechaReferencia || resource.updatedAt
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function DigitalBookReader({ resource }: { resource: DigitalBookResource }) {
  const isInteractive = resource.resourceType === 'interactive-digital-book'

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <ReaderCover resource={resource} />

      <div className="grid gap-8 xl:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="hidden xl:block">
          <div className="sticky top-8 rounded-4xl border border-[#d8c8aa] bg-[#fffdf7]/85 p-4 shadow-[0_20px_70px_rgba(53,38,30,0.10)] backdrop-blur">
            <p className="px-3 text-xs font-black uppercase tracking-[0.24em] text-[#B38A24]">
              Índice
            </p>
            <nav className="mt-4 space-y-1">
              {bookChapters.map((chapter, index) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  className="group flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-bold text-[#51463a] transition hover:bg-[#7C2855]/8 hover:text-[#7C2855]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1e5cc] text-xs text-[#7C2855] group-hover:bg-[#7C2855] group-hover:text-white">
                    {index + 1}
                  </span>
                  {chapter.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="space-y-8">
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <ReaderSection
              id="encuadre"
              eyebrow="Capítulo 1"
              title="Encuadre pedagógico"
            >
              <ProseBlock
                title="Bienvenida al RDD"
                children={resource.pedagogical?.welcome}
              />
              <BulletList
                title="Competencias generales"
                items={resource.pedagogical?.generalCompetencies}
              />
              <BulletList
                title="Competencias específicas"
                items={resource.pedagogical?.specificCompetencies}
              />
              <ProseBlock
                title="Diagnóstico"
                children={resource.pedagogical?.diagnostic}
              />
            </ReaderSection>

            <ReaderSection
              id="metodologia"
              eyebrow="Capítulo 2"
              title="Metodología de trabajo"
            >
              <ProseBlock
                title="Utilización del RDD"
                children={resource.methodology?.usage}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <ProseBlock
                  title="Periodo total"
                  children={resource.methodology?.totalPeriod}
                />
                <ProseBlock
                  title="Horas semanales"
                  children={resource.methodology?.weeklyHours}
                />
              </div>
              <ProseBlock
                title="Método de trabajo del asesor"
                children={resource.methodology?.advisorWorkMethod}
              />
              <BulletList
                title="Estrategias"
                items={resource.methodology?.strategies}
              />
              <ProseBlock
                title="Competencias"
                children={resource.methodology?.competencies}
              />
            </ReaderSection>
          </div>

          <ReaderSection
            id="contenido"
            eyebrow="Capítulo 3"
            title="Contenido del libro"
          >
            {resource.content?.unidades.length ? (
              <div className="space-y-5">
                {resource.content.unidades.map((unit) => (
                  <ContentUnit key={unit.id} unit={unit} />
                ))}
              </div>
            ) : (
              <p>No hay contenido registrado.</p>
            )}
          </ReaderSection>

          <ReaderSection
            id="actividades"
            eyebrow="Capítulo 4"
            title="Actividades de aprendizaje"
          >
            <div className="grid gap-5 lg:grid-cols-2">
              {resource.learningActivities?.activities.map(
                (activity, index) => (
                  <article
                    key={`${activity.proposito}-${index}`}
                    className="rounded-3xl border border-[#e5d7bd] bg-[#f7f1e4] p-5"
                  >
                    <span className="rounded-full bg-[#7C2855]/10 px-3 py-1 text-xs font-black text-[#7C2855]">
                      Actividad {index + 1} · {activity.porcentaje}%
                    </span>
                    <ProseBlock
                      title="Propósito"
                      children={activity.proposito}
                    />
                    <ProseBlock
                      title="Instrucciones"
                      children={activity.instrucciones}
                    />
                    <ProseBlock
                      title="Evidencia esperada"
                      children={activity.evidenciaEsperada}
                    />
                    {activity.esAutomatizada &&
                      (isInteractive ? (
                        <InteractiveQuiz
                          activity={activity}
                          activityIndex={index}
                        />
                      ) : (
                        <div className="mt-4 rounded-2xl border border-[#eadfc9] bg-[#fffdf7] p-4">
                          <p className="text-sm font-bold text-stone-500">
                            Actividad automatizada
                          </p>
                          <p className="mt-1 text-sm">
                            {activity.numeroIntentos} intentos ·{' '}
                            {activity.puntajeProgramado} puntos
                          </p>
                        </div>
                      ))}
                  </article>
                )
              )}
            </div>
          </ReaderSection>

          <div className="grid gap-8 xl:grid-cols-2">
            <ReaderSection
              id="evaluacion"
              eyebrow="Capítulo 5"
              title="Evaluación"
            >
              <ProseBlock
                title="Evaluación final"
                children={resource.evaluation?.evaluacionFinal}
              />
              <ProseBlock
                title="Autoevaluación"
                children={resource.evaluation?.autoevaluacion}
              />
              <ProseBlock
                title="Momentos de evaluación"
                children={resource.evaluation?.momentosEvaluacion}
              />
            </ReaderSection>

            <ReaderSection
              id="ayuda"
              eyebrow="Capítulo 6"
              title="Ayuda y referencias"
            >
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-stone-500">
                  Recursos de apoyo
                </h3>
                <div className="mt-3 space-y-3">
                  {resource.help?.resources.map((support, index) => (
                    <a
                      key={`${support.tituloRecurso}-${index}`}
                      href={support.urlRecurso}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl border border-[#e5d7bd] bg-[#f7f1e4] p-4 font-semibold text-[#7C2855] transition hover:border-[#D4AF37]"
                    >
                      {support.tituloRecurso}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-stone-500">
                  Referencias
                </h3>
                <ul className="mt-3 space-y-2">
                  {resource.help?.references.map((reference, index) => (
                    <li
                      key={`${reference.referenciaAPA}-${index}`}
                      className="leading-7"
                    >
                      {reference.referenciaAPA}
                    </li>
                  ))}
                </ul>
              </div>
            </ReaderSection>
          </div>

          <ReaderSection id="creditos" eyebrow="Cierre" title="Créditos">
            <div className="grid gap-4 md:grid-cols-2">
              {resource.credits?.authors.map((author, index) => (
                <article
                  key={`${author.nombreAutor}-${index}`}
                  className="rounded-2xl border border-[#eadfc9] bg-[#f7f1e4] p-5"
                >
                  <h3 className="font-black text-stone-900">
                    {author.nombreAutor}
                  </h3>
                  <p className="mt-2 leading-7">{author.semblanzaAutor}</p>
                </article>
              ))}
            </div>
          </ReaderSection>
          <CreativeCommonsLicense resource={resource} />
        </div>
      </div>
    </div>
  )
}

function LearningObjectReader({ resource }: { resource: DigitalBookResource }) {
  const object = resource.learningObject

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <ReaderCover resource={resource} />
      <ReaderSection
        eyebrow="Objeto de aprendizaje"
        title={object?.precisionTema || 'Objeto'}
      >
        <ProseBlock
          title="Objetivo de aprendizaje"
          children={object?.objetivoAprendizaje}
        />
        <ProseBlock
          title="Competencia específica"
          children={object?.competenciaEspecifica}
        />
        <ProseBlock title="Microcontenido" children={object?.microcontenido} />
        <ProseBlock
          title="Ejemplo aplicado"
          children={object?.ejemploAplicado}
        />
        <ProseBlock
          title="Actividad focalizada"
          children={object?.actividadFocalizada}
        />
        <ProseBlock title="Evidencia" children={object?.evidencia} />
        <ProseBlock
          title="Criterio de logro"
          children={object?.criterioLogro}
        />
      </ReaderSection>
      <CreativeCommonsLicense resource={resource} />
    </div>
  )
}

export default function DigitalResourceReaderView() {
  const { publicSlug, subjectId, resourceType } = useParams()
  const isPublicReader = Boolean(publicSlug)
  const parsedSubjectId = Number(subjectId)
  const selectedResourceType = supportedResourceTypes.includes(
    resourceType as DigitalResourceType
  )
    ? (resourceType as DigitalResourceType)
    : null

  const {
    data: resource,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      'digital-resource-reader',
      publicSlug,
      parsedSubjectId,
      selectedResourceType,
    ],
    queryFn: () => {
      if (publicSlug) return getPublicDigitalResource(publicSlug)

      return getDigitalResource({
        subjectId: parsedSubjectId,
        resourceType: selectedResourceType as DigitalResourceType,
      })
    },
    enabled: isPublicReader
      ? Boolean(publicSlug)
      : Number.isFinite(parsedSubjectId) &&
        parsedSubjectId > 0 &&
        Boolean(selectedResourceType),
    retry: false,
    staleTime: 0,
  })

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingApp />
      </div>
    )
  }

  if ((!isPublicReader && !selectedResourceType) || isError || !resource) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-xl">
        <ClipboardDocumentListIcon className="mx-auto h-14 w-14 text-stone-300" />
        <h1 className="mt-4 text-2xl font-black text-stone-900">
          No fue posible cargar el RDD
        </h1>
        <p className="mt-2 text-stone-600">
          {error instanceof Error
            ? error.message
            : 'El recurso no existe o no está disponible para consulta.'}
        </p>
        <Button asChild className="mt-6 rounded-xl bg-[#7C2855]">
          <Link to={isPublicReader ? '/' : '/my-resources'}>
            {isPublicReader ? 'Ir al inicio' : 'Volver a Recursos'}
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="min-h-[calc(100vh-2rem)] rounded-4xl bg-[#efe5d2] px-4 py-8 shadow-inner bg-[radial-gradient(circle_at_12%_10%,rgba(124,40,85,0.10),transparent_26%),radial-gradient(circle_at_88%_0%,rgba(212,175,55,0.22),transparent_24%),linear-gradient(90deg,rgba(60,42,28,0.035)_1px,transparent_1px)] bg-size-[auto,auto,28px_28px] md:min-h-[calc(100vh-3rem)] md:rounded-[3rem]">
        <div className="mx-auto mb-6 flex max-w-7xl flex-wrap items-center justify-between gap-3">
          {!isPublicReader && (
            <>
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-[#d8c8aa] bg-[#fffdf7]"
              >
                <Link to="/my-resources">
                  <ArrowLeftIcon className="h-4 w-4" />
                  Volver a Recursos
                </Link>
              </Button>
              <Button asChild className="rounded-xl bg-[#7C2855] text-white">
                <Link
                  to={`/resources/create/${resource.subjectId}/${resource.resourceType}`}
                >
                  Editar RDD
                </Link>
              </Button>
            </>
          )}
          {isPublicReader && (
            <div className="rounded-full border border-[#d8c8aa] bg-[#fffdf7]/80 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#7C2855] shadow-sm backdrop-blur">
              Publicación abierta para consulta
            </div>
          )}
        </div>

        {resource.resourceType === 'learning-object' ? (
          <LearningObjectReader resource={resource} />
        ) : (
          <DigitalBookReader resource={resource} />
        )}
      </div>
    </div>
  )
}
