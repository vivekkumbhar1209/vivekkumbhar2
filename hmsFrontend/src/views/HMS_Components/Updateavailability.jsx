//its only for doctor dashboard to update own availability
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import Loader from '../../components/Loader'
import { CCard, CCardHeader, CCardBody, CForm, CFormLabel, CFormSelect, CFormInput, CButton, CRow, CCol } from '@coreui/react'

const UpdateAvailability = ( {doctorUser = null} ) => {
  const [availabilityStatus, setAvailabilityStatus] = useState('')
  const [availableStartTime, setAvailableStartTime] = useState('')
  const [availableEndTime, setAvailableEndTime] = useState('')
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
      const response = await axios.get('http://127.0.0.1:8000/api/getavailabilityofdoctor', {
        
        params: doctorUser === null ? {} : {doctorId: doctorUser.id},    // pass doctor id selected from receptionist's dashboard to backend!
        headers: { Authorization: `Bearer ${token}` },
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

      if (!userID) {
        console.error('User ID not found in local storage')
        swal.fire('Error', 'User ID not found. Please log in again.', 'error')
        return
      }

      if (!token) {
        console.error('Auth token not found in local storage')
        swal.fire('Unauthorized', 'Please log in again.', 'warning')
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

      // API request using axios
      const response = await axios.post('http://127.0.0.1:8000/api/updateavailability', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if (response.data.status === 200) {
        swal.fire({
          title: 'Success!',
          text: 'Availability updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        setAvailabilityStatus('')
        setAvailableStartTime('')
        setAvailableEndTime('')
        setUnavailableStartDate('')
        setUnavailableEndDate('')
        setReason('')
        fetchDoctorAvailability() //refresh availability
      } else if (response.data.status === 403) {
        const validationErrorMessages = Object.values(response.data.validationErrors)
          .flat()
          .map((msg) => `<li>${msg}</li>`)
          .join('')

        swal.fire({
          title: 'Validation Error',
          html: `<ul style='text-align: left'>${validationErrorMessages}</ul>`,
          icon: 'error',
          confirmButtonText: 'Try again',
        })
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

  /* to get details of user from user table
 $user = User::with('availability')->find(1);
dd($user->toArray());

*/
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
                      <p>
                        <strong>Unavailable From:</strong> {doctorAvailability.unavailable_start_date} <strong>to</strong> {doctorAvailability.unavailable_end_date}
                      </p>
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
                    <CRow className="mb-3">
                      <CCol md={8}>
                        <CFormLabel>Reason</CFormLabel>
                        <CFormInput type="text" placeholder="Enter reason" value={reason} onChange={(e) => setReason(e.target.value)} />
                      </CCol>
                    </CRow>
                  </>
                )}

                {/* Submit Button */}
                <CRow>
                  <CCol md={4}>
                    <CButton type="submit" color="primary">
                      Update Availability
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </>
      )}
    </>
  )
}

export default UpdateAvailability
