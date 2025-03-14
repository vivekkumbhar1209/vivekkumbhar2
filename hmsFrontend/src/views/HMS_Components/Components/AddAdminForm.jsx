import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
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
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

// Assuming Loader is imported or defined somewhere
import Loader from '../../../components/Loader'
import PhotoCapture from '../../../components/photo/photoCapture'
const AddAdminForm = ({ role, propAction = 'add', user }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    date_Of_Birth: null,
    mobile: '',
    address: '',
    role: role, // This gets set only on the first render
    profilePhoto: null,
  })

  const [modalVisible, setModalVisible] = useState(false) // State for modal visibility
  const [loading, setLoading] = useState(false) // Loading state for the loader

  // Update the role in state when the prop changes
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      role: role, // Update role in state
    }))
  }, [role]) // Runs whenever `role` changes

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
        profilePhoto: user.profilePhoto,
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
        profilePhoto: null,
      })
    }
  }, [propAction, user, role]) // Runs whenever `propAction`, `user`, or `role` changes

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Show loader

    // Create FormData object if action is 'add'
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('gender', data.gender)
    if (data.date_Of_Birth) formData.append('date_Of_Birth', data.date_Of_Birth)
    formData.append('address', data.address)
    formData.append('mobile', data.mobile)
    formData.append('role', data.role)

    if (data.profilePhoto) {
      try {
        let compressedBlob = await compressImage(data.profilePhoto)
        const uniqueFileName = `compressed-image-${Date.now()}.jpg`
        formData.append('profilePhoto', compressedBlob, uniqueFileName)
      } catch (error) {
        console.error('Image compression failed:', error)
      }
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

  // Generic sendToBackend function
  const sendToBackend = (url, method, formData) => {
    const token = localStorage.getItem('login-token')

    axios({
      method: method,
      url: url,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Ensure correct content type for form data
      },
    })
      .then((res) => {
        console.log(res)
        swal.fire({
          title: 'Success!',
          text: method === 'POST' ? 'Admin added successfully.' : 'Admin updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        })

        // Reset form data after successful request
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
        setModalVisible(false) // Close modal on edit success
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
            text: method === 'POST' ? 'Failed to add Admin.' : 'Failed to update Admin.',
            icon: 'error',
            confirmButtonText: 'Try Again',
          })
        }
      })
      .finally(() => {
        setLoading(false) // Hide loader
        console.log('Request finished (either success or failure)')
      })
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

  // //////////////////////////////////////////////////////////////////
  //     if (propAction === 'add') {
  //       axios
  //         .post('http://127.0.0.1:8000/api/registeruser', data, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((res) => {
  //           console.log(res)
  //           swal.fire({
  //             title: 'Success!',
  //             text: 'Admin added successfully.',
  //             icon: 'success',
  //             confirmButtonText: 'OK',
  //           })

  //           setData({
  //             name: '',
  //             email: '',
  //             password: '',
  //             gender: '',
  //             date_Of_Birth: null,
  //             mobile: '',
  //             address: '',
  //             role: role, // Keep the role unchanged

  //           })
  //         })
  //         .catch((err) => {
  //           if (err.response && err.response.data.errors) {
  //             let errorMessages = Object.values(err.response.data.errors)
  //               .flat()
  //               .map((msg) => `<li>${msg}</li>`)
  //               .join('')

  //             swal.fire({
  //               title: 'Validation Error',
  //               html: `<ul style="text-align: left;">${errorMessages}</ul>`,
  //               icon: 'error',
  //               confirmButtonText: 'Try Again',
  //             })
  //           } else {
  //             swal.fire({
  //               title: 'Error!',
  //               text: 'Failed to add Admin.',
  //               icon: 'error',
  //               confirmButtonText: 'Try Again',
  //             })
  //           }
  //         })
  //         .finally(() => {
  //           // End loading
  //           setLoading(false);
  //           console.log("Request finished (either success or failure)");
  //         });
  //     } else if (propAction === 'edit') {
  //       // Update user endpoint
  //       axios
  //         .put(`http://127.0.0.1:8000/api/updateuser/${user.id}`, data, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((res) => {
  //           console.log(res)
  //           swal.fire({
  //             title: 'Success!',
  //             text: 'Admin updated successfully.',
  //             icon: 'success',
  //             confirmButtonText: 'OK',
  //           })
  //           setModalVisible(false); // Close the modal after editing
  //         })
  //         .catch((err) => {
  //           if (err.response && err.response.data.errors) {
  //             let errorMessages = Object.values(err.response.data.errors)
  //               .flat()
  //               .map((msg) => `<li>${msg}</li>`)
  //               .join('')

  //             swal.fire({
  //               title: 'Validation Error',
  //               html: `<ul style="text-align: left;">${errorMessages}</ul>`,
  //               icon: 'error',
  //               confirmButtonText: 'Try Again',
  //             })
  //           } else {
  //             swal.fire({
  //               title: 'Error!',
  //               text: 'Failed to update Admin.',
  //               icon: 'error',
  //               confirmButtonText: 'Try Again',
  //             })
  //           }
  //         })
  //         .finally(() => {
  //           // End loading
  //           setLoading(false);
  //           console.log("Request finished (either success or failure)");
  //         });
  //     }

  //     console.log("Final Data Sent to API:", data);
  //   }

  const closeModal = () => {
    setModalVisible(false) // Close the modal
    setData({
      name: '',
      email: '',
      password: '',
      gender: '',
      date_Of_Birth: null,
      mobile: '',
      address: '',
      role: role,
    })
  }

  return (
    <>
      {/* Loader */}
      {loading ? (
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
        <CModal visible={modalVisible} onClose={closeModal} backdrop="static" size="lg">
          <CModalHeader closeButton={true}>
            <CModalTitle>Edit Admin</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleSubmit} className="w-100" encType="multipart/form-data">
              <div className="row">
                {/* Left Column */}
                <div className="col-8-md">
                  <CCard>
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <CFormLabel htmlFor="name">Name:</CFormLabel>
                          <CFormInput
                            id="name"
                            onChange={handleChange}
                            type="text"
                            placeholder="Name"
                            name="name"
                            required
                            value={data.name}
                          />
                        </div>

                        <div>
                          <CFormLabel htmlFor="email">Email:</CFormLabel>
                          <CFormInput
                            id="email"
                            onChange={handleChange}
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                            value={data.email}
                          />
                        </div>

                        <div>
                          <CFormLabel htmlFor="password">Password:</CFormLabel>
                          <CFormInput
                            id="password"
                            onChange={handleChange}
                            type="password"
                            name="password"
                            required={propAction === 'add'} // Only required for adding new user
                            autoComplete="new-password"
                            placeholder={
                              propAction === 'add'
                                ? 'Password'
                                : 'Leave blank to keep current password'
                            }
                            value={data.password}
                          />
                        </div>

                        <div>
                          <CFormLabel htmlFor="gender">Gender:</CFormLabel>
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
                            <option value="Others">Other</option>
                          </CFormSelect>
                        </div>

                        <div>
                          <CFormLabel htmlFor="date_Of_Birth">Date of Birth:</CFormLabel>
                          <CFormInput
                            id="date_Of_Birth"
                            onChange={handleChange}
                            type="date"
                            name="date_Of_Birth"
                            value={data.date_Of_Birth || ''}
                          />
                        </div>

                        <div>
                          <CFormLabel htmlFor="mobile">Mobile:</CFormLabel>
                          <CFormInput
                            id="mobile"
                            onChange={handleChange}
                            type="tel"
                            name="mobile"
                            required
                            placeholder="Mobile Number"
                            value={data.mobile}
                          />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="col-md-6">
                        <div>
                          <CFormLabel htmlFor="address">Address:</CFormLabel>
                          <CFormTextarea
                            id="address"
                            onChange={handleChange}
                            name="address"
                            required
                            placeholder="Enter address"
                            value={data.address}
                          ></CFormTextarea>
                        </div>
                      </div>
                    </div>
                  </CCard>
                </div>
                {/* {photo upload section} */}
                <div className="col-md-4">
                  <CCard className="p-3 h-100 d-flex flex-column align-items-center">
                    <div className="col-md-4 d-flex flex-column align-items-center">
                      <PhotoCapture data={data} setData={setData} />
                    </div>
                  </CCard>
                </div>
              </div>

              <div className="text-left mt-3">
                <CButton color="primary" type="submit">
                  {propAction === 'add' ? 'Add User' : 'Update User'}
                </CButton>
                <CButton color="secondary" onClick={closeModal} className="ms-2">
                  Cancel
                </CButton>
              </div>
            </CForm>
          </CModalBody>

          <CModalFooter>{/* Footer buttons are already handled in the form */}</CModalFooter>
        </CModal>
      ) : (
        <CForm onSubmit={handleSubmit} className="w-100" encType="multipart/form-data">
          <div className="row align-items-stretch">
            {/* Left Column */}
            <div className="col-md-8">
              <CCard className="p-3 h-100">
                <p className="text-body-secondary fs-5">Add Admin</p>

                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <CFormLabel htmlFor="name">Name:</CFormLabel>
                      <CFormInput
                        id="name"
                        onChange={handleChange}
                        type="text"
                        placeholder="Name"
                        name="name"
                        required
                        value={data.name}
                      />
                    </div>

                    <div>
                      <CFormLabel htmlFor="email">Email:</CFormLabel>
                      <CFormInput
                        id="email"
                        onChange={handleChange}
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        value={data.email}
                      />
                    </div>

                    <div>
                      <CFormLabel htmlFor="password">Password:</CFormLabel>
                      <CFormInput
                        id="password"
                        onChange={handleChange}
                        type="password"
                        name="password"
                        required
                        autoComplete="new-password"
                        placeholder="Password"
                        value={data.password}
                      />
                    </div>

                    <div>
                      <CFormLabel htmlFor="gender">Gender:</CFormLabel>
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
                        <option value="Others">Other</option>
                      </CFormSelect>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div>
                      <CFormLabel htmlFor="date_Of_Birth">Date of Birth:</CFormLabel>
                      <CFormInput
                        id="date_Of_Birth"
                        onChange={handleChange}
                        type="date"
                        name="date_Of_Birth"
                        value={data.date_Of_Birth || ''}
                      />
                    </div>

                    <div>
                      <CFormLabel htmlFor="mobile">Mobile:</CFormLabel>
                      <CFormInput
                        id="mobile"
                        onChange={handleChange}
                        type="tel"
                        name="mobile"
                        required
                        placeholder="Mobile Number"
                        value={data.mobile}
                      />
                    </div>

                    {/* Right Column */}
                    <div>
                      <CFormLabel htmlFor="address">Address:</CFormLabel>
                      <CFormTextarea
                        id="address"
                        onChange={handleChange}
                        name="address"
                        required
                        placeholder="Enter address"
                        value={data.address}
                      ></CFormTextarea>
                    </div>
                  </div>
                </div>
              </CCard>
            </div>
            {/* {photo upload section} */}
            <div className="col-md-4">
              <CCard className="p-3 h-100 d-flex flex-column align-items-center">
                <div className="col-md-4 d-flex flex-column align-items-center">
                  <PhotoCapture data={data} setData={setData} />
                </div>
              </CCard>
            </div>
          </div>

          <div className="text-left mt-3">
            <CButton color="primary" type="submit">
              Add User
            </CButton>
          </div>
        </CForm>
      )}
    </>
  )
}

export default AddAdminForm
