import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'
import { LogoIPN } from './LogoIPN'

export function LoadingApp() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Empty className="w-full bg-white rounded-2xl shadow-xl border-t-4 border-[#94174c] p-8">
          <EmptyHeader className="space-y-6">
            {/* Logo IPN placeholder */}
            <LogoIPN className="w-20 h-20" />

            <EmptyMedia className="mt-6">
              <div className="relative">
                <Spinner className="w-12 h-12 text-[#94174c]" />
                <div className="absolute inset-0 rounded-full bg-[#94174c]/10 blur-xl animate-pulse" />
              </div>
            </EmptyMedia>

            <EmptyTitle className="text-2xl font-bold text-[#94174c] mt-4">
              Procesando Solicitud
            </EmptyTitle>

            <EmptyDescription className="text-slate-600 text-base leading-relaxed">
              Por favor espere mientras procesamos su solicitud.
              <span className="block mt-2 text-sm font-medium text-[#94174c]">
                No actualice ni cierre esta página.
              </span>
            </EmptyDescription>

            {/* Barra de progreso decorativa */}
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mt-6">
              <div
                className="h-full bg-gradient-to-r from-[#94174c] to-[#6d1138] rounded-full animate-pulse"
                style={{ width: '80%' }}
              />
            </div>
          </EmptyHeader>
          {/*
          <EmptyContent className="mt-8">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-[#94174c] text-[#94174c] hover:bg-[#94174c] hover:text-white transition-all duration-300 font-semibold shadow-sm"
            >
              Cancelar Proceso
            </Button>
          </EmptyContent>
          */}

          {/* Footer institucional */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-center text-slate-500">
              Sistema Institucional del IPN
            </p>
          </div>
        </Empty>
      </div>
    </div>
  )
}
