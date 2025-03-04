import React from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'

const AddMedicineForm = () => {
  return (
    <>
      <CForm className="w-100 w-lg-50">
        <div className="mb-3">
          <CFormLabel htmlFor="deptName">Category</CFormLabel>
          <CFormSelect className="text-start" aria-label="Default select example">
            <option value="1">Name</option>
            <option value="2">Phone</option>
            <option value="3">Email</option>
          </CFormSelect>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="deptName">Medicine</CFormLabel>
          <CFormInput type="text" id="deptName" aria-describedby="emailHelp" name="deptName" />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="hodName">Cost</CFormLabel>
          <CFormInput type="text" id="hodName" name="hodName" />
        </div>
        <div className="mb-3 d-flex gap-3">
          <CButton color="primary">Add Medicine</CButton>
        </div>
        <div className="mb-3"></div>
      </CForm>
    </>
  )
}

export default AddMedicineForm
