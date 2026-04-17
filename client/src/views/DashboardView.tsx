import { ArrowRightIcon } from '@heroicons/react/24/outline'

import {
  AcademicCapIcon,
  BookOpenIcon,
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  DevicePhoneMobileIcon,
  FolderOpenIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid'
import { Link } from 'react-router'

export default function DashboardView() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* ── Hero Section ── */}
      <div className="relative mb-12">
        <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#7C2855]/5 to-transparent rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-[#D4AF37]/5 to-transparent rounded-full -ml-24 -mb-24" />

          {/* Contenido - Layout horizontal */}
          <div className="relative z-10 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Logo - Lado Izquierdo */}
              <div className="flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-linear-to-r from-[#7C2855] to-[#D4AF37] rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
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
                {/* Badge */}
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#7C2855] text-sm font-semibold tracking-wide uppercase">
                  Portal Docente
                </span>

                {/* Título */}
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-r from-[#7C2855] to-[#5a1d3f] bg-clip-text text-transparent mb-3">
                    Bienvenido a Nexus IPN
                  </h1>
                  <div className="h-1 bg-linear-to-r from-[#D4AF37] via-[#D4AF37] to-transparent rounded-full w-32 mx-auto lg:mx-0" />
                </div>

                {/* Subtítulo */}
                <p className="text-xl sm:text-2xl font-semibold text-gray-700">
                  Sistema Integral de Gestión Académica
                </p>

                {/* Descripción */}
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Plataforma del{' '}
                  <span className="font-semibold text-[#7C2855]">
                    Instituto Politécnico Nacional
                  </span>{' '}
                  para la gestión de planificaciones didácticas, recursos
                  educativos y seguimiento académico de manera{' '}
                  <span className="font-semibold text-[#7C2855]">
                    eficiente
                  </span>
                  ,
                  <span className="font-semibold text-[#7C2855]"> segura</span>{' '}
                  y{' '}
                  <span className="font-semibold text-[#7C2855]">moderna</span>.
                </p>

                {/* CTA Principal */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    to="/auth/login"
                    id="login-cta"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-[#7C2855] to-[#5a1d3f] text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <AcademicCapIcon className="w-6 h-6" />
                    Iniciar Sesión
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Badges informativos */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#7C2855]/10 text-[#7C2855] text-sm font-medium">
                    <CheckBadgeIcon className="w-4 h-4 mr-2" />
                    Seguro y Confiable
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#7C2855] text-sm font-medium">
                    <UserGroupIcon className="w-4 h-4 mr-2" />
                    Colaborativo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {[
          { label: 'Planificaciones', icon: ClipboardDocumentListIcon, desc: 'Crea y gestiona' },
          { label: 'Recursos Digitales', icon: FolderOpenIcon, desc: 'Organiza y comparte' },
          { label: 'Materias Activas', icon: BookOpenIcon, desc: 'Consulta y administra' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="group flex items-center gap-4 bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-linear-to-br from-[#7C2855] to-[#5a1d3f] rounded-xl group-hover:scale-110 transition-transform duration-300">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{stat.label}</p>
              <p className="text-xs text-[#D4AF37] font-medium mt-0.5">
                {stat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Sección: ¿Qué es NexusIPN? ── */}
      <div className="mt-16 bg-linear-to-br from-[#7C2855] to-[#5a1d3f] rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="max-w-4xl mx-auto text-center text-white">
            <p className="text-sm font-semibold tracking-widest text-[#e8c96f] uppercase mb-3">
              Acerca de la plataforma
            </p>
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
                , diseñada para revolucionar la manera en que los docentes
                gestionan sus actividades académicas.
              </p>
              <p>
                Nuestro sistema centraliza la{' '}
                <span className="font-semibold text-[#e8c96f]">
                  gestión de planificaciones didácticas
                </span>{' '}
                y{' '}
                <span className="font-semibold text-[#e8c96f]">
                  recursos digitales
                </span>
                , permitiendo crear, organizar y compartir contenido educativo de
                manera eficiente, optimizando el tiempo y esfuerzo del docente.
              </p>
              <p>
                Con NexusIPN, transformamos la experiencia educativa en un
                entorno digital moderno, seguro y accesible desde cualquier
                dispositivo, en cualquier momento.
              </p>
            </div>

            {/* Divider dorado */}
            <div className="mt-8 flex justify-center">
              <div className="h-0.5 w-24 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Sección: Características Principales ── */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-[#D4AF37] uppercase mb-2">
            Herramientas para el docente
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Características Principales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre las herramientas que hacen de NexusIPN la solución perfecta
            para la gestión académica docente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Característica 1: Planificaciones Didácticas */}
          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-[#7C2855]">
            <div className="flex items-center justify-center w-14 h-14 bg-linear-to-br from-[#7C2855] to-[#5a1d3f] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <ClipboardDocumentListIcon className="w-8 h-8 text-white" />
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
          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-[#D4AF37]">
            <div className="flex items-center justify-center w-14 h-14 bg-linear-to-br from-[#D4AF37] to-[#e8c96f] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <FolderOpenIcon className="w-8 h-8 text-[#7C2855]" />
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
          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-[#7C2855]">
            <div className="flex items-center justify-center w-14 h-14 bg-linear-to-br from-[#7C2855] to-[#5a1d3f] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <ChartBarIcon className="w-8 h-8 text-white" />
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
          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-[#D4AF37]">
            <div className="flex items-center justify-center w-14 h-14 bg-linear-to-br from-[#D4AF37] to-[#e8c96f] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <UserGroupIcon className="w-8 h-8 text-[#7C2855]" />
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
          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-[#7C2855]">
            <div className="flex items-center justify-center w-14 h-14 bg-linear-to-br from-[#7C2855] to-[#5a1d3f] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <DevicePhoneMobileIcon className="w-8 h-8 text-white" />
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
          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-[#D4AF37]">
            <div className="flex items-center justify-center w-14 h-14 bg-linear-to-br from-[#D4AF37] to-[#e8c96f] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheckIcon className="w-8 h-8 text-[#7C2855]" />
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

      {/* ── CTA Final ── */}
      <div className="mt-16 mb-8 text-center">
        <div className="bg-linear-to-r from-[#7C2855]/5 via-[#D4AF37]/5 to-[#7C2855]/5 rounded-3xl p-10 sm:p-14 border border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            ¿Listo para comenzar?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            Accede a tu panel docente y comienza a gestionar tus planificaciones
            y recursos educativos.
          </p>
          <Link
            to="/auth/login"
            id="login-cta-bottom"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-[#7C2855] to-[#5a1d3f] text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <AcademicCapIcon className="w-6 h-6" />
            Iniciar Sesión como Docente
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  )
}
