import { useSelector, useDispatch } from "react-redux"
import { AppState } from "redux/types"
import React from "react"
import { randomBytes } from "crypto"
import { AlertBox, AlertTypes } from "./Alert"
import { setErrors } from "redux/notification/actions"

interface IProps {
    dismissable?: boolean
}
export default function Errors(props: IProps) {

    const errors = useSelector((store: AppState) => store.notification.errors)

    const dispatch = useDispatch()

    const removeError = (error: string) => {
        let errorList = [...errors]

        errorList.forEach((element, index) => {
            if (element === error) {
                errorList.splice(index, 1)
                return
            }
        })

        dispatch(setErrors(errorList))
    }

    if (errors.length > 0) {
        return (
            <div key={randomBytes(5).toString()}>
                {errors.map((item: string, index) => (
                    <AlertBox
                        key={index}
                        dismissFunction={() => removeError(item)}
                        alertData={{ message: item, type: AlertTypes.Danger, dismissable: props.dismissable ?? true }}
                    />
                ))}
            </div>
        )
    }

    return <></>
}