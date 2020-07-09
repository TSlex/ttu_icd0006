import React, { useRef, useEffect } from "react";

interface IProps {
    fixed?: boolean;
    style?: string
}

export default function LoadingOverlay(props: IProps) {

    useEffect(() => {
        back.current!.setAttribute('style', getStyle());
    }, [])

    const back = useRef(null as HTMLDivElement | null)

    const getStyle = () => {
        let style = "left: 0px; top: 0px; height: 100%; width: 100%; background: rgba(0, 0, 0, 0.133); z-index: 100;"

        if (props.fixed) {
            style = "position: fixed; " + style;
        } else {
            style = "position: absolute; " + style;
        }

        if (props.style) {
            style = style + props.style
        }

        return style;
    }

    return (
        <>
            <div ref={back}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </>
    )
}