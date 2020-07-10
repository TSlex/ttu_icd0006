import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalLoaded } from 'redux/loading-system/actions';

export default function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setGlobalLoaded(true));
        return () => {
            dispatch(setGlobalLoaded(false));
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <span>Home</span>
    )
}