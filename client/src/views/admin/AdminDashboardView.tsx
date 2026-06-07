import { useAuth } from '@/hooks/useAuth'
import { UserGroupIcon } from '@heroicons/react/24/solid'
import { Link, Navigate } from 'react-router'

export default function AdminDashboardView() {
  const { data: user } = useAuth()

  if (!user) return null
  if (user.role !== 'Administrador') return <Navigate to="/my-home" replace />

  return (
    <div className="mx-auto max-w-5xl">
      <section className="overflow-hidden rounded-4xl bg-linear-to-br from-[#7C2855] to-[#5a1d3f] p-10 text-white shadow-xl">
        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
          Administración institucional
        </span>
        <h1 className="mt-5 text-4xl font-bold">
          Gestión de Jefes de Departamento
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-white/85">
          Crea y administra las cuentas responsables de cada academia.
        </p>
        <Link
          to="/admin/department-heads"
          className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-3 font-semibold text-[#7C2855] transition hover:bg-white/90"
        >
          <UserGroupIcon className="h-5 w-5" />
          Administrar jefaturas
        </Link>
      </section>
    </div>
  )
}
