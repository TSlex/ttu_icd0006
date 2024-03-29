import React, { useState } from "react"
import { randomBytes } from "crypto"

interface IProps {
    alertData: IAlertData;
    dismissFunction?: () => void;
}

export const AlertBox = (props: IProps) => {

    const [id] = useState("alert:" + new Date().getMilliseconds() + randomBytes(4))

    const onDismiss = () => {
        const element = document.getElementById(id)
        element?.remove()

        if (props.dismissFunction) {
            props.dismissFunction()
        }
    }

    const renderButton = () => {
        if (props.alertData.dismissable) {
            return (
                <button type="button" className="close" aria-label="Close" onClick={onDismiss}>
                    <span aria-hidden="true">&times;</span>
                </button>)
        }
        else {
            return <></>
        }
    }

    return (
        <div id={id} className={`alert alert-${props.alertData.type} alert-dismissible fade show`} role="alert">
            {props.alertData.message}
            {renderButton()}
        </div >
    )
}

export enum AlertTypes {
    Primary = 'primary',
    Secondary = 'secondary',
    Success = 'success',
    Danger = 'danger',
    Warning = 'warning',
    Info = 'info',
    Light = 'light',
    Dark = 'dark',
}

export interface IAlertData {
    message: string;
    dismissable?: boolean;
    type: AlertTypes
}
