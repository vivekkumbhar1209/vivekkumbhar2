import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CFormCheck } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAt, cilUser } from '@coreui/icons'
import '../scss/examples.scss'
import '../scss/style.scss'

const ForgotPassword = () => {

    const [selectedOption, setSelectedOption] = useState('1')

    const handleSelectedOption = (e) => {
        setSelectedOption(e.target.value)
    }

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
                                            <p>Reset password using email.</p>
                                        </div>
                                    </CCardBody>
                                </CCard>

                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm>
                                            <h1>Reset Password</h1>
                                            <p className="text-body-secondary">Your registered email please!</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <div className="d-flex align-items-center px-3">
                                                    <CFormCheck
                                                        type="radio"
                                                        name="exampleRadios"
                                                        id="exampleRadios1"
                                                        value="1"
                                                        label="Employee"
                                                        className="me-3"
                                                        onChange={handleSelectedOption}
                                                        checked={selectedOption === '1'}
                                                    />
                                                    <CFormCheck
                                                        type="radio"
                                                        name="exampleRadios"
                                                        id="exampleRadios2"
                                                        value="2"
                                                        label="Patient"
                                                        className="me-3"
                                                        onChange={handleSelectedOption}
                                                        checked={selectedOption === '2'}
                                                    />
                                                </div>
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilAt} />
                                                </CInputGroupText>
                                                <CFormInput type="email" placeholder="Email" autoComplete="username" name="email" />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={6}>
                                                    <CButton type="submit" color="primary" className="px-4">
                                                        Send OTP
                                                    </CButton>
                                                </CCol>

                                                <p>Selected Option - {selectedOption}</p>
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
