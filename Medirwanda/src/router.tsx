import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import Home from './pages/public/Home'
import PatientDashboard from './pages/patient/Dashboard'
import DoctorDashboard from './pages/doctor/Dashboard'
import CreatePrescription from './pages/doctor/CreatePrescription'
import PharmacyDashboard from './pages/pharmacy/Dashboard'
import DeliveryDashboard from './pages/delivery/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'patient', element: <PatientDashboard /> },
      { path: 'doctor', element: <DoctorDashboard /> },
      { path: 'doctor/create-prescription', element: <CreatePrescription /> },
      { path: 'pharmacy', element: <PharmacyDashboard /> },
      { path: 'delivery', element: <DeliveryDashboard /> },
      { path: 'admin', element: <AdminDashboard /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
])