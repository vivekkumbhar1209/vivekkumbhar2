import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'
import PrivateRoute from './PrivateRoute'
import ViewAllDiseases from './views/HMS_Components/Components/ViewAllDiseases'//dhanu
import EditDiseaseForm from './views/HMS_Components/Components/EditDiseaseForm'//dhanu
import { ToastContainer } from 'react-toastify'//dhanu
import 'react-toastify/dist/ReactToastify.css'//dhanu

// Inside your JSX tree (e.g. end of return block):
<ToastContainer position="top-right" autoClose={3000} />

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          {/* 🔸 Manage Disease Routes done by dhanu*/}
        <Route path="/dashboard/manageDiseases/edit" element={<EditDiseaseForm />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/*" name="Home" element={<DefaultLayout />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
         
      </Suspense>
    </HashRouter>
  )
}

export default App
