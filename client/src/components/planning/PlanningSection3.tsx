import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function PlanningSection3() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Section Title */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-700">
          3. Organización didáctica
        </h3>
      </div>

      {/* 3.1 - 3.4 Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white">
            3.1 Unidad de aprendizaje
          </Label>
          <Input
            className="border-gray-400"
            placeholder="Ej: Sistemas Operativos"
          />
        </div>
        <div>
          <Label className="mb-2 block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white">
            3.2 Propósito u objetivo general de la unidad de aprendizaje
          </Label>
          <Textarea
            rows={3}
            className="border-gray-400"
            placeholder="Propone soluciones a las necesidades de sistemas computacionales actuales..."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white">
            3.3 Estrategia de aprendizaje
          </Label>
          <Textarea
            rows={2}
            className="border-gray-400"
            placeholder="- Aprendizaje basado en problemas"
          />
        </div>
        <div>
          <Label className="mb-2 block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white">
            3.4 Métodos de enseñanza
          </Label>
          <Textarea
            rows={2}
            className="border-gray-400"
            placeholder="- Inductivo&#10;- Deductivo"
          />
        </div>
      </div>

      {/* 3.5 Unidad temática */}
      <div>
        <Label className="mb-2 block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white">
          3.5 Unidad temática I
        </Label>
        <Input
          className="border-gray-400"
          placeholder="Ej: Estructura de un sistema operativo"
        />
      </div>

      <div>
        <Label className="mb-2 block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white">
          3.6 Unidad de competencia u objetivo
        </Label>
        <Textarea
          rows={3}
          className="border-gray-400"
          placeholder="Identifica los sistemas operativos actuales y emergentes con base en su estructura, modos de operación y llamadas a sistema."
        />
      </div>

      {/* Nota: Las tablas complejas 3.7-3.18 se pueden agregar aquí */}
      <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center">
        <p className="text-gray-600">
          Sección 3.7-3.18: Tablas de organización didáctica
          <br />
          <span className="text-sm text-gray-500">
            (Implementar según necesidad)
          </span>
        </p>
      </div>

      <div className="mt-6">
        <Label className="mb-2 block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white">
          3.19 Precisiones de la unidad temática
        </Label>
        <Textarea
          rows={4}
          className="border-gray-400"
          placeholder="Ingrese las precisiones de la unidad temática..."
        />
      </div>
    </div>
  )
}
