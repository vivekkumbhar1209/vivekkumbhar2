import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import PrivateRoute from './PrivateRoute'
import Website from './website/WebsiteComponent'
import Loader from './components/Loader'

const AllBlogGrid = React.lazy(() => import('./website/src/assets/components/All blogs'))
const EnquiryForm = React.lazy(() => import('./website/src/assets/components/enquiry form/enquiry'))
const Blog = React.lazy(() => import('./website/src/assets/components/Blog'))
const AllDoctors = React.lazy(() => import('./website/src/assets/components/doctorsection/AllDoctors'))
const Speciality = React.lazy(() => import('./website/src/assets/components/Spacialty/Spaciality'))
const Seemore = React.lazy(() => import('./website/src/assets/components/Spacialty/Seemore'))
const AboutUs = React.lazy(() => import('./website/src/assets/pages/About'))
const NavFooter = React.lazy(() => import('./website/src/assets/components/layouts/NavFooter'))

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
          <div className="h-screen flex justify-center items-center">
            <Loader />
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
          <Route path="/allblogs" element={<NavFooter propelement={<AllBlogGrid />} />} />
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
