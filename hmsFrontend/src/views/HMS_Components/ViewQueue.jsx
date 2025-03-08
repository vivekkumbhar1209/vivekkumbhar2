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
} from '@coreui/react'
import axios from 'axios'
import Pusher from 'pusher-js'
import Loader from '../../components/Loader'
import swal from 'sweetalert2'

const ViewQueue = () => {
  const [queue, setQueue] = useState([])
  const [loading, setLoading] = useState(false)
  const role = JSON.parse(localStorage.getItem('userData')).role
  const navigator = useNavigate()
  const statusColors = {
    Waiting: 'warning',
    'In Consultation': 'info',
    Completed: 'success',
  }

  useEffect(() => {
    setLoading(true)
    // Pusher.logToConsole = true

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

    axios
      .get('http://127.0.0.1:8000/api/getOpdQueue', {
        headers: { Authorization: `Bearer ${localStorage.getItem('login-token')}` },
      })
      .then((res) => {
        console.log(res.data)
      })
  }, [])

  const filteredQueueForDoctor = queue.filter(
    (item) => item.id === JSON.parse(localStorage.getItem('userData')).id,
  )

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

          axios
            .post('http://127.0.0.1:8000/api/dequeue', data, {
              headers: { Authorization: `Bearer ${localStorage.getItem('login-token')}` },
            })
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
          axios
            .post(
              'http://localhost:8000/api/updatePatientQueueStatus',
              { queueID: elem.queueID },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('login-token')}`,
                },
              },
            )
            .then((res) => {
              if (res.data.status === 200) {
                var newElem = { ...elem, status: 'In Consultation' }
                navigator('/dashboard/opdConsultation', { state: { data: newElem } })
              }
            })
        }
      })
  }

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
                  {queue.map((elem, index) => (
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
                  {filteredQueueForDoctor.map((elem, index) => (
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
    </>
  )
}

export default ViewQueue
