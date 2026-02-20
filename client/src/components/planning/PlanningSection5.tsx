type Props = {
  herramientaPlagio: string
  onChange: (value: string) => void
}

export function PlanningSection5({ herramientaPlagio, onChange }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Section Title */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-700">
          5. Herramientas para detectar el plagio:
        </h3>
      </div>

      {/* Tabla de Herramientas */}
      <div className="overflow-x-auto">
        <table className="w-full border-2 border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 bg-gray-300 px-6 py-3 text-sm font-bold text-black">
                Ithenticate
              </th>
              <th className="border border-gray-400 bg-gray-300 px-6 py-3 text-sm font-bold text-black">
                Turnitin
              </th>
              <th className="border border-gray-400 px-6 py-3 text-sm font-bold text-black">
                Ninguna
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 px-6 py-4 text-center">
                <input
                  type="radio"
                  name="herramienta-plagio"
                  value="ithenticate"
                  checked={herramientaPlagio === 'ithenticate'}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-5 h-5"
                />
              </td>
              <td className="border border-gray-400 px-6 py-4 text-center">
                <input
                  type="radio"
                  name="herramienta-plagio"
                  value="turnitin"
                  checked={herramientaPlagio === 'turnitin'}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-5 h-5"
                />
              </td>
              <td className="border border-gray-400 px-6 py-4 text-center">
                <input
                  type="radio"
                  name="herramienta-plagio"
                  value="ninguna"
                  checked={herramientaPlagio === 'ninguna'}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-5 h-5"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
