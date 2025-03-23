import React, { useState, useRef, useEffect } from "react";
import {
  CCard,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CCardHeader,
  CButton,
  CRow,
  CCol,
  CFormTextarea,
  CCardBody,
  CModal,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormCheck,
} from "@coreui/react";
import Webcam from "react-webcam";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import JsBarcode from "jsbarcode";
import axios from "axios";
import Swal from "sweetalert2";
import api from '../../api'
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import Loader from '../../components/Loader'
import { useLocation } from "react-router-dom";

const RegisterPatient = () => {
  const [data, setData] = useState({
    patient_name: "",
    patient_email: "",
    patient_mobile: "",
    patient_address: "",
    patient_gender: "",
    patient_dob: "",
    patient_adhar: "",
    emergency_name: "",
    emergency_no: "",
    registration_fee: "",
    profilePhoto: null,
  });
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showRegFee, setShowRegFee] = useState(false)
  const [submittedData, setSubmittedData] = useState(null);
  const webcamRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scannedPID, setScannedPID] = useState('');
  const barcodeRef = useRef(null);
  const modalRef = useRef(null);
  const location = useLocation()
  const enquiryData = location.state || {}

  useEffect(() => {
    if (enquiryData && JSON.stringify(enquiryData) !== JSON.stringify(data)) {
      setData((prevData) => ({
        ...prevData,
        patient_name: enquiryData.name || prevData.patient_name,
        patient_email: enquiryData.email || prevData.patient_email,
        patient_mobile: enquiryData.mobile_no || prevData.patient_mobile,
        patient_address: enquiryData.address || prevData.patient_address,
      }));
    }
  }, []); // Ensure dependency doesn't cause infinite re-renders


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({ ...data, profilePhoto: file });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setData({ ...data, profilePhoto: null });
    setPhotoPreview(null);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "captured_photo.jpg", { type: "image/jpeg" });
        setData({ ...data, profilePhoto: file });
        setPhotoPreview(imageSrc);
        setShowCamera(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("login-token");
    setLoading(true); // Show loader
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const response = await api.post("/registerpatient", formData);

      const { patient, generatedPID, profilePhotoUrl } = response.data.data;

      const finalData = {
        ...patient,
        generatedPID,
        profilePhotoUrl,
      };


      setSubmittedData(finalData);
      // Show SweetAlert first
      Swal.fire({
        title: "Patient Registered!",
        text: "Patient registration successful.",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        // Open modal after clicking OK
        setShowPatientModal(true);

        // Generate barcode     
        setTimeout(() => {
          if (barcodeRef.current) {
            JsBarcode(barcodeRef.current, generatedPID, {
              format: "CODE128",
              displayValue: true,
              width: 2,
              height: 50,
              fontSize: 14,
            });
          }
        }, 200);
      });
    } catch (error) {
      console.error("Registration Failed", error);


       // ✅ Show SweetAlert Error with appropriate message
    let errorMessage = "An error occurred during registration.";

    if (error.response) {
      // Laravel validation errors
      if (error.response.status === 422) {
        const errors = error.response.data.errors;
        errorMessage = Object.values(errors).flat().join("\n");
      }
      // If patient already exists or any custom message from backend
      else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      alert("Error during registration. Check API or server.");
    } finally {
      setLoading(false); // Hide loader

    }

    Swal.fire({
      title: "Registration Failed!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "OK",
    });
  } finally {
    setLoading(false); // Hide loader
  }
};
  const handleDownload = () => {
    if (modalRef.current) {
      html2canvas(modalRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = `PID${submittedData.generatedPID}_patient_report.png`
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const handleScan = async (err, result) => {
    if (result) {
      const pid = result?.text || '';
      setScannedPID(pid);
      setScanning(false);
      if (pid) {
        try {
          setLoading(true);
          const token = localStorage.getItem("login-token");
          const response = await api.get(`/patientbypid/${pid}`);
          const { patient, profilePhotoUrl } = response.data.data;
          setSubmittedData({
            ...patient,
            generatedPID: pid,
            profilePhotoUrl,
          });

          setShowPatientModal(true);
        } catch (err) {
          alert("Patient not found or server error.");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleReset = () => {
    setData({
      patient_name: "",
      patient_email: "",
      patient_mobile: "",
      patient_address: "",
      patient_gender: "",
      patient_dob: "",
      patient_adhar: "",
      emergency_name: "",
      emergency_no: "",
      registration_fee: "",
      profilePhoto: null,
    });
    setPhotoPreview(null);
  };


  return (
    <>
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
          }}
        >
          <Loader />
        </div>
      )}
      <CCard className="mx-auto" style={{ maxWidth: '1400px', height: '600px', backgroundColor: '#f8f9fa' }}>
        <CCardHeader>
          <strong>Patient Registration</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <div className="row">
              {/* Left Column */}
              <div className="col-md-4">
                <CFormLabel className="mt-2">Full Name</CFormLabel>
                <CFormInput name="patient_name" value={data.patient_name} onChange={handleChange} required />

                <CFormLabel className="mt-2">Email</CFormLabel>
                <CFormInput type="email" name="patient_email" value={data.patient_email} onChange={handleChange} required />

                <CFormLabel className="mt-2">Mobile</CFormLabel>
                <CFormInput name="patient_mobile" value={data.patient_mobile} onChange={handleChange} required />

                <CFormLabel className="mt-2">Emergency Contact Name</CFormLabel>
                <CFormInput name="emergency_name" value={data.emergency_name || ''} onChange={handleChange} />

                <CFormLabel className="mt-2">Emergency Contact Number</CFormLabel>
                <CFormInput name="emergency_no" value={data.emergency_no || ''} onChange={handleChange} />

              </div>

              {/* Middle Column */}
              <div className="col-md-4">
                <CFormLabel className="mt-2">Date of Birth</CFormLabel>
                <CFormInput type="date" name="patient_dob" value={data.patient_dob} max={new Date().toISOString().split("T")[0]} onChange={handleChange} />

                <CFormLabel className="mt-2">Gender</CFormLabel>
                <CFormSelect name="patient_gender" value={data.patient_gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </CFormSelect>

                <CFormLabel className="mt-2">Address</CFormLabel>
                <CFormInput name="patient_address" value={data.patient_address} onChange={handleChange} required />
                <CFormLabel className="mt-2">Aadhaar</CFormLabel>
                <CFormInput name="patient_adhar" value={data.patient_adhar} onChange={handleChange} />

                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="regFeeCheckbox"
                    checked={showRegFee}
                    onChange={(e) => {
                      setShowRegFee(e.target.checked)
                      if (e.target.checked) {
                        setData((prev) => ({ ...prev, registration_fee: '500' }))
                      } else {
                        setData((prev) => ({ ...prev, registration_fee: '' }))
                      }
                    }}
                  />
                  <label className="form-check-label" htmlFor="regFeeCheckbox">Include Registration Fee?</label>
                </div>

                {showRegFee && (
                  <>
                    <CFormLabel className="mt-2">Registration Fee (₹)</CFormLabel>
                    <CFormInput
                      type="number"
                      name="registration_fee"
                      value={data.registration_fee}
                      onChange={handleChange}
                    />
                  </>
                )}
              </div>

              {/* Right Column - Photo Upload */}
              <div className="col-md-4 d-flex flex-column align-items-center">
                <div
                  className="rounded-circle border d-flex justify-content-center align-items-center mt-2"
                  style={{ width: '150px', height: '150px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}
                >
                  {data.profilePhoto ? (
                    <img
                      src={
                        typeof data.profilePhoto === 'string'
                          ? data.profilePhoto
                          : URL.createObjectURL(data.profilePhoto)
                      }
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>

                <CFormLabel className="mt-2">Photo</CFormLabel>
                <input type="file" accept="image/*" id="profilePhoto" name="profilePhoto" hidden onChange={handlePhotoChange} />
                <CButton color="primary" className="me-2" onClick={() => document.getElementById('profilePhoto').click()}>
                  Upload Photo
                </CButton>
                <CButton color="primary" className="mt-2" onClick={() => setShowCamera(true)}>
                  Capture Photo
                </CButton>
                <CButton color="danger" className="mt-2" onClick={handleRemovePhoto}>
                  Remove Photo
                </CButton>
              </div>
            </div>

            <div className="text-left mt-3 d-flex gap-3">
              <CButton color="primary" type="submit">
                Register Patient
              </CButton>
              <CButton color="secondary" type="button" onClick={handleReset}>
                Reset
              </CButton>
              <CButton color="success" type="button" onClick={() => setScanning(true)}>
                Scan Barcode
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>

      {/* Webcam Modal */}
      <CModal visible={showCamera} onClose={() => setShowCamera(false)}>
        <CModalHeader>Capture Photo</CModalHeader>
        <CModalBody>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" style={{ width: '100%' }} />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleCapture}>Capture</CButton>
          <CButton color="secondary" onClick={() => setShowCamera(false)}>Close</CButton>
        </CModalFooter>
      </CModal>


      {/* Barcode Scanner Modal */}
      <CModal visible={scanning} onClose={() => setScanning(false)}>
        <CModalHeader>
          <CModalTitle>Scan Barcode (PID)</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BarcodeScannerComponent
            width="100%"
            height={300}
            onUpdate={handleScan}
          />
          <div className="mt-3">Scanned PID: {scannedPID}</div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setScanning(false)}>Close</CButton>
        </CModalFooter>
      </CModal>

      {/* Success Modal */}

      <CModal visible={showPatientModal} onClose={() => setShowPatientModal(false)}>
        <CModalHeader><CModalTitle>Patient Registered Successfully</CModalTitle></CModalHeader>
        <CModalBody>
          {submittedData && (
            <div ref={modalRef} className="p-3">
              <div className="row">
                {/* LEFT COLUMN: Photo + Half Details */}
                <div className="col-md-6">
                  <div className="mb-3 text-center">
                    {submittedData.profilePhotoUrl && (
                      <img
                        src={submittedData.profilePhotoUrl}
                        alt="Patient"
                        width="100"
                        height="100"
                        style={{
                          objectFit: 'cover',
                          border: '1px solid #ccc',
                          borderRadius: '0px' // Square shape
                        }}
                      />
                    )}
                  </div>        <div className="mb-2"><strong>Name:</strong> {submittedData.patient_name}</div>
                  <div className="mb-2"><strong>Email:</strong> {submittedData.patient_email}</div>
                  <div className="mb-2"><strong>Mobile:</strong> {submittedData.patient_mobile}</div>
                  <div className="mb-2"><strong>Gender:</strong> {submittedData.patient_gender}</div>
                  <div className="mb-2"><strong>Aadhaar:</strong> {submittedData.patient_adhar}</div>
                </div>

                {/* RIGHT COLUMN: Remaining Details */}

              </div>

              {/* BOTTOM BARCODE SECTION */}
              {/* Barcode Display Section */}
              <div className="text-center mt-4">
                <svg ref={barcodeRef} id="barcode" />
              </div>
            </div>

          )}

        </CModalBody>
        <CModalFooter>
          <CButton type="button" color="primary" onClick={handleDownload}>Download Barcode</CButton>
          <CButton color="secondary" onClick={() => setShowPatientModal(false)}>Close</CButton>
        </CModalFooter>
      </CModal>

    </>
  );
};


export default RegisterPatient;

