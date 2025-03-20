import React, { Suspense, useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import Pusher from 'pusher-js'

// routes config
import routes from '../routes'
import Toast from '../components/notification/Toast'

const AppContent = () => {
  const [show, setShow] = useState(false)
  const [toastData, setToastData] = useState(null)

  useEffect(() => {
    // Pusher.logToConsole = true

    const pusher = new Pusher('4f0d3f536163be9e540c', {
      cluster: 'ap2',
    })

    const channel = pusher.subscribe('enquiry')
    channel.bind('New-enquiry', (data) => {
      if (data) {
        console.log(data.message)
        setToastData(data.message)
        setShow(true)
      } else {
        console.log('failure')
      }
    })
  }, [])

  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          zIndex: '200',
          right: '10px',
        }}
      >
        {show && <Toast toastData={toastData} onClose={() => handleClose} />}{' '}
      </div>
      <CContainer className="px-4" lg>
        <h1>{console.log('Toast visibility :- ' + show)}</h1>
        <Suspense fallback={<CSpinner color="primary" />}>
          <Routes>
            {routes.map((route, idx) => {
              return route.element && <Route key={idx} path={route.path} exact={route.exact} name={route.name} element={<route.element />} />
            })}
            <Route path="/" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Suspense>
      </CContainer>
    </>
  )
}

export default React.memo(AppContent)
