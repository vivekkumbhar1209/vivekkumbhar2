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
import AddMedicineForm from './Components/AddMedicineForm'
import ViewAllMedicine from './Components/ViewAllMedicine'
import EditMedicineForm from './Components/EditMedicineForm'
import PermissionDenied from '../warning/PermissionDenied'

const ManageDepartment = () => {
  const role = JSON.parse(localStorage.getItem('userData')).role
  return (
    <>
      {role === 'Admin' ? (
        <>
          <CCard>
            <CCardHeader>
              <strong>Manage Medicines</strong>
            </CCardHeader>
            <CCardBody className="mb-0">
              <p className="text-body-secondary small">
                You can manage all the <code>medicines</code> from here.
              </p>
              <CTabs activeItemKey={2}>
                <CTabList variant="underline-border">
                  <CTab itemKey={1}>Add Medicines</CTab>
                  <CTab itemKey={2}>Edit Medicines</CTab>
                  <CTab itemKey={3}>View Medicines</CTab>
                </CTabList>
                <CTabContent>
                  <CTabPanel className="py-3" itemKey={1}>
                    {/* add medicines */}
                    <AddMedicineForm />
                  </CTabPanel>
                  <CTabPanel className="py-3" itemKey={2}>
                    {/* edit medicines details */}
                    <EditMedicineForm />
                  </CTabPanel>
                  <CTabPanel className="py-3" itemKey={3}>
                    {/* view all medicines */}
                    <ViewAllMedicine />
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

export default ManageDepartment
