import React, { Suspense, useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import Pusher from 'pusher-js'

// routes config
import routes from '../routes'
import Toast from '../components/notification/Toast'

const AppContent = () => {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_ID, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    })

    const channel = pusher.subscribe('enquiry')
    channel.bind('New-enquiry', (data) => {
      if (data) {
        console.log(data.message)
        setToasts((prevToasts) => [...prevToasts, { id: Date.now(), message: data.message }])
      } else {
        console.log('failure')
      }
    })

    return () => {
      pusher.unsubscribe('enquiry')
    }
  }, [])

  const handleClose = (id) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id))
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          zIndex: 200,
          right: '10px',
          top: '50px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          transition: '0.6s all ease-in-out'
        }}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} toastData={toast.message} onClose={() => handleClose(toast.id)} />
        ))}
      </div>
      <CContainer className="px-4" lg>
        <h1>{console.log('Toasts count: ', toasts.length)}</h1>
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
