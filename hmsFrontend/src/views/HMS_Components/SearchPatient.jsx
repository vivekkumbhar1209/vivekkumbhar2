import React, { useState, useEffect } from 'react'
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
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import api from '../../api'
import ReactPaginate from 'react-paginate'
import Loader from '../../components/Loader'

const SearchPatient = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [sortColumn, setSortColumn] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [loading, setLoading] = useState(false)

  const itemsPerPage = 5

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem('login-token')
    api
      .get('patients', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data)
        setLoading(false)
      })
  }, [])

  // Sorting function
  const sortData = (list) => {
    return [...list].sort((a, b) => {
      let valueA = a[sortColumn]?.toString().toLowerCase() || ''
      let valueB = b[sortColumn]?.toString().toLowerCase() || ''

      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB)
      } else {
        return valueB.localeCompare(valueA)
      }
    })
  }

  // Apply filtering and sorting
  useEffect(() => {
    let updatedData = [...data]

    if (searchTerm) {
      updatedData = updatedData.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm) || patient.mobile.includes(searchTerm),
      )
    }

    setFilteredData(sortData(updatedData))
  }, [data, searchTerm, sortColumn, sortOrder])

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
    setCurrentPage(0)
  }

  // Get paginated data
  const currentData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  )

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>Search Patient</strong>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary small">
            Search patients by their <code>id</code>, <code>name</code>, or <code>mobile</code>.
          </p>
          <CInputGroup className="flex-nowrap">
            <CButton color="primary" id="addon-wrapping">
              <FaSearch />
            </CButton>
            <CFormInput
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: '80%', margin: '0px 5px' }}
            />
            <CFormSelect
              style={{ width: '10%', margin: '0px 5px' }}
              onChange={(e) => setSortColumn(e.target.value)}
              value={sortColumn}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="mobile">Phone</option>
              <option value="email">Email</option>
            </CFormSelect>
            <CFormSelect
              style={{ width: '10%', margin: '0px 5px' }}
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </CFormSelect>
          </CInputGroup>
        </CCardBody>
      </CCard>

      <CCard className="mt-2">
        <CCardBody>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Loader />
            </div>
          ) : (
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
                      <CTableDataCell>{elem.id}</CTableDataCell>
                      <CTableDataCell>{elem.name}</CTableDataCell>
                      <CTableDataCell>{elem.email}</CTableDataCell>
                      <CTableDataCell>{elem.mobile}</CTableDataCell>
                      <CTableDataCell>
                        {elem.emergency_contact.name + ' - ' + elem.emergency_contact.number}
                      </CTableDataCell>
                      <CTableDataCell>{elem.address}</CTableDataCell>
                      <CTableDataCell>{elem.gender}</CTableDataCell>
                      <CTableDataCell>{elem.dob}</CTableDataCell>
                      <CTableDataCell>{elem.age}</CTableDataCell>
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
  )
}

export default SearchPatient
