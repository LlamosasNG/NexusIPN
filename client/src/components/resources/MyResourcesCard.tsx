import { getMyDigitalResources } from '@/api/DigitalResourceAPI'
import { LoadingApp } from '@/components/LoadingApp'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { DigitalBookResource } from '@/types'
import {
  getDigitalResourceTitle,
  getDigitalResourceTypeLabel,
} from '@/utils/digitalResource'
import {
  ArrowRightIcon,
  BookOpenIcon,
  FolderIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'

const getSavedSectionsCount = (resource: DigitalBookResource) =>
  Object.values(resource.savedSections).filter(Boolean).length

export function MyResourcesCard() {
  const { data: resources, isLoading } = useQuery({
    queryKey: ['digital-resources'],
    queryFn: getMyDigitalResources,
    refetchOnWindowFocus: false,
    staleTime: 0,
  })

  if (isLoading) {
    return (
      <Card className="border-2 border-[#D4AF37]/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderIcon className="w-6 h-6 text-[#D4AF37]" />
            Mis RDDs
          </CardTitle>
          <CardDescription>
            Recursos didácticos digitales que has creado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingApp />
        </CardContent>
      </Card>
    )
  }

  if (!resources || resources.length === 0) {
    return (
      <Card className="border-2 border-[#D4AF37]/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderIcon className="w-6 h-6 text-[#D4AF37]" />
            Mis RDDs
          </CardTitle>
          <CardDescription>No tienes recursos didácticos creados</CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            to="/select-subject?type=resources"
            className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2 font-medium text-white transition-colors hover:bg-[#b8962e]"
          >
            <PlusIcon className="w-5 h-5" />
            Crear mi primer RDD
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-[#D4AF37]/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderIcon className="w-6 h-6 text-[#D4AF37]" />
          Mis RDDs ({resources.length})
        </CardTitle>
        <CardDescription>
          Continúa editando tus recursos didácticos digitales
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center justify-between rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100"
          >
            <div className="min-w-0 flex-1">
              <h4 className="truncate font-semibold text-gray-900">
                {getDigitalResourceTitle(resource)}
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <span className="text-sm text-gray-500">
                  {resource.subject?.name || 'Materia no disponible'}
                </span>
                <span className="text-sm text-gray-500">
                  {resource.subject?.code || 'N/D'}
                </span>
                <span className="rounded-full bg-[#7C2855]/10 px-2 py-0.5 text-xs font-medium text-[#7C2855]">
                  {getDigitalResourceTypeLabel(resource.resourceType)}
                </span>
                <span className="rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-xs font-medium text-[#7C2855]">
                  {getSavedSectionsCount(resource)} secciones
                </span>
              </div>
            </div>
            <div className="ml-4 flex shrink-0 flex-col gap-2 sm:flex-row">
              <Link
                to={
                  resource.publicSlug
                    ? `/r/${resource.publicSlug}`
                    : `/resources/view/${resource.subjectId}/${resource.resourceType}`
                }
              >
                <Button
                  variant="outline"
                  className="border-[#D4AF37] text-[#7C2855] hover:bg-[#D4AF37] hover:text-white"
                >
                  {resource.publicSlug ? 'Ver público' : 'Ver recurso'}
                  <BookOpenIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={`/resources/create/${resource.subjectId}/${resource.resourceType}`}>
              <Button
                variant="outline"
                className="border-[#7C2855] text-[#7C2855] hover:bg-[#7C2855] hover:text-white"
              >
                Continuar
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
