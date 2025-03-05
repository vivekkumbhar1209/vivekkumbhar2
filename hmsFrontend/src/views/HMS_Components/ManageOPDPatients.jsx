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
import SearchPatient from './SearchPatient'

const ManageOPDPatients = ()=>{

    return (
        <>
            <CCard>
        <CCardHeader>
          <strong>Manage Patient Details</strong>
        </CCardHeader>
        <CCardBody className="mb-0">
          <p className="text-body-secondary small">
            You can manage all the <code>patient</code> information from here.
          </p>
          <CTabs activeItemKey={1}>
            <CTabList variant="underline-border">
              <CTab itemKey={1}>Search Patients</CTab>
              <CTab itemKey={2}>Add New Patient</CTab>
              <CTab itemKey={3}>Edit Patient Details</CTab>
            </CTabList>
            <CTabContent>
              <CTabPanel className="py-3" itemKey={1}>
                <SearchPatient/>
              </CTabPanel>
              <CTabPanel className="py-3" itemKey={2}>
                two
              </CTabPanel>
              <CTabPanel className="py-3" itemKey={3}>
                three
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
        </>
    )
}

export default ManageOPDPatients