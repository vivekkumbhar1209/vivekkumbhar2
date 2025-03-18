import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import RingLoader from '../../../components/RingLoader'
import '../../../scss/examples.scss'
import '../../../scss/style.scss'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    axios
      .post('http://localhost:8000/api/login', formData)
      .then((res) => {
        if (res.data.validationError) {
          let errorMessages = Object.values(res.data.validationError).flat().join('\n')
          Swal.fire({
            title: 'Validation Errors',
            text: errorMessages,
            confirmButtonText: 'Ok',
          })
          setLoading(false)

          // setValidationErrors(res.data.validationError)
          // setTimeout(() => setValidationErrors({}), 3000)
        } else if (res.data.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Credentials',
            text: res.data.message,
          })
          setLoading(false)
        } else if (res.data.status === 200) {
          console.log(res.data.message)
          localStorage.setItem('login-token', res.data.token)
          localStorage.setItem('userData', JSON.stringify(res.data.userData))
          navigate('/dashboard/dashboard')
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="text-white bg-primary py-5" style={{ width: '100%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Sign in to access your dashboard</p>
                      <Link to="/dashboard/dashboard">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-body-secondary">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput onChange={handleChange} type="email" placeholder="Email" autoComplete="username" name="email" />
                      </CInputGroup>
                      {/* {validationErrors && <p style={{ color: 'red' }}>{validationErrors.email}</p>} */}
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput type="password" placeholder="Password" autoComplete="current-password" name="password" onChange={handleChange} />
                      </CInputGroup>
                      {/* {validationErrors && <p style={{ color: 'red' }}>{validationErrors.password}</p>} */}
                      <CRow>
                        <CCol xs={6}>
                          <CButton type="submit" color="primary" className="px-4" disabled={loading}>
                            {loading ? (
                              <span>
                                <RingLoader />
                              </span>
                            ) : (
                              <span>Login</span>
                            )}
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <Link to={'/forgot-password'} color="link" className="px-0">
                            Forgot password?
                          </Link>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login
