import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CFormCheck } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAt, cilCheck, cilLockLocked, cilUser } from '@coreui/icons'
import '../scss/examples.scss'
import '../scss/style.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import RingLoader from '../components/RingLoader'
import { useNavigate } from 'react-router-dom'
import '../views/responsive.css'


const ForgotPassword = () => {

    const navigator = useNavigate()
    const [loading, setLoading] = useState(false)
    const [selectedOption, setSelectedOption] = useState('1')
    const [email, setEmail] = useState('')
    const [password, setPasswords] = useState({
        password: '',
        reenterpassword: ''
    })
    const [hiddenFields, setHiddenFields] = useState(false)

    const handleSelectedOption = (e) => {
        setSelectedOption(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        if (selectedOption == 1) {
            if (!email) {
                setLoading(false)
                Swal.fire({
                    title: 'Error',
                    text: 'No inputs provided',
                    confirmButtonText: 'Try Again'
                })
                return
            }

            axios.post('http://localhost:8000/api/forgot-password', { email: email }).then(res => {
                if (res.data.status === 409) {
                    Swal.fire({
                        title: 'Error',
                        text: res.data.message,
                        confirmButtonText: 'Try Again'
                    })
                }
                else if (res.data.status === 200) {
                    Swal.fire({
                        title: 'Success',
                        text: res.data.message,
                        confirmButtonText: 'Ok'
                    })
                    setHiddenFields(true)
                }
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        }
        else if (selectedOption == 2) {
            console.log('patient')
        }
    }

    const handlePasswordChange = (e) => {
        setPasswords({ ...password, [e.target.name]: e.target.value })
    }

    const handlePasswordUpdate = () => {
        if (password.password !== password.reenterpassword) {
            Swal.fire({
                title: 'Password Mismatch',
                text: 'The passwords you entered do not match. Please re-enter them correctly.',
                confirmButtonText: 'Try Again'
            })
        }
        else {
            setLoading(true)
            const data = {
                email: email,
                password: password.password,
                role: selectedOption
            }
            axios.post('http://localhost:8000/api/update-password', data)
                .then(res => {
                    if (res.data.status === 403) {
                        let errorMessages = Object.values(res.data.validationErrors).flat().join('\n');
                        if (res.data.status === 403) {
                            Swal.fire({
                                title: res.data.message,
                                text: errorMessages,
                                confirmButtonText: "Try again"
                            })
                        }
                    }
                    else if (res.data.status === 200) {
                        Swal.fire({
                            title: res.data.message,
                            text: res.data.data,
                            confirmButtonText: 'Ok'
                        }).then(() => {
                            navigator('/login')
                        })

                    }
                })
                .catch(err => { console.log(err) }).finally(() => setLoading(false))
        }
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
                                        <CForm onSubmit={handleSubmit}>
                                            <h1>Reset Password</h1>
                                            {hiddenFields ? (
                                                <p className="text-body-secondary">Enter New Password.</p>

                                            ) : (
                                                <p className="text-body-secondary">Your registered email please!</p>
                                            )}

                                            {hiddenFields ? (
                                                <>

                                                    <CInputGroup className="mb-3">
                                                        <CInputGroupText>
                                                            <CIcon icon={cilLockLocked} />
                                                        </CInputGroupText>
                                                        <CFormInput onChange={handlePasswordChange} type="password" placeholder="New Password" name="password" autoComplete='new-password' value={password.password} />
                                                    </CInputGroup>
                                                    <CInputGroup className="mb-3">
                                                        <CInputGroupText>
                                                            <CIcon icon={cilCheck} />
                                                        </CInputGroupText>
                                                        <CFormInput onChange={handlePasswordChange} type='password' placeholder='Re Enter Password' name='reenterpassword' value={password.reenterpassword} />
                                                    </CInputGroup>
                                                </>

                                            ) : (
                                                <>

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
                                                        <CFormInput onChange={handleEmailChange} type="email" placeholder="Email" autoComplete="username" name="email" />
                                                    </CInputGroup>
                                                </>
                                            )}



                                            <CRow>
                                                <CCol xs={6}>
                                                    {hiddenFields ? (
                                                        <CButton onClick={handlePasswordUpdate} color="primary" className="px-4" disabled={loading}>
                                                            {loading ? (
                                                                <span>
                                                                    <RingLoader />
                                                                </span>

                                                            ) : (
                                                                <span>
                                                                    Update Password
                                                                </span>
                                                            )}
                                                        </CButton>
                                                    ) : (

                                                        <CButton type="submit" color="primary" className="px-4" disabled={loading}>
                                                            {loading ? (
                                                                <span>
                                                                    <RingLoader />
                                                                </span>

                                                            ) : (
                                                                <span>
                                                                    Check Email
                                                                </span>

                                                            )}
                                                        </CButton>
                                                    )}
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div >
        </>
    )
}

export default ForgotPassword
