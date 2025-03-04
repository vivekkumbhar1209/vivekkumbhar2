import React, { useState } from 'react'
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'
import AddReceptionistForm from './AddReceptionistForm'
import AddAdminForm from './Components/AddAdminForm'
import AddDoctorForm from './Components/AddDoctorForm'

const AddUser = () => {
  const [selectedRole, setSelectedRole] = useState('')

  // Function to render form based on selected role
  const renderForm = () => {
    switch (selectedRole) {
      case 'Admin':
        return <AddAdminForm role={selectedRole} />
      case 'Receptionist':
        return <AddReceptionistForm role={selectedRole} />
      case 'Doctor':
        return <AddDoctorForm role={selectedRole} />
      default:
        return <p className="text-muted">Please select a role to proceed</p>
    }
  }

  return (
    <div>
      <CCard>
        <CCardHeader>
          <strong>User Management</strong>
        </CCardHeader>
        <CCardBody>
          <p className="text-body-secondary small">
            You can add new <code>users</code> from here.
          </p>
          <CDropdown>
            <CDropdownToggle color="primary">Select Role</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => setSelectedRole('Admin')}>Admin</CDropdownItem>
              <CDropdownItem onClick={() => setSelectedRole('Receptionist')}>
                Receptionist
              </CDropdownItem>
              <CDropdownItem onClick={() => setSelectedRole('Doctor')}>Doctor</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CCardBody>
      </CCard>

      <div className="mt-4">{renderForm()}</div>
    </div>
  )
}

export default AddUser
