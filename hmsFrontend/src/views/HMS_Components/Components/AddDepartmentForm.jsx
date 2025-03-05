import React from 'react'
import { CButton, CForm, CFormInput, CFormLabel } from '@coreui/react'
import { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'

const AddDepartmentForm = () => {
  const [formData, setFormData] = useState({
    department_name: '',
    hod: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    var token = localStorage.getItem('login-token')
    axios
      .post('http://localhost:8000/api/registerDepartment', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.status == 200) {
          swal.fire({
            title: 'Success!',
            text: 'Department added successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          })
        } else if (res.data.status == 403) {
          const validationErrorMessages = Object.values(res.data.validationErrors)
            .flat()
            .map((msg) => `<li>${msg}</li>`)
            .join('')

          swal.fire({
            title: res.data.message,
            html: `<ul style='text-align: left'>${validationErrorMessages}</ul>`,
            icon: 'error',
            confirmButtonText: 'Try again',
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    console.log(formData)
  }

  return (
    <>
      <CForm onSubmit={handleSubmit} className="w-100 w-lg-50">
        <div className="mb-3">
          <CFormLabel htmlFor="deptName">Department Name</CFormLabel>
          <CFormInput
            onChange={handleChange}
            type="text"
            id="deptName"
            aria-describedby="emailHelp"
            name="department_name"
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="hodName">Name of Head</CFormLabel>
          <CFormInput onChange={handleChange} type="text" id="hodName" name="hod" />
        </div>
        <div className="mb-3">
          <CButton type="submit" color="primary">
            Add Department
          </CButton>
        </div>
      </CForm>
    </>
  )
}

export default AddDepartmentForm
