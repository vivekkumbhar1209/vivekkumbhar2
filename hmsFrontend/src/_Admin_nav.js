import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilUser,
  cilUserFollow,
  cilMagnifyingGlass,
  cilPeople,
  cilUserPlus,
  cilSettings,
  cilBuilding,
  cilApplicationsSettings,
  cilMedicalCross,
  cilList,
  cilGraph,
  cilChartLine,
  cilMonitor,
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
    name: 'Users',
  },
  {
    component: CNavGroup,
    name: 'Users',
    to: '/HMS_Components',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add User',
        to: '/dashboard/addUser',
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Update User Details',
        to: '/dashboard/updateUserDetails',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'View All Users',
        to: '/dashboard/viewAllUsers',
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
    to: '/HMS_Components',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Manage Department',
        to: '/dashboard/manageDepartment',
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
    name: 'System',
    to: '/HMS_Components',
    icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Manage Diseases Lists',
        to: '/dashboard/manageDiseases',
        icon: <CIcon icon={cilApplicationsSettings} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Manage Medicines',
        to: '/dashboard/manageMedicines',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Statistics',
  },
  {
    component: CNavGroup,
    name: 'HMS Statistics',
    to: '/HMS_Components',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View Statistics',
        to: '/dashboard/addMedicines',
        icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
        badge: {
          color: 'danger',
          text: 'Pro',
        },
      },
    ],
  },
]

export default _nav
