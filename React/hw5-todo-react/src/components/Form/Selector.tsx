import React, { useState } from "react";
import SectionHeader from "components/Shared/SectionHeader";

interface IProps {
    closeCallBack?: () => void
    confirmCallBack?: () => void
    selectData: { sectionName?: string, data: { name: string, selected: boolean }[], multiChoise?: boolean }[]
}

export default function Selector(props: IProps) {

    const [data, setData] = useState(props.selectData)

    const onSelect = () => {

    }

    const onConfirm = () => {
        onClose()
    }

    const onClose = () => {
        if (props.closeCallBack) {
            props.closeCallBack()
        }
    }

    return (
        <div className="selector">
            {data.map((item) => (
                <div className="selector-section">
                    {item.sectionName && <SectionHeader>{item.sectionName}</SectionHeader>}
                    <div className="selector-section-options">
                        {item.data.map((option) => (
                            <button className={`btn ${option.selected ? "btn-primary" : "btn-light"}`}>
                                {option.name.toLocaleUpperCase()}
                            </button>
                        ))}
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