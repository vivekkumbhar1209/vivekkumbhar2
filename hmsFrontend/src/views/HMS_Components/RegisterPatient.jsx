import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import api from '../../api'
import { CCard,
   CCardHeader, 
   CCardBody, 
   CForm, 
   CFormLabel, 
   CFormInput, 
   CFormSelect, 
   CButton, 
   CRow, 
   CCol } from '@coreui/react'
import Loader from '../../components/Loader'

const RegisterPatient = () => {
  const [data, setData] = useState({
    patient_name: "",
    patient_email: "",
    patient_mobile: "",
    emergency_name: "",
    emergency_no: "",
    patient_address: "",
    patient_gender: "",
    patient_dob: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()   
    const token = localStorage.getItem('login-token')
    setLoading(true); // Show loader

    console.log('Submitting Data:', JSON.stringify(data, null, 2)) // Log request payload

    try {
      const response = await api.post('/registerpatient', data, {
        headers: { Authorization: `Bearer ${token}` },
      })

      console.log('Backend Response:', response.data) // Log response

      // ✅ CHECK if the status is NOT 200 (Success)
      if (response.data.status !== 200) {
        Swal.fire({
          title: 'Validation Error',
          text: response.data.message || 'Invalid data provided',
          icon: 'error',
          confirmButtonText: 'Try Again',
        })
        return // ❌ STOP execution if validation fails
      }

      // ✅ If no validation errors, show success message
      Swal.fire({
        title: 'Success!',
        text: 'Patient registered successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      })

      setData({
        patient_name: "",
        patient_email: "",
        patient_mobile: "",
        emergency_name: "",
        emergency_no: "",
        patient_address: "",
        patient_gender: "",
        patient_dob: "",
      });
  
    } catch (err) {
      console.error('Error Response:', err.response ? err.response.data : err.message)

      if (err.response && err.response.data.errors) {
        const errorMessages = Object.entries(err.response.data.errors)
          .map(
            ([field, messages]) =>
              `<li><b>${formatFieldName(field)}:</b> ${messages.join(', ')}</li>`,
          )
          .join('')

        Swal.fire({
          title: 'Validation Error',
          html: `<ul style="text-align: left; color: red;">${errorMessages}</ul>`,
          icon: 'error',
          confirmButtonText: 'Try Again',
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to register patient. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    }finally {
      setLoading(false); // Hide loader
    }
  };

  const formatFieldName = (field) => {
    return field.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return (
    <>
    {loading && (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999,
        }}
      >
        <Loader />
      </div>
    )}
    <CCard className="mx-auto" style={{ maxWidth: '1100px', minHeight: '500px', backgroundColor: '#f8f9fa' }}>
  <CCardHeader>
    <strong>Patient Registration</strong>
  </CCardHeader>
   <CCardBody className="mb-0">
       <p className="text-body-secondary small">
         You can register new <code>patients</code> from here.
       </p>
      <CForm onSubmit={handleSubmit}>
        <CRow className="mb-3">
        <CCol md={6}><CFormLabel>Full Name</CFormLabel><CFormInput type="text" name="patient_name" value={data.patient_name} onChange={handleChange} required /></CCol>
        <CCol md={6}><CFormLabel>Email</CFormLabel><CFormInput type="email" name="patient_email" value={data.patient_email} onChange={handleChange} required /></CCol>
        </CRow>
        <CRow className="mb-3">
        <CCol md={6}><CFormLabel>Mobile</CFormLabel><CFormInput type="tel" name="patient_mobile" value={data.patient_mobile} onChange={handleChange} required /></CCol>
        <CCol md={6}><CFormLabel>Emergency Contact Name</CFormLabel><CFormInput type="text" name="emergency_name" value={data.emergency_name} onChange={handleChange} required /></CCol>
        </CRow>
        <CRow className="mb-3">
        <CCol md={6}><CFormLabel>Emergency Contact Mobile</CFormLabel><CFormInput type="tel" name="emergency_no" value={data.emergency_no} onChange={handleChange} required /></CCol>
        <CCol md={6}><CFormLabel>Address</CFormLabel><CFormInput type="text" name="patient_address" value={data.patient_address} onChange={handleChange} required /></CCol>
        </CRow>
        <CRow className="mb-3">
        <CCol md={6}>
          <CFormLabel>Gender</CFormLabel>
          <CFormSelect name="patient_gender" value={data.patient_gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </CFormSelect>
        </CCol>
        <CCol md={6}><CFormLabel>Date of Birth</CFormLabel><CFormInput type="date" name="patient_dob" value={data.patient_dob} onChange={handleChange} required /></CCol>
        </CRow>
        <div className="d-flex justify-content-start gap-2">
        <CButton color="secondary" className="px-4 py-2 text-white" onClick={() => setData({ patient_name: '', patient_email: '', patient_mobile: '', emergency_name: '', emergency_no: '', patient_address: '', patient_gender: '', patient_dob: '' })}>
          Reset
        </CButton>
        <CButton type="submit" color="primary" className="px-4 py-2">
          Submit
        </CButton>
        </div>
      </CForm>
    </CCardBody>
    </CCard>
    </>
);
  
};

export default RegisterPatient
