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
  cilHospital,
  cilSearch,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
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
    to: '/HMS_Components',
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
        to: '/dashboard/searchPatient',
        icon: <CIcon icon={cilMagnifyingGlass} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'OPD',
  },
  {
    component: CNavGroup,
    name: 'OPD Department',
    to: '/base',
    icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'OPD Patient',
        to: '/dashboard/manageOPDPatient',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Queue Management',
        to: '/dashboard/viewQueue',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'IPD',
  },
  {
    component: CNavGroup,
    name: 'IPD Department',
    to: '/base',
    icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Admit Patient',
        to: '/dashboard/registerPatient',
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Patient Enquiry',
        to: '/dashboard/base/breadcrumbs',
        icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
    ],
  },
]

export default _nav
