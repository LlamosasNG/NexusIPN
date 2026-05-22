import AuthLayout from '@/layouts/AuthLayout'
import LoginView from '@/views/auth/LoginView'
import RegisterView from '@/views/auth/RegisterView'
import ProfileTeacherView from '@/views/teacher/ProfileTeacherView'
import MyPlanningsView from '@/views/teacher/MyPlanningsView'
import MyResourcesView from '@/views/teacher/MyResourcesView'
import { useEffect } from 'react'
import { BrowserRouter, matchPath, Route, Routes, useLocation } from 'react-router'
import AppLayout from './layouts/AppLayout'
import UserLayout from './layouts/UserLayout'
import RoleHomeView from './views/RoleHomeView'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import RequestNewCodeView from './views/auth/RequestNewCodeView'
import TermsAndConditionsView from './views/auth/TermsAndConditionsView'
import DashboardView from './views/DashboardView'
import DepartmentHeadDashboardView from './views/departmentHead/DepartmentHeadDashboardView'
import DepartmentHeadPlanningsView from './views/departmentHead/DepartmentHeadPlanningsView'
import DepartmentHeadPlanningViewerView from './views/departmentHead/DepartmentHeadPlanningViewerView'
import ConfirmPlanningView from './views/plannings/ConfirmPlanningView'
import CreatePlanningView from './views/plannings/CreatePlanningView'
import CreateDigitalBookView from './views/resources/CreateDigitalBookView'
import DigitalResourceReaderView from './views/resources/DigitalResourceReaderView'
import SelectResourceTypeView from './views/resources/SelectResourceTypeView'
import RegisterCodeView from './views/students/RegisterCodeView'
import SelectSubjectView from './views/subjects/SelectSubjectView'

const APP_TITLE_SUFFIX = 'ENHM'

const resourceTypeTitle: Record<string, string> = {
  'digital-book': 'Libro Digital',
  'interactive-digital-book': 'Libro Digital Interactivo',
  'learning-object': 'Objeto de Aprendizaje',
}

const staticRouteTitles: Record<string, string> = {
  '/': 'Inicio',
  '/auth/login': 'Ingresa al sitio',
  '/auth/register': 'Crear cuenta',
  '/auth/confirm-account': 'Confirmar cuenta',
  '/auth/request-new-code': 'Solicitar nuevo código',
  '/auth/forgot-password': 'Recuperar contraseña',
  '/auth/reset-password': 'Restablecer contraseña',
  '/auth/terms': 'Términos y Condiciones',
  '/terminos': 'Términos y Condiciones',
  '/register-code': 'Registro de código',
  '/my-home': 'Panel principal',
  '/department-head/dashboard': 'Panel de Jefatura',
  '/department-head/plannings': 'Planeaciones docentes',
  '/my-plannings': 'Mis planeaciones',
  '/my-resources': 'Mis recursos didácticos',
  '/my-profile': 'Mi perfil',
}

function getRouteTitle(pathname: string, search: string) {
  const staticTitle = staticRouteTitles[pathname]
  if (staticTitle) return staticTitle

  if (pathname === '/select-subject') {
    const type = new URLSearchParams(search).get('type')
    return type === 'resources'
      ? 'Seleccionar materia para RDD'
      : 'Seleccionar materia para planeación'
  }

  if (matchPath('/department-head/plannings/:planningId', pathname)) {
    return 'Revisión de planeación'
  }

  if (matchPath('/plannings/create/:subjectId', pathname)) {
    return 'Crear planeación didáctica'
  }

  if (matchPath('/plannings/:planningId', pathname)) {
    return 'Planeación didáctica'
  }

  if (matchPath('/resources/create/:subjectId', pathname)) {
    return 'Seleccionar tipo de RDD'
  }

  const createResourceMatch = matchPath(
    '/resources/create/:subjectId/:resourceType',
    pathname
  )
  if (createResourceMatch?.params.resourceType) {
    const typeLabel =
      resourceTypeTitle[createResourceMatch.params.resourceType] ??
      'Recurso Didáctico Digital'
    return `Crear ${typeLabel}`
  }

  const viewResourceMatch = matchPath(
    '/resources/view/:subjectId/:resourceType',
    pathname
  )
  if (viewResourceMatch?.params.resourceType) {
    const typeLabel =
      resourceTypeTitle[viewResourceMatch.params.resourceType] ??
      'Recurso Didáctico Digital'
    return `Ver ${typeLabel}`
  }

  if (matchPath('/r/:publicSlug', pathname)) {
    return 'Recurso Didáctico Digital'
  }

  return 'Nexus IPN'
}

function PageTitleManager() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    document.title = `${getRouteTitle(pathname, search)} | ${APP_TITLE_SUFFIX}`
  }, [pathname, search])

  return null
}

export default function Router() {
  return (
    <BrowserRouter>
      <PageTitleManager />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route
            path="/auth/request-new-code"
            element={<RequestNewCodeView />}
          />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/reset-password" element={<NewPasswordView />} />
        </Route>
        <Route path="/auth/terms" element={<TermsAndConditionsView />} />
        <Route path="/terminos" element={<TermsAndConditionsView />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} />
          <Route path="/register-code" element={<RegisterCodeView />} />
        </Route>
        <Route
          path="/r/:publicSlug"
          element={<DigitalResourceReaderView />}
        />
        <Route element={<UserLayout />}>
          <Route path="/my-home" element={<RoleHomeView />} />
          <Route
            path="/department-head/dashboard"
            element={<DepartmentHeadDashboardView />}
          />
          <Route
            path="/department-head/plannings"
            element={<DepartmentHeadPlanningsView />}
          />
          <Route
            path="/department-head/plannings/:planningId"
            element={<DepartmentHeadPlanningViewerView />}
          />
          <Route path="/my-plannings" element={<MyPlanningsView />} />
          <Route path="/my-resources" element={<MyResourcesView />} />
          <Route path="/select-subject" element={<SelectSubjectView />} />
          <Route
            path="/plannings/create/:subjectId"
            element={<ConfirmPlanningView />}
          />
          <Route
            path="/resources/create/:subjectId"
            element={<SelectResourceTypeView />}
          />
          <Route
            path="/resources/create/:subjectId/:resourceType"
            element={<CreateDigitalBookView />}
          />
          <Route
            path="/resources/view/:subjectId/:resourceType"
            element={<DigitalResourceReaderView />}
          />
          <Route path="/my-profile" element={<ProfileTeacherView />} />
          <Route
            path="/plannings/:planningId"
            element={<CreatePlanningView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
