import React from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react'
import AddOPDPatientForm from './Components/AddOPDPatientForm'
const ManageOPDPatients = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>Manage OPD Patient</strong>
        </CCardHeader>
        <CCardBody className="mb-0">
          <p className="text-body-secondary small">
            You can manage all the <code>OPD patient</code> information from here.
          </p>
          <CTabs activeItemKey={2}>
            <CTabList variant="underline-border">
              <CTab itemKey={2}>Add OPD Patient</CTab>
              <CTab itemKey={3}>Edit Patient Details</CTab>
            </CTabList>
            <CTabContent>
              <CTabPanel className="py-3" itemKey={2}>
                <AddOPDPatientForm />
              </CTabPanel>
              <CTabPanel className="py-3" itemKey={3}>
                Edit OPD Patient
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ManageOPDPatients
