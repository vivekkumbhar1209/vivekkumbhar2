import React, { useState, useEffect } from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import axios from 'axios'

const AddMedicineForm = () => {
  const [categories, setCategories] = useState([]) // Medicine categories
  const [selectedCategory, setSelectedCategory] = useState('') // Selected category
  const [medicineName, setMedicineName] = useState('')
  const [cost, setCost] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true) // Start loading before API call
    const token = localStorage.getItem('login-token')

    axios
      .post(
        'http://127.0.0.1:8000/api/getMedCategory',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setCategories(res.data)
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('login-token')
    const medicineData = {
      categoryID: selectedCategory,
      medicine_name: medicineName,
      cost: cost,
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/addMedicine', medicineData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      alert('Medicine added successfully!')
      console.log(response.data)
    } catch (error) {
      console.error('Error adding medicine:', error.response?.data || error)
      alert('Failed to add medicine')
    }
  }

  return (
    <CForm className="w-100 w-lg-50" onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel htmlFor="category">Category</CFormLabel>
        <CFormSelect
          className="text-start"
          aria-label="Select a category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={loading}
        >
          {loading ? (
            <option>Loading categories...</option>
          ) : categories.length === 0 ? (
            <option value="">No Categories Available</option>
          ) : (
            categories.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>
                {category.category_name}
              </option>
            ))
          )}
        </CFormSelect>
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="medicineName">Medicine</CFormLabel>
        <CFormInput
          type="text"
          id="medicineName"
          name="medicineName"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="cost">Cost</CFormLabel>
        <CFormInput
          type="number"
          id="cost"
          name="cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
        />
      </div>

      <div className="mb-3 d-flex gap-3">
        <CButton color="primary" type="submit">
          Add Medicine
        </CButton>
      </div>
    </CForm>
  )
}

export default AddMedicineForm
