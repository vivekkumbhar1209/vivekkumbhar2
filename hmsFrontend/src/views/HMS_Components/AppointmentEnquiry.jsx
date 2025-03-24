import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow, CButton, CInputGroup, CFormInput } from '@coreui/react'
import api from '../../api'
import Loader from '../../components/Loader'
import PermissionDenied from '../warning/PermissionDenied'
import Pusher from 'pusher-js'
import { FaSearch } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Ringloader from '../../components/RingLoader'

const AppointmentEnquiry = () => {

    const [enquiryData, setEnquiryData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [enquiryTableUpdated, setEnquiryTableUpdated] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [ringLoading, setRingLoading] = useState(false)
    const itemsPerPage = 5
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        try {

            // Pusher.logToConsole = true
            const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_ID, {
                cluster: import.meta.env.VITE_PUSHER_CLUSTER
            })

            const channel = pusher.subscribe('Enquiry-Updated')

            channel.bind('Enquiry-Table-Updated', (data) => {
                if (data.message) {
                    console.log(data.message)
                    api.get('/getAllEnquiries').then(res => {
                        setEnquiryData(res.data.data)
                    }).catch(err => {
                        console.log(err)
                    }).finally(() => {
                        setLoading(false)
                    })
                }
                else {
                    console.log("No data recieved")
                }
            })
        } catch (error) {

        }
    }, [])

    useEffect(() => {
        setLoading(true)
        api.get('/getAllEnquiries').then(res => {
            setEnquiryData(res.data.data)
            console.log(res.data.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    //function to highlight the match text
    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text; // Return normal text if no search term

        const regex = new RegExp(`(${searchTerm})`, "gi"); // Case-insensitive match
        return text.replace(regex, `<span style="background-color: yellow;">$1</span>`);
    };

    const filteredData = enquiryData.filter((elem) =>
        elem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        elem.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        elem.mobile_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        elem.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        elem.message.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const currentData = filteredData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const checkIfPatientIsRegistered = (elem) => {
        setRingLoading(true)
        api.post('/checkIfPatientIsRegistered', { mobile: elem.mobile_no }).then(res => {
            console.log(res.data)
            if (res.data.status === 409) {
                Swal.fire({
                    icon: 'error',
                    title: res.data.message,
                    text: res.data.data.mobile,
                    confirmButtonText: 'Ok'
                })
            }
            else if (res.data.status === 201) {
                Swal.fire({
                    icon: 'question',
                    title: res.data.message,
                    text: res.data.text,
                    confirmButtonText: 'Ok'
                })
            }
            else if (res.data.status === 202) {
                Swal.fire({
                    icon: 'info',
                    title: res.data.message,
                    text: res.data.text,
                    confirmButtonText: 'Ok'
                }).then(() => {
                    navigate('/dashboard/registerPatient', { state: elem })
                })
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => setRingLoading(false))
    }

    const role = JSON.parse(localStorage.getItem('userData')).role

    return (

        <>
            {role === 'Receptionist' || role === 'Admin' ? (
                <>
                    {enquiryTableUpdated && <Loader />}
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
                            <CInputGroup className="flex-nowrap">
                                <CButton color="primary" id="addon-wrapping">
                                    <FaSearch />
                                </CButton>
                                <CFormInput
                                    placeholder="Search"
                                    aria-label="Search"
                                    onChange={(e) => { setSearchTerm(e.target.value) }}
                                    style={{ width: '80%', margin: '0px 5px' }}
                                />
                            </CInputGroup>
                        </CCardBody>
                    </CCard>
                    <CCard className='my-2'>
                        <CCardBody>
                            {loading ? (
                                <div className='text-center'>
                                    <Loader />
                                </div>

                            ) : (
                                <CTable hover responsive bordered>
                                    <CTableHead color='light'>
                                        <CTableRow>
                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                            <CTableHeaderCell>Mobile</CTableHeaderCell>
                                            <CTableHeaderCell>Email</CTableHeaderCell>
                                            {role === 'Receptionist' ? (
                                                <CTableHeaderCell>Register</CTableHeaderCell>

                                            ) : (
                                                ''
                                            )}
                                        </CTableRow>
                                    </CTableHead>


                                    <CTableBody>
                                        {currentData.length > 0 ? (
                                            currentData.map((elem, index) => (
                                                <CTableRow key={index}>
                                                    <CTableDataCell dangerouslySetInnerHTML={{ __html: highlightText(elem.name, searchTerm) }} />
                                                    <CTableDataCell dangerouslySetInnerHTML={{ __html: highlightText(elem.mobile_no, searchTerm) }} />
                                                    <CTableDataCell dangerouslySetInnerHTML={{ __html: highlightText(elem.email, searchTerm) }} />
                                                    {role === 'Receptionist' ? (
                                                        <CTableDataCell>
                                                            <CButton color='primary' onClick={() => checkIfPatientIsRegistered(elem)}>
                                                                Register

                                                            </CButton>
                                                        </CTableDataCell>
                                                    ) : ('')}
                                                </CTableRow>
                                            ))
                                        ) : (
                                            <CTableRow>
                                                <CTableDataCell colSpan={6} className='text-center'>
                                                    No Records Found...
                                                </CTableDataCell>
                                            </CTableRow>
                                        )}
                                    </CTableBody>
                                </CTable>
                            )}
                        </CCardBody>
                    </CCard>
                    <CCard className="mt-2">
                        <CCardBody className="pb-0">
                            <div className="d-flex justify-content-center">
                                <ReactPaginate
                                    previousLabel={'<<'}
                                    nextLabel={'>>'}
                                    breakLabel={'...'}
                                    pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={(e) => setCurrentPage(e.selected)}
                                    containerClassName="pagination justify-content-center"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakClassName="page-item disabled"
                                    breakLinkClassName="page-link"
                                    activeClassName="active"
                                />
                            </div>
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
