import { getPlannings } from '@/api/PlanningAPI'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoadingApp } from '@/components/LoadingApp'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import {
  ArrowRightIcon,
  DocumentTextIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'

const statusColors: Record<string, string> = {
  Borrador: 'bg-yellow-100 text-yellow-800',
  Enviada: 'bg-blue-100 text-blue-800',
  Aprobada: 'bg-green-100 text-green-800',
  Rechazada: 'bg-red-100 text-red-800',
  Desfasado: 'bg-gray-100 text-gray-800',
}

export function MyPlanningsCard() {
  const { data: plannings, isLoading } = useQuery({
    queryKey: ['plannings'],
    queryFn: getPlannings,
  })

  if (isLoading) {
    return (
      <Card className="border-2 border-[#7C2855]/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DocumentTextIcon className="w-6 h-6 text-[#7C2855]" />
            Mis Planeaciones
          </CardTitle>
          <CardDescription>
            Planeaciones didácticas que has creado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingApp />
        </CardContent>
      </Card>
    )
  }

  if (!plannings || plannings.length === 0) {
    return (
      <Card className="border-2 border-[#7C2855]/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DocumentTextIcon className="w-6 h-6 text-[#7C2855]" />
            Mis Planeaciones
          </CardTitle>
          <CardDescription>
            No tienes planeaciones creadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            to="/select-subject?type=plannings"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#7C2855] text-white font-medium rounded-lg hover:bg-[#5a1d3f] transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Crear mi primera planeación
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-[#7C2855]/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DocumentTextIcon className="w-6 h-6 text-[#7C2855]" />
          Mis Planeaciones ({plannings.length})
        </CardTitle>
        <CardDescription>
          Continúa editando tus planeaciones didácticas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {plannings.map((planning: any) => (
          <div
            key={planning.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">
                {planning.subject?.name || 'Materia'}
              </h4>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-500">
                  {planning.subject?.code}
                </span>
                <span className="text-sm text-gray-500">
                  {planning.period}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    statusColors[planning.status] || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {planning.status}
                </span>
              </div>
            </div>
            <Link to={`/plannings/${planning.id}`}>
              <Button
                variant="outline"
                className="ml-4 border-[#7C2855] text-[#7C2855] hover:bg-[#7C2855] hover:text-white"
              >
                Continuar
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
