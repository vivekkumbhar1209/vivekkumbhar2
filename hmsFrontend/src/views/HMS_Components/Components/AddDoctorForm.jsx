import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert2";
import {CCard,CForm,CFormSelect,CFormTextarea ,CFormInput,CCardBody,CButton,CFormLabel} from '@coreui/react'

const AddDoctorForm = ({ role }) => {
  const [departments, setDepartments] = useState([]); // Store departments
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    date_Of_Birth: "",
    mobile: "",
    address: "",
    role:role,
    specialization: "",
    experience: "",
    departmentID: "",
    consultation_fee: "",
  });
  //// Runs whenever `role` changes
   useEffect(() => {
       setData((prevData) => ({
         ...prevData,
         role: role,
       }))
     }, [role]) 


  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      const token = localStorage.getItem("login-token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/getDept", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDepartments(response.data.deptData);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("login-token");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/registeruser",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Check if API response contains validation errors
      if (response.data.errors) {
        let errorMessages = Object.values(response.data.errors)
          .flat()
          .map((msg) => `<li>${msg}</li>`)
          .join("");

        swal.fire({
          title: "Validation Error",
          html: `<ul style="text-align: left;">${errorMessages}</ul>`,
          icon: "error",
          confirmButtonText: "Try Again",
        });

        // Stop execution if there are validation errors
        return; 
      }

      
      swal.fire({
        title: "Success!",
        text: "Doctor added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

     
      setData({
        name: "",
        email: "",
        password: "",
        gender: "",
        date_Of_Birth: "",
        mobile: "",
        address: "",
        role:role,
        specialization: "",
        experience: "",
        departmentID: "",
        consultation_fee: "",
      });

    } catch (err) {
      console.error("Error:", err);

      if (err.response && err.response.status === 422) {
        let errorMessages = Object.values(err.response.data.errors)
          .flat()
          .map((msg) => `<li>${msg}</li>`)
          .join("");

        swal.fire({
          title: "Validation Error",
          html: `<ul style="text-align: left;">${errorMessages}</ul>`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      } else {
        swal.fire({
          title: "Error!",
          text: "Failed to add doctor.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  return (
    <div className="container">
      <p className="text-body-secondary fs-6">
            Add Doctor
          </p>
          <CForm onSubmit={handleSubmit} className="w-100">
  <div className="row">
    {/* Left Column */}
    <div className="col-md-6">
      <div>
        <CFormLabel htmlFor="name" >Name:</CFormLabel>
        <CFormInput id="name" onChange={handleChange} type="text" name="name" required value={data.name}  />
      </div>

      <div>
        <CFormLabel htmlFor="email" className="mt-2">Email:</CFormLabel>
        <CFormInput id="email" onChange={handleChange} type="email" name="email" required value={data.email}  />
      </div>

      <div>
        <CFormLabel htmlFor="password" className="mt-2">Password:</CFormLabel>
        <CFormInput id="password" onChange={handleChange} type="password" name="password" required value={data.password}  />
      </div>

      <div>
        <CFormLabel htmlFor="gender" className="mt-2">Gender:</CFormLabel>
        <CFormSelect id="gender" name="gender" onChange={handleChange} required value={data.gender}>
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </CFormSelect>
      </div>

      <div>
        <CFormLabel htmlFor="date_Of_Birth" className="mt-2">Date of Birth:</CFormLabel>
        <CFormInput id="date_Of_Birth" onChange={handleChange} type="date" name="date_Of_Birth" value={data.date_Of_Birth} />
      </div>

      <div>
        <CFormLabel htmlFor="address" className="mt-2">Address:</CFormLabel>
        <CFormTextarea id="address" onChange={handleChange} name="address" required value={data.address} ></CFormTextarea>
      </div>

      
    </div>

    {/* Right Column */}
    <div className="col-md-6">
    <div>
        <CFormLabel htmlFor="mobile">Mobile:</CFormLabel>
        <CFormInput id="mobile" onChange={handleChange} type="text" name="mobile" required value={data.mobile} />
      </div>

      <div>
        <CFormLabel htmlFor="specialization" className="mt-2">Specialization:</CFormLabel>
        <CFormInput id="specialization" onChange={handleChange} type="text" name="specialization" required value={data.specialization}  />
      </div>

      <div>
        <CFormLabel htmlFor="experience" className="mt-2">Experience (Years):</CFormLabel>
        <CFormInput id="experience" onChange={handleChange} type="text" name="experience" required value={data.experience}  />
      </div>

      <div>
        <CFormLabel htmlFor="department" className="mt-2">Department:</CFormLabel>
        <CFormSelect id="departmentID" name="departmentID" onChange={handleChange} required value={data.departmentID}>
          <option value="" disabled>Select Department</option>
          {departments.map((dept) => (
            <option key={dept.departmentID} value={dept.departmentID}>
              {dept.department_name}
            </option>
          ))}
        </CFormSelect>
      </div>

      <div>
        <CFormLabel htmlFor="consultation_fee" className="mt-2">Consultation Fee:</CFormLabel>
        <CFormInput id="consultation_fee" onChange={handleChange} type="text" name="consultation_fee" required value={data.consultation_fee} />
      </div>
    </div>
  </div>

  {/* Submit Button Aligned Left */}
  <div className="text-left mt-3">
    <CButton type="submit" color="primary">Add Doctor</CButton>
  </div>
</CForm>

</div>

  );
};

export default AddDoctorForm;