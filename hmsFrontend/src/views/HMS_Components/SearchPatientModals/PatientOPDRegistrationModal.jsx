import React from 'react'
import {
    CModal, CModalHeader, CModalTitle, CModalBody,
    CModalContent
} from '@coreui/react'

const PatientOPDRegistrationModal = ({ patientOPDModelVisibility, setOPDModelVisibility }) => {
    return (
        <>
            <CModal visible={patientOPDModelVisibility} onClose={setOPDModelVisibility}>
                <CModalContent>
                    <CModalHeader>
                        <CModalTitle>OPD Registration</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        Opd registration modal
                    </CModalBody>
                </CModalContent>
            </CModal>
        </>
    )
}

export default PatientOPDRegistrationModal
