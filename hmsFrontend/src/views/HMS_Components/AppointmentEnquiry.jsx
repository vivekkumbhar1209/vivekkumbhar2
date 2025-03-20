import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow, CButton } from '@coreui/react'
import api from '../../api'
import Loader from '../../components/Loader'
import PermissionDenied from '../warning/PermissionDenied'

const AppointmentEnquiry = () => {

    const [enquiryData, setEnquiryData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        try {
            api.get('/getAllEnquiries').then(res => {
                setEnquiryData(res.data.data)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        } catch (error) {

        }
    }, [])

    const role = JSON.parse(localStorage.getItem('userData')).role
    return (

        <>
            {role === 'Receptionist' || role === 'Admin' ? (
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
                                {loading ? (
                                    <div className='text-center'>
                                        <Loader />
                                    </div>
                                ) : (

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
                                )}
                            </CTable>
                        </CCardBody>
                    </CCard>
                </>

            ) : (
                <>
                    <PermissionDenied />
                </>
            )}
        </>
    )
}

export default AppointmentEnquiry
