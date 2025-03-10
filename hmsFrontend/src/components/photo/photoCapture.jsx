import React, { useState, useRef } from 'react'
import Webcam from 'react-webcam'
import { CButton, CFormLabel, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'

const PhotoCapture = ({ data, setData }) => {
  const [showCamera, setShowCamera] = useState(false)
  const [capturedPhoto, setCapturedPhoto] = useState(null) // Store captured photo
  const webcamRef = useRef(null)

  // Handle file input change (file upload)
  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Set the selected file's object URL to show preview
      setData({ ...data, profilePhoto: URL.createObjectURL(file) })
    }
  }

  // Remove selected photo
  const handleRemovePhoto = () => {
    setData({ ...data, profilePhoto: null })
    setCapturedPhoto(null) // Clear captured photo
    document.getElementById('profilePhoto').value = '' // Reset the file input
  }

  // Capture image from webcam
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    setCapturedPhoto(imageSrc) // Store captured image
  }

  return (
    <div className="col-md-4 d-flex flex-column align-items-center">
      {/* Photo Preview Section */}
      <div
        className="rounded-circle border d-flex justify-content-center align-items-center mt-2"
        style={{
          width: '150px',
          height: '150px',
          overflow: 'hidden',
          backgroundColor: '#f8f9fa',
        }}
      >
        {capturedPhoto ? (
          // Display the captured photo if available
          <img
            src={capturedPhoto}
            alt="Profile Preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : data.profilePhoto ? (
          // Display the uploaded photo if captured photo is not available
          <img
            src={data.profilePhoto}
            alt="Profile Preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          // Display placeholder text if no photo has been uploaded or captured
          <span>No Image</span>
        )}
      </div>

      {/* File Input for Image Upload */}
      <CFormLabel className="mt-2">Photo</CFormLabel>
      <input
        type="file"
        accept="image/*"
        id="profilePhoto"
        name="profilePhoto"
        onChange={handlePhotoChange}
        hidden
      />
      <CButton color="primary" className="me-2" onClick={() => document.getElementById('profilePhoto').click()}>
        Upload Photo
      </CButton>

      {/* Button to open Webcam Capture */}
      <CButton color="primary" className="mt-2" onClick={() => setShowCamera(true)}>
        Capture Photo
      </CButton>

      {/* Button to Remove Photo */}
      <CButton color="danger" className="mt-2" onClick={handleRemovePhoto}>
        Remove Photo
      </CButton>

      {/* Webcam Modal for Capture */}
      <CModal visible={showCamera} onClose={() => setShowCamera(false)}>
        <CModalHeader>Capture Photo</CModalHeader>
        <CModalBody>
          {/* Conditionally render the webcam or the captured photo */}
          {capturedPhoto ? (
            <img
              src={capturedPhoto}
              alt="Captured Preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" style={{ width: '100%' }} />
          )}
        </CModalBody>
        <CModalFooter>
          {!capturedPhoto ? (
            <CButton color="primary" onClick={handleCapture}>
              Capture
            </CButton>
          ) : (
            <>
              <CButton color="primary" onClick={() => setCapturedPhoto(null)}>
                Recapture
              </CButton>
              <CButton color="secondary" onClick={() => setShowCamera(false)}>
                Close
              </CButton>
            </>
          )}
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default PhotoCapture
