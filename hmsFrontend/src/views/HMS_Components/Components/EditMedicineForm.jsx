import React from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Loader from '../../../components/Loader'

const EditMedicineForm = () => {
  return (
    <>
      <CForm className="w-100 w-lg-50">
        <div className="mb-3">
          <CFormLabel htmlFor="deptName">Select Medicine</CFormLabel>
          <CFormSelect className="text-start" aria-label="Default select example">
            <option>One</option>
            <option>One</option>
            <option>One</option>
          </CFormSelect>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="deptName">Medicine Name</CFormLabel>
          <CFormInput type="text" id="deptName" aria-describedby="emailHelp" name="deptName" />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="hodName">Medicine Cost</CFormLabel>
          <CFormInput type="text" id="hodName" name="hodName" />
        </div>
        <div className="mb-3">
          <CButton color="primary">Update</CButton>
        </div>
      </CForm>
    </>
  )
}

export default EditMedicineForm
