import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardView'
import ProtectedRoute from './routes/ProtectedRoute'
import { MainLayout } from './components/layout/MainLayout'
import Members from "./pages/Members";
import Staff from './pages/Staff'
import Equipments from './pages/Equipment';
import Plan from './pages/Plan'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<MainLayout/>}>
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>} 
          />
        <Route path="/members" element={<Members />} />
        <Route path="/staffs" element={<Staff />} />
        <Route path="/equipments" element={<Equipments />} />
        <Route path="/plan" element={<Plan />} />
      </Route>
    </Routes>
     <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover
      />
    </>
    
  )
}