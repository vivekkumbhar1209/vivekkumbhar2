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
import api from '../../../api'

const ViewAllMedicine = () => {
  const [medicines, setMedicines] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [sortBy, setSortBy] = useState('medicine_name')
  const [order, setOrder] = useState('asc')
  const itemsPerPage = 5

  useEffect(() => {
    var token = localStorage.getItem('login-token')
    api
      .get('/getMedicines')
      .then((res) => {
        console.log(res.data)
        setMedicines(res.data.medicines)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [sortBy, order])

  const handleOrderChange = (e) => {
    setOrder(e.target.value === '1' ? 'asc' : 'desc');
  }

  const handleSortChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case "1": setSortBy("medicine_name");
      break;
      case "2": setSortBy("cost");
      break;
      default: setSortBy("medicine_name");
    }
  };

  const handleSearch = (e) => {
    var value = e.target.value.toLowerCase()
    setSearchTerm(value)
    const filtered = medicines.filter((medicine) => medicine.medicine_name.toLowerCase().includes(value))

    setFilteredData(filtered)
    setCurrentPage(0)
  }

  const currentData =
    searchTerm.length > 0
      ? filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      : medicines.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>
          <strong>All Medicine</strong>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary small">
            Search medicines by <code>id</code> or <code>medicine name</code>.
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
              <CFormSelect className="text-start" aria-label="Default select example" onChange={handleSortChange}>
                <option color="secondary" disabled>
                  Sort By
                </option>
                <option value="1">Medicine name</option>
                <option value="2">Cost</option>
              </CFormSelect>
            </div>
            <div style={{ width: '10%', margin: '0px 5px' }}>
              <CFormSelect className="text-start" aria-label="Default select example" onChange={handleOrderChange}>
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
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Medicine Name</CTableHeaderCell>
                <CTableHeaderCell>Cost</CTableHeaderCell>
                <CTableHeaderCell>Created At</CTableHeaderCell>
                <CTableHeaderCell>Modified At</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData.length > 0 ? (
                currentData.map((elem, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{elem.medicineID}</CTableDataCell>
                    <CTableDataCell>{elem.medicine_name}</CTableDataCell>
                    <CTableDataCell>{elem.cost}</CTableDataCell>
                    <CTableDataCell>{formatDate(elem.created_at)}</CTableDataCell>
                    <CTableDataCell>{formatDate(elem.updated_at)}</CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="5" className="text-center">
                    No medicines found
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
                (filteredData.length > 0 ? filteredData.length : medicines.length) / itemsPerPage,
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

export default ViewAllMedicine
