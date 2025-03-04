import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const RegisterPatient = () => {
  const [data, setData] = useState({
    patient_name: "",
    patient_email: "",
    patient_mobile: "",
    emergency_name: "",
    emergency_no: "",
    patient_address: "",
    patient_gender: "",
    patient_dob: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("login-token");
  
    console.log("Submitting Data:", JSON.stringify(data, null, 2)); // Log request payload
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/registerpatient", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Backend Response:", response.data); // Log response
  
      // ✅ CHECK if the status is NOT 200 (Success)
      if (response.data.status !== 200) {
        Swal.fire({
          title: "Validation Error",
          text: response.data.message || "Invalid data provided",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        return; // ❌ STOP execution if validation fails
      }
  
      // ✅ If no validation errors, show success message
      Swal.fire({
        title: "Success!",
        text: "Patient registered successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
  
      setData({
        patient_name: "",
        patient_email: "",
        patient_mobile: "",
        emergency_name: "",
        emergency_no: "",
        patient_address: "",
        patient_gender: "",
        patient_dob: "",
        password: "",
      });
  
    } catch (err) {
      console.error("Error Response:", err.response ? err.response.data : err.message);
  
      if (err.response && err.response.data.errors) {
        const errorMessages = Object.entries(err.response.data.errors)
          .map(([field, messages]) => `<li><b>${formatFieldName(field)}:</b> ${messages.join(", ")}</li>`)
          .join("");
  
        Swal.fire({
          title: "Validation Error",
          html: `<ul style="text-align: left; color: red;">${errorMessages}</ul>`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to register patient. Please try again.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
  };
  
  const formatFieldName = (field) => {
    return field.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-semibold mb-4">Register Patient</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-medium">Full Name</label>
          <input type="text" name="patient_name" value={data.patient_name} onChange={handleChange} required
            className="border rounded p-2"/>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Email</label>
          <input type="email" name="patient_email" value={data.patient_email} onChange={handleChange} required
            className="border rounded p-2"/>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Mobile</label>
          <input type="tel" name="patient_mobile" value={data.patient_mobile} onChange={handleChange} required
            className="border rounded p-2"/>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Emergency Contact Name</label>
          <input type="text" name="emergency_name" value={data.emergency_name} onChange={handleChange} required
            className="border rounded p-2"/>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Emergency Contact Mobile</label>
          <input type="tel" name="emergency_no" value={data.emergency_no} onChange={handleChange} required
            className="border rounded p-2"/>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Address</label>
          <input type="text" name="patient_address" value={data.patient_address} onChange={handleChange} required
            className="border rounded p-2"/>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Gender</label>
          <select name="patient_gender" value={data.patient_gender} onChange={handleChange} required
            className="border rounded p-2">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Date of Birth</label>
          <input type="date" name="patient_dob" value={data.patient_dob} onChange={handleChange} required
            className="border rounded p-2"/>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Password</label>
          <input type="password" name="password" value={data.password} onChange={handleChange} required
            className="border rounded p-2"/>
        </div>

        <div className="md:col-span-2 flex justify-center">
        <button 
    type="reset" 
    onClick={() => setData({
      patient_name: "",
      patient_email: "",
      patient_mobile: "",
      emergency_name: "",
      emergency_no: "",
      patient_address: "",
      patient_gender: "",
      patient_dob: "",
      password: "",
    })}
    className="w-1/2 bg-red-500 text-black font-semibold py-2 rounded-md hover:bg-red-600 transition mr-2"
  >
    Reset
  </button>
        <button type="submit"
        className="w-full bg-gray-200 text-black font-semibold py-2 rounded-md hover:bg-gray-300 transition">
        Submit
       </button>

        </div>
      </form>
    </div>
  );
};

export default RegisterPatient;
