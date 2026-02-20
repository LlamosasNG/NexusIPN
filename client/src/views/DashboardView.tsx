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
                      src="/logo_nexusipn.png"
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

      {/* Sección: ¿Qué es NexusIPN? */}
      <div className="mt-16 bg-gradient-to-br from-[#7C2855] to-[#5a1d3f] rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              ¿Qué es NexusIPN?
            </h2>
            <div className="space-y-4 text-base sm:text-lg leading-relaxed">
              <p>
                <span className="font-semibold text-[#e8c96f]">NexusIPN</span>{' '}
                es una plataforma integral desarrollada específicamente para el{' '}
                <span className="font-semibold">
                  Instituto Politécnico Nacional
                </span>
                , diseñada para revolucionar la manera en que docentes y
                estudiantes gestionan sus actividades académicas.
              </p>
              <p>
                Nuestro sistema centraliza la{' '}
                <span className="font-semibold text-[#e8c96f]">
                  gestión de planificaciones didácticas
                </span>{' '}
                y
                <span className="font-semibold text-[#e8c96f]">
                  {' '}
                  recursos digitales
                </span>
                , permitiendo a los docentes crear, organizar y compartir
                contenido educativo de manera eficiente, mientras que los
                estudiantes acceden a materiales de estudio, consultan sus
                avances y mantienen una comunicación fluida con sus profesores.
              </p>
              <p>
                Con NexusIPN, transformamos la experiencia educativa en un
                entorno digital moderno, seguro y accesible desde cualquier
                dispositivo, en cualquier momento.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección: Características Principales */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Características Principales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre las herramientas que hacen de NexusIPN la solución perfecta
            para la gestión académica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Característica 1: Planificaciones Didácticas */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#7C2855]">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#7C2855] to-[#5a1d3f] rounded-xl mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Planificaciones Didácticas
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Crea, edita y organiza tus planificaciones didácticas de manera
              estructurada. Incluye objetivos, competencias, actividades y
              evaluaciones en un solo lugar.
            </p>
          </div>

          {/* Característica 2: Recursos Digitales */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#D4AF37]">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#e8c96f] rounded-xl mb-4">
              <svg
                className="w-8 h-8 text-[#7C2855]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Gestión de Recursos
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Almacena y comparte documentos, presentaciones, videos y
              materiales educativos. Organiza tus recursos por materia y tema
              para fácil acceso.
            </p>
          </div>

          {/* Característica 3: Seguimiento Académico */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#7C2855]">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#7C2855] to-[#5a1d3f] rounded-xl mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Seguimiento de Progreso
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Monitorea el avance de tus estudiantes en tiempo real. Visualiza
              estadísticas, calificaciones y participación de manera clara y
              detallada.
            </p>
          </div>

          {/* Característica 4: Colaboración */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#D4AF37]">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#e8c96f] rounded-xl mb-4">
              <svg
                className="w-8 h-8 text-[#7C2855]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Colaboración Docente
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Comparte planificaciones y recursos con otros docentes. Trabaja en
              equipo para mejorar la calidad educativa de manera colaborativa.
            </p>
          </div>

          {/* Característica 5: Acceso Multiplataforma */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#7C2855]">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#7C2855] to-[#5a1d3f] rounded-xl mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Acceso desde Cualquier Lugar
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Disponible en computadoras, tablets y smartphones. Accede a tus
              planificaciones y recursos desde cualquier dispositivo, en
              cualquier momento.
            </p>
          </div>

          {/* Característica 6: Seguridad */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#D4AF37]">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#e8c96f] rounded-xl mb-4">
              <svg
                className="w-8 h-8 text-[#7C2855]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Seguridad y Privacidad
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Tus datos están protegidos con los más altos estándares de
              seguridad. Cumplimos con todas las normativas de protección de
              información académica.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
