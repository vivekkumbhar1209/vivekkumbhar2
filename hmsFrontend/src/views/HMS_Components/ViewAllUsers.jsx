import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CCard, CCardHeader, CInputGroup, CFormInput, CCardBody, CButton, CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CFormSelect, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react'
import { FaSearch } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import AddReceptionistForm from './AddReceptionistForm'
import AddAdminForm from './Components/AddAdminForm'
import AddDoctorForm from './Components/AddDoctorForm'
import UpdateAvailability from './Updateavailability'
import api from '../../api'

const ViewAllUsers = ({ action }) => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [sortBy, setSortBy] = useState('name')
  const [order, setOrder] = useState('asc')
  const [editingUser, setEditingUser] = useState(null)
  const [showModal, setShowModal] = useState(false) // State to control modal visibility
  const [currentUser, setCurrentUser] = useState(null) // State to store the user for whom update is being triggered
  const itemsPerPage = 5

  useEffect(() => {
    var token = localStorage.getItem('login-token')
    const url = 'http://127.0.0.1:8000/api/viewAllUsers'
    axios({
      method: 'GET',
      url: url,
      params: { sortBy, order, action },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUsers(res.data.Users)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [sortBy, order, action])

  const handleSearch = (e) => {
    var value = e.target.value.toLowerCase()
    setSearchTerm(value)
    const filtered = users.filter((user) => user.name.toLowerCase().includes(value))
    setFilteredData(filtered)
    setCurrentPage(0)
  }

  const handleSortChange = (e) => {
    const value = e.target.value
    switch (value) {
      case '1':
        setSortBy('name')
        break
      case '2':
        setSortBy('mobile')
        break
      case '3':
        setSortBy('email')
        break
      default:
        setSortBy('name')
    }
  }

  const handleOrderChange = (e) => {
    setOrder(e.target.value === '1' ? 'asc' : 'desc')
  }

  const currentData = searchTerm.length > 0 ? filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : users.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const handleEdit = (user) => {
    setEditingUser(user)
  }

  const renderEditForm = () => {
    if (!editingUser) return null

    if (editingUser.role === 'Admin') {
      return <AddAdminForm role={editingUser.role} propAction="edit" user={editingUser} />
    } else if (editingUser.role === 'Doctor') {
      return <AddDoctorForm role={editingUser.role} propAction="edit" user={editingUser} />
    } else {
      return <AddReceptionistForm role={editingUser.role} propAction="edit" user={editingUser} />
    }
  }

  // Function to open the modal for UpdateAvailability
  const handleUpdateAvailability = (user) => {
    setCurrentUser(user) // Store the current user whose availability is being updated
    setShowModal(true) // Show the modal
  }

  return (
    <>
      {renderEditForm()}
      <CCard className="mb-3">
        <CCardHeader>
          <strong>Search Users</strong>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary small">
            Search users by <code>id</code> or <code>name</code>.
          </p>
          <CInputGroup className="flex-nowrap">
            <CButton style={{ borderRadius: '3px' }} color="primary" id="addon-wrapping">
              <FaSearch />
            </CButton>
            <div style={{ width: '80%', margin: '0px 5px' }}>
              <CFormInput placeholder="Search" aria-label="Search" aria-describedby="addon-wrapping" onChange={handleSearch} />
            </div>
            <div style={{ width: '10%', margin: '0px 5px' }}>
              <CFormSelect className="text-start" aria-label="Default select example" onChange={handleSortChange}>
                <option color="secondary" defaultChecked>
                  Sort By
                </option>
                <option value="1">Name</option>
                <option value="2">Phone</option>
                <option value="3">Email</option>
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
                <CTableHeaderCell>Profile Photo</CTableHeaderCell>
                <CTableHeaderCell>User ID</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Role</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Gender</CTableHeaderCell>
                <CTableHeaderCell>Contact Number</CTableHeaderCell>
                {action === 'edit' ? (
                  <>
                    <CTableHeaderCell>Last Updated</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </>
                ) : null}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData.length > 0 ? (
                currentData.map((elem, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      {elem.profilePhoto ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${elem.profilePhoto}`}
                          alt="Profile"
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            backgroundColor: '#ccc',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '12px',
                            color: '#fff',
                            fontWeight: 'bold',
                          }}
                        >
                          No Image
                        </div>
                      )}
                    </CTableDataCell>
                    <CTableDataCell className="text-center" style={{ verticalAlign: 'middle' }}>
                      {elem.id}
                    </CTableDataCell>
                    <CTableDataCell style={{ verticalAlign: 'middle' }}>{elem.name}</CTableDataCell>
                    <CTableDataCell className="text-center" style={{ verticalAlign: 'middle' }}>
                      {elem.role}
                    </CTableDataCell>
                    <CTableDataCell style={{ verticalAlign: 'middle' }}>{elem.email}</CTableDataCell>
                    <CTableDataCell className="text-center" style={{ verticalAlign: 'middle' }}>
                      {elem.gender}
                    </CTableDataCell>
                    <CTableDataCell className="text-center" style={{ verticalAlign: 'middle' }}>
                      {elem.mobile}
                    </CTableDataCell>
                    {action === 'edit' ? (
                      <>
                        <CTableDataCell className="text-center" style={{ verticalAlign: 'middle' }}>
                          {new Date(elem.updated_at).toLocaleString()}
                        </CTableDataCell>
                        <CTableDataCell className="text-center" style={{ verticalAlign: 'middle' }}>
                          <CButton onClick={() => handleEdit(elem)}>Edit</CButton>
                        </CTableDataCell>
                      </>
                    ) : null}
                    {action === 'doctors' ? (
                      <>
                        <CTableDataCell className="text-center" style={{ verticalAlign: 'middle' }}>
                          <CButton onClick={() => handleUpdateAvailability(elem)}>Update</CButton>
                        </CTableDataCell>
                      </>
                    ) : null}
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
      {/* Modal for UpdateAvailability */}
      <CModal visible={showModal} onClose={() => setShowModal(false)} size='lg'>
        <CModalHeader>
          <CModalTitle >Update Availability</CModalTitle>
        </CModalHeader>
        <CModalBody className='p-3'>
          <UpdateAvailability doctorUser={currentUser} /> {/* Pass current user to the UpdateAvailability component */}
        </CModalBody>
        <CModalFooter className='p-3'>
          <CButton color="secondary" onClick={() => setShowModal(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
      <CCard className="mt-2">
        <CCardBody className="pb-0">
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={'<<'}
              nextLabel={'>>'}
              breakLabel={'...'}
              pageCount={Math.ceil((filteredData.length > 0 ? filteredData.length : users.length) / itemsPerPage)}
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

export default ViewAllUsers
