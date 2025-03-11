import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import PrivateRoute from './PrivateRoute'
import Website from './website/WebsiteComponent'
import AboutUs from './website/src/assets/pages/About'
import NavFooter from './website/src/assets/components/layouts/NavFooter'
import Seemore from './website/src/assets/components/Spacialty/Seemore'
import Speciality from './website/src/assets/components/Spacialty/Spaciality'
import AllDoctors from './website/src/assets/components/doctorsection/AllDoctors'
import Blog from './website/src/assets/components/Blog'
import EnquiryForm from './website/src/assets/components/enquiry form/enquiry'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  useEffect(() => {
    const handlePopState = () => {
      window.location.reload()
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

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
          <Route exact path="/web" name="Website" element={<Website />} />
          <Route path="/blog" element={<NavFooter propelement={<Blog />} />} />
          <Route path="/contact" element={<NavFooter propelement={<EnquiryForm />} />} />
          <Route path="/doctors" element={<NavFooter propelement={<AllDoctors />} />} />
          <Route path="/speciality" element={<NavFooter propelement={<Speciality />} />} />
          <Route path="/seemore" element={<Seemore />} />
          <Route path="/about" element={<NavFooter propelement={<AboutUs />} />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/*" name="Home" element={<DefaultLayout />} />
          </Route>
          <Route path="*" element={<Navigate to="/web" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
