import React, { useState, useEffect } from 'react';
import Errors from 'components/Shared/Errors';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, setTasksCreating, createTask, selectTask, editTask, unselectTask, deleteTask } from 'redux/todo-tasks/actions';
import { setGlobalLoaded } from 'redux/loading-system/actions';
import { AppState } from 'redux/types';
import { ITodoTaskGetDTO, ITodoTaskPutDTO, ITodoTaskPostDTO } from 'types/ITodoTaskDTO';
import { numberToColorHsl } from 'helpers/numberToColor';
import ModalBlock from 'components/Shared/ModalBlock';
import Selector from 'components/Form/Selector';

enum renderOptions {
    ARCHIVED,
    DAY,
    WEEK,
    MONTH,
    YEAR
}

export default function Index() {

    const [isSelectorOpen, setSelectorOpen] = useState(true)

    const [sortingReversed, setSortingReversed] = useState(false)
    const [renderMode, setRenderMode] = useState(renderOptions.DAY)

    const [createModel, setCreateModel] = useState(null as ITodoTaskPostDTO | null)
    const [editModel, setEditModel] = useState({} as ITodoTaskPutDTO)

    const tasks = useSelector((state: AppState) => state.todoTasks.tasks)
    const categories = useSelector((state: AppState) => state.todoCategories.categories)
    const priorities = useSelector((state: AppState) => state.todoPriorities.priorities)

    const isCreating = useSelector((state: AppState) => state.todoCategories.categoryCreatingMode)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks())
    }, [])

    useEffect(() => {
        dispatch(setGlobalLoaded(true));
        return () => { dispatch(setGlobalLoaded(false)) };
    }, [])

    const onAdd = () => {
        if (isCreating) {
            return
        }

        setCreateModel({ todoTaskName: "", todoTaskSort: 0, todoCategoryId: -1, todoPriorityId: -1 } as ITodoTaskPostDTO)
        dispatch(setTasksCreating(true))
    }

    const onAddConfirm = () => {
        dispatch(createTask(createModel!))
    }

    const onAddReject = () => {
        dispatch(setTasksCreating(false))
    }

    const onEdit = (item: ITodoTaskGetDTO) => {
        dispatch(selectTask(item))

        setEditModel({ ...item })
    }

    const onEditConfirm = () => {
        dispatch(editTask(editModel!))
    }

    const onEditReject = () => {
        dispatch(unselectTask())
    }

    const onDelete = (item: ITodoTaskGetDTO) => {
        dispatch(deleteTask(item))
    }

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
                    {Object.values(tasks)
                        .map((item: ITodoTaskGetDTO) => (
                            <div key={item.id} className="task-container">
                                <div className="task-body">
                                    <div className="task-headers">
                                        <span style={{
                                            background: numberToColorHsl(categories[item.todoCategoryId]?.todoCategorySort ?? 0, 0, 100)
                                        }}>
                                            {categories[item.todoCategoryId]?.todoCategoryName ?? ""}
                                        </span>
                                        <span style={{
                                            background: "gray", fontWeight: "bold",
                                            color: numberToColorHsl(priorities[item.todoPriorityId]?.todoPrioritySort ?? 0, 0, 100)
                                        }}>
                                            {priorities[item.todoPriorityId]?.todoPriorityName ?? ""}
                                        </span>
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
                    <button className="btn btn-primary ml-1 mr-1" onClick={() => setSelectorOpen(true)}>
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

            {isSelectorOpen &&
                <ModalBlock closeCallBack={() => setSelectorOpen(false)}>
                    <Selector
                        closeCallBack={() => setSelectorOpen(false)}
                        selectData={[
                            {
                                sectionName: "Categories",
                                data: [{ name: "test", selected: true }]
                            },
                            {
                                sectionName: "Priorities",
                                data: [{ name: "test", selected: false }]
                            },
                            {
                                sectionName: "Other",
                                data: [{ name: "test", selected: false }]
                            }
                        ]}
                    />
                </ModalBlock>
            }

            {render()}
        </>
    )
}