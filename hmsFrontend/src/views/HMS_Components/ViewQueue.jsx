import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableBody,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CInputGroup,
  CFormInput,
} from '@coreui/react'
import axios from 'axios'
import Pusher from 'pusher-js'
import Loader from '../../components/Loader'
import swal from 'sweetalert2'
import { FaSearch } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import api from '../../api'

const ViewQueue = () => {
  const [queue, setQueue] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [doctorFilteredData, setDoctorFilteredData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 4
  const role = JSON.parse(localStorage.getItem('userData')).role
  const navigator = useNavigate()
  const statusColors = {
    Waiting: 'warning',
    'In Consultation': 'info',
    Completed: 'success',
  }

  useEffect(() => {
    setLoading(true)
    Pusher.logToConsole = true

    // console.log(JSON.parse(localStorage.getItem('userData')).email)

    const pusher = new Pusher('4f0d3f536163be9e540c', {
      cluster: 'ap2',
    })

    const channel = pusher.subscribe('my-channel')
    channel.bind('queueUpdated', (data) => {
      if (data) {
        setQueue(data.data)
        setLoading(false)
      }
    })

    api
      .get('/getOpdQueue')
      .then((res) => {
        console.log(res.data)
      })
  }, [])


  //used for searching patients on receptionist side 
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(queue)
      return
    }
    const filteredReception = queue.filter((elem) => elem.patient_name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredData(filteredReception)
  }, [queue, searchTerm])

  //used for searching patients on doctors side 
  useEffect(() => {
    if (!searchTerm) {
      setDoctorFilteredData(queue)
    }

    const filteredQueueForDoctor = queue.filter(
      (item) => item.id === JSON.parse(localStorage.getItem('userData')).id,
    )
    const filteredData = filteredQueueForDoctor.filter((elem) => elem.patient_name.toLowerCase().includes(searchTerm.toLowerCase()))
    setDoctorFilteredData(filteredData)
  }, [queue, searchTerm])


  const handleDelete = (elem) => {
    swal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          setLoading(true)
          const data = {
            queueID: elem.queueID,
            patientID: elem.patientID,
          }

          api
            .post('/dequeue', data)
            .then((res) => {
              console.log(res.data)
              if (res.data.status === 200) {
                swal.fire({
                  title: 'Success',
                  icon: 'success',
                  text: res.data.message,
                  confirmButtonText: 'OK',
                })
              } else {
                swal.fire({
                  title: 'Error',
                  icon: 'error',
                  text: res.data.message,
                  confirmButtonText: 'OK',
                })
              }
            })
            .catch((err) => {
              console.log(err)
              swal.fire({
                title: 'Error',
                icon: 'error',
                text: err,
                confirmButtonText: 'OK',
              })
              setLoading(false)
            })
        }
      })
  }

  const handleConsultation = (elem) => {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to consult this patient?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Consult',
      })
      .then((res) => {
        if (res.isConfirmed) {
          api
            .post(
              '/updatePatientQueueStatus',
              { queueID: elem.queueID })
            .then((res) => {
              if (res.data.status === 200) {
                var newElem = { ...elem, status: 'In Consultation' }
                navigator('/dashboard/opdConsultation', { state: { data: newElem } })
              }
            })
        }
      })
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const receptionPaginatedData = filteredData.slice(
    currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage
  )

  const doctorPaginatedData = doctorFilteredData.slice(
    currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage
  )


  return (
    <>
      <CCard className="my-2">
        <CCardHeader>
          <strong>OPD Queue Management</strong>
        </CCardHeader>
        <CCardBody>
          <p className="my-0">
            All OPD patients waiting in <code>queue</code> are displayed here.
          </p>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          <strong>Search Patient</strong>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary small">
            Search patients by their <code>name</code>.
          </p>
          <CInputGroup>
            <CButton color='primary' id="addon-wrapping">
              <FaSearch />
            </CButton>
            <CFormInput
              placeholder='Search'
              aria-label="Search"
              style={{ margin: '0px 5px' }}
              onChange={handleSearch}
            />
          </CInputGroup>
        </CCardBody>
      </CCard>


      {loading ? (
        <div
          style={{
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader />
        </div>
      ) : (
        <CCard>
          <CCardBody>
            <CTable responsive hover bordered className="align-middle">
              <CTableHead>
                <CTableRow color="light">
                  <CTableHeaderCell>Queue Number</CTableHeaderCell>
                  <CTableHeaderCell>Patient Id</CTableHeaderCell>
                  <CTableHeaderCell>Patient Name</CTableHeaderCell>
                  <CTableHeaderCell>Age</CTableHeaderCell>
                  <CTableHeaderCell>Gender</CTableHeaderCell>
                  <CTableHeaderCell>Doctor Assigned</CTableHeaderCell>
                  <CTableHeaderCell>Queue Status</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              {role === 'Receptionist' ? (
                <CTableBody>
                  {receptionPaginatedData.map((elem, index) => (
                    <CTableRow color={statusColors[elem.status] || 'light'} key={index}>
                      <CTableDataCell>{elem.queueID}</CTableDataCell>
                      <CTableDataCell>{elem.patientID}</CTableDataCell>
                      <CTableDataCell>{elem.patient_name}</CTableDataCell>
                      <CTableDataCell>{elem.patient_age}</CTableDataCell>
                      <CTableDataCell>{elem.patient_gender}</CTableDataCell>
                      <CTableDataCell>{elem.name}</CTableDataCell>
                      <CTableDataCell>{elem.status}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          onClick={() => handleDelete(elem)}
                          color="dark"
                          className=" p-0 px-2 py-2"
                        >
                          Remove
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              ) : (
                <CTableBody>
                  {doctorPaginatedData.map((elem, index) => (
                    <CTableRow color={statusColors[elem.status] || 'light'} key={index}>
                      <CTableDataCell>{elem.queueID}</CTableDataCell>
                      <CTableDataCell>{elem.patientID}</CTableDataCell>
                      <CTableDataCell>{elem.patient_name}</CTableDataCell>
                      <CTableDataCell>{elem.patient_age}</CTableDataCell>
                      <CTableDataCell>{elem.patient_gender}</CTableDataCell>
                      <CTableDataCell>{elem.name}</CTableDataCell>
                      <CTableDataCell>{elem.status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          onClick={() => handleConsultation(elem)}
                          color="dark"
                          className="p-0 px-2 py-2"
                        >
                          Consult
                        </CButton>
                        <CButton
                          onClick={() => handleDelete(elem)}
                          color="danger"
                          className="p-0 px-2 py-2"
                        >
                          Remove
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              )}
            </CTable>
          </CCardBody>
        </CCard>
      )}

      {role === 'Receptionist' ? (
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

      ) : (
        <CCard className="mt-2">
          <CCardBody className="pb-0">
            <div className="d-flex justify-content-center">
              <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={Math.ceil(doctorFilteredData.length / itemsPerPage)}
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
      )}
    </>
  )
}

export default ViewQueue
