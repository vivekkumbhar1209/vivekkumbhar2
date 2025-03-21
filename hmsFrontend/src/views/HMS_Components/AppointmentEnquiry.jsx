import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow, CButton, CInputGroup, CFormInput } from '@coreui/react'
import api from '../../api'
import Loader from '../../components/Loader'
import PermissionDenied from '../warning/PermissionDenied'
import Pusher from 'pusher-js'
import { FaSearch } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import { data, useNavigate } from 'react-router-dom'

const AppointmentEnquiry = () => {

    const [enquiryData, setEnquiryData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [enquiryTableUpdated, setEnquiryTableUpdated] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 5
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        try {

            Pusher.logToConsole = true
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

    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text; // Return normal text if no search term

        const regex = new RegExp(`(${searchTerm})`, "g"); // Case-insensitive match
        return text.replace(regex, `<span style="background-color: yellow;">$1</span>`);
    };

    const filteredData = enquiryData.filter((elem) =>
        elem.name.includes(searchTerm) ||
        elem.email.includes(searchTerm) ||
        elem.mobile_no.includes(searchTerm) ||
        elem.address.includes(searchTerm) ||
        elem.message.includes(searchTerm)
    )

    const currentData = filteredData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handleNavigate = (elem) => {
        navigate('/dashboard/registerPatient', { state: elem })
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
                                            <CTableHeaderCell>Email</CTableHeaderCell>
                                            <CTableHeaderCell>Mobile</CTableHeaderCell>
                                            <CTableHeaderCell>Address</CTableHeaderCell>
                                            <CTableHeaderCell>Reason</CTableHeaderCell>
                                            <CTableHeaderCell>Register</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>


                                    <CTableBody>
                                        {currentData.length > 0 ? (
                                            currentData.map((elem, index) => (
                                                <CTableRow key={index}>
                                                    <CTableDataCell dangerouslySetInnerHTML={{ __html: highlightText(elem.name, searchTerm) }} />
                                                    <CTableDataCell dangerouslySetInnerHTML={{ __html: highlightText(elem.email, searchTerm) }} />
                                                    <CTableDataCell dangerouslySetInnerHTML={{ __html: highlightText(elem.mobile_no, searchTerm) }} />
                                                    <CTableDataCell dangerouslySetInnerHTML={{ __html: highlightText(elem.address, searchTerm) }} />
                                                    <CTableDataCell dangerouslySetInnerHTML={{ __html: highlightText(elem.message, searchTerm) }} />
                                                    <CTableDataCell>
                                                        <CButton color='primary' onClick={() => handleNavigate(elem)}>Register</CButton>
                                                    </CTableDataCell>
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
