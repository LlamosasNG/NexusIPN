import { LogoHomeopatia } from '@/components/LogoHomeopatia'
import { LogoIPN } from '@/components/LogoIPN'
import { Outlet } from 'react-router'

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Institucional */}
      <header className="bg-gradient-to-r from-[#7C2855] to-[#5a1d3f] shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logos y Título */}
            <div className="flex items-center gap-4">
              <LogoIPN className="h-24 w-24 bg-white p-2 rounded-lg shadow-md" />
              <div className="text-white">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Instituto Politécnico Nacional
                </h1>
                <p className="text-sm sm:text-base text-[#e8c96f]">
                  Escuela Nacional de Medicina y Homeopatía
                </p>
              </div>
            </div>

            {/* Logo ENMH */}
            <LogoHomeopatia className="h-24 w-24 bg-white p-2 rounded-lg shadow-md hidden sm:block" />
          </div>
        </div>

        {/* Línea decorativa dorada */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </header>

      {/* Área de Contenido Principal */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer Institucional */}
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <p className="font-bold italic text-[#e8c96f]">
              "La Técnica al Servicio de la Patria"
            </p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Instituto Politécnico Nacional -
              Escuela Nacional de Medicina y Homeopatía
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
