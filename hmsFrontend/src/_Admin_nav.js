import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilUserFollow,
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
  cilNotes,
  cilLayers,
  cilCommentBubble,
  cilNewspaper,
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
        name: 'Manage Users',
        to: '/dashboard/manageUserDetails',
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
    name: 'System',
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
    name: 'Website',
  },
  {
    component: CNavGroup,
    name: 'Website Content',
    to: '/HMS_Components',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Services',
        to: '/dashboard/services',
        icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Specialities',
        to: '/dashboard/specialities',
        icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Doctors',
        to: '/dashboard/doctors',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Reviews',
        to: '/dashboard/reviews',
        icon: <CIcon icon={cilCommentBubble} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Blogs',
        to: '/dashboard/blogs',
        icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
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
        to: '/dashboard/viewStatistics',
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
