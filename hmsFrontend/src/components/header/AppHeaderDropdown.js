import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilSettings, cilUser, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    console.log('logout')
    const token = localStorage.getItem('login-token')
    axios
      .post(
        'http://localhost:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        localStorage.clear()
        navigate('/')
      })
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem as={Link} to={'/dashboard/userProfile'} style={{cursor:'pointer'}}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem as={Link} to={'/dashboard/userSettings'} style={{cursor:'pointer'}}>
          <CIcon icon={cilSettings} className="me-2" />
          Settings
          <CBadge color="danger" className="ms-2">
            Pro
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem style={{cursor:'pointer'}} onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
