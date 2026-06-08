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
  AcademicCapIcon,
  ArrowPathIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  IdentificationIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  PlusIcon,
  UserPlusIcon,
  UserGroupIcon,
  XMarkIcon,
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
      <header className="relative overflow-hidden rounded-4xl bg-[#5a1d3f] p-8 text-white shadow-xl">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[42px] border-white/5" />
        <div className="absolute bottom-0 right-28 h-24 w-40 -skew-x-12 bg-[#D4AF37]/15" />
        <div className="relative flex items-center gap-4">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-3 shadow-inner backdrop-blur-sm">
            <UserGroupIcon className="h-8 w-8 text-[#f2d77d]" />
          </div>
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-[#f2d77d]">
              Administración de identidades
            </p>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-1 text-white/80">
              {isAdmin
                ? 'Administra una jefatura activa por academia.'
                : `Administra docentes de ${currentUser.academy?.name || 'tu academia'}.`}
            </p>
          </div>
        </div>
      </header>

      <div className="grid items-start gap-8 xl:grid-cols-[430px_1fr]">
        <form
          onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
          className="relative h-fit overflow-hidden rounded-3xl border border-[#7C2855]/15 bg-white shadow-[0_20px_60px_-32px_rgba(90,29,63,0.45)] xl:sticky xl:top-6"
        >
          <div className="h-1.5 bg-linear-to-r from-[#7C2855] via-[#D4AF37] to-[#7C2855]" />
          <div className="relative overflow-hidden bg-[#fffaf3] px-6 py-6">
            <div className="absolute -right-6 -top-8 h-28 w-28 rotate-12 rounded-3xl border-2 border-[#D4AF37]/20" />
            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7C2855] text-white shadow-lg shadow-[#7C2855]/20">
                {editingUser ? (
                  <PencilSquareIcon className="h-6 w-6" />
                ) : (
                  <UserPlusIcon className="h-6 w-6" />
                )}
              </div>
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-gray-950">
                    {editingUser
                      ? `Editar ${itemLabel}`
                      : `Registrar ${itemLabel}`}
                  </h2>
                  <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7C2855]">
                    {editingUser ? 'Modo edición' : 'Nueva cuenta'}
                  </span>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-gray-600">
                  {editingUser
                    ? 'Actualiza la información institucional y guarda los cambios.'
                    : 'Captura los datos institucionales para generar el acceso al sistema.'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div className="space-y-2">
              <Label
                htmlFor="managed-name"
                className="font-semibold text-gray-800"
              >
                Nombre completo
              </Label>
              <div className="relative">
                <IdentificationIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7C2855]" />
                <Input
                  id="managed-name"
                  placeholder="Nombre y apellidos"
                  aria-invalid={Boolean(errors.name)}
                  className="h-12 rounded-xl border-gray-300 bg-gray-50/60 pl-11 shadow-none transition-colors focus-visible:border-[#7C2855] focus-visible:bg-white focus-visible:ring-[#7C2855]/15"
                  {...register('name', {
                    required: 'El nombre es obligatorio',
                  })}
                />
              </div>
              {errors.name && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-red-600">
                  <InformationCircleIcon className="h-4 w-4" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="managed-email"
                className="font-semibold text-gray-800"
              >
                Correo electrónico institucional
              </Label>
              <div className="relative">
                <EnvelopeIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7C2855]" />
                <Input
                  id="managed-email"
                  type="email"
                  placeholder="usuario@ipn.mx"
                  aria-invalid={Boolean(errors.email)}
                  className="h-12 rounded-xl border-gray-300 bg-gray-50/60 pl-11 shadow-none transition-colors focus-visible:border-[#7C2855] focus-visible:bg-white focus-visible:ring-[#7C2855]/15"
                  {...register('email', {
                    required: 'El correo es obligatorio',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'El correo electrónico no es válido',
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-red-600">
                  <InformationCircleIcon className="h-4 w-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {isAdmin ? (
              <div className="space-y-2">
                <Label
                  htmlFor="managed-academy"
                  className="font-semibold text-gray-800"
                >
                  Academia asignada
                </Label>
                <div className="relative">
                  <BuildingLibraryIcon className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-[#7C2855]" />
                  <select
                    id="managed-academy"
                    aria-invalid={Boolean(errors.academyId)}
                    className="h-12 w-full appearance-none rounded-xl border border-gray-300 bg-gray-50/60 pl-11 pr-10 text-sm text-gray-800 outline-none transition-all focus:border-[#7C2855] focus:bg-white focus:ring-3 focus:ring-[#7C2855]/15"
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
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#7C2855]">
                    ▼
                  </span>
                </div>
                {errors.academyId && (
                  <p className="flex items-center gap-1.5 text-sm font-medium text-red-600">
                    <InformationCircleIcon className="h-4 w-4" />
                    {errors.academyId.message}
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label
                    htmlFor="managed-period"
                    className="font-semibold text-gray-800"
                  >
                    Periodo académico
                  </Label>
                  <div className="relative">
                    <CalendarDaysIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7C2855]" />
                    <Input
                      id="managed-period"
                      placeholder="2026-1"
                      aria-invalid={Boolean(errors.period)}
                      className="h-12 rounded-xl border-gray-300 bg-gray-50/60 pl-11 shadow-none transition-colors focus-visible:border-[#7C2855] focus-visible:bg-white focus-visible:ring-[#7C2855]/15"
                      {...register('period', {
                        required: 'El periodo es obligatorio',
                        pattern: {
                          value: /^\d{4}-[12]$/,
                          message: 'Usa el formato YYYY-S',
                        },
                      })}
                    />
                  </div>
                  {errors.period && (
                    <p className="flex items-center gap-1.5 text-sm font-medium text-red-600">
                      <InformationCircleIcon className="h-4 w-4" />
                      {errors.period.message}
                    </p>
                  )}
                </div>

                <fieldset className="space-y-3">
                  <legend className="sr-only">
                    Unidades de aprendizaje asignadas
                  </legend>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <AcademicCapIcon className="h-5 w-5 text-[#7C2855]" />
                      Unidades de aprendizaje
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        selectedCount > 5
                          ? 'bg-red-100 text-red-700'
                          : 'bg-[#7C2855]/10 text-[#7C2855]'
                      }`}
                    >
                      {selectedCount}/5
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-500">
                    Selecciona hasta cinco unidades que impartirá el docente.
                  </p>
                  <div className="max-h-72 space-y-2 overflow-y-auto rounded-2xl border border-gray-200 bg-gray-50/70 p-2">
                    {subjects.length === 0 ? (
                      <div className="px-4 py-8 text-center">
                        <AcademicCapIcon className="mx-auto h-8 w-8 text-gray-300" />
                        <p className="mt-2 text-sm text-gray-500">
                          No hay unidades disponibles en esta academia.
                        </p>
                      </div>
                    ) : (
                      subjects.map((subject) => {
                        const isSelected = selectedSubjectIds
                          .map(Number)
                          .includes(subject.id)

                        return (
                          <label
                            key={subject.id}
                            className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all ${
                              isSelected
                                ? 'border-[#7C2855]/30 bg-white shadow-sm'
                                : 'border-transparent hover:border-gray-200 hover:bg-white'
                            }`}
                          >
                            <input
                              type="checkbox"
                              value={subject.id}
                              className="peer sr-only"
                              {...register('subjectIds', {
                                required:
                                  'Selecciona al menos una unidad de aprendizaje',
                                validate: (values) =>
                                  (values && values.length <= 5) ||
                                  'Solo puedes seleccionar hasta 5',
                              })}
                            />
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                isSelected
                                  ? 'border-[#7C2855] bg-[#7C2855] text-white'
                                  : 'border-gray-300 bg-white text-transparent group-hover:border-[#7C2855]/50'
                              }`}
                            >
                              <CheckCircleIcon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 text-sm leading-snug text-gray-700">
                              <strong className="mb-0.5 block text-xs uppercase tracking-wide text-[#7C2855]">
                                {subject.code}
                              </strong>
                              {subject.name}
                            </span>
                          </label>
                        )
                      })
                    )}
                  </div>
                  {errors.subjectIds && (
                    <p className="flex items-center gap-1.5 text-sm font-medium text-red-600">
                      <InformationCircleIcon className="h-4 w-4" />
                      {errors.subjectIds.message}
                    </p>
                  )}
                </fieldset>
              </>
            )}

            {!editingUser && (
              <div className="flex gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-sm leading-relaxed text-sky-900">
                <InformationCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
                <p>
                  Se generará una contraseña temporal y se enviarán las
                  credenciales al correo registrado.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/80 px-6 py-5 sm:flex-row">
            {editingUser && (
              <Button
                type="button"
                variant="outline"
                onClick={cancelEdit}
                className="h-11 flex-1 rounded-xl border-gray-300 bg-white"
              >
                <XMarkIcon className="h-4 w-4" />
                Cancelar
              </Button>
            )}
            <Button
              type="submit"
              disabled={saveMutation.isPending}
              className="h-11 flex-1 rounded-xl bg-[#7C2855] font-semibold text-white shadow-lg shadow-[#7C2855]/15 hover:bg-[#5a1d3f]"
            >
              {editingUser ? (
                <CheckCircleIcon className="h-5 w-5" />
              ) : (
                <PlusIcon className="h-5 w-5" />
              )}
              {saveMutation.isPending
                ? 'Guardando...'
                : editingUser
                  ? 'Guardar cambios'
                  : `Crear ${itemLabel}`}
            </Button>
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
