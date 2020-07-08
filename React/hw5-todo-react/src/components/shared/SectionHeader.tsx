import React from "react";

export default function SectionHeader(props: any) {
    return (
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <div style={{ borderBottom: "1px solid rgba(0,0,0,.1)", flexGrow: 1, height: 0 }}></div>
            <div style={{ margin: "0 6px" }}>
                {props.children}
            </div>
            <div style={{ borderBottom: "1px solid rgba(0,0,0,.1)", flexGrow: 1, height: 0 }}></div>
        </div>
    )
}