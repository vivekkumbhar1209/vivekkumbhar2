import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilSpeedometer,
  cilUser,
  cilUserFollow,
  cilMagnifyingGlass,
  cilPeople,
  cilUserPlus,
  cilSettings,
  cilBuilding,
  cilLibraryAdd,
  cilApplicationsSettings,
  cilMedicalCross,
  cilList,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Admin Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Patients',
  },
  {
    component: CNavGroup,
    name: 'Patients',
    to: '/base',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Register Patient',
        to: '/dashboard/registerPatient',
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Search Patient',
        to: '/dashboard/base/breadcrumbs',
        icon: <CIcon icon={cilMagnifyingGlass} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Users',
  },
  {
    component: CNavGroup,
    name: 'Users',
    to: '/buttons',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add User',
        to: '/buttons/buttons',
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Update User Details',
        to: '/buttons/button-groups',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'View All Users',
        to: '/buttons/button-groups',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Department',
  },
  {
    component: CNavGroup,
    name: 'Department',
    to: '/buttons',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'New Department',
        to: '/buttons/buttons',
        icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Manage Department',
        to: '/buttons/button-groups',
        icon: <CIcon icon={cilApplicationsSettings} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Medicines',
  },
  {
    component: CNavGroup,
    name: 'Medicines',
    to: '/buttons',
    icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Manage Medicines',
        to: '/buttons/buttons',
        icon: <CIcon icon={cilApplicationsSettings} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'View Medicines',
        to: '/buttons/buttons',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav
