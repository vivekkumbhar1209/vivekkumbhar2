import React from 'react'
import { useLocation } from 'react-router-dom'

const OpdConsultation = () => {
  const location = useLocation()
  const patientdata = location.state?.data

  return (
    <>
      <h1>Opd Consultation</h1>
      {patientdata.patient_name}
      {patientdata.patient_age}
      {patientdata.patient_gender}
      {patientdata.queueID}
      {patientdata.name}
      {patientdata.status}
    </>
  )
}

export default OpdConsultation
