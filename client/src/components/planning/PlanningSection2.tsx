import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function PlanningSection2() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Section Title */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-700">
          2. Relación con otras unidades de aprendizaje y ejes transversales
        </h3>
      </div>

      {/* 2.1 Unidades de aprendizaje con relación directa */}
      <div className="mb-8">
        <div className="mb-4 bg-[#7C2855] px-4 py-2 text-center">
          <h4 className="text-sm font-bold text-white">
            2.1 Unidades de aprendizaje con relación directa
          </h4>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="mb-2 block bg-gray-200 px-3 py-2 text-sm font-semibold text-black">
              2.1.1 Antecedentes
            </Label>
            <Textarea
              rows={2}
              className="border-gray-400"
              placeholder="Ej: Algoritmos y estructura de datos"
            />
          </div>

          <div>
            <Label className="mb-2 block bg-gray-200 px-3 py-2 text-sm font-semibold text-black">
              2.1.2 Laterales
            </Label>
            <Textarea
              rows={2}
              className="border-gray-400"
              placeholder="Ej: Teoría de la computación y Tecnologías para el desarrollo de aplicaciones Web"
            />
          </div>

          <div>
            <Label className="mb-2 block bg-gray-200 px-3 py-2 text-sm font-semibold text-black">
              2.1.3 Subsecuentes
            </Label>
            <Textarea
              rows={2}
              className="border-gray-400"
              placeholder="Ej: Aplicaciones para Comunicaciones en Red"
            />
          </div>
        </div>
      </div>

      {/* 2.2 Descripción de cómo se fomenta cada eje transversal */}
      <div>
        <div className="mb-4 bg-[#7C2855] px-4 py-2 text-center">
          <h4 className="text-sm font-bold text-white">
            2.2 Descripción de cómo se fomenta cada eje transversal
            institucional en la unidad de aprendizaje
          </h4>
        </div>

        <div className="space-y-4">
          {/* 2.2.1 Compromiso social y sustentabilidad */}
          <div className="grid grid-cols-[300px_1fr] gap-4 border border-gray-300">
            <div className="bg-gray-200 px-4 py-3 flex items-center">
              <Label className="text-sm font-semibold text-black">
                2.2.1 Compromiso social y sustentabilidad
              </Label>
            </div>
            <div className="p-3">
              <Textarea
                rows={6}
                className="border-gray-400"
                placeholder="• Uso de información electrónica y trabajo en línea&#10;• Incorporar casos de estudio sobre cómo los sistemas operativos pueden contribuir al compromiso social&#10;• Promover la identidad politécnica a través de los valores, principios, responsabilidad, ética y la honestidad&#10;• Manejo responsable de la electricidad en el aula"
              />
            </div>
          </div>

          {/* 2.2.2 Perspectiva, inclusión y erradicación de la violencia de género */}
          <div className="grid grid-cols-[300px_1fr] gap-4 border border-gray-300">
            <div className="bg-gray-200 px-4 py-3 flex items-center">
              <Label className="text-sm font-semibold text-black">
                2.2.2 Perspectiva, inclusión y erradicación de la violencia de
                género
              </Label>
            </div>
            <div className="p-3">
              <Textarea
                rows={6}
                className="border-gray-400"
                placeholder="• Fomentar la diversidad y el respeto dentro del aula en la participación de cada uno(a) los estudiantes&#10;• Fomento de la cultura de la paz&#10;• Difundir en el aula sobre el protocolo para la prevención, detección, atención y sanción de la violencia de género&#10;• Erradicación del hostigamiento y acoso escolar&#10;• Incorporar actividades educativas que promuevan la conciencia sobre la importancia de la inclusión"
              />
            </div>
          </div>

          {/* 2.2.3 Internacionalización del IPN */}
          <div className="grid grid-cols-[300px_1fr] gap-4 border border-gray-300">
            <div className="bg-gray-200 px-4 py-3 flex items-center">
              <Label className="text-sm font-semibold text-black">
                2.2.3 Internacionalización del IPN
              </Label>
            </div>
            <div className="p-3">
              <Textarea
                rows={5}
                className="border-gray-400"
                placeholder="• Revisión de recursos didácticos en otros idiomas&#10;• Uso de software en sistemas operativos de uso libre&#10;• Estudio de casos en el contexto internacional&#10;• Organizar actividades extracurriculares que promuevan el sentido de pertenencia y orgullo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
