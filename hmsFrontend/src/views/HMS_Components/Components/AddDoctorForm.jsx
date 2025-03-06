import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import {
  CCard,
  CForm,
  CFormSelect,
  CFormTextarea,
  CFormInput,
  CCardBody,
  CButton,
  CFormLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from '@coreui/react'

const AddDoctorForm = ({ role, propAction = 'add', user }) => {
  const [departments, setDepartments] = useState([]); // Store departments
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    date_Of_Birth: '',
    mobile: '',
    address: '',
    role: role, // This gets set only on the first render
    specialization: '',
    experience: '',
    departmentID: '',
    consultation_fee: '',
  });

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  // Update the role in state when the prop changes
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      role: role, // Update role in state
    }))
  }, [role]) // Runs whenever `role` changes

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

  // Populate form fields with user data when editing
  useEffect(() => {
    if (propAction === 'edit' && user) {
      setData({
        name: user.name,
        email: user.email,
        password: '', // Don't fill password for security reasons
        gender: user.gender,
        date_Of_Birth: user.date_Of_Birth || '',
        mobile: user.mobile,
        address: user.address,
        role: user.role,
        specialization: user.specialization || '',
        experience: user.experience || '',
        departmentID: user.departmentID || '',
        consultation_fee: user.consultation_fee || '',
      })
      setModalVisible(true); // Open the modal
    } else {
      setData({
        name: '',
        email: '',
        password: '',
        gender: '',
        date_Of_Birth: '',
        mobile: '',
        address: '',
        role: role,
        specialization: '',
        experience: '',
        departmentID: '',
        consultation_fee: '',
      })
    }
  }, [propAction, user, role]) // Runs whenever `propAction`, `user`, or `role` changes

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("login-token")
    
    if (propAction === 'add') {
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
          name: '',
          email: '',
          password: '',
          gender: '',
          date_Of_Birth: '',
          mobile: '',
          address: '',
          role: role,
          specialization: '',
          experience: '',
          departmentID: '',
          consultation_fee: '',
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
    } else if (propAction === 'edit') {
      // Update user endpoint
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/updateuser/${user.id}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        swal.fire({
          title: "Success!",
          text: "Doctor updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setModalVisible(false); // Close the modal after editing
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
            text: "Failed to update doctor.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
    setData({
      name: '',
      email: '',
      password: '',
      gender: '',
      date_Of_Birth: '',
      mobile: '',
      address: '',
      role: role,
      specialization: '',
      experience: '',
      departmentID: '',
      consultation_fee: '',
    });
  };

  return (
    <>
      {propAction === 'edit' ? (
        <CModal visible={modalVisible} onClose={closeModal} backdrop="static" size="lg">
          <CModalHeader closeButton={true}>
            <CModalTitle>Edit Doctor</CModalTitle>
          </CModalHeader>

          <CModalBody>
            <CForm onSubmit={handleSubmit} className="w-100">
              <div className="row">
                {/* Left Column */}
                <div className="col-md-6">
                  <div>
                    <CFormLabel htmlFor="name">Name:</CFormLabel>
                    <CFormInput id="name" onChange={handleChange} type="text" name="name" required value={data.name} placeholder="Name" />
                  </div>

                  <div>
                    <CFormLabel htmlFor="email">Email:</CFormLabel>
                    <CFormInput id="email" onChange={handleChange} type="email" name="email" required value={data.email} placeholder="Email" />
                  </div>

                  <div>
                    <CFormLabel htmlFor="password">Password:</CFormLabel>
                    <CFormInput id="password" onChange={handleChange} type="password" name="password" required={propAction === 'add'} value={data.password} placeholder={propAction === 'add' ? 'Password' : 'Leave blank to keep current password'} />
                  </div>

                  <div>
                    <CFormLabel htmlFor="gender">Gender:</CFormLabel>
                    <CFormSelect id="gender" name="gender" onChange={handleChange} required value={data.gender}>
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </CFormSelect>
                  </div>

                  <div>
                    <CFormLabel htmlFor="date_Of_Birth">Date of Birth:</CFormLabel>
                    <CFormInput id="date_Of_Birth" onChange={handleChange} type="date" name="date_Of_Birth" value={data.date_Of_Birth || ''} />
                  </div>

                  <div>
                    <CFormLabel htmlFor="mobile">Mobile:</CFormLabel>
                    <CFormInput id="mobile" onChange={handleChange} type="text" name="mobile" required value={data.mobile} placeholder='Mobile Number' />
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-md-6">
                  <div>
                    <CFormLabel htmlFor="address">Address:</CFormLabel>
                    <CFormTextarea id="address" onChange={handleChange} name="address" required value={data.address} placeholder="Enter Address"></CFormTextarea>
                  </div>

                  <div>
                    <CFormLabel htmlFor="specialization">Specialization:</CFormLabel>
                    <CFormInput id="specialization" onChange={handleChange} type="text" name="specialization" required value={data.specialization} placeholder="Specialization" />
                  </div>

                  <div>
                    <CFormLabel htmlFor="experience">Experience (Years):</CFormLabel>
                    <CFormInput id="experience" onChange={handleChange} type="text" name="experience" required value={data.experience} placeholder="Experience in years" />
                  </div>

                  <div>
                    <CFormLabel htmlFor="department">Department:</CFormLabel>
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
                    <CFormLabel htmlFor="consultation_fee">Consultation Fee:</CFormLabel>
                    <CFormInput id="consultation_fee" onChange={handleChange} type="text" name="consultation_fee" required value={data.consultation_fee} placeholder="Consultation Fee"/>
                  </div>
                </div>
              </div>

              <div className="text-left mt-3">
                <CButton color="primary" type="submit">
                  {propAction === 'add' ? 'Add User' : 'Update User'}
                </CButton>
                <CButton color="secondary" onClick={closeModal} className="ms-2">
                  Cancel
                </CButton>
              </div>
            </CForm>
          </CModalBody>

          <CModalFooter>
            {/* Footer buttons are already handled in the form */}
          </CModalFooter>
        </CModal>
      ) : (
        <CForm onSubmit={handleSubmit} className="w-100">
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <div>
                <CFormLabel htmlFor="name">Name:</CFormLabel>
                <CFormInput id="name" onChange={handleChange} type="text" name="name" required value={data.name} placeholder="Name" />
              </div>

              <div>
                <CFormLabel htmlFor="email">Email:</CFormLabel>
                <CFormInput id="email" onChange={handleChange} type="email" name="email" required value={data.email} placeholder="Email" />
              </div>

              <div>
                <CFormLabel htmlFor="password">Password:</CFormLabel>
                <CFormInput id="password" onChange={handleChange} type="password" name="password" required value={data.password} placeholder="Password" />
              </div>

              <div>
                <CFormLabel htmlFor="gender">Gender:</CFormLabel>
                <CFormSelect id="gender" name="gender" onChange={handleChange} required value={data.gender}>
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </CFormSelect>
              </div>

              <div>
                <CFormLabel htmlFor="date_Of_Birth">Date of Birth:</CFormLabel>
                <CFormInput id="date_Of_Birth" onChange={handleChange} type="date" name="date_Of_Birth" value={data.date_Of_Birth || ''} />
              </div>

              <div>
                <CFormLabel htmlFor="mobile">Mobile:</CFormLabel>
                <CFormInput id="mobile" onChange={handleChange} type="text" name="mobile" required value={data.mobile} placeholder='Mobile Number' />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div>
                <CFormLabel htmlFor="address">Address:</CFormLabel>
                <CFormTextarea id="address" onChange={handleChange} name="address" required value={data.address} placeholder="Enter Address"></CFormTextarea>
              </div>

              <div>
                <CFormLabel htmlFor="specialization">Specialization:</CFormLabel>
                <CFormInput id="specialization" onChange={handleChange} type="text" name="specialization" required value={data.specialization} placeholder="Specialization" />
              </div>

              <div>
                <CFormLabel htmlFor="experience">Experience (Years):</CFormLabel>
                <CFormInput id="experience" onChange={handleChange} type="text" name="experience" required value={data.experience} placeholder="Experience in years" />
              </div>

              <div>
                <CFormLabel htmlFor="department">Department:</CFormLabel>
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
                <CFormLabel htmlFor="consultation_fee">Consultation Fee:</CFormLabel>
                <CFormInput id="consultation_fee" onChange={handleChange} type="text" name="consultation_fee" required value={data.consultation_fee} placeholder="Consultation Fee"/>
              </div>
            </div>
          </div>

          <div className="text-left mt-3">
            <CButton color="primary" type="submit">
              Add Doctor
            </CButton>
          </div>
        </CForm>
      )}
    </>
  );
};

export default AddDoctorForm;
