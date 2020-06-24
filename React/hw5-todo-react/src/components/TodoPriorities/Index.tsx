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
        <div>
            {priorities.map((item: ITodoPriorityGetDTO) =>
                <div key={item.id}>
                    <div>
                        <div><span>{item.todoPriorityName}</span></div>
                        |
                        <div><span>{item.todoPrioritySort}</span></div>
                    </div>
                    <button className="alert-primaty"><span className="fas fa-pencil-alt" /></button>
                    <button className="alert-danger"><span className="fas fa-times" /></button>
                </div>
            )}
        </div>
    )
}