import React, { useState, useEffect } from 'react';
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddMedicineForm = () => {
  const [categories, setCategories] = useState([]); // Store medicine categories
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category ID
  const [medicineName, setMedicineName] = useState('');
  const [cost, setCost] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('login-token');

    axios
      .get('http://127.0.0.1:8000/api/getMedicineCategory', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("API Response:", res.data);
        setCategories(res.data); // Correctly storing categories
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      Swal.fire({
        title: "Error",
        text: "Please select a category.",
        icon: "warning",
        confirmButtonText: "OK"
      });
      return;
    }

    const token = localStorage.getItem('login-token');
    const medicineData = {
      categoryID: selectedCategory,
      medicine_name: medicineName,
      cost: cost,
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/addMedicine', medicineData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Success SweetAlert
      Swal.fire({
        title: "Success!",
        text: "Medicine added successfully!",
        icon: "success",
        confirmButtonText: "OK"
      });

      // Reset form fields
      setSelectedCategory('');
      setMedicineName('');
      setCost('');
    } catch (error) {
      console.error('Error adding medicine:', error.response?.data || error);

      // Error SweetAlert
      Swal.fire({
        title: "Error",
        text: "Failed to add medicine. Please try again.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <CForm className="w-100 w-lg-50" onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel>Category</CFormLabel>
        <CFormSelect value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} disabled={loading}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.categoryID} value={category.categoryID}>
              {category.category_name}
            </option>
          ))}
        </CFormSelect>
      </div>

      <CFormLabel>Medicine Name</CFormLabel>
      <CFormInput type="text" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} required />

      <CFormLabel>Cost</CFormLabel>
      <CFormInput type="number" value={cost} onChange={(e) => setCost(e.target.value)} required />
        
      <CButton color="primary" type="submit">Add Medicine</CButton>
    </CForm>
  );
};

export default AddMedicineForm;
