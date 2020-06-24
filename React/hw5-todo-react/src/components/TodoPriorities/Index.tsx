import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPriorities } from 'redux/todo-priorities/actions';
import { AppState } from 'redux/types';
import { ITodoPriorityGetDTO } from 'types/ITodoPriorityDTO';
import { setGlobalLoaded } from 'redux/loading-system/actions';

export default function Index() {

    const priorities = useSelector((state: AppState) => state.todoPriorities.priorities)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPriorities())
    }, [])

    useEffect(() => {
        dispatch(setGlobalLoaded(true));
        return () => { dispatch(setGlobalLoaded(false)) };
    }, [])

    return (
        <div className="tlist">
            {priorities.map((item: ITodoPriorityGetDTO) =>
                <div key={item.id} className="tlist-item">
                    <div className="tlist-content">
                        <div><span>{item.todoPriorityName}</span></div>
                        |
                        <div><span>{item.todoPrioritySort}</span></div>
                    </div>
                    <div className="tlist-controls">
                        <button className="button-round button-primary"><span className="fas fa-pencil-alt" /></button>
                        <button className="button-round button-danger"><span className="fas fa-times" /></button>
                    </div>
                </div>
            )}
        </div>
    )
}