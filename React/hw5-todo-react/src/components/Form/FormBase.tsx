import React, { useState, CSSProperties } from "react";
import { Label } from "./Label";

export interface IProps {
    inputType?: FormInputTypes;
    data: InputData | TextAreaData | CheckboxData | RadioData | SelectData;
    bindFunction?: (value: any) => void;
}

export enum FormInputTypes {
    Input,
    TextArea,
    Checkbox,
    Radio,
    Select
}

export const FormInput = (props: IProps) => {

    const onChange = (target:
        EventTarget & (
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        )
    ) => {
        const inputElement = target as HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement;

        // console.log(inputElement.value);

        // if (target.type === 'text') {
        //     setState({ ...state, [target.name]: target.value });
        // }
        // if (target.type === 'checkbox' && target instanceof HTMLInputElement) {
        //     setState({ ...state, [target.name]: target.checked });
        // }
        // if (target.type === 'select-one' && target instanceof HTMLSelectElement) {
        //     setState({ ...state, [target.name]: target.value });
        // }
        // if (target.type === "radio") {
        //     const newState = { ...state };
        //     newState.radioGroup1.forEach((item, index, array) => array[index] = false);
        //     newState.radioGroup1[Number(target.value)] = true;
        //     setState(newState);
        // }

    }

    const renderInput = () => {
        switch (props.inputType) {
            case FormInputTypes.TextArea:
                return (
                    <div className="form-group">
                        <Label data={props.data} />
                        <textarea
                            style={props.data.style}
                            value={(props.data as TextAreaData).bindValue}
                            name={props.data.name}
                            className={props.data.class}
                            id={props.data.id}
                            rows={(props.data as TextAreaData).rowsCount}
                            onChange={(e) => onChange(e.target)}
                        >
                        </textarea>
                    </div>
                )
            case FormInputTypes.Checkbox:
                return (
                    <div className="form-check">
                        <input
                            style={props.data.style}
                            checked={(props.data as CheckboxData).bindValue}
                            name={props.data.name}
                            type="checkbox"
                            className={props.data.class ?? "" + " form-check-input"}
                            id={props.data.id}
                            onChange={(e) => onChange(e.target)}
                        />
                        <Label data={props.data} className="form-check-label" slot={} />
                    </div>
                )
            case FormInputTypes.Radio:
                return (
                    <div className="form-group">
                        {
                            (props.data as RadioData).bindValue.map((item, index) => (
                                <>
                                    <Label data={{ id: props.data.id + `:${index}`, label: item.label }} />
                                    <input
                                        style={props.data.style}
                                        checked={item.value}
                                        name={props.data.name}
                                        type="radio"
                                        className={props.data.class}
                                        id={props.data.id}
                                        onChange={(e) => onChange(e.target)}
                                    />
                                </>
                            ))
                        }
                    </div>
                )
            case FormInputTypes.Select:
                return (
                    <div className="form-group">
                        <Label data={props.data} />
                        <select
                            style={props.data.style}
                            name={props.data.name}
                            className={props.data.class}
                            id={props.data.id}
                            onChange={(e) => onChange(e.target)}
                        >
                            {
                                (props.data as SelectData).options.map((item, index) => (
                                    <option value={item.value} key={index}>
                                        {item.displayValue}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                )
            default:
                return (
                    <div className="form-group">
                        <Label data={props.data} />
                        <input
                            style={props.data.style}
                            value={(props.data as InputData).bindValue}
                            name={props.data.name}
                            type={(props.data as InputData).type}
                            className={props.data.class}
                            id={props.data.id}
                            onChange={(e) => onChange(e.target)}
                        />
                    </div>
                )
        }
    }

    return (
        <>
            {
                renderInput()
            }
        </>
    )
}

// form data depends on type

export interface BaseData {
    class?: string;
    style?: CSSProperties;
    id?: string;
    label?: string;
    name?: string;
}

export interface InputData extends BaseData {
    bindValue: string | number | string[];
    type: string;
}

export interface TextAreaData extends BaseData {
    bindValue: string | number | string[];
    rowsCount?: number;
}

export interface CheckboxData extends BaseData {
    bindValue: boolean;
}

export interface RadioData extends BaseData {
    bindValue: { value: boolean; label?: string }[]
}

export interface SelectData extends BaseData {
    bindValue: string | number | string[];
    options: { value: string; displayValue?: string }[]
}