import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import Webcam from 'react-webcam'
import {
  CCard,
  CModal,
  CForm,
  CFormSelect,
  CFormTextarea,
  CFormInput,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CCardBody,
  CButton,
  CFormLabel,
  CModalTitle
} from '@coreui/react'
import Loader from '../../../components/Loader'

const AddDoctorForm = ({ role, propAction = 'add', user }) => {
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const [loading, setLoading] = useState(false)
  const [departments, setDepartments] = useState([]) // Store departments
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    date_Of_Birth: '',
    mobile: '',
    address: '',
    role: role,
    experience: '',
    departmentID: '',
    consultation_fee: '',
    profilePhoto: null,
  })

  const [showCamera, setShowCamera] = useState(false)
  const webcamRef = useRef(null)
  const [capturedImage, setCapturedImage] = useState(null) //set modelf

  //// Runs whenever `role` changes
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      role: role,
    }))
  }, [role])

  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      const token = localStorage.getItem('login-token')
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getDept', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setDepartments(response.data.deptData)
      } catch (error) {
        console.error('Error fetching departments:', error)
      }
    }
    fetchDepartments()
  }, [])

  // Populate form fields with user data when editing
  useEffect(() => {
    if (propAction === 'edit' && user) {
      console.log(data)
      setData({
        name: user.name,
        email: user.email,
        password: '', // Don't fill password for security reasons
        gender: user.gender,
        date_Of_Birth: user.date_Of_Birth || null,
        mobile: user.mobile,
        address: user.address,
        role: user.role,
        // specialization: user.doctor.specialization,
        experience: user.doctor.experience,
        departmentID: user.doctor.departmentID,
        consultation_fee: user.doctor.consultation_fee,
        profilePhoto: user.profilePhoto
      })
      setModalVisible(true) // Open the modal
    } else {
      setData({
        name: '',
        email: '',
        password: '',
        gender: '',
        date_Of_Birth: null,
        mobile: '',
        address: '',
        role: role,
        // specialization: '',
        experience: '',
        departmentID: '',
        consultation_fee: '',
        profilePhoto: '',
      })
    }
  }, [propAction, user, role]) // Runs whenever `propAction`, `user`, or `role` changes

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

  const handleCapture = (e) => {
    const imageSrc = webcamRef.current.getScreenshot()
    setCapturedImage(imageSrc) //for model
    //setData({...data,profilePhoto:imageSrc})
  }

  const handleUsePhoto = () => {
    const blob = dataURItoBlob(capturedImage) //change captured image to blob
    const file = new File([blob], `captured-photo-${Date.now()}.jpg`, { type: 'image/jpeg' })
    setData({ ...data, profilePhoto: file }) // Set final profile photo
    setCapturedImage(null)
    setShowCamera(false) // Close modal
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) //show loader
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('gender', data.gender)
    if (data.date_Of_Birth) {
      formData.append('date_Of_Birth', data.date_Of_Birth)
    }
    formData.append('address', data.address)
    formData.append('mobile', data.mobile)
    formData.append('role', data.role)
    formData.append('experience', data.experience)
    formData.append('departmentID', data.departmentID)
    formData.append('consultation_fee', data.consultation_fee)
    const uniqueFileName = `compressed-image-${Date.now()}.jpg`
    formData.append('profilePhoto', data.profilePhoto, uniqueFileName)

    /*if (data.profilePhoto) {
      try {
        let compressedBlob = await compressImage(data.profilePhoto)
        const uniqueFileName = `compressed-image-${Date.now()}.jpg`
        formData.append('profilePhoto', compressedBlob, uniqueFileName)
      } catch (error) {
        console.error('Image compression failed:', error)
      }
    }*/

    // Log FormData before sending
    console.log('FormData being sent:')
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1])
    }

    // Call sendToBackend for 'add' action
    if (propAction === 'add') {
      console.log('inadd', formData)

      sendToBackend('http://127.0.0.1:8000/api/registeruser', 'POST', formData)
    } else if (propAction === 'edit') {
      // Update user endpoint

      formData.append('_method', 'PUT')
      const url = `http://127.0.0.1:8000/api/updateuser/${user.id}`
      console.log('in edit', formData, data)
      sendToBackend(url, 'POST', formData)
    }
  }


  const sendToBackend = async (url, method, formData) => {
    const token = localStorage.getItem('login-token')

    try {
      const response = await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      // Check if API response contains validation errors
      if (response.data.errors) {
        let errorMessages = Object.values(response.data.errors)
          .flat()
          .map((msg) => `<li>${msg}</li>`)
          .join('')

        swal.fire({
          title: 'Validation Error',
          html: `<ul style="text-align: left;">${errorMessages}</ul>`,
          icon: 'error',
          confirmButtonText: 'Try Again',
        })

        // Stop execution if there are validation errors
        return
      }

      swal.fire({
        title: 'Success!',
        text: 'Doctor added successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      })

    setData({
      name: '',
      email: '',
      password: '',
      gender: '',
      date_Of_Birth: '',
      mobile: '',
      address: '',
      role: role,
      // specialization: '',
      experience: '',
      departmentID: '',
      consultation_fee: '',
      profilePhoto: '',
    })
    setModalVisible(false);
  } catch (err) {
    console.error('Error:', err)

      if (err.response && err.response.status === 422) {
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
          text: 'Failed to add doctor.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  //compress image
  const compressImage = (image) => {
    return new Promise((resolve, reject) => {
      if (typeof image === 'string' && image.startsWith('data:image')) {
        // If image is already a base64 string (captured by webcam), no need to compress
        resolve(image)
        return
      }

      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const maxWidth = 300
        const maxHeight = 300
        let width = img.width
        let height = img.height

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width
            width = maxWidth
          } else {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Compression failed'))
            }
          },
          'image/jpeg',
          0.7,
        )
      }

      img.onerror = reject

      if (typeof image !== 'string') {
        img.src = URL.createObjectURL(image)
      } else {
        img.src = image
      }
    })
  }

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const uint8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i)
    }

    return new Blob([uint8Array], { type: mimeString })
  }


