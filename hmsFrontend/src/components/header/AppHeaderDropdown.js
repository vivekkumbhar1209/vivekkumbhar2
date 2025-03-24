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
        console.log("API Response:", res);
    
        const photoPath = res.data?.data;
        if (!photoPath) {
          console.error("No profile photo found!");
          return;
        }
    
        // Fix: Remove '/api' from backend URL
        const fullPhotoURL = `${import.meta.env.VITE_BACKEND_BASEURL.replace('/api', '')}/storage/${photoPath}`;
        //console.log("Full Photo URL:", fullPhotoURL);
    
        setProfile(fullPhotoURL);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
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
          <div>
  <CAvatar 
    src={profile ? profile : DefaultAvatar} 
    alt="Profile Photo" 
    size="md" 
  />
</div>
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
