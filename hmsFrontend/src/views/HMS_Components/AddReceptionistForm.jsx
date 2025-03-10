import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import Webcam from 'react-webcam' 
import {
  CCard,
  CForm,
  CFormSelect,
  CFormTextarea,
  CFormInput,
  CCardBody,
  CButton,
  CFormLabel,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import Loader from '../../components/Loader'

const AddReceptionistForm = ({ role }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    date_Of_Birth: null,
    mobile: '',
    address: '',
    role: role,
    profilePhoto: null,
  })

  const [loading, setLoading] = useState(false)
  const [showCamera,setShowCamera]=useState(false)
  const webcamRef=useRef(null)

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      role: role,
    }))
  }, [role])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    setData({ ...data, profilePhoto: file })
  }

  const handleRemovePhoto = (e) => {
    setData({ ...data, profilePhoto: null })
    document.getElementById('profilePhoto').value = ''
  }

  const handleCapture=(e)=>
  {
    const imageSrc=webcamRef.current.getScreenshot()
    setData({...data,profilePhoto:imageSrc})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true) //show loader
    const token = localStorage.getItem('login-token')

    axios
      .post('http://127.0.0.1:8000/api/registeruser', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res)
        swal.fire({
          title: 'Success!',
          text: 'Receptionist added successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        })

        setData({
          name: '',
          email: '',
          password: '',
          gender: '',
          date_Of_Birth: null,
          mobile: '',
          address: '',
          role: role,
          profilePhoto: null,
        })
      })
      .catch((err) => {
        if (err.response && err.response.data.errors) {
          let errorMessages = Object.values(err.response.data.errors)
            .flat()
            .map((msg) => `<li>${msg}</li>`)
            .join('')

          swal.fire({
            title: 'Validation Error',
            html: `<ul style="text-align: left;">${errorMessages}</ul>`,
            icon: 'error',
            confirmButtonText: 'Try Again',
          })
        } else {
          swal.fire({
            title: 'Error!',
            text: 'Failed to add Receptionist.',
            icon: 'error',
            confirmButtonText: 'Try Again',
          })
        }
      })
      .finally(() => {
        setLoading(false) //hide
      })
  }

  //console.log('Current Role:', role) // Debugging Log

  return (
    <>
      {loading ? (
        // Loader at center
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
      ) : (
        // Form after loading completes
        <div className="container">
          <p className="text-body-secondary fs-5">Add Receptionist</p>

          <CForm onSubmit={handleSubmit} className="w-100">
            <div className="row">
              {/* Left Column */}
              <div className="col-md-4">
                <CFormLabel htmlFor="name" className="mt-2">
                  Name:
                </CFormLabel>
                <CFormInput
                  id="name"
                  onChange={handleChange}
                  type="text"
                  name="name"
                  required
                  value={data.name}
                />

                <CFormLabel htmlFor="email" className="mt-2">
                  Email:
                </CFormLabel>
                <CFormInput
                  id="email"
                  onChange={handleChange}
                  type="email"
                  name="email"
                  required
                  value={data.email}
                />

                <CFormLabel htmlFor="password" className="mt-2">
                  Password:
                </CFormLabel>
                <CFormInput
                  id="password"
                  onChange={handleChange}
                  type="password"
                  name="password"
                  required
                  autoComplete="new-password"
                  value={data.password}
                />

                <CFormLabel htmlFor="gender" className="mt-2">
                  Gender:
                </CFormLabel>
                <CFormSelect
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  required
                  value={data.gender}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </CFormSelect>
              </div>

              {/* Middle Column */}
              <div className="col-md-4">
                <CFormLabel htmlFor="date_Of_Birth" className="mt-2">
                  Date of Birth:
                </CFormLabel>
                <CFormInput
                  id="date_Of_Birth"
                  onChange={handleChange}
                  type="date"
                  name="date_Of_Birth"
                  value={data.date_Of_Birth || ''}
                />

                <CFormLabel htmlFor="mobile" className="mt-2">
                  Mobile:
                </CFormLabel>
                <CFormInput
                  id="mobile"
                  onChange={handleChange}
                  type="text"
                  name="mobile"
                  required
                  value={data.mobile}
                />

                <CFormLabel htmlFor="address" className="mt-2">
                  Address:
                </CFormLabel>
                <CFormTextarea
                  id="address"
                  onChange={handleChange}
                  name="address"
                  required
                  value={data.address}
                ></CFormTextarea>
              </div>

              {/* Right Column - Photo Upload Section */}
              <div className="col-md-4 d-flex flex-column align-items-center">
                <div
                  className="rounded-circle border d-flex justify-content-center align-items-center mt-2"
                  style={{
                    width: '150px',
                    height: '150px',
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa',
                  }}
                >
                  {data.profilePhoto ? (
                    <img
                      src={typeof data.profilePhoto==='string' ? data.profilePhoto : URL.createObjectURL(data.profilePhoto)}
                      alt="Profile Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>

                <CFormLabel className="mt-2">Photo</CFormLabel>
                <input type="file" accept="image/*" id="profilePhoto" name="profilePhoto" onChange={handlePhotoChange} hidden/>
                <CButton
                  color="primary"
                  className="me-2"
                  onClick={() => document.getElementById('profilePhoto').click()}
                >
                  Upload Photo
                </CButton>
                <CButton color="primary" className="mt-2" onClick={() => setShowCamera(true)}>
                  Capture Photo
                </CButton>
                <CButton color="danger" className="mt-2" onClick={handleRemovePhoto}>
                  Remove Photo
                </CButton>
              </div>
            </div>
            <div className="text-left mt-3">
              <CButton color="primary" type="submit">
                Add User
              </CButton>
            </div>
          </CForm>
        </div>
      )}
      <CModal visible={showCamera}onClose={()=>setShowCamera(false)}>
      <CModalHeader>Capture Photo</CModalHeader>
      <CModalBody>
        <Webcam ref={webcamRef} getscreenshot="image/jpeg" style={{ width: '100%' }}/>
      </CModalBody>
      <CModalFooter>
      <CButton color="primary" onClick={handleCapture}>Capture</CButton>
      <CButton color="warning" onClick={() => setData({ ...data, profilePhoto: null })}> Recapture </CButton>
      </CModalFooter>
        </CModal>    
        </>
  )
}

export default AddReceptionistForm
