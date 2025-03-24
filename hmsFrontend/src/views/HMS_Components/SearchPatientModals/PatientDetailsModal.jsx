import React from 'react'

import {
    CModal, CModalHeader, CModalTitle, CModalBody,
    CModalContent,
    CTable, CTableDataCell, CTableBody, CTableRow,
    CButton
} from '@coreui/react'
import { Hash, User, Phone, Mail, MapPin, Calendar, Venus, Mars } from "lucide-react";
import { formatDate } from '../../../dateUtility'
import Swal from 'sweetalert2'


const PatientDetailsModal = ({ patientDetailModelVisibility, setPatientDetailModelVisibility, currentData }) => {
    const handleCopy = (inputValue) => {
        const stringValue = String(inputValue)
        navigator.clipboard.writeText(stringValue).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Copied',
                text: `Copied to clipboard`,
                confirmButtonText: 'Ok'
            })
        })
    }

    return (
        <>

            {console.log(currentData)}
            <CModal visible={patientDetailModelVisibility} onClose={setPatientDetailModelVisibility}>
                <CModalContent>
                    <CModalHeader>
                        <CModalTitle>Patient Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CTable className='border' responsive hover>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        <div className="d-flex align-items-center">
                                            <Hash size={20} className="text-primary me-2" />
                                            <strong>ID:</strong>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>{currentData?.id || "N/A"}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton onClick={() => handleCopy(currentData.id)}>Copy</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>
                                        <div className="d-flex align-items-center">
                                            <Calendar size={20} className="text-primary me-2" />
                                            <strong>Registered:</strong>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>{formatDate(currentData?.created_at) || "N/A"}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton onClick={() => handleCopy(formatDate(currentData?.created_at))}>Copy</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>
                                        <div className="d-flex align-items-center">
                                            <User size={20} className="text-primary me-2" />
                                            <strong>Name:</strong>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>{currentData?.name || "N/A"}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton onClick={() => handleCopy(currentData.name)}>Copy</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>
                                        <div className="d-flex align-items-center">
                                            <Calendar size={20} className="text-primary me-2" />
                                            <strong>Age:</strong>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>{currentData?.age ?? "N/A"}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton onClick={() => handleCopy(currentData.age)}>Copy</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>
                                        <div className="d-flex align-items-center">
                                            {currentData.gender === 'Male' ? (
                                                <Mars size={20} className="text-primary me-2" />
                                            ) : (
                                                <Venus size={20} className="text-primary me-2" />
                                            )}
                                            <strong>Gender:</strong>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>{currentData?.gender || "N/A"}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton onClick={() => handleCopy(currentData.gender)}>Copy</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>
                                        <div className="d-flex align-items-center">
                                            <Phone size={20} className="text-primary me-2" />
                                            <strong>Mobile:</strong>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>{currentData?.mobile || "N/A"}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton onClick={() => handleCopy(currentData.mobile)}>Copy</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>
                                        <div className="d-flex align-items-center">
                                            <Mail size={20} className="text-primary me-2" />
                                            <strong>Email:</strong>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>{currentData?.email || "N/A"}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton onClick={() => handleCopy(currentData.email)}>Copy</CButton>
                                    </CTableDataCell>
                                </CTableRow><CTableRow>
                                    <CTableDataCell>
                                        <div className="d-flex align-items-center">
                                            <MapPin size={20} className="text-primary me-2" />
                                            <strong>Address:</strong>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>{currentData?.address || "N/A"}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton onClick={() => handleCopy(currentData.address)}>Copy</CButton>
                                    </CTableDataCell>
                                </CTableRow><CTableRow>
                                    <CTableDataCell>
                                        <div className="d-flex align-items-center">
                                            <Calendar size={20} className="text-primary me-2" />
                                            <strong>DOB:</strong>
                                        </div>
                                    </CTableDataCell>
                                    <CTableDataCell>{currentData?.dob || "N/A"}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton onClick={() => handleCopy(currentData.dob)}>Copy</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CModalBody>
                </CModalContent>
            </CModal>

        </>
    )
}

export default PatientDetailsModal
