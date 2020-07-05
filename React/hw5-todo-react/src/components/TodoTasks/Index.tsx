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
import { TodoTask, TodoTaskModes } from './TodoTask';

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

    const isCreating = useSelector((state: AppState) => state.todoTasks.taskCreatingMode)
    const sTask = useSelector((state: AppState) => state.todoTasks.selectedTask)

    const categories = useSelector((state: AppState) => state.todoCategories.categories)
    const priorities = useSelector((state: AppState) => state.todoPriorities.priorities)

    const dispatch = useDispatch()

    useEffect(() => {
        moment.locale('en', { week: { dow: 1 } });
    }, [])

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

    const sortTasks = (tasks: ITodoTaskGetDTO[]): ITodoTaskGetDTO[] => {

        return tasks.sort((task_1, task_2) => {
            const category_1 = categories[task_1.todoCategoryId]
            const category_2 = categories[task_2.todoCategoryId]

            const priority_1 = priorities[task_1.todoPriorityId]
            const priority_2 = priorities[task_2.todoPriorityId]

            if (priority_1.todoPrioritySort > priority_2.todoPrioritySort) {
                return -1
            } else if (priority_1.todoPrioritySort < priority_2.todoPrioritySort) {
                return 1
            } else {
                if (category_1.todoCategorySort > category_2.todoCategorySort) {
                    return -1
                } else if (category_1.todoCategorySort < category_2.todoCategorySort) {
                    return 1
                } else {
                    return 0
                }
            }
        })
    }

    const render = () => {
        if (Object.values(priorities).length === 0 || Object.values(categories).length === 0) return

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

    const renderSection = (daySections: Record<string, { sort: number, tasks: ITodoTaskGetDTO[] }>) => {

        return (
            <>
                {Object.keys(daySections)
                    .sort((key1, key2) => daySections[key1].sort > daySections[key2].sort ? 1 : -1)
                    .map((key: keyof typeof daySections) => (
                        <React.Fragment key={key}>
                            <h3>{key.toLocaleUpperCase()}</h3>
                            <div className="tlist mt-2">
                                {daySections[key].tasks
                                    .map((task: ITodoTaskGetDTO) => <React.Fragment key={task.id}>{renderTask(task)}</React.Fragment>)}
                            </div>
                        </React.Fragment>
                    ))}
            </>
        )
    }

    const renderByDay = () => {
        let daySections: Record<string, { sort: number, tasks: ITodoTaskGetDTO[] }> = {}
        let now = moment()
        let nowRounded = moment().startOf("day")

        let sectionName = "";
        let sort = -1;

        let diffDays = 0;

        sortTasks(Object.values(tasks)).filter((tasks) => !tasks.isArchived).forEach((item) => {
            sectionName = ""
            sort = -1;

            diffDays = moment(item.dueDT).startOf("days").diff(nowRounded, 'days')

            if (item.dueDT === null || item.dueDT === undefined) {
                sort = 1
                sectionName = "no deadline"
            }
            else if (moment(item.dueDT).diff(now, 'milliseconds') < 0) {
                sort = 0
                sectionName = "expired"
            }
            else if (diffDays === 0) {
                sort = 10
                sectionName = "today"
            }
            else if (diffDays === 1) {
                sort = 11
                sectionName = "tomorrow"
            }
            else if (diffDays === 2) {
                sort = 12
                sectionName = "after tomorrow"
            }
            else {
                sort = Number("13" + moment(item.dueDT).format("YYYYMMDD"))
                sectionName = moment(item.dueDT).format("LL")
            }

            daySections[sectionName] = {
                sort: daySections[sectionName]?.sort ?? sort,
                tasks: [...daySections[sectionName]?.tasks ?? [], item]
            };
        })

        return renderSection(daySections)
    }

    const renderByWeek = () => {
        let daySections: Record<string, { sort: number, tasks: ITodoTaskGetDTO[] }> = {}
        let now = moment()
        let nowRounded = moment().startOf("week")

        let sectionName = "";
        let sort = -1;

        let diffDays = 0;

        sortTasks(Object.values(tasks)).filter((tasks) => !tasks.isArchived).forEach((item) => {
            sectionName = ""
            sort = -1;

            diffDays = moment(item.dueDT).startOf("week").diff(nowRounded, 'weeks')

            if (item.dueDT === null || item.dueDT === undefined) {
                sort = 1
                sectionName = "no deadline"
            }
            else if (moment(item.dueDT).diff(now, 'milliseconds') < 0) {
                sort = 0
                sectionName = "expired"
            }
            else if (diffDays === 0) {
                sort = 10
                sectionName = "this week"
            }
            else if (diffDays === 1) {
                sort = 11
                sectionName = "next week"
            }
            else {
                sort = Number("13" + moment(item.dueDT).format("YYYYMMDD"))

                sectionName = (
                    "[" +
                    moment(item.dueDT).format("ww") +
                    "] " +
                    moment(item.dueDT).startOf("weeks").format("LL") +
                    " - " +
                    moment(item.dueDT).endOf("weeks").format("LL")
                )
            }

            daySections[sectionName] = {
                sort: daySections[sectionName]?.sort ?? sort,
                tasks: [...daySections[sectionName]?.tasks ?? [], item]
            };
        })

        return renderSection(daySections)
    }

    const renderByMonth = () => {
        let daySections: Record<string, { sort: number, tasks: ITodoTaskGetDTO[] }> = {}
        let now = moment()
        let nowRounded = moment().startOf("month")

        let sectionName = "";
        let sort = -1;

        let diffDays = 0;

        sortTasks(Object.values(tasks)).filter((tasks) => !tasks.isArchived).forEach((item) => {
            sectionName = ""
            sort = -1;

            diffDays = moment(item.dueDT).startOf("month").diff(nowRounded, 'month')

            if (item.dueDT === null || item.dueDT === undefined) {
                sort = 1
                sectionName = "no deadline"
            }
            else if (moment(item.dueDT).diff(now, 'milliseconds') < 0) {
                sort = 0
                sectionName = "expired"
            }
            else if (diffDays === 0) {
                sort = 10
                sectionName = "this month"
            }
            else if (diffDays === 1) {
                sort = 11
                sectionName = "next month"
            }
            else {
                sort = Number("13" + moment(item.dueDT).format("YYYYMMDD"))

                sectionName = moment(item.dueDT).format("MMMM, YYYY")

            }

            daySections[sectionName] = {
                sort: daySections[sectionName]?.sort ?? sort,
                tasks: [...daySections[sectionName]?.tasks ?? [], item]
            };
        })

        return renderSection(daySections)
    }

    const renderByYear = () => {
        let daySections: Record<string, { sort: number, tasks: ITodoTaskGetDTO[] }> = {}
        let now = moment()
        let nowRounded = moment().startOf("year")

        let sectionName = "";
        let sort = -1;

        let diffDays = 0;

        sortTasks(Object.values(tasks)).filter((tasks) => !tasks.isArchived).forEach((item) => {
            sectionName = ""
            sort = -1;

            diffDays = moment(item.dueDT).startOf("year").diff(nowRounded, 'year')

            if (item.dueDT === null || item.dueDT === undefined) {
                sort = 1
                sectionName = "no deadline"
            }
            else if (moment(item.dueDT).diff(now, 'milliseconds') < 0) {
                sort = 0
                sectionName = "expired"
            }
            else if (diffDays === 0) {
                sort = 10
                sectionName = "this year"
            }
            else if (diffDays === 1) {
                sort = 11
                sectionName = "next year"
            }
            else {
                sort = Number("13" + moment(item.dueDT).format("YYYYMMDD"))

                sectionName = moment(item.dueDT).format("YYYY")
            }

            daySections[sectionName] = {
                sort: daySections[sectionName]?.sort ?? sort,
                tasks: [...daySections[sectionName]?.tasks ?? [], item]
            };
        })

        return renderSection(daySections)
    }

    const renderArchived = () => {
        return (
            <>
                <div className="tlist mt-2">
                    {sortTasks(Object.values(tasks))
                        .filter((tasks) => tasks.isArchived)
                        .map((task) => (
                            <React.Fragment key={task.id}>
                                {renderTask(task)}
                            </React.Fragment>
                        ))}
                </div>
            </>
        )
    }

    const renderTask = (task: ITodoTaskGetDTO) => {
        return (
            <>
                {task.id === sTask?.id
                    && renderEditModel()
                    || (
                        <TodoTask mode={TodoTaskModes.READ} data={{
                            task: task,
                            setEditModel: setEditModel,
                            setEditModelDue: setEditModelDue
                        }} />
                    )}
            </>
        )
    }

    const renderEditModel = () => {
        return <TodoTask mode={TodoTaskModes.EDIT} data={{
            editModel: editModel,
            editModelDue: editModelDue,
            setEditModel: setEditModel,
            setEditModelDue: setEditModelDue
        }} />
    }

    const renderCreatingModel = () => {
        if (isCreating) {
            return <TodoTask mode={TodoTaskModes.CREATE} data={{
                createModel: createModel,
                createModelDue: createModelDue,
                setCreateModel: setCreateModel,
                setCreateModelDue: setCreateModelDue
            }} />
        }
    }

    return (
        <>
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