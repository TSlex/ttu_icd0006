import React, { useEffect } from 'react';

export default function Index(){

    useEffect(() => {
        console.log("Mouted/Updated");
        return () => {
            console.log("Unmount");
        }
    })

    return <span>Categories</span>
}