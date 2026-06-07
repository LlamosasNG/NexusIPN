import { useAuth } from '@/hooks/useAuth'
import DepartmentHeadDashboardView from './departmentHead/DepartmentHeadDashboardView'
import HomeTeacherView from './teacher/HomeTeacherView'
import AdminDashboardView from './admin/AdminDashboardView'

export default function RoleHomeView() {
  const { data } = useAuth()

  if (!data) return null

  if (data.role === 'Jefe de Departamento') {
    return <DepartmentHeadDashboardView />
  }

  if (data.role === 'Administrador') {
    return <AdminDashboardView />
  }

  return <HomeTeacherView />
}
