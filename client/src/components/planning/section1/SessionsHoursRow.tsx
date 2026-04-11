import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Section1WatchProps } from './types'

export function SessionsHoursRow({
  register,
  watch,
  errors,
}: Section1WatchProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* 1.10 Semanas por semestre */}
      <div className="flex flex-col">
        <Label
          htmlFor="weeksPerSemester"
          className="text-center block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white border border-dashed border-gray-400"
        >
          1.10 No. de semanas por semestre
        </Label>
        <Input
          id="weeksPerSemester"
          type="number"
          readOnly
          className="text-center rounded-none flex-1 border border-dashed border-gray-400 bg-gray-100 cursor-not-allowed"
          {...register('weeksPerSemester', {
            required: 'El número de semanas es requerido',
            pattern: {
              value: /^[0-9]+$/,
              message: 'El número de semanas debe ser un número',
            },
          })}
        />
        {errors.weeksPerSemester && (
          <p className="text-red-500 text-sm">
            {errors.weeksPerSemester.message}
          </p>
        )}
      </div>

      {/* 1.11 Sesiones por semestre */}
      <div>
        <table className="w-full border-dashed border-gray-400">
          <tbody>
            <tr>
              <td
                colSpan={2}
                className="bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white border border-dashed border-gray-400 text-center"
              >
                1.11 No. de sesiones por semestre
              </td>
            </tr>
            <tr>
              <td className="bg-gray-400 px-3 text-sm font-semibold border border-dashed border-gray-400 w-1/2">
                <Label htmlFor="aula" className="block text-right w-full">
                  Aula
                </Label>
              </td>
              <td className="border border-dashed border-gray-400 p-0">
                <Input
                  id="aula"
                  type="text"
                  className="w-full h-full text-center border-none outline-none rounded-none"
                  {...register('sessionsPerSemester.classroom', {
                    pattern: {
                      value: /^[0-9]+$/,
                      message:
                        'El número de sesiones en aula debe ser un número',
                    },
                  })}
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-400 px-3 text-sm font-semibold border border-dashed border-gray-400">
                <Label htmlFor="lab" className="block text-right w-full">
                  Laboratorio
                </Label>
              </td>
              <td className="border border-dashed border-gray-400 p-0">
                <Input
                  id="lab"
                  type="text"
                  className="w-full h-full text-center border-none outline-none rounded-none"
                  {...register('sessionsPerSemester.laboratory', {
                    pattern: {
                      value: /^[0-9]+$/,
                      message:
                        'El número de sesiones en laboratorio debe ser un número',
                    },
                  })}
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-400 px-3 text-sm font-semibold border border-dashed border-gray-400">
                <Label htmlFor="clinic" className="block text-right w-full">
                  Clínica
                </Label>
              </td>
              <td className="border border-dashed border-gray-400 p-0">
                <Input
                  id="clinic"
                  type="text"
                  className="w-full h-full text-center border-none outline-none rounded-none"
                  {...register('sessionsPerSemester.clinic', {
                    pattern: {
                      value: /^[0-9]+$/,
                      message:
                        'El número de sesiones en clínica debe ser un número',
                    },
                  })}
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-400 px-3 text-sm font-semibold border border-dashed border-gray-400">
                <Label htmlFor="other" className="block text-right w-full">
                  Otro
                </Label>
              </td>
              <td className="border border-dashed border-gray-400 p-0">
                <Input
                  id="other"
                  type="text"
                  className="w-full h-full text-center border-none outline-none rounded-none"
                  {...register('sessionsPerSemester.other', {
                    pattern: {
                      value: /^[0-9]+$/,
                      message:
                        'El número de sesiones en otro debe ser un número',
                    },
                  })}
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-400 px-3 text-sm font-bold border border-dashed border-gray-400">
                <div className="text-right w-full">
                  <Label htmlFor="total" className="block">
                    Total
                  </Label>
                  <span className="text-xs font-normal block">
                    (empatar con 3.9)
                  </span>
                </div>
              </td>
              <td className="border border-dashed border-gray-400 p-0">
                <Input
                  id="total"
                  type="text"
                  defaultValue={
                    watch('sessionsPerSemester.classroom') +
                    watch('sessionsPerSemester.laboratory') +
                    watch('sessionsPerSemester.clinic') +
                    watch('sessionsPerSemester.other')
                  }
                  className="w-full h-full text-center border-none outline-none rounded-none"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 1.12 Horas por semestre */}
      <div>
        <table className="w-full border-dashed border-gray-400">
          <tbody>
            <tr>
              <td
                colSpan={4}
                className="bg-[#7C2855] px-3 py-3 text-sm font-semibold text-white border border-dashed border-gray-400 text-center"
              >
                1.12 No. de horas por semestre
              </td>
            </tr>
            <tr>
              <td className="bg-gray-400 px-3 text-sm border border-dashed border-gray-400 w-1/4">
                <div className="text-right w-full">
                  <Label htmlFor="theory" className="block">
                    Teoría
                  </Label>
                </div>
              </td>
              <td className="border border-dashed border-gray-400 p-0 w-1/4">
                <Input
                  id="theory"
                  type="text"
                  className="w-full h-full text-center border-none outline-none rounded-none"
                  {...register('hoursPerSemester.theory', {
                    required: 'Las horas de teoría son obligatorias',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Las horas de teoría deben ser un número',
                    },
                  })}
                />
              </td>
              <td className="bg-gray-400 px-3 text-sm border border-dashed border-gray-400 text-center w-1/4">
                <div className="text-right w-full">
                  <Label htmlFor="classroom" className="block">
                    Aula
                  </Label>
                </div>
              </td>
              <td className="border border-dashed border-gray-400 p-0 w-1/4">
                <Input
                  id="classroom"
                  type="text"
                  className="w-full h-full text-center border-none outline-none rounded-none"
                  {...register('hoursPerSemester.classroom', {
                    required: 'Las horas de aula son obligatorias',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Las horas de aula deben ser un número',
                    },
                  })}
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-400 px-3 text-sm border border-dashed border-gray-400">
                <div className="text-right w-full">
                  <Label htmlFor="practice" className="block">
                    Práctica
                  </Label>
                </div>
              </td>
              <td className="border border-dashed border-gray-400 p-0">
                <Input
                  id="practice"
                  type="text"
                  className="w-full h-full text-center border-none outline-none rounded-none"
                  {...register('hoursPerSemester.practice', {
                    required: 'Las horas de práctica son obligatorias',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Las horas de práctica deben ser un número',
                    },
                  })}
                />
              </td>
              <td className="bg-gray-400 px-3 text-sm border border-dashed border-gray-400">
                <div className="text-right w-full">
                  <Label htmlFor="hlab" className="block">
                    Laboratorio
                  </Label>
                </div>
              </td>
              <td className="border border-dashed border-gray-400 p-0">
                <Input
                  id="hlab"
                  type="text"
                  className="w-full h-full text-center border-none outline-none rounded-none"
                  {...register('hoursPerSemester.laboratory', {
                    required: 'Las horas de laboratorio son obligatorias',
                    pattern: {
                      value: /^[0-9]+$/,
                      message:
                        'Las horas de laboratorio deben ser un número',
                    },
                  })}
                />
              </td>
            </tr>
            <tr>
              <td className="bg-gray-400 px-3 text-sm border border-dashed border-gray-400">
                <div className="text-right w-full">
                  <Label htmlFor="h1total" className="block">
                    Total
                  </Label>
                </div>
              </td>
              <td className="border border-dashed border-gray-400 p-0">
                <Input
                  id="h1total"
                  type="text"
                  className="w-full h-full text-center border-none outline-none rounded-none font-semibold"
                  {...register('hoursPerSemester.total1', {
                    required: 'El total es obligatorio',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'El total debe ser un número',
                    },
                  })}
                />
              </td>
              <td className="bg-gray-400 px-3 text-sm border border-dashed border-gray-400">
                <div className="text-right w-full">
                  <Label htmlFor="hclinic" className="block">
                    Clínica
                  </Label>
                </div>
              </td>
              <td className="border border-dashed border-gray-400 p-0">
                <Input
                  id="hclinic"
                  type="text"
                  className="w-full h-full text-center border-none outline-none rounded-none"
                  {...register('hoursPerSemester.clinic', {
                    required: 'Las horas de clínica son obligatorias',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Las horas de clínica deben ser un número',
                    },
                  })}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="border-none"></td>
              <td className="bg-gray-400 px-3 py-2 text-sm font-semibold border border-dashed border-gray-400 text-center">
                <div className="text-right w-full">
                  <Label htmlFor="hother" className="block">
                    Otro
                  </Label>
                </div>
              </td>
              <td className="border border-dashed border-gray-400 p-0">
                <Input
                  id="hother"
                  type="text"
                  className="w-full h-full text-center border-none outline-none rounded-none"
                  {...register('hoursPerSemester.other', {
                    required: 'Las horas de otros son obligatorias',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Las horas de otros deben ser un número',
                    },
                  })}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="border-none"></td>
              <td className="bg-gray-400 px-3 py-2 text-sm border border-dashed border-gray-400 text-center">
                <div className="text-right w-full">
                  <Label htmlFor="h2total" className="block">
                    Total
                  </Label>
                  <span className="text-xs">(empatar con 3.9)</span>
                </div>
              </td>
              <td className="border border-dashed border-gray-400 p-0">
                <Input
                  id="h2total"
                  type="text"
                  className="w-full h-full text-center border-none outline-none rounded-none font-semibold"
                  {...register('hoursPerSemester.total2', {
                    required: 'El total de horas es obligatorio',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'El total de horas debe ser un número',
                    },
                  })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 1.13 Periodo + 1.14 Grupos */}
      <div className="space-y-4">
        <div>
          <Label
            htmlFor="period"
            className="block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white text-center border border-dashed"
          >
            1.13 Periodo escolar
          </Label>
          <Input
            id="period"
            className="border-gray-400 rounded-none border-dashed text-center"
            {...register('period', {
              required: 'El periodo es obligatorio',
            })}
          />
        </div>
        <div>
          <Label
            htmlFor="groups"
            className="block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white text-center border border-dashed"
          >
            1.14 Grupo (s)
          </Label>
          <Input
            type="text"
            id="groups"
            className="border-gray-400 rounded-none border-dashed text-center"
            {...register('groups', {
              required: 'El grupo es obligatorio',
            })}
          />
        </div>
      </div>
    </div>
  )
}
