import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { CButton, CFormLabel, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

const PhotoCapture = ({ data, setData }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null); // Store captured photo
  const webcamRef = useRef(null);

  // Utility function to convert dataURI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // Handle file input change (file upload)
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the selected file's object URL to show preview
      const fileURL = URL.createObjectURL(file);
      setData({ ...data, profilePhoto: file }); // Set file object for preview
    }
  };

  // Remove selected photo
  const handleRemovePhoto = () => {
    setData({ ...data, profilePhoto: null });
    setCapturedPhoto(null); // Clear captured photo
    document.getElementById('profilePhoto').value = ''; // Reset the file input
  };

  // Capture image from webcam
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedPhoto(imageSrc); // Store captured image
  };

  // Use captured photo (convert it to File format)
  const handleUsePhoto = () => {
    const blob = dataURItoBlob(capturedPhoto); // Convert captured image to Blob
    const file = new File([blob], `captured-photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
    setData({ ...data, profilePhoto: file }); // Set the final profile photo
    setCapturedPhoto(null);
    setShowCamera(false); // Close modal
  };

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
            src={URL.createObjectURL(data.profilePhoto)}
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
              <CButton color="primary" onClick={handleUsePhoto}>
                Use Photo
              </CButton>
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
  );
};

export default PhotoCapture;
