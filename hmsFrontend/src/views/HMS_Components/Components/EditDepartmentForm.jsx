import React from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Loader from '../../../components/Loader'

const EditDepartmentForm = () => {
  const [formData, setFormData] = useState({
    selectedDeptId: null,
    changedDeptName: '',
    changedDeptHodName: '',
  })

  const [deptData, setDeptData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

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
        <CForm className="w-100 w-lg-50">
          <div className="mb-3">
            <CFormLabel htmlFor="deptName">Select Department</CFormLabel>
            <CFormSelect className="text-start" aria-label="Default select example">
              {deptData.map((elem, index) => (
                <option key={index} value={elem.departmentID}>
                  {elem.department_name}
                </option>
              ))}
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="deptName">Department Name</CFormLabel>
            <CFormInput type="text" id="deptName" aria-describedby="emailHelp" name="deptName" />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="hodName">Name of Head</CFormLabel>
            <CFormInput type="text" id="hodName" name="hodName" />
          </div>
          <div className="mb-3">
            <CButton color="primary">Update</CButton>
          </div>
        </CForm>
      )}
    </>
  )
}

export default EditDepartmentForm
