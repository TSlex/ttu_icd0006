import React, { useState, useEffect } from 'react';
import Errors from 'components/Shared/Errors';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from 'redux/todo-tasks/actions';
import { setGlobalLoaded } from 'redux/loading-system/actions';
import { AppState } from 'redux/types';
import { ITodoTaskGetDTO } from 'types/ITodoTaskDTO';
import { numberToColorHsl } from 'helpers/numberToColor';
import styled from '@material-ui/core/styles/styled';

enum renderOptions {
    ARCHIVED,
    DAY,
    WEEK,
    MONTH,
    YEAR
}

export default function Index() {

    const [sortingReversed, setSortingReversed] = useState(false)
    const [renderMode, setRenderMode] = useState(renderOptions.DAY)

    const tasks = useSelector((state: AppState) => state.todoTasks.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks())
    }, [])

    useEffect(() => {
        dispatch(setGlobalLoaded(true));
        return () => { dispatch(setGlobalLoaded(false)) };
    }, [])

    const render = () => {
        switch (renderMode) {
            case renderOptions.ARCHIVED:
                return renderArchived()
            case renderOptions.WEEK:
                return renderByWeek()
            case renderOptions.MONTH:
                return renderByMonth()
            case renderOptions.YEAR:
                return renderByYear()
            default:
                return renderByDay()
        }
    }

    const renderByDay = () => {
        return (
            <>
                <div className="tlist mt-2">
                    {tasks.map((item: ITodoTaskGetDTO) => (
                        <div key={item.id} className="task-container">
                            <div className="task-body">
                                <div className="task-headers">
                                    <span>{item.todoCategoryId}</span>
                                    <span>{item.todoPriorityId}</span>
                                </div>
                                <div className="task-content">
                                    <div className="task-name">
                                        <span>{item.todoTaskName}</span>
                                    </div>
                                    <div className="task-deadline">
                                        <span>{new Date().toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="tlist-controls">
                                <button className="btn btn-primary button-round"><span className="fas fa-pencil-alt" /></button>
                                <button className="btn btn-danger button-round"><span className="fas fa-trash" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    const renderByWeek = () => {
        return (<><span>by week</span></>)
    }

    const renderByMonth = () => {
        return (<><span>by month</span></>)
    }

    const renderByYear = () => {
        return (<><span>by year</span></>)
    }

    const renderArchived = () => {
        return (<><span>archive</span></>)
    }

    return (
        <>
            {/* tooltips */}
            {/* <InfoTooltip id="priority-value" type="light" effect="solid">
                <span>Priority value</span>
                <span>0 - 100</span>
                <small>(Lower - Higher)</small>
            </InfoTooltip>

            <InfoTooltip id="priority-name" type="light" effect="solid">
                <span>Priority name</span>
            </InfoTooltip> */}

            <div className="text-center">
                <span>
                    <button className="btn btn-primary" onClick={() => setRenderMode(renderOptions.DAY)}>DAY</button>
                    <button className="btn btn-primary ml-1" onClick={() => setRenderMode(renderOptions.WEEK)}>WEEK</button>
                    <button className="btn btn-primary ml-1" onClick={() => setRenderMode(renderOptions.MONTH)}>MONTH</button>
                    <button className="btn btn-primary ml-1 mr-1" onClick={() => setRenderMode(renderOptions.YEAR)}>YEAR</button>
                    |
                    <button className="btn btn-secondary ml-1 mr-1" onClick={() => setRenderMode(renderOptions.ARCHIVED)}>ARCHIVED</button>
                    |
                    <button className="btn btn-primary ml-1" onClick={() => setSortingReversed(!sortingReversed)}>
                        {sortingReversed ? <i className="fas fa-sort-up"></i> : <i className="fas fa-sort-down"></i>}
                    </button>
                    <button className="btn btn-primary ml-1 mr-1">
                        <i className="fas fa-filter"></i>
                    </button>
                    |
                    <button className="btn btn-primary ml-1"><i className="fas fa-plus"></i></button>
                </span>
                <hr />
                <div className="row align-items-center d-flex flex-column">
                    <div className="col-md-6">
                        <Errors />
                    </div>
                </div>
            </div>

            {/* creating model */}
            {/* {renderCreatingModel()} */}

            {render()}
        </>
    )
}