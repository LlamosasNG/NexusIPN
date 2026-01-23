import LoginView from '@/views/auth/LoginView'
import RegisterView from '@/views/auth/RegisterView'
import AuthLayout from '@/views/layouts/AuthLayout'
import { BrowserRouter, Route, Routes } from 'react-router'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import RequestNewCodeView from './views/auth/RequestNewCodeView'
import DashboardView from './views/DashboardView'
import AppLayout from './views/layouts/AppLayout'
import RegisterCodeView from './views/students/RegisterCodeView'
import UserLayout from './views/layouts/UserLayout'
import HomeTeacherView from './views/teacher/HomeTeacherView'

export default function Router() {
  return (
    <BrowserRouter>
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
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} />
          <Route path="/register-code" element={<RegisterCodeView />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path='/my-home' element={<HomeTeacherView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
