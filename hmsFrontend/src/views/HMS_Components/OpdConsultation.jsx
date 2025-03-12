import React from 'react'
import { useLocation } from 'react-router-dom'

const OpdConsultation = () => {
  const location = useLocation()
  const patientdata = location.state?.data

  return (
    <>
      <h1>Opd Consultation</h1>
      {patientdata && patientdata.patient_name}
      {patientdata && patientdata.patient_age}
      {patientdata && patientdata.patient_gender}
      {patientdata && patientdata.queueID}
      {patientdata && patientdata.name}
      {patientdata && patientdata.status}
    </>
  )
}

export default OpdConsultation
