import React, { useEffect, useState } from 'react'
import { CAvatar, CBadge, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilSettings, cilUser, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import TailSpinLoader from '../TailSpinLoader'
import DefaultAvatar from '../../assets/images/avatars/1.png'
import api from '../../api'

const AppHeaderDropdown = () => {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  const storageUrl = import.meta.env.VITE_BACKEND_STORAGEURL
  useEffect(() => {
    setLoading(true)
    api
      .post('/getProfilePhoto', { userID: JSON.parse(localStorage.getItem('userData')).id })
      .then((res) => {
        setProfile(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const handleLogout = () => {

    api
      .post(
        '/logout',
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
          <div>{profile ? <CAvatar src={profile ? `${storageUrl}/${profile}` : ''} alt={'Profile Photo'} size="md" /> : <CAvatar src={DefaultAvatar} alt={'Profile Photo'} size="md" />}</div>
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
