import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function PlanningSection2() {
  return (
    <div className=" animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Section Title */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-700">
          2. Relación con otras unidades de aprendizaje y ejes transversales
        </h3>
      </div>

      {/* 2.1 Unidades de aprendizaje con relación directa */}
      <div className="bg-[#7C2855] px-4 py-2 text-center border border-dashed">
        <h4 className="text-sm font-bold text-white">
          2.1 Unidades de aprendizaje con relación directa
        </h4>
      </div>

      <div className="grid grid-cols-[auto_1fr] border border-dashed border-gray-400">
        <Label className="bg-gray-400 px-3 py-2 text-sm border-x border-b border-dashed border-gray-600">
          2.1.1 Antecedentes
        </Label>
        <Input className="rounded-none border-b border-dashed" />

        <Label className="bg-gray-400 px-3 py-2 text-sm border-x border-b border-dashed border-gray-600">
          2.1.2 Laterales
        </Label>
        <Input className="rounded-none border-b border-dashed" />

        <Label className="bg-gray-400 px-3 py-2 text-sm border-x border-dashed border-gray-600">
          2.1.3 Subsecuentes
        </Label>
        <Input className="rounded-none border-none" />
      </div>

      {/* 2.2 Descripción de cómo se fomenta cada eje transversal */}
      <div>
        <div className="mt-8 bg-[#7C2855] px-4 py-2 text-center border border-dashed">
          <h4 className="text-sm font-bold text-white">
            2.2 Descripción de cómo se fomenta cada eje transversal
            institucional en la unidad de aprendizaje
          </h4>
        </div>

        <div>
          {/* 2.2.1 Compromiso social y sustentabilidad */}
          <div className="grid grid-cols-[300px_1fr] border border-dashed border-gray-600">
            <div className="bg-gray-400 px-4 flex items-center h-30 border-r border-gray-600 border-dashed">
              <Label className="text-sm">
                2.2.1 Compromiso social y sustentabilidad
              </Label>
            </div>
            <Textarea rows={6} className="rounded-none" />
          </div>

          {/* 2.2.2 Perspectiva, inclusión y erradicación de la violencia de género */}
          <div className="grid grid-cols-[300px_1fr] border-dashed border-x border-b border-gray-600">
            <div className="bg-gray-400 px-4 flex items-center h-30 border-r border-gray-600 border-dashed">
              <Label className="text-sm">
                2.2.2 Perspectiva, inclusión y erradicación de la violencia de
                género
              </Label>
            </div>
            <Textarea rows={6} className="rounded-none" />
          </div>

          {/* 2.2.3 Internacionalización del IPN */}
          <div className="grid grid-cols-[300px_1fr] border-dashed border-x border-b border-gray-600">
            <div className="bg-gray-400 px-4 py-3 flex items-center h-30 border-r border-gray-600 border-dashed">
              <Label className="text-sm">
                2.2.3 Internacionalización del IPN
              </Label>
            </div>
            <Textarea rows={6} className="rounded-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
