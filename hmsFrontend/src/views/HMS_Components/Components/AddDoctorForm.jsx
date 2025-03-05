import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert2";

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" onChange={handleChange} type="text" name="name" required value={data.name} />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" onChange={handleChange} type="email" name="email" required value={data.email} />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" onChange={handleChange} type="password" name="password" required value={data.password} />
        </div>

        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" onChange={handleChange} required value={data.gender}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="date_Of_Birth">Date of Birth:</label>
          <input id="date_Of_Birth" onChange={handleChange} type="date" name="date_Of_Birth"  value={data.date_Of_Birth} />
        </div>

        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input id="mobile" onChange={handleChange} type="text" name="mobile" required value={data.mobile} />
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <textarea id="address" onChange={handleChange} name="address" required value={data.address}></textarea>
        </div>

        <div>
          <label htmlFor="specialization">Specialization:</label>
          <input id="specialization" onChange={handleChange} type="text" name="specialization" required value={data.specialization} />
        </div>

        <div>
          <label htmlFor="experience">Experience (Years):</label>
          <input id="experience" onChange={handleChange} type="text" name="experience" required value={data.experience} />
        </div>

        <div>
          <label htmlFor="department">Department:</label>
          <select id="departmentID" name="departmentID" onChange={handleChange} required value={data.departmentID}>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.departmentID} value={dept.departmentID}>
                {dept.department_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="consultation_fee">Consultation Fee:</label>
          <input id="consultation_fee" onChange={handleChange} type="text" name="consultation_fee" required value={data.consultation_fee} />
        </div>

        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctorForm;