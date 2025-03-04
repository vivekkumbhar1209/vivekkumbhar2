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
import AddDepartmentForm from './Components/AddDepartmentForm'
import ViewAllDepartment from './Components/ViewAllDepartment'
import EditDepartmentForm from './Components/EditDepartmentForm'

const ManageDepartment = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>Manage Department</strong>
        </CCardHeader>
        <CCardBody className="mb-0">
          <p className="text-body-secondary small">
            You can manage all the <code>departments</code> settings from here.
          </p>
          <CTabs activeItemKey={2}>
            <CTabList variant="underline-border">
              <CTab itemKey={1}>Add Department</CTab>
              <CTab itemKey={2}>Edit Department</CTab>
              <CTab itemKey={3}>View Departments</CTab>
            </CTabList>
            <CTabContent>
              <CTabPanel className="py-3" itemKey={1}>
                {/* add department */}
                <AddDepartmentForm />
              </CTabPanel>
              <CTabPanel className="py-3" itemKey={2}>
                {/* edit department form */}
                <EditDepartmentForm />
              </CTabPanel>
              <CTabPanel className="py-3" itemKey={3}>
                {/* view department */}
                <ViewAllDepartment />
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ManageDepartment
