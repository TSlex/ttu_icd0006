import React, { useState } from "react";
import SectionHeader from "components/Shared/SectionHeader";

interface IProps {
    closeCallBack?: () => void
    confirmCallBack?: (data: { sectionName?: string, data: { name: string, selected: boolean }[], multiChoise?: boolean }[]) => void
    selectData: { sectionName?: string, data: { name: string, selected: boolean }[], multiChoise?: boolean }[]
}

export default function Selector(props: IProps) {

    const [data, setData] = useState(JSON.parse(JSON.stringify(props.selectData)) as { sectionName?: string, data: { name: string, selected: boolean }[], multiChoise?: boolean }[])

    const onSelect = (sectionIndex: number, optionIndex: number) => {
        let _data = [...data]
        const section = _data[sectionIndex]

        if (!section) return

        if (!section.multiChoise) {
            section.data.forEach((option) => {
                option.selected = false;
            })
            section.data[optionIndex].selected = true;
        }
        else {
            section.data[optionIndex].selected = !section.data[optionIndex].selected;
        }

        setData(_data)
    }

    const setAllSelected = (sectionIndex: number, bool: boolean) => {
        let _data = [...data]
        const section = _data[sectionIndex]

        section.data.forEach((option) => {
            option.selected = bool;
        })

        setData(_data)
    }

    const onConfirm = () => {
        if (props.confirmCallBack) {
            props.confirmCallBack(data)
        }
        onClose()
    }

    const onClose = () => {
        if (props.closeCallBack) {
            props.closeCallBack()
        }
    }

    return (
        <div className="selector">
            {data.map((item, sectionIndex) => (
                <div className="selector-section" key={sectionIndex}>
                    {item.sectionName && <SectionHeader>{item.sectionName}</SectionHeader>}
                    <div className="selector-section-options mt-2">
                        {item.data.map((option, optionIndex) => (
                            <button key={option.name} onClick={() => onSelect(sectionIndex, optionIndex)}
                                className={`btn ${option.selected ? "btn-primary" : "btn-light"}`}>
                                {option.name.toLocaleUpperCase()}
                            </button>
                        ))}
                        <button onClick={() => setAllSelected(sectionIndex, true)} className={"btn btn-info"}>
                            <i className="fas fa-check"></i>
                        </button>
                        <button onClick={() => setAllSelected(sectionIndex, false)} className={"btn btn-info"}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            ))}
            <hr />
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={onConfirm}>OK</button>
                <button className="btn btn-primary ml-1" onClick={onClose}>CANCEL</button>
            </div>
        </div>
    )
}