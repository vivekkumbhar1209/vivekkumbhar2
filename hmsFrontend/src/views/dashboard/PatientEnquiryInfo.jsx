import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCol, CRow, CButton, CButtonGroup, CTable, CTableHead, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow, CTableFoot } from '@coreui/react'
import api from '../../api'
import { formatDate } from '../../dateUtility'
import DarkRingLoader from '../../components/DarkRingLoader'
import ReactPaginate from 'react-paginate'

const PatientEnquiryInfo = () => {

    const [active, setActive] = useState('All')
    const [enquiryLoading, setEnquiryLoading] = useState(false)
    const [enquiryData, setEnquiryData] = useState([])
    const [enquiryAnalyticalData, setEnquiryAnalyticalData] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 5
    const today = new Date()

    useEffect(() => {
        setEnquiryLoading(true);
        setActive('All');

        // Run both API calls in parallel
        Promise.all([
            api.post('/getEnquiryRecords', { recordType: 'all' }),
            api.get('/getEnquiryAnalyticalData')
        ]).then(([recordsResponse, analyticsResponse]) => {
            console.log(recordsResponse.data);
            setEnquiryData(recordsResponse.data.data);

            console.log(analyticsResponse.data);
            setEnquiryAnalyticalData(analyticsResponse.data.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setEnquiryLoading(false);
        });

    }, []);


    const handleEnquiryData = (recordType) => {
        setEnquiryLoading(true)
        if (recordType === 'all') {
            setActive('All')
        }
        else if (recordType === 'registered') {
            setActive('Registered')
        }
        else if (recordType === 'not registered') {
            setActive('Not Registered')
        }
        api.post('/getEnquiryRecords', { 'recordType': recordType }).then(res => {
            console.log(res.data)
            setEnquiryData(res.data.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setEnquiryLoading(false)
        })
    }

    const paginatedData = enquiryData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    console.log(paginatedData)

    return (
        <>

            <CCard>
                <CCardBody>
                    <CRow className='mb-3'>
                        <CCol sm={5}>
                            <h4 id="traffic" className="card-title mb-0">
                                Enquiry
                            </h4>
                            <div className="small text-body-secondary">{today.toDateString()}</div>
                        </CCol>
                        <CCol sm={7}>
                            <CButtonGroup className="float-end me-5">

                                <CButton
                                    color="outline-secondary"
                                    className="mx-0"
                                    active={active === 'All'}
                                    onClick={() => handleEnquiryData('all')}
                                >
                                    All
                                </CButton>
                                <CButton
                                    color="outline-secondary"
                                    className="mx-0"
                                    active={active === 'Registered'}
                                    onClick={() => handleEnquiryData('registered')}
                                >
                                    Registered
                                </CButton>
                                <CButton
                                    color="outline-secondary"
                                    className="mx-0"
                                    active={active === 'Not Registered'}
                                    onClick={() => handleEnquiryData('not registered')}
                                >
                                    Not Registered
                                </CButton>
                            </CButtonGroup>
                        </CCol>
                    </CRow>
                    <hr className="mt-0" />
                    <CRow className='mt-3'>
                        <CCol>
                            <div className="border-start border-start-4 border-start-info py-1 px-3">
                                <div className="text-body-secondary text-truncate small"> Total Enquiries</div>
                                <div className="fs-5 fw-semibold">{enquiryAnalyticalData ? `${enquiryAnalyticalData.totalEnquiries}` : (<DarkRingLoader />)}</div>
                            </div>
                        </CCol>
                        <CCol>
                            <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                <div className="text-body-secondary text-truncate small">
                                    Pending Registrations
                                </div>
                                <div className="fs-5 fw-semibold">{enquiryAnalyticalData ? `${enquiryAnalyticalData.pendingRegistrations}` : (<DarkRingLoader />)}</div>
                            </div>
                        </CCol>
                        <CCol>
                            <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                <div className="text-body-secondary text-truncate small">Today's Enquiries </div>
                                <div className="fs-5 fw-semibold">{enquiryAnalyticalData ? `${enquiryAnalyticalData.todaysEnquiries}` : <DarkRingLoader />}</div>
                            </div>
                        </CCol>
                        <CCol>
                            <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                <div className="text-body-secondary text-truncate small"> Today's Converted Enquiries</div>
                                <div className="fs-5 fw-semibold">{enquiryAnalyticalData ? `${enquiryAnalyticalData.convertedEnquiries}` : (<DarkRingLoader />)}</div>
                            </div>
                        </CCol>
                    </CRow>
                    <hr className="mt-0" />
                    {enquiryLoading ? (
                        <div className='d-flex justify-content-center align-items-center' style={{ height: '40vh' }}>
                            <DarkRingLoader />
                        </div>
                    ) : (
                        <CRow className='my-3'>
                            <CTable hover responsive className="border">
                                <CTableHead color='light'>
                                    <CTableRow>
                                        <CTableHeaderCell>Name</CTableHeaderCell>
                                        <CTableHeaderCell>Mobile</CTableHeaderCell>
                                        <CTableHeaderCell>Email</CTableHeaderCell>
                                        <CTableHeaderCell>Submitted At</CTableHeaderCell>
                                        <CTableHeaderCell>Registered</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((element, index) => (
                                            <CTableRow key={index}
                                            // className={element.registered === 'yes' ? 'table-success' : 'table-danger'}
                                            >
                                                <CTableDataCell>{element.name}</CTableDataCell>
                                                <CTableDataCell>{element.mobile_no}</CTableDataCell>
                                                <CTableDataCell>{element.email}</CTableDataCell>
                                                <CTableDataCell>{formatDate(element.created_at)}</CTableDataCell>
                                                <CTableDataCell>{element.registered}</CTableDataCell>
                                            </CTableRow>
                                        ))
                                    ) : (
                                        <CTableRow className='text-center'>
                                            <CTableDataCell colSpan={5} color='danger'>
                                                No Records Available...
                                            </CTableDataCell>
                                        </CTableRow>
                                    )}
                                </CTableBody>
                                <CTableFoot>
                                    <CTableRow>
                                        <CTableDataCell colSpan={5}>
                                            <ReactPaginate
                                                previousLabel={'<<'}
                                                nextLabel={'>>'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(enquiryData.length / itemsPerPage)}
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
                                        </CTableDataCell>
                                    </CTableRow>
                                </CTableFoot>
                            </CTable>
                        </CRow>
                    )}
                </CCardBody>
            </CCard>
        </>
    )
}

export default PatientEnquiryInfo
