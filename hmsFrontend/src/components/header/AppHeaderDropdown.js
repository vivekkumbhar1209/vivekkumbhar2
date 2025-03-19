import React, { useEffect, useState } from 'react'
import { CAvatar, CBadge, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilSettings, cilUser, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import TailSpinLoader from '../TailSpinLoader'
import DefaultAvatar from '../../assets/images/avatars/1.png'

const AppHeaderDropdown = () => {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    setLoading(true)
    axios
      .post('http://localhost:8000/api/getProfilePhoto', { userID: JSON.parse(localStorage.getItem('userData')).id }, { headers: { Authorization: `Bearer ${localStorage.getItem('login-token')}` } })
      .then((res) => {
        console.log(res.data.data)
        setProfile(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

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
        window.location.href = '/web'
      })
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        {loading ? (
          <div style={{ marginTop: '5px' }} className="d-flex justify-content-center align-items-center">
            <TailSpinLoader />
          </div>
        ) : (
          <div>{profile ? <CAvatar src={profile ? `http://127.0.0.1:8000/storage/${profile}` : ''} alt={'Profile Photo'} size="md" /> : <CAvatar src={DefaultAvatar} alt={'Profile Photo'} size="md" />}</div>
        )}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem as={Link} to={'/dashboard/userProfile'} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem as={Link} to={'/dashboard/userSettings'} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilSettings} className="me-2" />
          Settings
          <CBadge color="danger" className="ms-2">
            Pro
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem style={{ cursor: 'pointer' }} onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
