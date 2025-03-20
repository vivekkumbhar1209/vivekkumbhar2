import React from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
} from '@coreui/react'
import AddDiseaseForm from './Components/AddDiseaseForm'
import EditDiseaseForm from './Components/EditDiseaseForm'
import ViewAllDiseases from './Components/ViewAllDiseases'
import PermissionDenied from '../warning/PermissionDenied'

const ManageDisease = () => {

  const role = JSON.parse(localStorage.getItem('userData')).role

  return (

    <>
      {role === 'Admin' ? (
        <>
          <CCard>
            <CCardHeader>
              <strong>Manage Disease List</strong>
            </CCardHeader>
            <CCardBody>
              <p className="text-body-secondary small">
                You can manage all the <code>diseases</code> registered in the system from here.
              </p>
              <CTabs activeItemKey={1}>
                <CTabList variant="underline-border">
                  <CTab itemKey={1}>Add Disease</CTab>
                  <CTab itemKey={2}>Edit Disease</CTab>
                  <CTab itemKey={3}>View Disease</CTab>
                </CTabList>
                <CTabContent>
                  <CTabPanel className="py-3" itemKey={1}>
                    <AddDiseaseForm />
                  </CTabPanel>
                  <CTabPanel className="py-3" itemKey={2}>
                    <EditDiseaseForm />
                  </CTabPanel>
                  <CTabPanel className="py-3" itemKey={3}>
                    <ViewAllDiseases />
                  </CTabPanel>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </>
      ) : (
        <PermissionDenied />
      )}

    </>
  )
}

export default ManageDisease
