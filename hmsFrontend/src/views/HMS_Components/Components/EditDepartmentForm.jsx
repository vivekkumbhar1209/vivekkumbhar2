import React from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Loader from '../../../components/Loader'
import swal from 'sweetalert2'

const EditDepartmentForm = () => {
  useEffect(() => {
    setLoading(true)
    var token = localStorage.getItem('login-token')
    axios
      .get('http://127.0.0.1:8000/api/getDept', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDeptData(res.data.deptData)
        setFormData({ departmentID: res.data.deptData[0].departmentID })
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])
  const [formData, setFormData] = useState({
    departmentID: null,
    department_name: '',
    hod: '',
  })

  const [deptData, setDeptData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    var token = localStorage.getItem('login-token')
    console.log(formData)
    axios
      .post('http://localhost:8000/api/updateDepartment', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 403) {
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
          setLoading(false)
        } else if (res.data.status === 200) {
          swal.fire({
            title: 'Success!',
            text: 'Department updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          })
          setLoading(false)
        }
      })
      .catch((err) => {
        swal.fire({
          title: 'Error!',
          text: 'Something went wrong.',
          icon: 'error',
          confirmButtonText: 'OK',
        })
        setLoading(false)
      })
  }

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '50vh' }}
        >
          <Loader />
        </div>
      ) : (
        <CForm onSubmit={handleSubmit} className="w-100 w-lg-50">
          <div className="mb-3">
            <CFormLabel htmlFor="deptName">Select Department</CFormLabel>
            <CFormSelect
              name="departmentID"
              className="text-start"
              aria-label="Default select example"
              onChange={handleChange}
            >
              {deptData.map((elem, index) => (
                <option key={index} value={elem.departmentID}>
                  {elem.department_name}
                </option>
              ))}
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="deptName">Department Name</CFormLabel>
            <CFormInput
              type="text"
              id="deptName"
              aria-describedby="emailHelp"
              name="department_name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="hodName">Name of Head</CFormLabel>
            <CFormInput onChange={handleChange} type="text" id="hodName" name="hod" />
          </div>
          <div className="mb-3">
            <CButton type="submit" color="primary">
              Update
            </CButton>
          </div>
        </CForm>
      )}
    </>
  )
}

export default EditDepartmentForm
