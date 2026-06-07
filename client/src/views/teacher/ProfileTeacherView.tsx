import { getMyDigitalResources } from '@/api/DigitalResourceAPI'
import { getPlannings } from '@/api/PlanningAPI'
import { useAuth } from '@/hooks/useAuth'
import type { DigitalBookResource, PlanningItem } from '@/types'
import {
  getDigitalResourceTitle,
  getDigitalResourceTypeLabel,
} from '@/utils/digitalResource'
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  FolderIcon,
  LockClosedIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'

export default function ProfileTeacherView() {
  const { data: user } = useAuth()

  const { data: planningsData, isLoading: planningsLoading } = useQuery({
    queryKey: ['plannings'],
    queryFn: getPlannings,
    refetchOnWindowFocus: false,
  })

  const { data: digitalResourcesData, isLoading: digitalResourcesLoading } = useQuery({
    queryKey: ['digital-resources'],
    queryFn: getMyDigitalResources,
    refetchOnWindowFocus: false,
    staleTime: 0,
  })

  const plannings: PlanningItem[] = planningsData || []
  const digitalResources: DigitalBookResource[] = digitalResourcesData || []

  const statusColors: Record<string, string> = {
    Borrador: 'bg-yellow-100 text-yellow-800',
    Enviada: 'bg-blue-100 text-blue-800',
    Aprobada: 'bg-green-100 text-green-800',
    Rechazada: 'bg-red-100 text-red-800',
    Desfasado: 'bg-gray-100 text-gray-800',
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (!user) return null

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header del Perfil */}
      <div className="bg-linear-to-r from-[#7C2855] to-[#5a1d3f] rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center ring-4 ring-white/30">
              <UserCircleIcon className="w-20 h-20 text-white" />
            </div>

            {/* Info Principal */}
            <div className="text-center sm:text-left text-white flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold">{user.name}</h1>
              <p className="text-white/80 mt-1 text-lg">{user.role}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3">
                <span className="inline-flex items-center gap-1.5 text-white/70 text-sm">
                  <EnvelopeIcon className="w-4 h-4" />
                  {user.email}
                </span>
                <span className="inline-flex items-center gap-1.5 text-white/70 text-sm">
                  <BuildingLibraryIcon className="w-4 h-4" />
                  {user.academy?.name || 'Sin academia asignada'}
                </span>
              </div>
            </div>

            {/* Badge Rol */}
            <span className="px-4 py-2 bg-[#D4AF37] text-white text-sm font-semibold rounded-full shadow-md">
              {user.role}
            </span>
          </div>
        </div>
        <div className="h-1 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      {/* Datos Institucionales */}
      <div
        id="plannings"
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <BuildingLibraryIcon className="w-6 h-6 text-[#7C2855]" />
              <h2 className="text-xl font-bold text-gray-900">
                Datos Institucionales
              </h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#7C2855]/20 bg-[#7C2855]/8 px-3 py-1.5 text-xs font-bold text-[#7C2855]">
              <LockClosedIcon className="h-4 w-4" />
              Información protegida
            </span>
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <LockClosedIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <p>
              Estos datos son asignados por la institución y no pueden
              modificarse desde tu perfil.
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative flex items-start gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 pr-12">
              <UserCircleIcon className="w-6 h-6 text-[#7C2855] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Nombre completo
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {user.name}
                </p>
              </div>
              <span
                className="absolute right-3 top-3 text-gray-400"
                title="Dato no editable"
                aria-label="Dato no editable"
              >
                <LockClosedIcon className="h-5 w-5" />
              </span>
            </div>

            <div className="relative flex items-start gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 pr-12">
              <EnvelopeIcon className="w-6 h-6 text-[#7C2855] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Correo electrónico
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {user.email}
                </p>
              </div>
              <span
                className="absolute right-3 top-3 text-gray-400"
                title="Dato no editable"
                aria-label="Dato no editable"
              >
                <LockClosedIcon className="h-5 w-5" />
              </span>
            </div>

            <div className="relative flex items-start gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 pr-12">
              <BuildingLibraryIcon className="w-6 h-6 text-[#7C2855] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500">Academia</p>
                <p className="text-base font-semibold text-gray-900">
                  {user.academy?.name || 'Sin academia asignada'}
                </p>
                <p className="text-sm text-gray-500">
                  {user.academy?.description || 'Sin descripción disponible'}
                </p>
              </div>
              <span
                className="absolute right-3 top-3 text-gray-400"
                title="Dato no editable"
                aria-label="Dato no editable"
              >
                <LockClosedIcon className="h-5 w-5" />
              </span>
            </div>

            <div className="relative flex items-start gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 pr-12">
              <AcademicCapIcon className="w-6 h-6 text-[#7C2855] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Unidades de aprendizaje asignadas
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {user.subjects.length}{' '}
                  {user.subjects.length === 1 ? 'unidad de aprendizaje' : 'unidades de aprendizaje'}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.subjects.map((subject) => (
                    <span
                      key={subject.id}
                      className="px-2.5 py-1 bg-[#7C2855]/10 text-[#7C2855] text-xs font-medium rounded-full"
                    >
                      {subject.name}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className="absolute right-3 top-3 text-gray-400"
                title="Dato no editable"
                aria-label="Dato no editable"
              >
                <LockClosedIcon className="h-5 w-5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Planificaciones didácticas */}
      <div
        id="resources"
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DocumentTextIcon className="w-6 h-6 text-[#7C2855]" />
            <h2 className="text-xl font-bold text-gray-900">
              Planificaciones didácticas
            </h2>
          </div>
          <Link
            to="/select-subject?type=plannings"
            className="px-4 py-2 bg-[#7C2855] text-white text-sm font-medium rounded-lg hover:bg-[#5a1d3f] transition-colors"
          >
            + Nueva
          </Link>
        </div>
        <div className="p-6">
          {planningsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-[#7C2855] border-t-transparent rounded-full mx-auto" />
              <p className="text-gray-500 mt-2">Cargando planificaciones...</p>
            </div>
          ) : plannings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plannings.map((plan) => (
                <Link
                  key={plan.id}
                  to={`/plannings/${plan.id}`}
                  className="group p-5 border border-gray-200 rounded-xl hover:border-[#7C2855] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-[#7C2855]/10 rounded-lg group-hover:bg-[#7C2855]/20 transition-colors">
                      <DocumentTextIcon className="w-5 h-5 text-[#7C2855]" />
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[plan.status] || 'bg-gray-100 text-gray-800'}`}
                      >
                        {plan.status}
                      </span>
                      {plan.isLate && (
                        <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-800">
                          Desfasada
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#7C2855] transition-colors">
                    {plan.subject?.name || 'Unidad de aprendizaje'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Periodo: {plan.period}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <CalendarDaysIcon className="w-3.5 h-3.5" />
                    Actualizada: {formatDate(plan.updatedAt)}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <DocumentTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                No tienes planificaciones creadas aún
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recursos Didácticos */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FolderIcon className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-xl font-bold text-gray-900">
              Recursos Didácticos
            </h2>
          </div>
          <Link
            to="/select-subject?type=resources"
            className="px-4 py-2 bg-[#D4AF37] text-white text-sm font-medium rounded-lg hover:bg-[#b8962e] transition-colors"
          >
            + Nuevo
          </Link>
        </div>
        <div className="p-6">
          {digitalResourcesLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full mx-auto" />
              <p className="text-gray-500 mt-2">Cargando recursos...</p>
            </div>
          ) : digitalResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {digitalResources.map((resource) => (
                <div
                  key={resource.id}
                  className="group p-5 border border-gray-200 rounded-xl hover:border-[#D4AF37] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-[#D4AF37]/10 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors">
                      <FolderIcon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                      {getDigitalResourceTypeLabel(resource.resourceType)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {getDigitalResourceTitle(resource)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {resource.subject?.name || 'Unidad de aprendizaje no disponible'}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <CalendarDaysIcon className="w-3.5 h-3.5" />
                    Actualizado: {formatDate(resource.updatedAt)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FolderIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                No tienes recursos didácticos creados aún
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
