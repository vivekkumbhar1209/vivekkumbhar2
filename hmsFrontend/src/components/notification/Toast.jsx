import React from 'react'
import { CToast, CToastHeader, CToastBody, } from '@coreui/react'
import { cilChatBubble, cilEnvelopeOpen, cilCommentBubble } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const Toast = () => {
    return (
        <>
            <CToast autohide={false} visible={true}>
                <CToastHeader closeButton>
                    <svg className="rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                        <CIcon icon={cilCommentBubble} className="me-2" size="sm" />
                    </svg>
                    <strong className="me-auto">New Enquiry</strong>
                </CToastHeader>
                <CToastBody>Hello, world! This is a toast message.</CToastBody>
            </CToast>
        </>
    )
}

export default Toast
