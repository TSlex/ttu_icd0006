import React, { useState, useEffect } from 'react';
import Errors from 'components/Shared/Errors';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, setTasksCreating, unselectTask, deleteTask, setArchived } from 'redux/todo-tasks/actions';
import { setGlobalLoaded } from 'redux/loading-system/actions';
import { AppState } from 'redux/types';
import { ITodoTaskGetDTO, ITodoTaskPutDTO, ITodoTaskPostDTO } from 'types/ITodoTaskDTO';
import ModalBlock from 'components/Shared/ModalBlock';
import Selector from 'components/Form/Selector';
import moment from 'moment';
import { TodoTask, TodoTaskModes } from './TodoTask';
import { ITodoCategoryGetDTO } from 'types/ITodoCategoryDTO';
import { ITodoPriorityGetDTO } from 'types/ITodoPriorityDTO';

enum renderOptions {
    ARCHIVED,
    DAY,
    WEEK,
    MONTH,
    YEAR
}

export default function Index() {
    const [isSelectorOpen, setSelectorOpen] = useState(false)
    const [filterOptions, setFilterOptions] = useState(
        [] as { sectionName?: string, data: { name: string, selected: boolean }[], multiChoise?: boolean }[]
    )

    const [isSortingOpen, setSortingOpen] = useState(false)
    const [sortingOptions, setSortingOptions] = useState(
        [
            {
                sectionName: "Sort by",
                data: [
                    { name: "PRIORITY", selected: true },
                    { name: "CATEGORY", selected: false },
                    { name: "DEADLINE", selected: false }
                ]
            },
            {
                sectionName: "Reversed?",
                data: [
                    { name: "YES", selected: false },
                    { name: "NO", selected: true },
                ]
            }
        ] as { sectionName?: string, data: { name: string, selected: boolean }[], multiChoise?: boolean }[]
    )

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
        moment.updateLocale('en', { week: { dow: 1 } })
    }, [])

    useEffect(() => {
        dispatch(getTasks())

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        function watchScroll() {
            window.addEventListener("scroll", onScroll);
        }
        watchScroll();
        return () => {
            window.removeEventListener("scroll", onScroll);
        };

        //eslint-disable-next-line react-hooks/exhaustive-deps
    });

    useEffect(() => {
        setFilterOptions([
            {
                sectionName: "Categories",
                data: Object.values(categories).sort((item1, item2) => item1.todoCategorySort > item2.todoCategorySort ? 1 : -1).map((item) => (
                    { name: item.todoCategoryName, selected: true }
                )),
                multiChoise: true
            },
            {
                sectionName: "Priorities",
                data: Object.values(priorities).sort((item1, item2) => item1.todoPrioritySort > item2.todoPrioritySort ? 1 : -1).map((item) => (
                    { name: item.todoPriorityName, selected: true }
                )),
                multiChoise: true
            },
            {
                sectionName: "Other",
                data: [
                    { name: "EXPIRED", selected: true },
                    { name: "COMPLETED", selected: true },
                    { name: "NOT COMPLETED", selected: true },
                    { name: "NOT EXPIRED", selected: true },
                ],
                multiChoise: true
            }
        ])
    }, [categories, priorities])

    useEffect(() => {
        dispatch(setGlobalLoaded(true));
        return () => {
            dispatch(setGlobalLoaded(false));
            dispatch(setTasksCreating(false));
            dispatch(unselectTask())
        };

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onScroll = () => {
        let button = document.getElementById("toUpButton") as HTMLButtonElement

        if (document.documentElement.scrollTop > 200) {
            button.style.opacity = "1";
            button.style.cursor = "pointer"
        } else {
            button.style.opacity = "0";
            button.style.cursor = "unset"
        }
    }

    const onScrollToUp = () => {
        if (Number((document.getElementById("toUpButton") as HTMLButtonElement)?.style.opacity) < .1) return
        document.documentElement.scrollTop = 0
    }

    const onAdd = () => {
        if (isCreating) {
            return
        }

        setCreateModel({ todoTaskName: "", todoCategoryId: -1, todoPriorityId: -1, dueDT: null } as ITodoTaskPostDTO)
        setCreateModelDue(null)
        dispatch(setTasksCreating(true))
    }

    const onArchiveCompleted = () => {
        Object.values(tasks).forEach((task) => {
            if (task.isCompleted === true && task.isArchived === false) {
                dispatch(setArchived(task))
            }
        })
    }

    const onDeleteArchived = () => {
        Object.values(tasks).forEach((task) => {
            if (task.isArchived === true) {
                dispatch(deleteTask(task))
            }
        })
    }

    const sortTasks = (tasks: ITodoTaskGetDTO[]): ITodoTaskGetDTO[] => {

        const sortSection = sortingOptions.filter(section => section.sectionName?.toLocaleLowerCase() === "sort by")[0]
        const reversedSection = sortingOptions.filter(section => section.sectionName?.toLocaleLowerCase() === "reversed?")[0]

        const categoriesOption = sortSection?.data.filter(option => option.name.toLocaleLowerCase() === "category")[0]
        const deadlineOption = sortSection?.data.filter(option => option.name.toLocaleLowerCase() === "deadline")[0]

        const reversedOption = reversedSection?.data[0]

        return tasks.sort((task_1, task_2) => {
            const category_1 = categories[task_1.todoCategoryId]
            const category_2 = categories[task_2.todoCategoryId]

            const priority_1 = priorities[task_1.todoPriorityId]
            const priority_2 = priorities[task_2.todoPriorityId]

            let result: number

            if (categoriesOption?.selected) {
                result = _sortByCategories(category_1, category_2) * (reversedOption?.selected ? -1 : 1)

                if (result === 0) {
                    result = _sortByPriorities(priority_1, priority_2)

                    if (result === 0) {
                        result = _sortByDeadline(task_1.dueDT, task_2.dueDT)
                    }
                }
            }
            else if ((deadlineOption?.selected)) {
                result = _sortByDeadline(task_1.dueDT, task_2.dueDT) * (reversedOption?.selected ? -1 : 1)

                if (result === 0) {
                    result = _sortByPriorities(priority_1, priority_2)

                    if (result === 0) {
                        result = _sortByCategories(category_1, category_2)
                    }
                }
            }
            else {
                result = _sortByPriorities(priority_1, priority_2) * (reversedOption?.selected ? -1 : 1)

                if (result === 0) {
                    result = _sortByCategories(category_1, category_2)

                    if (result === 0) {
                        result = _sortByDeadline(task_1.dueDT, task_2.dueDT)
                    }
                }
            }

            return result!;
        })
    }

    const _sortByCategories = (category_1: ITodoCategoryGetDTO, category_2: ITodoCategoryGetDTO): 1 | 0 | -1 => {
        if (category_1.todoCategorySort > category_2.todoCategorySort) {
            return -1
        } else if (category_1.todoCategorySort < category_2.todoCategorySort) {
            return 1
        } else {
            return 0
        }
    }

    const _sortByPriorities = (priority_1: ITodoPriorityGetDTO, priority_2: ITodoPriorityGetDTO): 1 | 0 | -1 => {
        if (priority_1.todoPrioritySort > priority_2.todoPrioritySort) {
            return -1
        } else if (priority_1.todoPrioritySort < priority_2.todoPrioritySort) {
            return 1
        } else {
            return 0
        }
    }

    const _sortByDeadline = (time1: Date | null, time2: Date | null): 1 | 0 | -1 => {
        if (time1 === null) {
            time1 = new Date("01.01.3999")
        }
        if (time2 === null) {
            time2 = new Date("01.01.3999")
        }

        if (moment(time1) < moment(time2)) {
            return -1
        } else if (moment(time1) > moment(time2)) {
            return 1
        } else {
            return 0
        }
    }

    const filterTask = (task: ITodoTaskGetDTO): boolean => {

        const categoriesSection = filterOptions.filter(section => section.sectionName?.toLocaleLowerCase() === "categories")[0]
        const prioritiesSection = filterOptions.filter(section => section.sectionName?.toLocaleLowerCase() === "priorities")[0]
        const otherSection = filterOptions.filter(section => section.sectionName?.toLocaleLowerCase() === "other")[0]

        if (otherSection) {
            const expiredOption = otherSection.data.filter(option => option.name.toLocaleLowerCase() === "expired")[0]
            const notExpiredOption = otherSection.data.filter(option => option.name.toLocaleLowerCase() === "not expired")[0]
            const completedOption = otherSection.data.filter(option => option.name.toLocaleLowerCase() === "completed")[0]
            const notCompletedOption = otherSection.data.filter(option => option.name.toLocaleLowerCase() === "not completed")[0]

            if (!completedOption.selected && task.isCompleted) return false
            if (!notCompletedOption.selected && !task.isCompleted) return false

            if (!expiredOption.selected && moment(task.dueDT) < moment()) return false
            if (!notExpiredOption.selected && moment(task.dueDT) >= moment()) return false
        }

        if (categoriesSection) {
            const categoryName = categories[task.todoCategoryId].todoCategoryName
            const categoryOption = categoriesSection.data.filter(option => option.name.toLocaleLowerCase() === categoryName.toLocaleLowerCase())[0]

            if (!categoryOption?.selected) return false
        }

        if (prioritiesSection) {
            const priorityName = priorities[task.todoPriorityId].todoPriorityName
            const priorityOption = prioritiesSection.data.filter(option => option.name.toLocaleLowerCase() === priorityName.toLocaleLowerCase())[0]

            if (!priorityOption?.selected) return false
        }

        return (renderMode === renderOptions.ARCHIVED) === task.isArchived
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
                            <h3 className='task-section mt'>{key.toLocaleUpperCase()}</h3>
                            {/* <hr /> */}
                            <div className="tlist mt-2">
                                {daySections[key].tasks
                                    .map((task: ITodoTaskGetDTO) => <React.Fragment key={task.id}>{renderTask(task)}</React.Fragment>)}
                            </div>
                            <br />
                            <br />
                            <br />
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

        sortTasks(Object.values(tasks)).filter(filterTask).forEach((item) => {
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

        sortTasks(Object.values(tasks)).filter(filterTask).forEach((item) => {
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

        sortTasks(Object.values(tasks)).filter(filterTask).forEach((item) => {
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

        sortTasks(Object.values(tasks)).filter(filterTask).forEach((item) => {
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
                    {sortTasks(Object.values(tasks).filter(filterTask))
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
                {task.id === sTask?.id ?
                    renderEditModel()
                    :
                    <TodoTask mode={TodoTaskModes.READ} data={{
                        task: task,
                        setEditModel: setEditModel,
                        setEditModelDue: setEditModelDue
                    }} />
                }
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
                    <button className="btn btn-primary ml-1" onClick={() => setSortingOpen(true)}>
                        <i className="fas fa-sort-alpha-down"></i>
                    </button>
                    <button className="btn btn-primary ml-1 mr-1" onClick={() => setSelectorOpen(true)}>
                        <i className="fas fa-filter"></i>
                    </button>
                    |
                    <button className="btn btn-primary ml-1 mr-1" onClick={onAdd}>
                        <i className="fas fa-plus"></i>
                    </button>
                    |
                    {renderMode !== renderOptions.ARCHIVED ?
                        <button className="btn btn-success ml-1" onClick={onArchiveCompleted}>ARCHIVE COMPLETED</button>
                        :
                        <button className="btn btn-danger ml-1" onClick={onDeleteArchived}>DELETE ALL</button>
                    }
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
                    <Selector key={JSON.stringify(filterOptions)}
                        closeCallBack={() => setSelectorOpen(false)}
                        confirmCallBack={(data) => setFilterOptions(data)}
                        selectData={filterOptions}
                    />
                </ModalBlock>
            }

            {isSortingOpen &&
                <ModalBlock closeCallBack={() => setSortingOpen(false)}>
                    <Selector key={JSON.stringify(sortingOptions)}
                        closeCallBack={() => setSortingOpen(false)}
                        confirmCallBack={(data) => setSortingOptions(data)}
                        selectData={sortingOptions}
                    />
                </ModalBlock>
            }

            {render()}

            {/* toUp button */}
            <div style={{ position: "fixed", top: "100px", left: 30 }}>
                <button id="toUpButton" className="btn btn-primary" onClick={onScrollToUp}
                    style={{ transition: "all ease-in .5s", opacity: 0, cursor: "unset" }}>
                    <i className="fas fa-arrow-up"></i>
                </button>
            </div>
        </>
    )
}