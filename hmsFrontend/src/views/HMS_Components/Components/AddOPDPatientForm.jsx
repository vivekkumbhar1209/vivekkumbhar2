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
  CForm,
  CFormSelect,
  CModalHeader,
  CModal,
  CModalBody,
  CFormLabel,
  CModalFooter,
  CModalContent,
} from '@coreui/react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Loader from '../../../components/Loader'

const ManageOPDPatients = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [sortColumn, setSortColumn] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [loading, setLoading] = useState(false)
  const [modelVisibility, setModelVisibility] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [departments, setDepartments] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [doctors, setDoctors] = useState([])
  const itemsPerPage = 5

  useEffect(() => {
    if (!selectedPatient) {
      return
    }

    axios
      .get('http://127.0.0.1:8000/api/getDept', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        },
      })
      .then((res) => {
        setDepartments(res.data.deptData)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [selectedPatient])

  useEffect(() => {
    if (!selectedDepartment) {
      return
    }

    //apicall to get doctors with respect to the department id sent
  }, [selectedDepartment])

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem('login-token')
    axios
      .get('http://127.0.0.1:8000/api/patients', {
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
          patient.name.toLowerCase().includes(searchTerm) ||
          patient.mobile.includes(searchTerm) ||
          patient.id.toString().includes(searchTerm),
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

  const handleCheckIn = (elem) => {
    setModelVisibility(true)
    setSelectedPatient(elem)
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>Add OPD Patient</strong>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary small">
            You can add <code>patients</code> in the OPD from below.
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
                  <CTableHeaderCell>Mobile</CTableHeaderCell>
                  <CTableHeaderCell>Gender</CTableHeaderCell>
                  <CTableHeaderCell>Age</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Check In</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentData.length > 0 ? (
                  currentData.map((elem, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{elem.id}</CTableDataCell>
                      <CTableDataCell>{elem.name}</CTableDataCell>
                      <CTableDataCell>{elem.mobile}</CTableDataCell>
                      <CTableDataCell>{elem.gender}</CTableDataCell>
                      <CTableDataCell>{elem.age}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton onClick={() => handleCheckIn(elem)} color="primary">
                          Check In
                        </CButton>
                      </CTableDataCell>
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

      <CModal
        alignment="center"
        visible={modelVisibility}
        onClose={() => setModelVisibility(false)}
      >
        <CModalContent>
          <CModalHeader>
            <strong>OPD Registration Form</strong>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel>Patient</CFormLabel>
                <CFormInput
                  value={selectedPatient ? selectedPatient.name : ''}
                  type="text"
                  disabled
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Select Department</CFormLabel>
                <CFormSelect onChange={(e) => setSelectedDepartment(e.target.value)}>
                  <option>-</option>
                  {departments.map((elem, index) => (
                    <option key={index} value={elem.departmentID}>
                      {elem.department_name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              {selectedDepartment ? (
                <>
                  <div className="mb-3">
                    <CFormLabel>Select Doctor</CFormLabel>
                    <CFormSelect>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </CFormSelect>
                  </div>
                  <div className="mb-3">
                    <CFormLabel>Reason</CFormLabel>
                    <CFormInput type="text" />
                  </div>
                </>
              ) : (
                <p style={{ display: 'none' }}>Not Selected</p>
              )}
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModelVisibility(false)}>
              Close
            </CButton>
            <CButton color="primary">Register</CButton>
          </CModalFooter>
        </CModalContent>
      </CModal>
    </>
  )
}

export default ManageOPDPatients
