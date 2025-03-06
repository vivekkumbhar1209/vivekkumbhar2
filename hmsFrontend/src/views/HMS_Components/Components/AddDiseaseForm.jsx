import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import { CForm, CFormSelect, CFormTextarea, CFormInput, CButton, CFormLabel } from '@coreui/react'

const AddDiseaseForm = () => {
  const [data, setData] = useState({
    diseaseName: '',
    diseaseDescription: '',
    isActive: 'Active', // Default value
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({}) // Clear previous errors
    const token = localStorage.getItem('login-token')

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/addDisease', data, {
        headers: { Authorization: `Bearer ${token}` },
      })

      swal.fire({
        title: 'Success!',
        text: 'Disease added successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      })

      setData({
        diseaseName: '',
        diseaseDescription: '',
        isActive: 'Active',
      })
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.validationErrors)
      } else {
        swal.fire({
          title: 'Error!',
          text: 'Failed to add disease.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        })
      }
    }
  }

  return (
    <div className="container">
      <p className="text-body-secondary fs-5">Add Disease</p>
      <CForm onSubmit={handleSubmit} className="w-100">
        <div className="row">
          <div className="col-md-6">
            <CFormLabel htmlFor="diseaseName">Disease Name:</CFormLabel>
            <CFormInput
              id="diseaseName"
              onChange={handleChange}
              type="text"
              name="diseaseName"
              value={data.diseaseName}
              placeholder="Enter Disease Name"
              required
            />
            {errors.diseaseName && <p className="text-danger">{errors.diseaseName[0]}</p>}
          </div>

          <div className="col-md-6">
            <CFormLabel htmlFor="isActive">Status:</CFormLabel>
            <CFormSelect
              id="isActive"
              name="isActive"
              onChange={handleChange}
              value={data.isActive}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </CFormSelect>
            {errors.isActive && <p className="text-danger">{errors.isActive[0]}</p>}
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <CFormLabel htmlFor="diseaseDescription">Disease Description:</CFormLabel>
            <CFormTextarea
              id="diseaseDescription"
              onChange={handleChange}
              name="diseaseDescription"
              value={data.diseaseDescription}
              placeholder="Enter Disease Description"
              required
            />
            {errors.diseaseDescription && (
              <p className="text-danger">{errors.diseaseDescription[0]}</p>
            )}
          </div>
        </div>

        <div className="text-left mt-3">
          <CButton type="submit" color="primary">
            Add Disease
          </CButton>
        </div>
      </CForm>
    </div>
  )
}

export default AddDiseaseForm
