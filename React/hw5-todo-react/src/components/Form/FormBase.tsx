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

        if (props.inputType === FormInputTypes.Input || props.inputType === FormInputTypes.TextArea) {

            if (!(props.data.max && props.data.max <= inputElement.value.length)) {
                return
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

    const renderInput = () => {
        switch (props.inputType) {
            case FormInputTypes.TextArea:
                return (
                    <div className="form-group">
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
                            className={[props.data.class, "form-check-input", (props.data.isValid === false ? 'is-invalid' : null)].join(" ").trim()}
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
                                        className={[props.data.class, "form-check-input", (props.data.isValid === false ? 'is-invalid' : null)].join(" ").trim()}
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
                    </div>
                )

            default:
                return (
                    <div className="form-group">
                        <Label data={props.data} />
                        <input
                            autoComplete={props.data.autoComplete}

                            style={props.data.style}
                            value={state.inputValue}
                            name={props.data.name}
                            type={(props.data as InputData).type ?? "text"}
                            className={[props.data.class, "form-control", (props.data.isValid === false ? 'is-invalid' : null)].join(" ").trim()}
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
    disabled?: boolean;

    isValid?: boolean;

    autoComplete?: string;

    max?: number;
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