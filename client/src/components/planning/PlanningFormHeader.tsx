import { LogoIPN } from '../LogoIPN'

export function PlanningFormHeader() {
  return (
    <>
      <div className="mb-8 flex items-start justify-between pb-6 space-x-25">
        {/* Lado Izquierdo: Logos y Secretaría Académica */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col justify-center gap-y-0.5">
            <div className="h-15 w-20 bg-[#7C2855]" />
            <div className="h-15 w-20 bg-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <LogoIPN className="h-25 w-20" />
            <div className="flex flex-col justify-center">
              <div className="text-base font-bold text-[#7C2855] leading-tight">
                SECRETARÍA
              </div>
              <div className="text-base font-bold text-[#7C2855] leading-tight">
                ACADÉMICA
              </div>
              <div className="text-sm text-gray-700 mt-1 leading-tight">
                DIRECCIÓN DE EDUCACIÓN
              </div>
              <div className="text-sm text-gray-700 leading-tight">
                SUPERIOR
              </div>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Planeación Didáctica */}
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          {/* Tu diseño actual - alineado a la derecha */}
          <div className="flex items-center gap-1 self-end">
            <div className="flex flex-col gap-y-1">
              <div className="h-10 w-5 bg-gray-400" />
              <div className="h-4 w-5 bg-[#7C2855]" />
            </div>
            <div className="bg-gray-700 h-15 w-17" />
          </div>

          {/* Nuevos elementos - ancho completo */}
          <div className="bg-[#7C2855] h-7 text-white font-bold text-lg px-2">
            PLANEACIÓN DIDÁCTICA
          </div>
          <div className="flex items-center gap-1">
            <div className="flex flex-col gap-y-1">
              <div className="h-7 w-10 bg-gray-400" />
            </div>
            <div className="bg-[#7C2855] h-7 flex-1" />
          </div>
        </div>
      </div>
    </>
  )
}
