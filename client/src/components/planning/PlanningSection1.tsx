import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import type { GeneralDataFormValues } from '@/types'
import { Controller, useForm } from 'react-hook-form'

interface SubjectData {
  id: number
  name: string
  code: string
  academicUnit: string
  semester: string
  areaFormation: string
  modality: string
  type: string[]
  creditsTepic: number
  weeksPerSemester: number
  hoursPerSemester: {
    theory: number
    practice: number
    total1: number
    classroom: number
    laboratory: number
    clinic: number
    other: number
    total2: number
  } | null
  studyPlanNames: string[] | null
}

interface PlanningSection1Props {
  generalData?: {
    id?: number
    academicUnit?: string
    program?: string
    learningUnit?: string
    semester?: string
    areaFormation?: string
    modality?: string
    unitType?: string[]
    creditsTepic?: number
    creditsSatca?: number
    academy?: string
    weeksPerSemester?: number
    sessionsPerSemester?: {
      classroom?: number
      laboratory?: number
      clinic?: number
      other?: number
      total?: number
    }
    hoursPerSemester?: {
      theory?: number
      practice?: number
      total1?: number
      classroom?: number
      laboratory?: number
      clinic?: number
      other?: number
      total2?: number
    }
    schoolPeriod?: string
    groups?: string[]
    teacherName?: string
  }
  subject?: SubjectData
}

