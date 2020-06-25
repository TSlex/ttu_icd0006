import { BaseData } from "./FormInput";
import React from "react";

export interface IProps {
    data: BaseData;
    className?: string;
    slot?: JSX.Element;
}

export const Label = (props: IProps) => {

    if (props.data.label) {
        return (
            <label htmlFor={props.data.id ?? undefined} className={props.className}>
                {props.data.label}
                {props.slot}
            </label>
        )

    } else {
        return <></>
    }
}