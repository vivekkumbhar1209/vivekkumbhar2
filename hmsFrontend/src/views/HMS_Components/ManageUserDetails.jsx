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
import ViewAllUsers from './ViewAllUsers'
import EditUsers from './EditUsers'
import AddUser from './AddUser'
import PermissionDenied from '../warning/PermissionDenied'


const ManageUserDetails = () => {
  const role = JSON.parse(localStorage.getItem('userData')).role
  return (
    <>
      {role === 'Admin' ? (
        <>
          <CCard>
            <CCardHeader>
              <strong>Manage System Users</strong>
            </CCardHeader>
            <CCardBody className="mb-0">
              <p className="text-body-secondary small">
                You can manage all the <code>user</code> settings from here.
              </p>
              <CTabs activeItemKey={1}>
                <CTabList variant="underline-border">
                  <CTab itemKey={1}>Add User</CTab>
                  <CTab itemKey={2}>Edit User</CTab>
                  <CTab itemKey={3}>All users</CTab>
                </CTabList>
                <CTabContent>
                  <CTabPanel className="py-3" itemKey={1}>
                    <AddUser />
                  </CTabPanel>
                  <CTabPanel className="py-3" itemKey={2}>
                    {/* edit department form */}
                    <ViewAllUsers action="edit" />
                  </CTabPanel>
                  <CTabPanel className="py-3" itemKey={3}>
                    <ViewAllUsers />
                  </CTabPanel>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </>
      ) : (
        <>
          <PermissionDenied />
        </>
      )}
    </>
  )
}

export default ManageUserDetails