import React, { useState, CSSProperties, useEffect } from "react";
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

    const [state, setState] = useState({
        checkBoxBalue: (props.data as CheckboxData).initialValue ?? false,
        radioValues: (props.data as RadioData).initialValue ?? [],
        inputValue: (props.data as InputData).initialValue ?? "",
    });

    const onChange = (target:
        EventTarget & (
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        )
    ) => {
        const inputElement = target as HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement

        if ((props.inputType === FormInputTypes.Input || !props.inputType) && (props.data as InputData).type === "number") {
            inputElement.value = inputElement.value.replace(/(?<!\d)0+(?=[\d-+])/, '')
        }

        if (props.data.max) {
            if ((props.inputType === FormInputTypes.Input || !props.inputType) && (props.data as InputData).type === "number" && Number(inputElement.value) >= props.data.max) {
                inputElement.value = props.data.max.toString()
            }
            else if (inputElement.value.toString().length > props.data.max) {
                return
            }
        }

        if (props.data.min !== undefined) {
            if ((props.inputType === FormInputTypes.Input || !props.inputType) && (props.data as InputData).type === "number" && Number(inputElement.value) < props.data.min) {
                inputElement.value = props.data.min.toString()
            }
        }

        switch (props.inputType) {
            case FormInputTypes.Checkbox:
                setState({ ...state, checkBoxBalue: inputElement.checked });
                break;
            case FormInputTypes.Radio:
                const newState = { ...state }

                newState.radioValues.forEach((item, index, array) => array[index].value = false);
                newState.radioValues[Number(inputElement.value)].value = true;

                setState(newState);
                break;
            default:
                setState({ ...state, inputValue: inputElement.value });
                break;
        }

        if (props.bindFunction) {
            return props.bindFunction(inputElement.value)
        }
    }

    const wrapInput = (input: any) => {
        if (props.data.wrapInput === false) {
            return input;

        } else {
            switch (props.inputType) {
                case FormInputTypes.Checkbox:
                    return (<div className="form-check">{input}</div>)
                default:
                    return (<div className="form-group">{input}</div>)
            }
        }
    }

    const renderInput = () => {
        switch (props.inputType) {
            case FormInputTypes.TextArea:
                return wrapInput(
                    <>
                        <Label data={props.data} />
                        <textarea
                            style={props.data.style}
                            value={state.inputValue}
                            name={props.data.name}
                            className={[props.data.class, "form-control", (props.data.isValid === false ? 'is-invalid' : null)].join(" ").trim()}
                            id={props.data.id}
                            rows={(props.data as TextAreaData).rowsCount}
                            disabled={props.data.disabled}
                            onChange={(e) => onChange(e.target)}
                        >
                        </textarea>
                    </>
                )

            case FormInputTypes.Checkbox:
                return wrapInput(
                    <>
                        <input
                            style={props.data.style}
                            checked={state.checkBoxBalue}
                            name={props.data.name}
                            type="checkbox"
                            className={[props.data.class, "form-check-input", (props.data.isValid === false ? 'is-invalid' : null)].join(" ").trim()}
                            id={props.data.id}
                            disabled={props.data.disabled}
                            onChange={(e) => onChange(e.target)}
                        />
                        <Label data={props.data} className="form-check-label" />
                    </>
                )

            case FormInputTypes.Radio:
                return wrapInput(
                    <>
                        {
                            state.radioValues.map((item, index) => (
                                <div className="form-check-inline" key={index}>
                                    <input
                                        style={props.data.style}
                                        checked={item.value}
                                        value={index}
                                        name={props.data.name}
                                        type="radio"
                                        className={[props.data.class, "form-check-input", (props.data.isValid === false ? 'is-invalid' : null)].join(" ").trim()}
                                        id={props.data.id + `:${index}`}
                                        disabled={item.disabled}
                                        onChange={(e) => onChange(e.target)}
                                    />
                                    <Label data={{ id: props.data.id + `:${index}`, label: item.label }} className={"form-check-label"} />
                                </div>
                            ))
                        }
                    </>
                )

            case FormInputTypes.Select:
                return wrapInput(
                    <>
                        <Label data={props.data} />
                        <select
                            style={props.data.style}
                            value={state.inputValue}
                            name={props.data.name}
                            className={[props.data.class, "form-control", (props.data.isValid === false ? 'is-invalid' : null)].join(" ").trim()}
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
                    </>
                )

            default:
                return wrapInput(
                    <>
                        <Label data={props.data} />
                        <input
                            autoComplete={props.data.autoComplete}

                            style={props.data.style}
                            value={state.inputValue}
                            name={props.data.name}
                            type={(props.data as InputData).type ?? "text"}
                            className={[props.data.class, (props.data.ignoreClasses ? null : "form-control"), (props.data.isValid === false ? 'is-invalid' : null)].join(" ").trim()}
                            id={props.data.id}
                            disabled={props.data.disabled}
                            onChange={(e) => onChange(e.target)}
                        />
                    </>
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
    disabled?: boolean;

    isValid?: boolean;

    autoComplete?: string;

    max?: number;
    min?: number;

    ignoreClasses?: boolean;
    wrapInput?: boolean;
}

export interface InputData extends BaseData {
    initialValue?: string;
    type?: string;
}

export interface TextAreaData extends BaseData {
    initialValue?: string;
    rowsCount?: number;
}

export interface CheckboxData extends BaseData {
    initialValue?: boolean;
}

export interface RadioData extends BaseData {
    initialValue?: { value: boolean; label?: string; disabled?: boolean }[]
}

export interface SelectData extends BaseData {
    initialValue?: string;
    options: { value: string; displayValue?: string; }[]
}