import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert2";

const AddReceptionistForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    date_Of_Birth: null,
    mobile: "",
    address: "",
    role: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("login-token");

    axios
      .post("http://127.0.0.1:8000/api/registeruser", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        swal.fire({
          title: "Success!",
          text: "Receptionist added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Reset form fields after successful submission
        setData({
          name: "",
          email: "",
          password: "",
          gender: "",
          date_Of_Birth: null,
          mobile: "",
          address: "",
          role: "",
        });
      })
      .catch((err) => {

            if (err.response && err.response.data.errors) {
                // Extract validation errors and display them in bullet points
                let errorMessages = Object.values(err.response.data.errors)
                  .flat()
                  .map((msg) => `<li>${msg}</li>`) // Convert each error into a list item
                  .join("");
            
                swal.fire({
                  title: "Validation Error",
                  html: `<ul style="text-align: left;">${errorMessages}</ul>`, // Use `html` instead of `text`
                  icon: "error",
                  confirmButtonText: "Try Again",
                });
              } else {
                swal.fire({
                  title: "Error!",
                  text: "Failed to add Receptionist.",
                  icon: "error",
                  confirmButtonText: "Try Again",
                });
              }
      })

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" onChange={handleChange} type="text" className="border p-2 w-full" placeholder="Name" name="name" required value={data.name} />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" onChange={handleChange} type="email" className="border p-2 w-full" placeholder="Email" name="email" required value={data.email} />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" onChange={handleChange} type="password" className="border p-2 w-full" name="password" required autoComplete="new-password" value={data.password} />
        </div>

        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" title="Select your gender" onChange={handleChange} className="border p-2 w-full" required value={data.gender}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="date_Of_Birth">Date of Birth:</label>
          <input id="date_Of_Birth" onChange={handleChange} type="date" name="date_Of_Birth" className="border p-2 w-full"  />
        </div>

        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input id="mobile" onChange={handleChange} type="text" className="border p-2 w-full" name="mobile" required value={data.mobile} />
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <textarea id="address" onChange={handleChange} className="border p-2 w-full" name="address" required value={data.address}></textarea>
        </div>

        <div>
          <label htmlFor="role">Role:</label>
          <input id="role" onChange={handleChange} type="text" className="border p-2 w-full" placeholder="Role" name="role" required value={data.role} />
        </div>

        <button type="submit" aria-label="Add User" >Add User</button>
      </form>
    </div>
  );
};

export default AddReceptionistForm;
