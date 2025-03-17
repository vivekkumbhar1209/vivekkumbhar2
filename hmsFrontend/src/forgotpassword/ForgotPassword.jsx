import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loader from '../components/Loader'
import '../scss/examples.scss'
import '../scss/style.scss'

const ForgotPassword = () => {
    return (
        <>
            <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={8}>
                            <CCardGroup>
                                <CCard
                                    className="text-white bg-primary d-flex align-items-center justify-content-center py-5"
                                    style={{ width: "100%" }} // Full height of viewport
                                >
                                    <CCardBody className="text-center d-flex align-items-center">
                                        <div>
                                            <h2>Forgot Password?</h2>
                                            <p>Reset password using email</p>
                                        </div>
                                    </CCardBody>
                                </CCard>

                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm>
                                            <h1>Reset Password</h1>
                                            <p className="text-body-secondary">Your registered email please</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput type="email" placeholder="Email" autoComplete="username" name="email" />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={6}>
                                                    <CButton type="submit" color="primary" className="px-4">
                                                        Send OTP
                                                    </CButton>
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

export default ForgotPassword
