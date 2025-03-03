import React from 'react'
import {
  CCard,
  CCardHeader,
  CInputGroup,
  CFormInput,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormSelect,
} from '@coreui/react'
import { FaSearch, FaSort } from 'react-icons/fa'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

const SearchPatient = () => {
  // State for storing patient data
  const [data, setData] = useState([])

  // State for storing search input
  const [searchTerm, setSearchTerm] = useState('')

  // State for storing filtered input
  const [filteredData, setFilteredData] = useState([])

  // State for storing current page input
  const [currentPage, setCurrentPage] = useState(0)
  const itemPerPage = 5

  // useEffect(() => {
  //   var token = localStorage.getItem('login-token')
  //   axios
  //     .get('http://127.0.0.1:8000/api/patientData', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setData(res.data.data)
  //     })
  // }, [])

  const handleSearchButtonClick = () => {
    console.log('search button clicked')
  }

  const handleSearch = (e) => {
    var value = e.target.value.toLowerCase()
    setSearchTerm(value)
    const filtered = data.filter(
      (patient) =>
        patient.patient_name.toLowerCase().includes(value) ||
        patient.patient_mobile.includes(value),
    )

    setFilteredData(filtered)
    setCurrentPage(0)
  }

  // Get current page data
  const currentData =
    searchTerm.length > 0
      ? filteredData.slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage)
      : data.slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage)

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>Search Patient</strong>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary small">
            Search patients by their <code>id</code>, <code>name</code> or <code>mobile</code>.
          </p>
          <CInputGroup className="flex-nowrap">
            <CButton
              style={{ borderRadius: '3px' }}
              color="primary"
              id="addon-wrapping"
              onClick={handleSearchButtonClick}
            >
              <FaSearch />
            </CButton>
            <div style={{ width: '80%', margin: '0px 5px' }}>
              <CFormInput
                placeholder="Search"
                aria-label="Username"
                value={searchTerm}
                aria-describedby="addon-wrapping"
                onChange={handleSearch}
              />
            </div>
            <div style={{ width: '10%', margin: '0px 5px' }}>
              <CFormSelect className="text-start" aria-label="Default select example">
                <option color="secondary" defaultChecked>
                  Sort By
                </option>
                <option value="1">Name</option>
                <option value="2">Phone</option>
                <option value="3">Email</option>
              </CFormSelect>
            </div>
            <div style={{ width: '10%', margin: '0px 5px' }}>
              <CFormSelect className="text-start" aria-label="Default select example">
                <option color="secondary" disabled>
                  Order
                </option>
                <option value="1">Asc</option>
                <option value="2">Desc</option>
              </CFormSelect>
            </div>
          </CInputGroup>
        </CCardBody>
      </CCard>
      <CCard className="mt-2">
        <CCardBody>
          <CTable responsive bordered hover>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Mobile</CTableHeaderCell>
                <CTableHeaderCell>Emergency Contact</CTableHeaderCell>
                <CTableHeaderCell>Address</CTableHeaderCell>
                <CTableHeaderCell>Gender</CTableHeaderCell>
                <CTableHeaderCell>DOB</CTableHeaderCell>
                <CTableHeaderCell>Age</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData.length > 0 ? (
                currentData.map((elem, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{elem.patientID}</CTableDataCell>
                    <CTableDataCell>{elem.patient_name}</CTableDataCell>
                    <CTableDataCell>{elem.patient_email}</CTableDataCell>
                    <CTableDataCell>{elem.patient_mobile}</CTableDataCell>
                    <CTableDataCell>
                      {elem.emergency_name + ' | ' + elem.emergency_no}
                    </CTableDataCell>
                    <CTableDataCell>{elem.patient_address}</CTableDataCell>
                    <CTableDataCell>{elem.patient_gender}</CTableDataCell>
                    <CTableDataCell>{elem.patient_dob}</CTableDataCell>
                    <CTableDataCell>{elem.patient_age}</CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="9" className="text-center">
                    No matching record found...
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CCard className="mt-2">
        <CCardBody className="pb-0">
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={'<<'}
              nextLabel={'>>'}
              breakLabel={'...'}
              pageCount={Math.ceil(
                (filteredData.length > 0 ? filteredData.length : data.length) / itemPerPage,
              )}
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
  )
}

export default SearchPatient
