import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//hms dashboard content
const RegisterPatient = React.lazy(() => import('./views/HMS_Components/RegisterPatient'))
const AddUser = React.lazy(() => import('./views/HMS_Components/AddUser'))
const ManageDepartment = React.lazy(() => import('./views/HMS_Components/ManageDepartment'))
const ManageMedicines = React.lazy(() => import('./views/HMS_Components/ManageMedicines'))
const SearchPatient = React.lazy(() => import('./views/HMS_Components/SearchPatient'))
const ManageDisease = React.lazy(() => import('./views/HMS_Components/ManageDisease'))
const ManageUserDetails = React.lazy(() => import('./views/HMS_Components/ManageUserDetails'))
const ManageOPDPatients = React.lazy(() => import('./views/HMS_Components/ManageOPDPatients'))
const Settings = React.lazy(() => import('./views/HMS_Components/Settings'))
const Profile = React.lazy(() => import('./views/HMS_Components/Profile'))
const ViewQueue = React.lazy(() => import('./views/HMS_Components/ViewQueue'))
const OpdConsultation = React.lazy(() => import('./views/HMS_Components/OpdConsultation'))
const ViewStats = React.lazy(() => import('./views/HMS_Components/ViewStatistics'))

//website content element
const Reviews = React.lazy(() => import('./views/HMS_Components/Reviews'))
const Blogs = React.lazy(() => import('./views/HMS_Components/Blogs'))
const Doctors = React.lazy(() => import('./views/HMS_Components/Doctors'))
const Specialities = React.lazy(() => import('./views/HMS_Components/Specialities'))
const Services = React.lazy(() => import('./views/HMS_Components/Services'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {
    path: '/services',
    name: 'Services',
    element: Services,
  },
  {
    path: '/specialities',
    name: 'Specialities',
    element: Specialities,
  },
  {
    path: '/doctors',
    name: 'Doctors',
    element: Doctors,
  },
  {
    path: '/userSettings',
    name: 'Settings',
    element: Settings,
  },
  {
    path: '/reviews',
    name: 'Reviews',
    element: Reviews,
  },
  {
    path: '/blogs',
    name: 'Blogs',
    element: Blogs,
  },
  {
    path: '/viewStatistics',
    name: 'Statictics',
    element: ViewStats,
  },
  {
    path: '/opdConsultation',
    name: 'OPD Consultation',
    element: OpdConsultation,
  },
  {
    path: '/viewQueue',
    name: 'Queue',
    element: ViewQueue,
  },
  {
    path: '/userProfile',
    name: 'User Profile',
    element: Profile,
  },
  {
    path: '/registerPatient',
    name: 'Register Patient',
    element: RegisterPatient,
  },

  {
    path: '/manageOPDPatient',
    name: 'Manage OPD Patient',
    element: ManageOPDPatients,
  },

  {
    path: '/manageUserDetails',
    name: 'Manage User Details',
    element: ManageUserDetails,
  },

  {
    path: '/manageDiseases',
    name: 'Manage Disease',
    element: ManageDisease,
  },
  {
    path: '/addUser',
    name: 'Add User',
    element: AddUser,
  },
  {
    path: '/manageDepartment',
    name: 'Manage Department',
    element: ManageDepartment,
  },
  {
    path: '/manageMedicines',
    name: 'Manage Medicines',
    element: ManageMedicines,
  },
  {
    path: '/searchPatient',
    name: 'Search Patient',
    element: SearchPatient,
  },
]

export default routes
