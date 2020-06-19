import React, { useState, CSSProperties } from "react";
import { Label } from "./Label";

interface IProps {
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

    const [state, setState] = React.useState({
        textAreaValue: (props.data as TextAreaData).bindValue,
        checkBoxBalue: (props.data as CheckboxData).bindValue,
        radioValues: (props.data as RadioData).bindValue,
        selectValue: (props.data as SelectData).bindValue,
        inputValue: (props.data as InputData).bindValue,
    });

    const onChange = (target:
        EventTarget & (
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        )
    ) => {
        const inputElement = target as HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement

        switch (props.inputType) {
            case FormInputTypes.TextArea:
                setState({ ...state, textAreaValue: inputElement.value });
                break;
            case FormInputTypes.Checkbox:
                setState({ ...state, checkBoxBalue: inputElement.checked });
                break;
            case FormInputTypes.Radio:
                const newState = { ...state }
                newState.radioValues.forEach((item, index, array) => array[index].value = false);
                newState.radioValues[Number(inputElement.value)].value = true;
                setState(newState);
                break;
            case FormInputTypes.Select:
                setState({ ...state, selectValue: inputElement.value });
                break;
            default:
                setState({ ...state, textAreaValue: inputElement.value });
                break;
        }

        if (props.bindFunction) {
            return props.bindFunction(inputElement.value)
        }
    }

    const renderInput = () => {
        switch (props.inputType) {
            case FormInputTypes.TextArea:
                return (
                    <div className="form-group">
                        <Label data={props.data} />
                        <textarea
                            style={props.data.style}
                            value={state.textAreaValue}
                            name={props.data.name}
                            className={props.data.class}
                            id={props.data.id}
                            rows={(props.data as TextAreaData).rowsCount}
                            disabled={props.data.disabled}
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
                            checked={state.checkBoxBalue}
                            name={props.data.name}
                            type="checkbox"
                            className={("form-check-input " + props.data.class).trim()}
                            id={props.data.id}
                            disabled={props.data.disabled}
                            onChange={(e) => onChange(e.target)}
                        />
                        <Label data={props.data} className="form-check-label" />
                    </div>
                )

            case FormInputTypes.Radio:
                return (
                    <div className="form-group">
                        {
                            state.radioValues.map((item, index) => (
                                <div className="form-check-inline" key={index}>
                                    <input
                                        style={props.data.style}
                                        checked={item.value}
                                        value={index}
                                        name={props.data.name}
                                        type="radio"
                                        className={("form-check-input " + props.data.class).trim()}
                                        id={props.data.id + `:${index}`}
                                        disabled={item.disabled}
                                        onChange={(e) => onChange(e.target)}
                                    />
                                    <Label data={{ id: props.data.id + `:${index}`, label: item.label }} className={"form-check-label"} />
                                </div>
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
                            value={state.selectValue}
                            name={props.data.name}
                            className={("form-control " + props.data.class).trim()}
                            id={props.data.id}
                            disabled={props.data.disabled}
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
                            value={state.inputValue}
                            name={props.data.name}
                            type={(props.data as InputData).type}
                            className={props.data.class}
                            id={props.data.id}
                            disabled={props.data.disabled}
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
    disabled?: boolean
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
    bindValue: { value: boolean; label?: string; disabled?: boolean }[]
}

export interface SelectData extends BaseData {
    bindValue: string | number | string[];
    options: { value: string; displayValue?: string; }[]
}