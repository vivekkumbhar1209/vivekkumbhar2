import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow, CButton } from '@coreui/react'
import api from '../../api'

const AppointmentEnquiry = () => {

    const [enquiryData, setEnquiryData] = useState([])

    useEffect(() => {
        try {
            api.get('/getAllEnquiries').then(res => {
                console.log(res.data.data)
                setEnquiryData(res.data.data)
            }).catch(err => {
                console.log(err)
            })
        } catch (error) {

        }
    })


    return (
        <>
            <CCard>
                <CCardHeader>
                    <strong>
                        New Enquiries
                    </strong>
                </CCardHeader>
                <CCardBody>
                    <p className="text-body-secondary small">
                        All <code>new </code>appointent enquiries from the website will be displayed here.
                    </p>
                </CCardBody>
            </CCard>
            <CCard className='my-2'>
                <CCardBody>
                    <CTable hover responsive bordered>
                        <CTableHead color='light'>
                            <CTableRow>
                                <CTableHeaderCell>Name</CTableHeaderCell>
                                <CTableHeaderCell>Email</CTableHeaderCell>
                                <CTableHeaderCell>Mobile</CTableHeaderCell>
                                <CTableHeaderCell>Address</CTableHeaderCell>
                                <CTableHeaderCell>Reason</CTableHeaderCell>
                                <CTableHeaderCell>Register</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {enquiryData.map((elem, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{elem.name}</CTableDataCell>
                                    <CTableDataCell>{elem.email}</CTableDataCell>
                                    <CTableDataCell>{elem.mobile_no}</CTableDataCell>
                                    <CTableDataCell>{elem.address}</CTableDataCell>
                                    <CTableDataCell>{elem.message}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color='primary'>Register</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </>
    )
}

export default AppointmentEnquiry
