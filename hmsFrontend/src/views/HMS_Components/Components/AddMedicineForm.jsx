import React, { useState, useEffect } from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import axios from 'axios'

const AddMedicineForm = () => {
  const [categories, setCategories] = useState([]) // Store medicine categories
  const [selectedCategory, setSelectedCategory] = useState('') // Selected category
  const [loading, setLoading] = useState(false) // Loading state

  useEffect(() => {
    setLoading(true) // Start loading before API call
    const token = localStorage.getItem('login-token') // Get token from local storage

    axios
      .post(
        'http://127.0.0.1:8000/api/getMedCategory', 
        {}, // Empty body for POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Categories:", res.data);
        setCategories(res.data) // Update categories state
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading after API call
      });

  }, []);

  return (
    <>
      <CForm className="w-100 w-lg-50">
        <div className="mb-3">
          <CFormLabel htmlFor="category">Category</CFormLabel>
          <CFormSelect
            className="text-start"
            aria-label="Select a category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={loading} // Disable while loading
          >
            {loading ? (
              <option>Loading categories...</option>
            ) : categories.length === 0 ? (
              <option value="">No Categories Available</option>
            ) : (
              categories.map((category) => (
                <option key={category.medicineID} value={category.medicineID}>
                  {category.category_name}
                </option>
              ))
            )}
          </CFormSelect>
        </div>

        <div className="mb-3">
          <CFormLabel htmlFor="medicineName">Medicine</CFormLabel>
          <CFormInput type="text" id="medicineName" name="medicineName" />
        </div>

        <div className="mb-3">
          <CFormLabel htmlFor="cost">Cost</CFormLabel>
          <CFormInput type="text" id="cost" name="cost" />
        </div>

        <div className="mb-3 d-flex gap-3">
          <CButton color="primary">Add Medicine</CButton>
        </div>
      </CForm>
    </>
  )
}

export default AddMedicineForm
