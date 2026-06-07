import { getAcademies } from '@/api/AcademyAPI'
import { getSubjectsByAcademy } from '@/api/SubjectAPI'
import {
  createDepartmentHead,
  createTeacher,
  getDepartmentHeads,
  getTeachers,
  resetManagedUserPassword,
  setManagedUserStatus,
  updateDepartmentHead,
  updateTeacher,
} from '@/api/UserManagementAPI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingApp } from '@/components/LoadingApp'
import { useAuth } from '@/hooks/useAuth'
import type { ManagedUser, ManagedUserInput } from '@/types'
import {
  ArrowPathIcon,
  PencilSquareIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router'
import { toast } from 'sonner'

type Mode = 'admin' | 'department-head'

const currentPeriod = () => {
  const now = new Date()
  return `${now.getFullYear()}-${now.getMonth() < 6 ? 1 : 2}`
}

export default function UserManagementView({ mode }: { mode: Mode }) {
  const { data: currentUser, isLoading: isLoadingUser } = useAuth()
  const queryClient = useQueryClient()
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null)
  const isAdmin = mode === 'admin'
  const queryKey = isAdmin ? ['department-heads'] : ['managed-teachers']

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ManagedUserInput>({
    defaultValues: {
      name: '',
      email: '',
      academyId: undefined,
      subjectIds: [],
      period: currentPeriod(),
    },
  })

  const { data: users = [], isLoading } = useQuery({
    queryKey,
    queryFn: isAdmin ? getDepartmentHeads : getTeachers,
    enabled: Boolean(currentUser),
  })
  const { data: academies = [] } = useQuery({
    queryKey: ['academies'],
    queryFn: getAcademies,
    enabled: isAdmin,
  })
  const academyId = currentUser?.academy?.id
  const { data: subjects = [] } = useQuery({
    queryKey: ['academy-subjects', academyId],
    queryFn: () => getSubjectsByAcademy(academyId as number),
    enabled: !isAdmin && Boolean(academyId),
  })

  const saveMutation = useMutation({
    mutationFn: (input: ManagedUserInput) => {
      if (editingUser) {
        return isAdmin
          ? updateDepartmentHead({ userId: editingUser.id, input })
          : updateTeacher({ userId: editingUser.id, input })
      }
      return isAdmin ? createDepartmentHead(input) : createTeacher(input)
    },
    onSuccess: (response) => {
      toast.success(response?.message || 'Cuenta guardada correctamente')
      if (response?.notificationSent === false) {
        toast.warning('La cuenta se guardó, pero el correo no pudo enviarse')
      }
      queryClient.invalidateQueries({ queryKey })
      cancelEdit()
    },
    onError: (error) => toast.error(error.message),
  })

  const statusMutation = useMutation({
    mutationFn: setManagedUserStatus,
    onSuccess: (response) => {
      toast.success(response?.message || 'Estado actualizado')
      queryClient.invalidateQueries({ queryKey })
    },
    onError: (error) => toast.error(error.message),
  })

  const passwordMutation = useMutation({
    mutationFn: resetManagedUserPassword,
    onSuccess: (response) => {
      toast.success(response?.message || 'Contraseña temporal regenerada')
      if (response?.notificationSent === false) {
        toast.warning('No fue posible enviar las nuevas credenciales')
      }
    },
    onError: (error) => toast.error(error.message),
  })

  const cancelEdit = () => {
    setEditingUser(null)
    reset({
      name: '',
      email: '',
      academyId: undefined,
      subjectIds: [],
      period: currentPeriod(),
    })
  }

  const startEdit = (user: ManagedUser) => {
    setEditingUser(user)
    reset({
      name: user.name,
      email: user.email,
      academyId: user.academyId,
      subjectIds: user.subjects.map((subject) => subject.id),
      period: user.subjects[0]?.UserSubject?.period || currentPeriod(),
    })
  }

  const selectedSubjectIds = watch('subjectIds') || []
  const selectedCount = useMemo(
    () => selectedSubjectIds.map(Number).filter(Number.isFinite).length,
    [selectedSubjectIds]
  )

  if (isLoadingUser || isLoading) return <LoadingApp />
  if (!currentUser) return null

  const hasAccess = isAdmin
    ? currentUser.role === 'Administrador'
    : currentUser.role === 'Jefe de Departamento'
  if (!hasAccess) return <Navigate to="/my-home" replace />

  const title = isAdmin
    ? 'Gestión de Jefes de Departamento'
    : 'Gestión de docentes'
  const itemLabel = isAdmin ? 'Jefe de Departamento' : 'Docente'

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="rounded-4xl bg-linear-to-r from-[#7C2855] to-[#5a1d3f] p-8 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/15 p-3">
            <UserGroupIcon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-1 text-white/80">
              {isAdmin
                ? 'Administra una jefatura activa por academia.'
                : `Administra docentes de ${currentUser.academy?.name || 'tu academia'}.`}
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-8 xl:grid-cols-[380px_1fr]">
        <form
          onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
          className="h-fit space-y-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900">
            {editingUser ? `Editar ${itemLabel}` : `Crear ${itemLabel}`}
          </h2>
          <div className="space-y-2">
            <Label htmlFor="managed-name">Nombre</Label>
            <Input
              id="managed-name"
              {...register('name', { required: 'El nombre es obligatorio' })}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="managed-email">Correo electrónico</Label>
            <Input
              id="managed-email"
              type="email"
              {...register('email', {
                required: 'El correo es obligatorio',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'El correo electrónico no es válido',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {isAdmin ? (
            <div className="space-y-2">
              <Label htmlFor="managed-academy">Academia</Label>
              <select
                id="managed-academy"
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm"
                {...register('academyId', {
                  required: 'La academia es obligatoria',
                  valueAsNumber: true,
                })}
              >
                <option value="">Selecciona una academia</option>
                {academies.map((academy) => (
                  <option key={academy.id} value={academy.id}>
                    {academy.name}
                  </option>
                ))}
              </select>
              {errors.academyId && (
                <p className="text-sm text-red-600">
                  {errors.academyId.message}
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="managed-period">Periodo</Label>
                <Input
                  id="managed-period"
                  placeholder="2026-1"
                  {...register('period', {
                    required: 'El periodo es obligatorio',
                    pattern: {
                      value: /^\d{4}-[12]$/,
                      message: 'Usa el formato YYYY-S',
                    },
                  })}
                />
              </div>
              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold text-gray-900">
                  Unidades de aprendizaje ({selectedCount}/5)
                </legend>
                <div className="max-h-64 space-y-2 overflow-y-auto rounded-xl border border-gray-200 p-3">
                  {subjects.map((subject) => (
                    <label
                      key={subject.id}
                      className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        value={subject.id}
                        className="mt-1 accent-[#7C2855]"
                        {...register('subjectIds', {
                          required:
                            'Selecciona al menos una unidad de aprendizaje',
                          validate: (values) =>
                            (values && values.length <= 5) ||
                            'Solo puedes seleccionar hasta 5',
                        })}
                      />
                      <span className="text-sm">
                        <strong>{subject.code}</strong> · {subject.name}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.subjectIds && (
                  <p className="text-sm text-red-600">
                    {errors.subjectIds.message}
                  </p>
                )}
              </fieldset>
            </>
          )}

          <div className="flex gap-3">
            <Button type="submit" disabled={saveMutation.isPending}>
              {editingUser ? 'Guardar cambios' : `Crear ${itemLabel}`}
            </Button>
            {editingUser && (
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancelar
              </Button>
            )}
          </div>
        </form>

        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-gray-900">
              Cuentas registradas ({users.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No hay cuentas registradas.
              </div>
            ) : (
              users.map((user) => (
                <article
                  key={user.id}
                  className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {user.name}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.isActive
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {user.isActive ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{user.email}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {user.academy?.name || currentUser.academy?.name}
                      {!isAdmin && user.subjects.length > 0
                        ? ` · ${user.subjects.length} unidades · ${user.subjects[0]?.UserSubject?.period || ''}`
                        : ''}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => startEdit(user)}
                    >
                      <PencilSquareIcon className="h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        passwordMutation.mutate({ mode, userId: user.id })
                      }
                    >
                      <ArrowPathIcon className="h-4 w-4" />
                      Regenerar clave
                    </Button>
                    <Button
                      type="button"
                      variant={user.isActive ? 'destructive' : 'default'}
                      onClick={() => {
                        const action = user.isActive ? 'desactivar' : 'reactivar'
                        if (
                          window.confirm(
                            `¿Deseas ${action} la cuenta de ${user.name}?`
                          )
                        ) {
                          statusMutation.mutate({
                            mode,
                            userId: user.id,
                            isActive: !user.isActive,
                          })
                        }
                      }}
                    >
                      {user.isActive ? 'Desactivar' : 'Reactivar'}
                    </Button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
