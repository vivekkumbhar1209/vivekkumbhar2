import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AppSidebarNav } from './AppSidebarNav'
import { cilMedicalCross } from '@coreui/icons'

// this is the side bar navigation link list
import adminLinks from '../_Admin_nav'
import receptionistLinks from '../_Receptionist_nav'
import doctorLinks from '../_Doctor_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  //fetch the role of logged in user from local storage
  const role = JSON.parse(localStorage.getItem('userData')).role
  var links = null

  if (role === 'Admin') {
    links = adminLinks
  } else if (role === 'Doctor') {
    links = doctorLinks
  } else if (role === 'Receptionist') {
    links = receptionistLinks
  }

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/" style={{ display: 'flex', gap: '10px', textDecoration: 'none' }}>
          <CIcon customClassName="sidebar-brand-full" icon={cilMedicalCross} height={25} />
          <h3>HMS</h3>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      {/* this is the line where sidebar links are given as props to AppSideBarNav component */}
      <AppSidebarNav items={links} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
