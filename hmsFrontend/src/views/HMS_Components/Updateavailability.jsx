import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import Loader from '../../components/Loader'
import api from '../../api'
import { CCard, CCardHeader, CCardBody, CForm, CFormLabel, CFormSelect, CFormInput, CButton, CRow, CCol } from '@coreui/react'

const UpdateAvailability = ( {doctorUser = null} ) => {
  const [availabilityStatus, setAvailabilityStatus] = useState('')
  const [availableStartTime, setAvailableStartTime] = useState('')
  const [availableEndTime, setAvailableEndTime] = useState('')
  const [leaveType, setLeaveType] = useState('') // 1-day leave or multi-day leave
  const [unavailableStartDate, setUnavailableStartDate] = useState('')
  const [unavailableEndDate, setUnavailableEndDate] = useState('')
  const [reason, setReason] = useState('')
  const [doctorAvailability, setDoctorAvailability] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    fetchDoctorAvailability()
  }, [])

  const fetchDoctorAvailability = async () => {
    try {
      const token = localStorage.getItem('login-token')
      const response = await api.get('/getavailabilityofdoctor', {
        
        params: doctorUser === null ? {} : {doctorId: doctorUser.id},    // pass doctor id selected from receptionist's dashboard to backend!
        
      })
      if (response.data.status === 200) {
        setDoctorAvailability(response.data.data)
      } else {
        setDoctorAvailability(null)
      }
    } catch (error) {
      console.error('Error fetching availability:', error)
    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    setLoading(true)
    try {
      const userData = doctorUser === null ? JSON.parse(localStorage.getItem('userData')) : doctorUser;
      console.log(userData);
      const token = localStorage.getItem('login-token') // Ensure token is retrieved properly
      const userID = userData?.id

      if (!userID || !token) {
        swal.fire('Unauthorized', 'Please log in again.', 'error')
        return
      }

      const formData = {
        userID: userID,
        availability_status: availabilityStatus,
        available_start_time: availabilityStatus === 'Available' ? availableStartTime : null,
        available_end_time: availabilityStatus === 'Available' ? availableEndTime : null,
        unavailable_start_date: availabilityStatus === 'Unavailable' ? unavailableStartDate : null,
        unavailable_end_date: availabilityStatus === 'Unavailable' ? unavailableEndDate : null,
        reason: availabilityStatus === 'Unavailable' ? reason : null,
      }

      const response = await api.post('/updateavailability', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if (response.data.status === 200) {
        swal.fire('Success', 'Availability updated successfully.', 'success')
        setAvailabilityStatus('')
        setAvailableStartTime('')
        setAvailableEndTime('')
        setLeaveType('')
        setUnavailableStartDate('')
        setUnavailableEndDate('')
        setReason('')
        fetchDoctorAvailability()
      } else {
        swal.fire('Error', response.data.message || 'Something went wrong!', 'error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      swal.fire('Error', 'An error occurred while updating availability.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '100vh' }}>
          <Loader />
        </div>
      ) : (
        <>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>Current Availability</strong>
            </CCardHeader>
            <CCardBody>
              {doctorAvailability ? (
                <>
                  <p>
                    <strong>Status:</strong> {doctorAvailability.availability_status}
                  </p>
                  {doctorAvailability.availability_status === 'Available' && (
                    <p>
                      <strong>Time:</strong> {doctorAvailability.available_start_time} - {doctorAvailability.available_end_time}
                    </p>
                  )}
                  {doctorAvailability.availability_status === 'Unavailable' && (
                    <>
                      {doctorAvailability.unavailable_start_date === doctorAvailability.unavailable_end_date ? (
                        <p>
                          <strong>Unavailable Date:</strong> {doctorAvailability.unavailable_start_date}
                        </p>
                      ) : (
                        <p>
                          <strong>Unavailable From:</strong> {doctorAvailability.unavailable_start_date} <strong>to</strong> {doctorAvailability.unavailable_end_date}
                        </p>
                      )}
                      <p>
                        <strong>Reason:</strong> {doctorAvailability.reason}
                      </p>
                    </>
                  )}
                </>
              ) : (
                <p>No availability data found.</p>
              )}
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>
              <strong>Update Availability</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                {/* Dropdown for Availability Status */}
                <CRow className="mb-3">
                  <CCol md={4}>
                    <CFormLabel>Select Availability</CFormLabel>
                    <CFormSelect value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)}>
                      <option value="">Select</option>
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </CFormSelect>
                  </CCol>
                </CRow>

                {/* Fields for Available */}
                {availabilityStatus === 'Available' && (
                  <CRow className="mb-3">
                    <CCol md={4}>
                      <CFormLabel>Start Time</CFormLabel>
                      <CFormInput type="time" value={availableStartTime} onChange={(e) => setAvailableStartTime(e.target.value)} />
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel>End Time</CFormLabel>
                      <CFormInput type="time" value={availableEndTime} onChange={(e) => setAvailableEndTime(e.target.value)} />
                    </CCol>
                  </CRow>
                )}

                {/* Fields for Unavailable */}
                {availabilityStatus === 'Unavailable' && (
                  <>
                    {/* Leave Type Dropdown */}
                    <CRow className="mb-3">
                      <CCol md={4}>
                        <CFormLabel>Leave Type</CFormLabel>
                        <CFormSelect value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                          <option value="">Select</option>
                          <option value="1-day">1 Day Leave</option>
                          <option value="multi-day">Multi-Day Leave</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>

                    {/* Date Fields based on Leave Type */}
                    {leaveType === '1-day' && (
                      <CRow className="mb-3">
                        <CCol md={4}>
                          <CFormLabel>Leave Date</CFormLabel>
                          <CFormInput
                            type="date"
                            value={unavailableStartDate}
                            onChange={(e) => {
                              setUnavailableStartDate(e.target.value)
                              setUnavailableEndDate(e.target.value) // Auto-set end date
                            }}
                          />
                        </CCol>
                      </CRow>
                    )}

                    {leaveType === 'multi-day' && (
                      <CRow className="mb-3">
                        <CCol md={4}>
                          <CFormLabel>Start Date</CFormLabel>
                          <CFormInput type="date" value={unavailableStartDate} onChange={(e) => setUnavailableStartDate(e.target.value)} />
                        </CCol>
                        <CCol md={4}>
                          <CFormLabel>End Date</CFormLabel>
                          <CFormInput type="date" value={unavailableEndDate} onChange={(e) => setUnavailableEndDate(e.target.value)} />
                        </CCol>
                      </CRow>
                    )}

                    <CRow className="mb-3">
                      <CCol md={8}>
                        <CFormLabel>Reason</CFormLabel>
                        <CFormInput type="text" placeholder="Enter reason" value={reason} onChange={(e) => setReason(e.target.value)} />
                      </CCol>
                    </CRow>
                  </>
                )}

                <CButton type="submit" color="primary">
                  Update Availability
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </>
      )}
    </>
  )
}

export default UpdateAvailability
