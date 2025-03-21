import React from 'react'
import { CToast, CToastHeader, CToastBody, } from '@coreui/react'
import { cilChatBubble, cilEnvelopeOpen, cilCommentBubble } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const Toast = ({ toastData, onClose }) => {
    return (
        <>
            <CToast autohide={false} visible={true}>
                {console.log("this is my data :- " + toastData.name)}
                <CToastHeader closeButton onClick={onClose}>
                    <svg className="rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                        <CIcon icon={cilCommentBubble} className="me-2" size="sm" />
                    </svg>
                    <strong className="me-auto">{toastData.title}</strong>
                </CToastHeader>
                <CToastBody>
                    <div>
                        Name - {toastData.name}
                    </div>
                    <div>
                        Mobile - {toastData.mobile}
                    </div>
                </CToastBody>
            </CToast>
        </>
    )
}

export default Toast
