import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'

type Referencia = {
  id: number
  texto: string
  unidades: boolean[]
  tipos: { B: boolean; S: boolean; I: boolean; C: boolean }
}

type Props = {
  referencias: Referencia[]
  onAgregar: () => void
  onEliminar: (id: number) => void
}

export function PlanningSection4({
  referencias,
  onAgregar,
  onEliminar,
}: Props) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Section Title */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-700">
          4. Referencias
        </h3>
      </div>

      {/* Tabla de Referencias */}
      <div className="overflow-x-auto">
        <table className="w-full border-2 border-gray-400">
          <thead>
            <tr className="bg-[#7C2855] text-white">
              <th className="border border-gray-400 px-3 py-3 text-xs font-bold">
                4.1 Referencias
                <br />
                (Físicas y digitales)
              </th>
              <th className="border border-gray-400 px-3 py-3 text-xs font-bold w-32">
                4.2 Unidad temática
              </th>
              <th className="border border-gray-400 px-3 py-3 text-xs font-bold w-40">
                4.3 Tipo¹
              </th>
              <th className="border border-gray-400 px-2 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {referencias.map((referencia) => (
              <tr key={referencia.id} className="align-top">
                {/* Columna 4.1: Referencias */}
                <td className="border border-gray-400 px-3 py-3">
                  <Textarea
                    rows={3}
                    className="border-gray-300 text-xs"
                    placeholder="Ej: Carretero, J; Anasagasti, P de M; García, F; Pérez, F. 2007 Sistemas operativos una visión aplicada McGraw-Hill"
                  />
                </td>

                {/* Columna 4.2: Unidad temática (checkboxes 1-6) */}
                <td className="border border-gray-400 px-3 py-3">
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-6 gap-1 mb-2 text-xs font-semibold text-center">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                      <span>6</span>
                    </div>
                    <div className="grid grid-cols-6 gap-1">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={num} className="flex justify-center">
                          <input type="checkbox" className="w-4 h-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                </td>

                {/* Columna 4.3: Tipo (B, S, I, C) */}
                <td className="border border-gray-400 px-3 py-3">
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-4 gap-2 mb-2 text-xs font-semibold text-center">
                      <span>B</span>
                      <span>S</span>
                      <span>I</span>
                      <span>C</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {['B', 'S', 'I', 'C'].map((tipo) => (
                        <div key={tipo} className="flex justify-center">
                          <input type="checkbox" className="w-4 h-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                </td>

                {/* Botón eliminar */}
                <td className="border border-gray-400 px-2 py-3 text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onEliminar(referencia.id)}
                    disabled={referencias.length === 1}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}

            {/* Botón agregar referencia */}
            <tr>
              <td colSpan={4} className="border border-gray-400 px-3 py-2">
                <Button
                  type="button"
                  onClick={onAgregar}
                  variant="outline"
                  className="w-full border-2 border-dashed border-[#7C2855] text-[#7C2855] hover:bg-[#7C2855] hover:text-white bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar referencia
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Nota al pie */}
      <p className="text-xs text-gray-600 italic">
        *Es posible agregar o eliminar filas conforme a la necesidad del docente
      </p>
    </div>
  )
}
