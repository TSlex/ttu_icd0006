import React, { useState, useEffect } from 'react';
import Errors from 'components/Shared/Errors';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, setTasksCreating, createTask, selectTask, editTask, unselectTask, deleteTask, setArchived, setCompleted } from 'redux/todo-tasks/actions';
import { setGlobalLoaded } from 'redux/loading-system/actions';
import { AppState } from 'redux/types';
import { ITodoTaskGetDTO, ITodoTaskPutDTO, ITodoTaskPostDTO } from 'types/ITodoTaskDTO';
import { numberToColorHsl } from 'helpers/numberToColor';
import ModalBlock from 'components/Shared/ModalBlock';
import Selector from 'components/Form/Selector';
import { FormInput, FormInputTypes } from 'components/Form/FormInput';
import moment from 'moment';

enum renderOptions {
    ARCHIVED,
    DAY,
    WEEK,
    MONTH,
    YEAR
}

export default function Index() {

    const [isSelectorOpen, setSelectorOpen] = useState(false)

    const [sortingReversed, setSortingReversed] = useState(false)
    const [renderMode, setRenderMode] = useState(renderOptions.DAY)

    const [createModel, setCreateModel] = useState(null as ITodoTaskPostDTO | null)
    const [createModelDue, setCreateModelDue] = useState(null as Date | null)

    const [editModel, setEditModel] = useState({} as ITodoTaskPutDTO)
    const [editModelDue, setEditModelDue] = useState(null as Date | null)

    const tasks = useSelector((state: AppState) => state.todoTasks.tasks)
    const categories = useSelector((state: AppState) => state.todoCategories.categories)
    const priorities = useSelector((state: AppState) => state.todoPriorities.priorities)

    const isCreating = useSelector((state: AppState) => state.todoTasks.taskCreatingMode)
    const sTask = useSelector((state: AppState) => state.todoTasks.selectedTask)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks())
    }, [])

    useEffect(() => {
        dispatch(setGlobalLoaded(true));
        return () => {
            dispatch(setGlobalLoaded(false));
            dispatch(setTasksCreating(false));
            dispatch(unselectTask())
        };
    }, [])

    const onAdd = () => {
        if (isCreating) {
            return
        }

        setCreateModel({ todoTaskName: "", todoCategoryId: -1, todoPriorityId: -1, dueDT: null } as ITodoTaskPostDTO)
        setCreateModelDue(null)
        dispatch(setTasksCreating(true))
    }

    const onAddConfirm = () => {
        let model = { ...createModel!, dueDT: createModelDue } as ITodoTaskPostDTO
        dispatch(createTask(model))
    }

    const onAddReject = () => {
        dispatch(setTasksCreating(false))
    }

    const onEdit = (item: ITodoTaskGetDTO) => {
        dispatch(selectTask(item))

        setEditModel({ ...item })
    }

    const onEditConfirm = () => {
        let model = { ...editModel!, dueDT: editModelDue } as ITodoTaskPutDTO
        dispatch(editTask(model))
    }

    const onEditReject = () => {
        dispatch(unselectTask())
    }

    const onSetArchived = (item: ITodoTaskGetDTO) => {
        dispatch(setArchived(item))
    }

    const onSetCompleted = (item: ITodoTaskGetDTO) => {
        dispatch(setCompleted(item))
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

    const renderTask = (task: ITodoTaskGetDTO) => {
        return (
            <>
                {task.id === sTask?.id
                    && renderEditModel()
                    || (
                        <div key={task.id} className="task-container">
                            <div className="task-body">
                                <div className="task-headers">
                                    <span style={{
                                        background: numberToColorHsl(categories[task.todoCategoryId]?.todoCategorySort ?? 0, 0, 100)
                                    }}>
                                        {categories[task.todoCategoryId]?.todoCategoryName ?? ""}
                                    </span>
                                    <span style={{
                                        background: "gray", fontWeight: "bold",
                                        color: numberToColorHsl(priorities[task.todoPriorityId]?.todoPrioritySort ?? 0, 0, 100)
                                    }}>
                                        {priorities[task.todoPriorityId]?.todoPriorityName ?? ""}
                                    </span>
                                </div>
                                <div className="task-content">
                                    <div className="task-name">
                                        <span>{task.todoTaskName}</span>
                                    </div>
                                    {
                                        task.dueDT &&
                                        <div className="task-deadline">
                                            <span>{moment(task.dueDT).format("YYYY-MM-DD, H:mm")}</span>
                                        </div>
                                    }
                                    <span>{task.isArchived ? " archived" : " not archived"}</span>
                                    <span>{task.isCompleted ? " completed" : " not completed  "}</span>
                                </div>
                            </div>
                            <div className="tlist-controls">
                                <button className="btn btn-primary button-round" onClick={() => onEdit(task)}>
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button className="btn btn-danger button-round" onClick={() => onDelete(task)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                                <button className="btn btn-primary button-round" onClick={() => onSetCompleted(task)}>
                                    <i className="fas fa-check-double"></i>
                                </button>
                                <button className="btn btn-danger button-round" onClick={() => onSetArchived(task)}>
                                    <i className="fas fa-archive"></i>
                                </button>
                            </div>
                        </div>
                    )}
            </>
        )
    }

    const renderByDay = () => {
        return (
            <>
                <div className="tlist mt-2">
                    {Object.values(tasks)
                        .map((task: ITodoTaskGetDTO) => <React.Fragment key={task.id}>{renderTask(task)}</React.Fragment>)}
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

    const renderEditModel = () => {
        return (
            <div className="text-center">
                <FormInput
                    inputType={FormInputTypes.Input}
                    data={{
                        type: "text", initialValue: sTask!.todoTaskName, max: 40,
                        label: "Task name"
                    }}

                    bindFunction={(value: string) => { setEditModel({ ...editModel!, todoTaskName: value }) }}
                />
                <FormInput
                    inputType={FormInputTypes.Select}
                    data={{
                        name: "category-id",
                        id: "category-id",
                        initialValue: sTask!.todoCategoryId.toString(),
                        options: Object.values(categories)
                            .sort((item1, item2) => item1.todoCategorySort <= item2.todoCategorySort ? 1 : -1)
                            .map((item) => ({ value: item.id.toString(), displayValue: item.todoCategoryName })),
                        label: "Category"
                    }}

                    bindFunction={(value: string) => { setEditModel({ ...editModel!, todoCategoryId: Number(value) }) }}
                />
                <FormInput
                    inputType={FormInputTypes.Select}
                    data={{
                        name: "priority-id",
                        id: "priority-id",
                        initialValue: sTask!.todoPriorityId.toString(),
                        options: Object.values(priorities)
                            .sort((item1, item2) => item1.todoPrioritySort <= item2.todoPrioritySort ? 1 : -1)
                            .map((item) => ({ value: item.id.toString(), displayValue: item.todoPriorityName })),
                        label: "Priority"
                    }}

                    bindFunction={(value: string) => { setEditModel({ ...editModel!, todoPriorityId: Number(value) }) }}
                />
                <FormInput
                    inputType={FormInputTypes.Datetime}
                    data={{
                        name: "deadline",
                        id: "deadline",
                        label: "Deadline",
                        initialValue: sTask!.dueDT?.toString() ?? ""
                    }}

                    bindFunction={(value: Date) => { setEditModelDue(value) }}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success mr-1" onClick={onEditConfirm}>Confirm</button>
                    <button type="submit" className="btn btn-secondary" onClick={onEditReject}>Cancel</button>
                </div>
            </div>
        )
    }

    const renderCreatingModel = () => {
        if (isCreating) {
            return (
                <div className="text-center">
                    <FormInput
                        inputType={FormInputTypes.Input}
                        data={{
                            type: "text", initialValue: createModel!.todoTaskName, max: 40,
                            label: "Task name"
                        }}

                        bindFunction={(value: string) => { setCreateModel({ ...createModel!, todoTaskName: value }) }}
                    />
                    <FormInput
                        inputType={FormInputTypes.Select}
                        data={{
                            name: "category-id",
                            id: "category-id",
                            initialValue: "",
                            options: Object.values(categories)
                                .sort((item1, item2) => item1.todoCategorySort <= item2.todoCategorySort ? 1 : -1)
                                .map((item) => ({ value: item.id.toString(), displayValue: item.todoCategoryName })),
                            label: "Category"
                        }}

                        bindFunction={(value: string) => { setCreateModel({ ...createModel!, todoCategoryId: Number(value) }) }}
                    />
                    <FormInput
                        inputType={FormInputTypes.Select}
                        data={{
                            name: "priority-id",
                            id: "priority-id",
                            initialValue: "",
                            options: Object.values(priorities)
                                .sort((item1, item2) => item1.todoPrioritySort <= item2.todoPrioritySort ? 1 : -1)
                                .map((item) => ({ value: item.id.toString(), displayValue: item.todoPriorityName })),
                            label: "Priority"
                        }}

                        bindFunction={(value: string) => { setCreateModel({ ...createModel!, todoPriorityId: Number(value) }) }}
                    />
                    <FormInput
                        inputType={FormInputTypes.Datetime}
                        data={{
                            name: "deadline",
                            id: "deadline",
                            label: "Deadline"
                        }}

                        bindFunction={(value: Date) => { setCreateModelDue(value) }}
                    />

                    <div className="form-group">
                        <button type="submit" className="btn btn-success mr-1" onClick={onAddConfirm}>Create</button>
                        <button type="submit" className="btn btn-secondary" onClick={onAddReject}>Cancel</button>
                    </div>
                </div>
            )
        }
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
                    <button className="btn btn-primary ml-1" onClick={onAdd}>
                        <i className="fas fa-plus"></i>
                    </button>
                </span>
                <hr />
                <div className="row align-items-center d-flex flex-column">
                    <div className="col-md-6">
                        <Errors />
                    </div>
                </div>
            </div>

            {/* creating model */}
            {renderCreatingModel()}

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