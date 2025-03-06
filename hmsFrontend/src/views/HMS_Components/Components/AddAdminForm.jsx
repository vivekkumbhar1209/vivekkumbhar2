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
  CModalFooter
} from '@coreui/react'

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
  })

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

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
      setData({
        name: user.name,
        email: user.email,
        password: '', // Don't fill password for security reasons
        gender: user.gender,
        date_Of_Birth: user.date_Of_Birth || null,
        mobile: user.mobile,
        address: user.address,
        role: user.role,
      })
      setModalVisible(true); // Open the modal
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
      })
    }
  }, [propAction, user, role]) // Runs whenever `propAction`, `user`, or `role` changes

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('login-token')
    
    if (propAction === 'add') {
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
            role: role, // Keep the role unchanged
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
    } else if (propAction === 'edit') {
      // Update user endpoint
      axios
        .put(`http://127.0.0.1:8000/api/updateuser/${user.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res)
          swal.fire({
            title: 'Success!',
            text: 'Receptionist updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          })
          setModalVisible(false); // Close the modal after editing
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
              text: 'Failed to update Receptionist.',
              icon: 'error',
              confirmButtonText: 'Try Again',
            })
          }
        })
    }

    console.log("Final Data Sent to API:", data);
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
    })
  };

  return (
    <>
      {propAction === 'edit' ? (
        <CModal visible={modalVisible} onClose={closeModal} backdrop="static" size="lg">
          <CModalHeader closeButton={true}>
            <CModalTitle>Edit Receptionist</CModalTitle>
          </CModalHeader>

          <CModalBody>
            <CForm onSubmit={handleSubmit} className="w-100">
              <div className="row">
                {/* Left Column */}
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
                      placeholder={propAction === 'add' ? 'Password' : 'Leave blank to keep current password'}
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
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
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
                      placeholder='Mobile Number'
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
                      placeholder='Enter address'
                      value={data.address}
                    ></CFormTextarea>
                  </div>
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

          <CModalFooter>
            {/* Footer buttons are already handled in the form */}
          </CModalFooter>
        </CModal>
      ) : (
        <CForm onSubmit={handleSubmit} className="w-100">
          <div className="row">
            {/* Left Column */}
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
                  placeholder='Password'
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
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
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
                  type="text"
                  name="mobile"
                  required
                  placeholder='Mobile Number'
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
                  placeholder='Enter address'
                  value={data.address}
                ></CFormTextarea>
              </div>
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
  );
};

export default AddAdminForm;
