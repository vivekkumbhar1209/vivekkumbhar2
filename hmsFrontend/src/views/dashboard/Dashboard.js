import React from 'react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import PatientEnquiryInfo from './PatientEnquiryInfo'


const Dashboard = () => {

  return (
    <>
      <WidgetsDropdown className="mb-4" />

      <PatientEnquiryInfo />
    </>
  )
}

export default Dashboard