const closeModal = () => {
  setModalVisible(false); // Close the modal
  setData({
    name: '',
    email: '',
    password: '',
    gender: '',
    date_Of_Birth: null,
    mobile: '',
    address: '',
    role: role,
    // specialization: '',
    experience: '',
    departmentID: '',
    consultation_fee: '',
    profilePhoto: null,
  })
};

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
      ) : null}
      {propAction === 'edit' ? (
        <CModal visible={modalVisible} onClose={closeModal} backdrop="static" size="xl">
          <CModalHeader closeButton={true}>
            <CModalTitle>Edit Doctor</CModalTitle>
          </CModalHeader>

          <CModalBody>

            <div className="container">
              <CForm onSubmit={handleSubmit} className="w-100" encType="multipart/form-data">
                <div className="row align-items-stretch">
                  {/* Left Column */}
                  <div className="col-md-8">
                    <CCard className="p-3 h-100">
                      <div className="row">
                        <div className="col-md-6">
                          <CFormLabel htmlFor="name">Name:</CFormLabel>
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
                            required={propAction === "add"}
                            placeholder={propAction === 'add' ? 'Password' : 'Leave blank to keep current password'}
                            value={data.password}
                          />
                          <div>
                        <small className="text-gray-400">Note: Password must contain at least 1 uppercase letter, 1 special character, and 1 number.</small>
                      </div>

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

                        {/* Right Column */}
                        <div className="col-md-6">
                          <CFormLabel htmlFor="mobile">Mobile:</CFormLabel>
                          <CFormInput
                            id="mobile"
                            onChange={handleChange}
                            type="text"
                            name="mobile"
                            required
                            value={data.mobile}
                          />

                          <CFormLabel htmlFor="experience" className="mt-2">
                            Experience (Years):
                          </CFormLabel>
                          <CFormInput
                            id="experience"
                            onChange={handleChange}
                            type="text"
                            name="experience"
                            required
                            value={data.experience}
                          />

                          <CFormLabel htmlFor="department" className="mt-2">
                            Department:
                          </CFormLabel>
                          <CFormSelect
                            id="departmentID"
                            name="departmentID"
                            onChange={handleChange}
                            required
                            value={data.departmentID}
                          >
                            <option value="" disabled>
                              Select Department
                            </option>
                            {departments.map((dept) => (
                              <option key={dept.departmentID} value={dept.departmentID}>
                                {dept.department_name}
                              </option>
                            ))}
                          </CFormSelect>

                          <CFormLabel htmlFor="consultation_fee" className="mt-2">
                            Consultation Fee:
                          </CFormLabel>
                          <CFormInput
                            id="consultation_fee"
                            onChange={handleChange}
                            type="text"
                            name="consultation_fee"
                            required
                            value={data.consultation_fee}
                          />

                          <CFormLabel htmlFor="date_Of_Birth" className="mt-2">
                            Date of Birth:
                          </CFormLabel>
                          <CFormInput
                            id="date_Of_Birth"
                            onChange={handleChange}
                            type="date"
                            name="date_Of_Birth"
                            value={data.date_Of_Birth}
                          />
                        </div>
                      </div>
                    </CCard>
                  </div>

                  {/* Right Column - Wrapped in its own card */}
                  <div className="col-md-4">
                    <CCard className="p-3 h-100 d-flex flex-column align-items-center">
                      <p className="text-body-secondary fs-5">Add Photo</p>
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
                            src={
                              typeof data.profilePhoto === 'string'
                                ? `http://localhost:8000/storage/${data.profilePhoto}`
                                : URL.createObjectURL(data.profilePhoto)
                            }
                            alt="Profile Preview"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </div>

                      <CFormLabel className="mt-2"></CFormLabel>
                      <input
                        type="file"
                        accept="image/*"
                        id="profilePhoto"
                        name="profilePhoto"
                        onChange={handlePhotoChange}
                        hidden
                      />
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
                    </CCard>
                  </div>
                </div>

                <div className="text-left mt-3">
                  <CButton color="primary" type="submit">
                    Update Doctor
                  </CButton>
                </div>
              </CForm>
            </div>
          </CModalBody>
        </CModal>
      ) : (
        <div className="container">
          <CForm onSubmit={handleSubmit} className="w-100" encType="multipart/form-data">
            <div className="row align-items-stretch">
              {/* Left Column */}
              <div className="col-md-8">
                <CCard className="p-3 h-100">
                  <p className="text-body-secondary fs-5">Add Doctor</p>
                  <div className="row">
                    <div className="col-md-6">
                      <CFormLabel htmlFor="name">Name:</CFormLabel>
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
                        value={data.password}
                      />
                      <div>
                        <small className="text-gray-400">Note: Password must contain at least 1 uppercase letter, 1 special character, and 1 number.</small>
                      </div>

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

                    {/* Right Column */}
                    <div className="col-md-6">
                      <CFormLabel htmlFor="mobile">Mobile:</CFormLabel>
                      <CFormInput
                        id="mobile"
                        onChange={handleChange}
                        type="text"
                        name="mobile"
                        required
                        value={data.mobile}
                      />

                      <CFormLabel htmlFor="experience" className="mt-2">
                        Experience (Years):
                      </CFormLabel>
                      <CFormInput
                        id="experience"
                        onChange={handleChange}
                        type="text"
                        name="experience"
                        required
                        value={data.experience}
                      />

                      <CFormLabel htmlFor="department" className="mt-2">
                        Department:
                      </CFormLabel>
                      <CFormSelect
                        id="departmentID"
                        name="departmentID"
                        onChange={handleChange}
                        required
                        value={data.departmentID}
                      >
                        <option value="" disabled>
                          Select Department
                        </option>
                        {departments.map((dept) => (
                          <option key={dept.departmentID} value={dept.departmentID}>
                            {dept.department_name}
                          </option>
                        ))}
                      </CFormSelect>

                      <CFormLabel htmlFor="consultation_fee" className="mt-2">
                        Consultation Fee:
                      </CFormLabel>
                      <CFormInput
                        id="consultation_fee"
                        onChange={handleChange}
                        type="text"
                        name="consultation_fee"
                        required
                        value={data.consultation_fee}
                      />

                      <CFormLabel htmlFor="date_Of_Birth" className="mt-2">
                        Date of Birth:
                      </CFormLabel>
                      <CFormInput
                        id="date_Of_Birth"
                        onChange={handleChange}
                        type="date"
                        name="date_Of_Birth"
                        value={data.date_Of_Birth}
                      />
                    </div>
                  </div>
                </CCard>
              </div>

              {/* Right Column - Wrapped in its own card */}
              <div className="col-md-4">
                <CCard className="p-3 h-100 d-flex flex-column align-items-center">
                  <p className="text-body-secondary fs-5">Add Photo</p>
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
                        src={
                          typeof data.profilePhoto === 'string'
                            ? data.profilePhoto
                            : URL.createObjectURL(data.profilePhoto)
                        }
                        alt="Profile Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </div>

                  <CFormLabel className="mt-2"></CFormLabel>
                  <input
                    type="file"
                    accept="image/*"
                    id="profilePhoto"
                    name="profilePhoto"
                    onChange={handlePhotoChange}
                    hidden
                  />
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
                </CCard>
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
      <CModal visible={showCamera} onClose={() => setShowCamera(false)}>
        <CModalHeader>Capture Photo</CModalHeader>
        <CModalBody>
          {!capturedImage ? (
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" style={{ width: '100%' }} />
          ) : (
            <img src={capturedImage} alt="Captured" style={{ width: '100%' }} />
          )}
        </CModalBody>
        <CModalFooter>
          {!capturedImage ? (
            <CButton color="primary" onClick={handleCapture}>
              Capture
            </CButton>
          ) : (
            <>
              <CButton color="success" onClick={handleUsePhoto}>
                Use This Photo
              </CButton>
              <CButton
                color="warning"
                onClick={() => {
                  setCapturedImage(null)
                }}
              >
                Recapture
              </CButton>
            </>
          )}
        </CModalFooter>
      </CModal>
    </>
  )
}
export default AddDoctorForm
