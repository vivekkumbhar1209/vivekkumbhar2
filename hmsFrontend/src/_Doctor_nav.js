import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilUserFollow,
  cilPeople,
  cilHospital,
  cilSearch,
  cilMedicalCross,
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
        name: 'OPD Queue',
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
