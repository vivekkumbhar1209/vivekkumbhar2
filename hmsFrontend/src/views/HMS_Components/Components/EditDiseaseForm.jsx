import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormLabel,
} from '@coreui/react'
import { FaSearch, FaEdit } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2'

const EditDiseaseForm = () => {
  const [disease, setDisease] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5

  const [editModalVisible, setEditModalVisible] = useState(false)
  const [selectedDisease, setSelectedDisease] = useState(null)

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString()

  const fetchDiseases = () => {
    const token = localStorage.getItem('login-token')
    axios
      .get('http://127.0.0.1:8000/api/getdiseases', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDisease(res.data.diseases)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchDiseases()
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
    setCurrentPage(0)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    setCurrentPage(0)
  }

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value)
    setCurrentPage(0)
  }

  const getProcessedData = () => {
    let filteredData = disease

    if (searchTerm) {
      filteredData = filteredData.filter((dis) => {
        const nameMatch = dis.diseaseName.toLowerCase().includes(searchTerm)
        const statusMatch =
          (searchTerm === 'active' || searchTerm === 'inactive') &&
          dis.isActive.toLowerCase() === searchTerm
        return nameMatch || statusMatch
      })
    }

    if (sortBy) {
      filteredData = [...filteredData].sort((a, b) => {
        let fieldA = a[sortBy]?.toString().toLowerCase() || ''
        let fieldB = b[sortBy]?.toString().toLowerCase() || ''
        return sortOrder === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA)
      })
    }

    return filteredData
  }

  const processedData = getProcessedData()
  const pageCount = Math.ceil(processedData.length / itemsPerPage)
  const currentData = processedData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  )

  const openEditModal = (disease) => {
    setSelectedDisease(disease)
    setEditModalVisible(true)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setSelectedDisease((prev) => ({ ...prev, [name]: value }))
  }
  const handleUpdate = () => {
    const token = localStorage.getItem('login-token')
    axios
      .put(
        `http://127.0.0.1:8000/api/updatedisease/${selectedDisease.diseaseID}`,
        selectedDisease,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        fetchDiseases()
        setEditModalVisible(false)
  
        // ✅ Show SweetAlert Success
        Swal.fire({
          icon: 'success',
          title: 'Disease Updated',
          text: 'The disease details have been updated successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
      })
      .catch((err) => {
        console.error(err)
  
        // ❌ Show SweetAlert Error
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Something went wrong while updating the disease.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Try Again',
        })
      })
  }
  
 /* const handleUpdate = () => {
    const token = localStorage.getItem('login-token')
    axios
      .put(
        `http://127.0.0.1:8000/api/updatedisease/${selectedDisease.diseaseID}`,
        selectedDisease,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        fetchDiseases()
        setEditModalVisible(false)
      })
      .catch((err) => console.error(err))
  }*/

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>
          <strong>Edit Disease</strong>
        </CCardHeader>
        <CCardBody>
          <CInputGroup className="flex-nowrap">
            <CButton style={{ borderRadius: '3px' }} color="primary">
              <FaSearch />
            </CButton>
            <div style={{ width: '50%', margin: '0px 5px' }}>
              <CFormInput
                placeholder="Search by Name or status"
                onChange={handleSearch}
              />
            </div>
            <div style={{ width: '20%', margin: '0px 5px' }}>
              <CFormSelect onChange={handleSortChange}>
                <option value="">Sort By</option>
                <option value="diseaseName">Name</option>
                <option value="diseaseDescription">Description</option>
              </CFormSelect>
            </div>
            <div style={{ width: '20%', margin: '0px 5px' }}>
              <CFormSelect onChange={handleOrderChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
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
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Description</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Created</CTableHeaderCell>
                <CTableHeaderCell>Updated</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData.length > 0 ? (
                currentData.map((elem, index) => (
                  <CTableRow key={index} style={{ verticalAlign: 'middle' }}>
                    <CTableDataCell className="align-middle">{elem.diseaseID}</CTableDataCell>
                    <CTableDataCell className="align-middle">{elem.diseaseName}</CTableDataCell>
                    <CTableDataCell className="align-middle">{elem.diseaseDescription}</CTableDataCell>
                    <CTableDataCell className="align-middle">{elem.isActive}</CTableDataCell>
                    <CTableDataCell className="align-middle">{formatDate(elem.created_at)}</CTableDataCell>
                    <CTableDataCell className="align-middle">{formatDate(elem.updated_at)}</CTableDataCell>
                    <CTableDataCell className="align-middle text-center">
                      <CButton
                        size="sm"
                        color="warning"
                        className="w-100 d-flex align-items-center justify-content-center gap-1"
                        onClick={() => openEditModal(elem)}
                      >
                        <FaEdit /> Edit
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="7" className="text-center">
                    No diseases found
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
              pageCount={pageCount}
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

      {/* Edit Modal */}
      <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <CModalHeader>
          <strong>Edit Disease</strong>
        </CModalHeader>
        <CModalBody>
          <div className="mb-3">
            <CFormLabel>Disease Name</CFormLabel>
            <CFormInput
              name="diseaseName"
              value={selectedDisease?.diseaseName || ''}
              onChange={handleEditChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Description</CFormLabel>
            <CFormInput
              name="diseaseDescription"
              value={selectedDisease?.diseaseDescription || ''}
              onChange={handleEditChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Status</CFormLabel>
            <CFormSelect
              name="isActive"
              value={selectedDisease?.isActive || ''}
              onChange={handleEditChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </CFormSelect>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleUpdate}>
            Update
          </CButton>
          <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default EditDiseaseForm
