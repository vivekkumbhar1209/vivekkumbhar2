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
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { formatDate } from '../../../dateUtility'
import { FaSearch } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'

const ViewAllDepartment = () => {
  const [deptData, setDeptData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5

  useEffect(() => {
    var token = localStorage.getItem('login-token')
    axios
      .get('http://127.0.0.1:8000/api/getDept', {
        headers: {
          Authorization: `Bearer ${token}`,}
      })
      .then((res) => {
        console.log(res.data)
        setDeptData(res.data.deptData)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSearch = (e) => {
    var value = e.target.value.toLowerCase()
    setSearchTerm(value)
    const filtered = deptData.filter((dept) => dept.department_name.toLowerCase().includes(value))

    setFilteredData(filtered)
    setCurrentPage(0)
  }

  const currentData =
    searchTerm.length > 0
      ? filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      : deptData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>
          <strong>Search Department</strong>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary small">
            Search department by <code>id</code> or <code>name</code>.
          </p>
          <CInputGroup className="flex-nowrap">
            <CButton style={{ borderRadius: '3px' }} color="primary" id="addon-wrapping">
              <FaSearch />
            </CButton>
            <div style={{ width: '80%', margin: '0px 5px' }}>
              <CFormInput
                placeholder="Search"
                aria-label="Search"
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
      <CCard>
        <CCardBody>
          <CTable bordered responsive hover>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Department ID</CTableHeaderCell>
                <CTableHeaderCell>Department Name</CTableHeaderCell>
                <CTableHeaderCell>Head of Department</CTableHeaderCell>
                <CTableHeaderCell>Created At</CTableHeaderCell>
                <CTableHeaderCell>Modified At</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData.length > 0 ? (
                currentData.map((elem, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{elem.departmentID}</CTableDataCell>
                    <CTableDataCell>{elem.department_name}</CTableDataCell>
                    <CTableDataCell>{elem.hod}</CTableDataCell>
                    <CTableDataCell>{formatDate(elem.created_at)}</CTableDataCell>
                    <CTableDataCell>{formatDate(elem.updated_at)}</CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="5" className="text-center">
                    No departments found
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
                (filteredData.length > 0 ? filteredData.length : deptData.length) / itemsPerPage,
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

export default ViewAllDepartment
