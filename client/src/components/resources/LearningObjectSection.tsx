import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { LearningObjectFormValues } from '@/types'
import {
  BoltIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/solid'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

type LearningObjectSectionProps = {
  register: UseFormRegister<LearningObjectFormValues>
  errors: FieldErrors<LearningObjectFormValues>
}

function FieldLabel({
  children,
  required = true,
}: {
  children: string
  required?: boolean
}) {
  return (
    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#7C2855]">
      {children}
      {required && <span className="ml-0.5 text-red-400">*</span>}
    </label>
  )
}

interface SectionHeaderProps {
  icon: typeof BoltIcon
  iconVariant: 'guinda' | 'dorado'
  title: string
  subtitle: string
}

function SectionHeader({
  icon: Icon,
  iconVariant,
  title,
  subtitle,
}: SectionHeaderProps) {
  const isGuinda = iconVariant === 'guinda'

  return (
    <div className="mb-4 flex items-center gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          isGuinda
            ? 'bg-linear-to-br from-[#7C2855] to-[#5a1d3f]'
            : 'bg-linear-to-br from-[#D4AF37] to-[#e8c96f]'
        }`}
      >
        <Icon className={`h-5 w-5 ${isGuinda ? 'text-white' : 'text-[#7C2855]'}`} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  )
}

function Divider() {
  return (
    <div className="mt-8 flex items-center gap-4">
      <div className="h-px flex-1 bg-gray-200" />
      <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  )
}

export function LearningObjectSection({
  register,
  errors,
}: LearningObjectSectionProps) {
  return (
    <div className="space-y-8">
      <section>
        <SectionHeader
          icon={BoltIcon}
          iconVariant="dorado"
          title="Competencia específica del OA"
          subtitle="Centra el Objeto de Aprendizaje en una competencia concreta, observable y reutilizable."
        />
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
          <div>
            <FieldLabel>Competencia específica</FieldLabel>
            <Textarea
              rows={3}
              placeholder="Competencia concreta que atiende el OA..."
              className={`bg-white text-sm resize-none ${
                errors.competenciaEspecifica
                  ? 'border-red-400 focus-visible:border-red-400'
                  : 'border-gray-200 focus-visible:border-[#7C2855] focus-visible:ring-[#7C2855]/20'
              }`}
              {...register('competenciaEspecifica', {
                required: 'Define la competencia específica.',
              })}
            />
            {errors.competenciaEspecifica && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.competenciaEspecifica.message}
              </p>
            )}
          </div>
        </div>
      </section>

      <Divider />

      <section>
        <SectionHeader
          icon={PuzzlePieceIcon}
          iconVariant="guinda"
          title="Microcontenido aplicado"
          subtitle="Mantén el contenido breve, sustancial y altamente contextualizado."
        />
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 space-y-5">
          <div>
            <FieldLabel>Contexto de aplicación</FieldLabel>
            <Textarea
              rows={3}
              placeholder="Describe la situación o contexto profesional/académico donde se aplica..."
              className={`bg-white text-sm resize-none ${
                errors.contextoAplicacion
                  ? 'border-red-400 focus-visible:border-red-400'
                  : 'border-gray-200 focus-visible:border-[#7C2855] focus-visible:ring-[#7C2855]/20'
              }`}
              {...register('contextoAplicacion', {
                required: 'Contextualiza el aprendizaje.',
              })}
            />
            {errors.contextoAplicacion && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.contextoAplicacion.message}
              </p>
            )}
          </div>

          <div className="h-px bg-gray-200" />

          <div>
            <FieldLabel>Contenido breve, concreto y sustancial</FieldLabel>
            <Textarea
              rows={4}
              placeholder="Explica únicamente lo necesario para resolver la necesidad de aprendizaje..."
              className={`bg-white text-sm resize-none ${
                errors.microcontenido
                  ? 'border-red-400 focus-visible:border-red-400'
                  : 'border-gray-200 focus-visible:border-[#7C2855] focus-visible:ring-[#7C2855]/20'
              }`}
              {...register('microcontenido', {
                required: 'Agrega el microcontenido del OA.',
              })}
            />
            {errors.microcontenido && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.microcontenido.message}
              </p>
            )}
          </div>

          <div className="h-px bg-gray-200" />

          <div>
            <FieldLabel>Ejemplo aplicado</FieldLabel>
            <Textarea
              rows={3}
              placeholder="Incluye un ejemplo directamente relacionado con el objetivo..."
              className={`bg-white text-sm resize-none ${
                errors.ejemploAplicado
                  ? 'border-red-400 focus-visible:border-red-400'
                  : 'border-gray-200 focus-visible:border-[#7C2855] focus-visible:ring-[#7C2855]/20'
              }`}
              {...register('ejemploAplicado', {
                required: 'Incluye un ejemplo aplicado.',
              })}
            />
            {errors.ejemploAplicado && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.ejemploAplicado.message}
              </p>
            )}
          </div>
        </div>
      </section>

      <Divider />

      <section>
        <SectionHeader
          icon={BoltIcon}
          iconVariant="dorado"
          title="Actividad focalizada y evidencia"
          subtitle="La actividad debe estar alineada directamente al objetivo puntual."
        />
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel>Actividad alineada al objetivo</FieldLabel>
            <Textarea
              rows={3}
              placeholder="Indica qué realizará el estudiante para demostrar el logro..."
              className={`bg-white text-sm resize-none ${
                errors.actividadFocalizada
                  ? 'border-red-400 focus-visible:border-red-400'
                  : 'border-gray-200 focus-visible:border-[#7C2855] focus-visible:ring-[#7C2855]/20'
              }`}
              {...register('actividadFocalizada', {
                required: 'Define la actividad focalizada.',
              })}
            />
          </div>

          <div>
            <FieldLabel>Evidencia esperada</FieldLabel>
            <Textarea
              rows={3}
              placeholder="Producto breve o desempeño observable..."
              className={`bg-white text-sm resize-none ${
                errors.evidencia
                  ? 'border-red-400 focus-visible:border-red-400'
                  : 'border-gray-200 focus-visible:border-[#7C2855] focus-visible:ring-[#7C2855]/20'
              }`}
              {...register('evidencia', {
                required: 'Define la evidencia esperada.',
              })}
            />
          </div>

          <div>
            <FieldLabel>Criterio de logro</FieldLabel>
            <Input
              placeholder="Ej. Resuelve correctamente 3 de 4 casos contextualizados"
              className={`bg-white h-10 text-sm ${
                errors.criterioLogro
                  ? 'border-red-400 focus-visible:border-red-400'
                  : 'border-gray-200 focus-visible:border-[#7C2855] focus-visible:ring-[#7C2855]/20'
              }`}
              {...register('criterioLogro', {
                required: 'Define el criterio de logro.',
              })}
            />
          </div>

          <div>
            <FieldLabel>Tiempo estimado</FieldLabel>
            <Input
              placeholder="Ej. 15 a 20 minutos"
              className={`bg-white h-10 text-sm ${
                errors.tiempoEstimado
                  ? 'border-red-400 focus-visible:border-red-400'
                  : 'border-gray-200 focus-visible:border-[#7C2855] focus-visible:ring-[#7C2855]/20'
              }`}
              {...register('tiempoEstimado', {
                required: 'Indica el tiempo estimado.',
              })}
            />
          </div>

          <div className="md:col-span-2">
            <FieldLabel>Reutilización modular</FieldLabel>
            <Textarea
              rows={2}
              placeholder="Explica cómo puede reutilizarse este OA en otros cursos, unidades o contextos..."
              className={`bg-white text-sm resize-none ${
                errors.reutilizacion
                  ? 'border-red-400 focus-visible:border-red-400'
                  : 'border-gray-200 focus-visible:border-[#7C2855] focus-visible:ring-[#7C2855]/20'
              }`}
              {...register('reutilizacion', {
                required: 'Describe la reutilización del OA.',
              })}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
