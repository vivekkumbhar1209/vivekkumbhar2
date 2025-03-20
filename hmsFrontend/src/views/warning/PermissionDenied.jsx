import React from 'react'
import {
    CContainer,
    CRow,
    CCol,
    CAlert,
    CButton
} from '@coreui/react'
import { cilLockLocked } from "@coreui/icons";
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

const PermissionDenied = () => {
    const navigator = useNavigate()
    return (
        <CContainer className="d-flex justify-content-center align-items-center vh-60">
            <CRow>
                <CCol xs="12">
                    <CAlert color="danger" className="text-center p-4">
                        <CIcon icon={cilLockLocked} size="xl" className="mb-3" />
                        <h4 className="alert-heading">Access Denied!</h4>
                        <p>You do not have permission to access this page.</p>
                        <CButton color="primary" onClick={() => navigator('/dashboard')}>Go to Home</CButton>
                    </CAlert>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default PermissionDenied
