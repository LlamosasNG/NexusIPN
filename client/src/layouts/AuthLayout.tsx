import { LogoHomeopatia } from '@/components/LogoHomeopatia'
import { LogoIPN } from '@/components/LogoIPN'
import { Toaster } from '@/components/ui/sonner'
import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 sm:p-6 font-sans">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-[#7C2855] via-[#5a1d3f] to-[#7C2855]" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />

      <div className="w-full max-w-lg mx-auto relative z-10">
        {/* Header */}
        <header className="mb-10 text-center text-white">
          <div className="flex items-center justify-center gap-x-8 mb-8">
            <div className="transform transition-transform hover:scale-105 duration-300">
              <LogoIPN className="h-28 w-28 sm:h-32 sm:w-32 bg-white p-3 rounded-full shadow-2xl ring-4 ring-white/20" />
            </div>
            <div className="transform transition-transform hover:scale-105 duration-300">
              <LogoHomeopatia className="h-28 w-28 sm:h-32 sm:w-32 bg-white p-3 rounded-full shadow-2xl ring-4 ring-white/20" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight drop-shadow-lg">
              Instituto Politécnico Nacional
            </h1>
            <p className="text-xl sm:text-2xl text-[#e8c96f] font-semibold drop-shadow-md">
              Escuela Nacional de Medicina y Homeopatía
            </p>
          </div>
        </header>

        {/* Main Content Card */}
        <main>
          <div className="bg-white/98 backdrop-blur-sm p-8 sm:p-10 rounded-2xl shadow-2xl border-t-[6px] border-[#D4AF37] relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-[#7C2855]/5 to-transparent rounded-tr-full" />

            <div className="relative z-10">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-10 text-center text-white/90 space-y-3">
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <p className="font-bold italic text-[#e8c96f] text-lg drop-shadow-md">
              "La Técnica al Servicio de la Patria"
            </p>
          </div>
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Escuela Nacional de Medicina y
            Homeopatía
            <br />
            Todos los derechos reservados.
          </p>
        </footer>
      </div>
      <Toaster position="top-right" visibleToasts={3} />
    </div>
  )
}
