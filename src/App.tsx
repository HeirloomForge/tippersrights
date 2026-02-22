import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import PageTransition from './components/shared/PageTransition'
import Landing from './pages/Landing'
import BillOfRights from './pages/BillOfRights'
import HallOfAbsurdity from './pages/HallOfAbsurdity'
import Directory from './pages/Directory'
import Certification from './pages/Certification'
import Education from './pages/Education'
import EmployeeSafeSpace from './pages/EmployeeSafeSpace'
import Shop from './pages/Shop'
import PaymentGuidelines from './pages/PaymentGuidelines'
import Movement from './pages/Movement'

function AppRoutes() {
  const location = useLocation()

  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/billofrights" element={<BillOfRights />} />
        <Route path="/hall-of-absurdity" element={<HallOfAbsurdity />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/certification" element={<Certification />} />
        <Route path="/education" element={<Education />} />
        <Route path="/employee-safe-space" element={<EmployeeSafeSpace />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/payment-guidelines" element={<PaymentGuidelines />} />
        <Route path="/movement" element={<Movement />} />
      </Routes>
    </PageTransition>
  )
}

function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  )
}

export default App
