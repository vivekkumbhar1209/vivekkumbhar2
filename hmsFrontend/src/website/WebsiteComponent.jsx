import React, { Suspense } from 'react'
import Navbar from './src/assets/components/Header/nav'
const Homepage = React.lazy(() => import('./src/assets/pages/Homepage'))
import './index.css'
import RingLoader from '../components/RingLoader'

const WebsiteComponent = () => {

    return (
        <>
            <Suspense fallback={
                <div className='flex justify-center items-center h-screen w-screen'>
                    <RingLoader />
                </div>
            }>
                <Navbar />
                <Homepage />
            </Suspense>
        </>
    )
}

export default WebsiteComponent
