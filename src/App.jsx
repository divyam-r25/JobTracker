import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AppLayout } from './components/Layout/AppLayout'
import 'react-toastify/dist/ReactToastify.css'

const DashboardPage = lazy(() =>
  import('./pages/Dashboard/Dashboard').then((module) => ({ default: module.DashboardPage })),
)
const ApplicationsPage = lazy(() =>
  import('./pages/Applications/Applications').then((module) => ({
    default: module.ApplicationsPage,
  })),
)
const AddApplicationPage = lazy(() =>
  import('./pages/AddApplication/AddApplication').then((module) => ({
    default: module.AddApplicationPage,
  })),
)
const EditApplicationPage = lazy(() =>
  import('./pages/EditApplication/EditApplication').then((module) => ({
    default: module.EditApplicationPage,
  })),
)
const AnalyticsPage = lazy(() =>
  import('./pages/Analytics/Analytics').then((module) => ({ default: module.AnalyticsPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFound').then((module) => ({ default: module.NotFoundPage })),
)

function RouteLoader() {
  return <div className="route-loader">Loading page...</div>
}

function App() {
  return (
    <>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/applications/new" element={<AddApplicationPage />} />
            <Route path="/applications/:id" element={<EditApplicationPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>

      <ToastContainer
        position="bottom-right"
        autoClose={2600}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
