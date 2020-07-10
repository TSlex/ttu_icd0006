import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalLoaded } from 'redux/loading-system/actions';
import { AppState } from 'redux/types';

export default function Home() {

    const isAuthenticated = useSelector((state: AppState) => state.account.isAuthenticated)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setGlobalLoaded(true));
        return () => {
            dispatch(setGlobalLoaded(false));
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="text-center">
                <i className="fas fa-clipboard-list mb-3" style={{ fontSize: 60, marginTop: 200 }}></i>
                <h2>TODO project on ReactJS</h2>
                <h3>for icd0006-2019s course</h3>
                {!isAuthenticated && <span className="text-info">please login to use this app</span>}
            </div>
        </>
    )
}