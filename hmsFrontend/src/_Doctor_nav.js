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
    name: 'Doctor Dashboard',
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
]

export default _nav
