import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Controller } from 'react-hook-form'
import type { Section1ControlProps } from './types'

type UnitTypeCreditsRowProps = Section1ControlProps & {
  academyName: string
}

export function UnitTypeCreditsRow({
  register,
  control,
}: UnitTypeCreditsRowProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* 1.7 Tipo de unidad */}
      <table className="w-full border-gray-400">
        <tbody>
          <tr>
            <td
              colSpan={4}
              className="bg-[#7C2855] h-8 text-sm font-semibold text-white border border-dashed border-gray-400 text-center"
            >
              1.7 Tipo de unidad de aprendizaje
            </td>
          </tr>
          <Controller
            name="unitType"
            control={control}
            render={({ field }) => {
              const normalize = (s: string) =>
                s.toLowerCase().replace(/[-\s]/g, '')

              const hasType = (target: string) =>
                (field.value || []).some(
                  (v) => normalize(v) === normalize(target)
                )

              const toggleValue = (value: string) => {
                const currentValues = field.value || []
                const matchIndex = currentValues.findIndex(
                  (v) => normalize(v) === normalize(value)
                )
                if (matchIndex >= 0) {
                  field.onChange(
                    currentValues.filter((_, i) => i !== matchIndex)
                  )
                } else {
                  field.onChange([...currentValues, value])
                }
              }
              return (
                <>
                  <tr>
                    <td className="border border-dashed border-gray-400 px-3 text-sm text-center">
                      Teórica
                    </td>
                    <td className="border border-dashed border-gray-400 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={hasType('Teórica')}
                        onChange={() => toggleValue('Teórica')}
                        disabled
                        className="w-4 h-4 cursor-not-allowed"
                      />
                    </td>
                    <td className="border border-dashed border-gray-400 px-3 text-sm text-center">
                      Obligatoria
                    </td>
                    <td className="border border-dashed border-gray-400 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={hasType('Obligatoria')}
                        onChange={() => toggleValue('Obligatoria')}
                        disabled
                        className="w-4 h-4 cursor-not-allowed"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-dashed border-gray-400 px-3 text-sm text-center">
                      Práctica
                    </td>
                    <td className="border border-dashed border-gray-400 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={hasType('Práctica')}
                        onChange={() => toggleValue('Práctica')}
                        disabled
                        className="w-4 h-4 cursor-not-allowed"
                      />
                    </td>
                    <td className="border border-dashed border-gray-400 px-3 text-sm text-center">
                      Optativa
                    </td>
                    <td className="border border-dashed border-gray-400 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={hasType('Optativa')}
                        onChange={() => toggleValue('Optativa')}
                        disabled
                        className="w-4 h-4 cursor-not-allowed"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-dashed border-gray-400 px-3 text-sm text-center">
                      Teórica - práctica
                    </td>
                    <td className="border border-dashed border-gray-400 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={hasType('Teórica-Práctica')}
                        onChange={() => toggleValue('Teórica-Práctica')}
                        disabled
                        className="w-4 h-4 cursor-not-allowed"
                      />
                    </td>
                    <td className="border border-dashed border-gray-400 px-3 text-sm text-center">
                      Tópicos selectos
                    </td>
                    <td className="border border-dashed border-gray-400 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={hasType('Tópicos Selectos')}
                        onChange={() => toggleValue('Tópicos Selectos')}
                        disabled
                        className="w-4 h-4 cursor-not-allowed"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-dashed border-gray-400 px-3 text-sm text-center">
                      Clínica
                    </td>
                    <td className="border border-dashed border-gray-400 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={hasType('Clínica')}
                        onChange={() => toggleValue('Clínica')}
                        disabled
                        className="w-4 h-4 cursor-not-allowed"
                      />
                    </td>
                    <td className="border border-dashed border-gray-400 px-3 text-sm text-center">
                      Otro
                    </td>
                    <td className="border border-dashed border-gray-400 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={hasType('Otro')}
                        onChange={() => toggleValue('Otro')}
                        disabled
                        className="w-4 h-4 cursor-not-allowed"
                      />
                    </td>
                  </tr>
                </>
              )
            }}
          />
        </tbody>
      </table>

      {/* 1.8 Créditos + 1.9 Academia */}
      <div className="grid grid-cols-1 gap-0 w-5/6">
        <div className="flex mb-10">
          <div className="bg-[#7C2855] text-sm font-semibold text-white border border-dashed border-gray-400 w-48 h-14 flex items-center justify-center border-r-0">
            1.8 Créditos
          </div>
          <table className="flex-1 border border-dashed border-gray-400 border-l-0">
            <tbody>
              <tr>
                <td className="bg-gray-500 px-3 text-sm font-semibold text-white border-r border-dashed border-gray-400 w-10 h-5">
                  <Label htmlFor="creditsTepic" className="block text-center">
                    Tepic
                  </Label>
                </td>
                <td className="bg-gray-500 px-3 text-sm font-semibold text-white w-10 h-5">
                  <Label htmlFor="creditsSatca" className="block text-center">
                    SATCA
                  </Label>
                </td>
              </tr>
              <tr>
                <td className="border-r border-t border-dashed border-gray-400 px-3 text-center">
                  <Input
                    id="creditsTepic"
                    type="number"
                    readOnly
                    className="w-full h-full border-none rounded-none text-center bg-gray-100 cursor-not-allowed"
                    {...register('creditsTepic', {
                      required: 'Tepic es requerido',
                    })}
                  />
                </td>
                <td className="border-t border-dashed border-gray-400 px-3 text-center">
                  <Input
                    id="creditsSatca"
                    type="number"
                    className="w-full h-full border-none rounded-none text-center bg-gray-100"
                    {...register('creditsSatca', {
                      required: 'SATCA es requerido',
                    })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex">
          <div className="bg-[#7C2855] py-2 text-sm font-semibold text-white border border-dashed border-gray-400 w-48 h-13 flex items-center justify-center border-r-0 border-t-0">
            <Label htmlFor="academy">1.9 Academia</Label>
          </div>
          <Input
            type="text"
            id="academy"
            readOnly
            className="flex-1 rounded-none border border-dashed border-gray-400 h-13 text-center bg-gray-100 cursor-not-allowed"
            {...register('academy')}
          />
        </div>
      </div>
    </div>
  )
}
