import React, { useState } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CButton,
} from '@coreui/react';

const EditUserForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    mobile: '',
    address: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated User:', user);
    // Add API call to update user here
  };

  return (
    <CCard>
      <CCardHeader>
        <strong>Edit User</strong>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CFormLabel htmlFor="name">Name</CFormLabel>
          <CFormInput type="text" id="name" name="name" value={user.name} onChange={handleChange} required />

          <CFormLabel htmlFor="email">Email</CFormLabel>
          <CFormInput type="email" id="email" name="email" value={user.email} onChange={handleChange} required />

          <CFormLabel htmlFor="password">Password</CFormLabel>
          <CFormInput type="password" id="password" name="password" value={user.password} onChange={handleChange} required />

          <CFormLabel htmlFor="gender">Gender</CFormLabel>
          <CFormSelect id="gender" name="gender" value={user.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </CFormSelect>

          <CFormLabel htmlFor="dateOfBirth">Date of Birth</CFormLabel>
          <CFormInput type="date" id="dateOfBirth" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} required />

          <CFormLabel htmlFor="age">Age</CFormLabel>
          <CFormInput type="number" id="age" name="age" value={user.age} onChange={handleChange} required />

          <CFormLabel htmlFor="mobile">Mobile</CFormLabel>
          <CFormInput type="text" id="mobile" name="mobile" value={user.mobile} onChange={handleChange} required />

          <CFormLabel htmlFor="address">Address</CFormLabel>
          <CFormInput type="text" id="address" name="address" value={user.address} onChange={handleChange} required />

          <CFormLabel htmlFor="role">Role</CFormLabel>
          <CFormSelect id="role" name="role" value={user.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Manager">Manager</option>
          </CFormSelect>

          <CButton type="submit" color="primary" className="mt-3">
            Update User
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default EditUserForm;
