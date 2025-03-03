import React from 'react'
import { CButton, CForm, CFormInput, CFormLabel } from '@coreui/react'
import { useState } from 'react'

const AddDepartmentForm = () => {
  const [formData, setFormData] = useState({
    deptName: '',
    deptHODName: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(formData)
  }

  return (
    <>
      <CForm className="w-100 w-lg-50">
        <div className="mb-3">
          <CFormLabel htmlFor="deptName">Department Name</CFormLabel>
          <CFormInput
            onChange={handleChange}
            type="text"
            id="deptName"
            aria-describedby="emailHelp"
            name="deptName"
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="hodName">Name of Head</CFormLabel>
          <CFormInput onChange={handleChange} type="text" id="hodName" name="hodName" />
        </div>
        <div className="mb-3">
          <CButton color="primary">Add Department</CButton>
        </div>
      </CForm>
    </>
  )
}

export default AddDepartmentForm
