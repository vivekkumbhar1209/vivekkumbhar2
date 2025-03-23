import React from 'react'


import {
    CModal, CModalHeader, CModalTitle, CModalBody,
    CModalContent
} from '@coreui/react'

const PatientCardModal = ({ patientCardModelVisibility, setPatientCardModelVisibility, currentData }) => {

    const patientId = currentData.id
    //implement the patient registration card code here

    return (
        <>
            <CModal visible={patientCardModelVisibility} onClose={setPatientCardModelVisibility}>
                <CModalContent>
                    <CModalHeader>
                        <CModalTitle>Patient Card</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        Patient id :- {patientId}
                    </CModalBody>
                </CModalContent>
            </CModal>
        </>
    )
}

export default PatientCardModal