export function PlanningSection1({ generalData, subject }: PlanningSection1Props) {
  const { data: user } = useAuth()
  
  const defaultProgram = generalData?.program || 
    (subject?.studyPlanNames && subject.studyPlanNames.length > 0 ? subject.studyPlanNames[0] : '')

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GeneralDataFormValues>({
    defaultValues: {
      academicUnit: generalData?.academicUnit || subject?.academicUnit || '',
      program: defaultProgram,
      learningUnit: generalData?.learningUnit || subject?.name || '',
      semester: generalData?.semester || subject?.semester || '',
      areaFormation: generalData?.areaFormation || subject?.areaFormation || '',
      modality: generalData?.modality as GeneralDataFormValues['modality'] || 
        (subject?.modality as GeneralDataFormValues['modality']) || 'Escolarizada',
      type: generalData?.unitType as GeneralDataFormValues['type'] || 
        (subject?.type as GeneralDataFormValues['type']) || ['Teórica'],
      credits: {
        tepic: generalData?.creditsTepic || subject?.creditsTepic || 0,
        satca: generalData?.creditsSatca || Math.round((subject?.creditsTepic || 0) * 0.8421) || 0,
      },
      academy: generalData?.academy ? { id: 0, name: generalData.academy } : { id: 0, name: '' },
      weeksPerSemester: generalData?.weeksPerSemester || subject?.weeksPerSemester || 0,
      sessionsPerSemester: generalData?.sessionsPerSemester || {
        classroom: subject?.hoursPerSemester?.classroom || 0,
        laboratory: subject?.hoursPerSemester?.laboratory || 0,
        clinic: subject?.hoursPerSemester?.clinic || 0,
        other: subject?.hoursPerSemester?.other || 0,
        total: (subject?.hoursPerSemester?.classroom || 0) +
          (subject?.hoursPerSemester?.laboratory || 0) +
          (subject?.hoursPerSemester?.clinic || 0) +
          (subject?.hoursPerSemester?.other || 0),
      },
      hoursPerSemester: generalData?.hoursPerSemester || subject?.hoursPerSemester || {
        theory: 0,
        practice: 0,
        total1: 0,
        classroom: 0,
        laboratory: 0,
        clinic: 0,
        other: 0,
        total2: 0,
      },
      period: generalData?.schoolPeriod || '',
      groups: generalData?.groups || [],
      user: { name: user?.name },
    },
  })

  const handleSend = (data: GeneralDataFormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handleSend)}>
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-700">
            1. Datos generales y de identificación
          </h3>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label
              htmlFor="academicUnit"
              className="block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white text-center border border-dashed"
            >
              1.1 Unidad Académica
            </Label>
            <Input
              id="academicUnit"
              type="text"
              className="text-center border-dashed border-gray-400 rounded-none"
              {...register('academicUnit', {
                required: 'La unidad académica es obligatoria',
              })}
            />
            {errors.academicUnit && (
              <p className="text-sm text-red-500 mt-1">
                {errors.academicUnit.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="program"
              className="block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white text-center border border-dashed"
            >
              1.2 Programa académico / Plan de estudios
            </Label>
            <Input
              id="program"
              type="text"
              className="text-center border-dashed border-gray-400 rounded-none"
              {...register('program', {
                required: 'El programa académico es obligatorio',
              })}
            />
            {errors.program && (
              <p className="text-sm text-red-500 mt-1">
                {errors.program.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="learningUnit"
              className="block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white text-center border border-dashed"
            >
              1.3 Unidad de aprendizaje
            </Label>
            <Input
              id="learningUnit"
              type="text"
              className="text-center border-dashed border-gray-400 rounded-none"
              {...register('learningUnit', {
                required: 'La unidad de aprendizaje es obligatoria',
              })}
            />
            {errors.learningUnit && (
              <p className="text-sm text-red-500 mt-1">
                {errors.learningUnit.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex gap-4">
          <div>
            <Label
              className="block bg-[#7C2855] py-2 text-sm font-semibold text-white text-center w-55 ml-15 border border-dashed"
              htmlFor="semester"
            >
              1.4 Semestre / Nivel
            </Label>
            <Input
              type="text"
              className="border-dashed border-gray-400 rounded-none w-55 ml-15 text-center"
              id="semester"
              {...register('semester', {
                required: 'El semestre es obligatorio',
              })}
            />
            {errors.semester && (
              <p className="text-sm text-red-500 mt-1 ml-15">
                {errors.semester.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="areaFormation"
              className="block bg-[#7C2855] px-3 py-2 text-sm font-semibold text-white text-center w-90 border border-dashed"
            >
              1.5 Área de formación
            </Label>
            <Input
              id="areaFormation"
              className="text-center border-dashed border-gray-400 rounded-none w-90"
              {...register('areaFormation', {
                required: 'El área de formación es obligatoria',
              })}
            />
            {errors.areaFormation && (
              <p className="text-sm text-red-500 mt-1">
                {errors.areaFormation.message}
              </p>
            )}
          </div>
          <div>
            <table className="w-full border-dashed border-gray-400">
              <tbody>
                <tr>
                  <td className="bg-[#7C2855] px-3 py-1.5 text-sm font-semibold text-white w-1/3 text-center border-r border-gray-400 border border-dashed">
                    1.6 Modalidad de la unidad de aprendizaje
                  </td>
                  <td className="border-gray-400">
                    <Controller
                      name="modality"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between border border-dashed border-gray-400 px-3 py-0.5">
                            <span className="text-sm">Escolarizada</span>
                            <input
                              type="checkbox"
                              value="escolarizada"
                              checked={field.value === 'Escolarizada'}
                              onChange={() => field.onChange('Escolarizada')}
                              className="w-4 h-4"
                            />
                          </div>
                          <div className="flex items-center justify-between border border-dashed border-gray-400 px-3 py-0.5">
                            <span className="text-sm">No escolarizada</span>
                            <input
                              type="checkbox"
                              value="no_escolarizada"
                              checked={field.value === 'No escolarizada'}
                              onChange={() => field.onChange('No escolarizada')}
                              className="w-4 h-4"
                            />
                          </div>
                          <div className="flex items-center justify-between border border-dashed border-gray-400 px-3 py-0.5">
                            <span className="text-sm">Mixta</span>
                            <input
                              type="checkbox"
                              value="mixta"
                              checked={field.value === 'Mixta'}
                              onChange={() => field.onChange('Mixta')}
                              className="w-4 h-4"
                            />
                          </div>
                        </div>
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Row 3 - Tipo de unidad */}
        <div className="grid grid-cols-2 gap-4">
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
                name="type"
                control={control}
                render={({ field }) => {
                  const toggleValue = (
                    value: GeneralDataFormValues['type'][number]
                  ) => {
                    const currentValues = field.value || []
                    if (currentValues.includes(value)) {
                      // Si ya está seleccionado, lo removemos
                      field.onChange(currentValues.filter((v) => v !== value))
                    } else {
                      // Si no está seleccionado, lo agregamos
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
                            checked={field.value?.includes('Teórica')}
                            onChange={() => toggleValue('Teórica')}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="border border-dashed border-gray-400 px-3 text-sm text-center">
                          Obligatoria
                        </td>
                        <td className="border border-dashed border-gray-400 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={field.value?.includes('Obligatoria')}
                            onChange={() => toggleValue('Obligatoria')}
                            className="w-4 h-4"
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
                            checked={field.value?.includes('Práctica')}
                            onChange={() => toggleValue('Práctica')}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="border border-dashed border-gray-400 px-3 text-sm text-center">
                          Optativa
                        </td>
                        <td className="border border-dashed border-gray-400 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={field.value?.includes('Optativa')}
                            onChange={() => toggleValue('Optativa')}
                            className="w-4 h-4"
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
                            checked={field.value?.includes('Teórico-Práctica')}
                            onChange={() => toggleValue('Teórico-Práctica')}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="border border-dashed border-gray-400 px-3 text-sm text-center">
                          Tópicos selectos
                        </td>
                        <td className="border border-dashed border-gray-400 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={field.value?.includes('Tópicos Selectos')}
                            onChange={() => toggleValue('Tópicos Selectos')}
                            className="w-4 h-4"
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
                            checked={field.value?.includes('Clínica')}
                            onChange={() => toggleValue('Clínica')}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="border border-dashed border-gray-400 px-3 text-sm text-center">
                          Otro
                        </td>
                        <td className="border border-dashed border-gray-400 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={field.value?.includes('Otro')}
                            onChange={() => toggleValue('Otro')}
                            className="w-4 h-4"
                          />
                        </td>
                      </tr>
                    </>
                  )
                }}
              />
            </tbody>
          </table>

          <div className="grid grid-cols-1 gap-0 w-5/6">
            {/* Tabla de Créditos */}
            <div className="flex mb-10">
              <div className="bg-[#7C2855] text-sm font-semibold text-white border border-dashed border-gray-400 w-48 h-14 flex items-center justify-center border-r-0">
                1.8 Créditos
              </div>
              <table className="flex-1 border border-dashed border-gray-400 border-l-0">
                <tbody>
                  <tr>
                    <td className="bg-gray-500 px-3 text-sm font-semibold text-white border-r border-dashed border-gray-400 w-10 h-5">
                      <Label htmlFor="tepic" className="block text-center">
                        Tepic
                      </Label>
                    </td>
                    <td className="bg-gray-500 px-3 text-sm font-semibold text-white w-10 h-5">
                      <Label htmlFor="satca" className="block text-center">
                        SATCA
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-t border-dashed border-gray-400 px-3 text-center">
                      <Input
                        id="tepic"
                        className="w-full h-full border-none rounded-none text-center"
                        {...register('credits.tepic', {
                          required: 'Tepic es requerido',
                        })}
                      />
                    </td>
                    <td className="border-t border-dashed border-gray-400 px-3 text-center">
                      <Input
                        id="satca"
                        className="w-full h-full border-none rounded-none text-center"
                        {...register('credits.satca', {
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
                className="flex-1 rounded-none border border-dashed border-gray-400 h-13 text-center"
                {...register('academy', {
                  required: 'Academia es requerida',
                })}
              />
            </div>
            {errors.academy && (
              <p className="text-red-500 text-sm">{errors.academy.message}</p>
            )}
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-4 gap-4">
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
              className="text-center rounded-none flex-1 border border-dashed border-gray-400"
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
                      defaultValue="36"
                      className="w-full h-full text-center border-none outline-none rounded-none"
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
                      defaultValue="18"
                      className="w-full h-full text-center border-none outline-none rounded-none"
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
                      defaultValue="0"
                      className="w-full h-full text-center border-none outline-none rounded-none"
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
                      defaultValue="54"
                      className="w-full h-full text-center border-none outline-none rounded-none"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
                      defaultValue="54"
                      className="w-full h-full text-center border-none outline-none rounded-none"
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
                      defaultValue="54"
                      className="w-full h-full text-center border-none outline-none rounded-none"
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
                      defaultValue="27"
                      className="w-full h-full text-center border-none outline-none rounded-none"
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
                      defaultValue="27"
                      className="w-full h-full text-center border-none outline-none rounded-none"
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
                      defaultValue="81"
                      className="w-full h-full text-center border-none outline-none rounded-none font-semibold"
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
                      defaultValue="0"
                      className="w-full h-full text-center border-none outline-none rounded-none"
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
                      defaultValue="81"
                      className="w-full h-full text-center border-none outline-none rounded-none font-semibold"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
              {errors.groups && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.groups.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Row 5 - Nombre del docente */}
        <div className="flex flex-col items-center">
          <Label
            htmlFor="user"
            className="block bg-[#7C2855] px-3 py-2 text-sm text-white text-center border border-dashed w-3/5"
          >
            1.15 Nombre y firma del docente autor
          </Label>
          <Input
            id="user"
            className="border-gray-400 rounded-none border-dashed text-center w-3/5 h-20"
            type="text"
            {...register('user.name', {
              required: 'El nombre del docente es requerido',
            })}
            value={user?.name}
          />
        </div>
      </div>
      <input
        type="submit"
        value="Guardar"
        className="bg-[#7C2855] hover:bg-[#7C2855]/80 w-full p-3  text-white font-black  text-xl cursor-pointer mt-5"
      />
    </form>
  )
}
