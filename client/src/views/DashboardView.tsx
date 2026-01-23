import { ArrowRightIcon } from '@heroicons/react/24/outline'

import {
  AcademicCapIcon,
  CheckBadgeIcon,
  FaceSmileIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router'

export default function DashboardView() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative mb-12">
        <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7C2855]/5 to-transparent rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#D4AF37]/5 to-transparent rounded-full -ml-24 -mb-24" />

          {/* Contenido - Layout horizontal */}
          <div className="relative z-10 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Logo - Lado Izquierdo */}
              <div className="flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7C2855] to-[#D4AF37] rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                  <div className="relative">
                    <img
                      src="/logo-nexusipn.svg"
                      alt="NexusIPN"
                      className="h-48 sm:h-56 lg:h-64 w-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Información - Lado Derecho */}
              <div className="space-y-6 text-center lg:text-left">
                {/* Título */}
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#7C2855] to-[#5a1d3f] bg-clip-text text-transparent mb-3">
                    Bienvenido a Nexus IPN
                  </h1>
                  <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#D4AF37] to-transparent rounded-full w-32 mx-auto lg:mx-0" />
                </div>

                {/* Subtítulo */}
                <p className="text-xl sm:text-2xl font-semibold text-gray-700">
                  Sistema Integral de Gestión Académica
                </p>

                {/* Descripción */}
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Plataforma diseñada para el{' '}
                  <span className="font-semibold text-[#7C2855]">
                    Instituto Politécnico Nacional
                  </span>{' '}
                  que conecta a estudiantes y docentes, facilitando la
                  administración de materias, calificaciones y recursos
                  educativos de manera{' '}
                  <span className="font-semibold text-[#7C2855]">
                    eficiente
                  </span>
                  ,<span className="font-semibold text-[#7C2855]"> segura</span>{' '}
                  y{' '}
                  <span className="font-semibold text-[#7C2855]">moderna</span>.
                </p>

                {/* Badges informativos */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#7C2855]/10 text-[#7C2855] text-sm font-medium">
                    <FaceSmileIcon className="w-4 h-4 mr-2" />
                    Seguro y Confiable
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#7C2855] text-sm font-medium">
                    <UserGroupIcon className="w-4 h-4 mr-2" />
                    Colaborativo
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#7C2855]/10 text-[#7C2855] text-sm font-medium">
                    <CheckBadgeIcon className="w-4 h-4 mr-2" />
                    Rápido y Eficiente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de Navegación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Botón para Estudiantes */}
        <Link
          to="/register-code"
          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#7C2855]"
        >
          <div className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#7C2855] to-[#5a1d3f] rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <UserGroupIcon className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Eres Estudiante
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Accede a tus materias, consulta tus calificaciones y gestiona tus
              inscripciones.
            </p>

            <div className="mt-6 flex items-center text-[#7C2855] font-semibold group-hover:translate-x-2 transition-transform duration-300">
              Acceder
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full" />
        </Link>

        {/* Botón para Docentes */}
        <Link
          to="/auth/login"
          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#7C2855]"
        >
          <div className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#7C2855] to-[#5a1d3f] rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <AcademicCapIcon className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Eres Docente
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Accede a tus materias, gestiona tus grupos y evaluaciones.
            </p>

            <div className="mt-6 flex items-center text-[#7C2855] font-semibold group-hover:translate-x-2 transition-transform duration-300">
              Acceder
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full" />
        </Link>
      </div>
    </div>
  )
}
