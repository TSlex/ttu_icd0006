import React from "react";

interface IProps {
    closeCallBack?: () => void
    children?: any;
}

export default function ModalBlock(props: IProps) {

    const onClose = (event: any) => {
        if ((event.target as HTMLElement).id !== "modal-block") {
            return;
        };

        if (props.closeCallBack) {
            props.closeCallBack()
        }
    }

    return (
        <div id="modal-block" style={{
            position: "fixed", left: "0px", top: "0px",
            height: "100%", width: "100%", background: "rgba(0, 0, 0, 0.133)", zIndex: 100
        }} onClick={onClose}>
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)"
            }}>
                {props.children}
            </div>
        </div>
    )
}