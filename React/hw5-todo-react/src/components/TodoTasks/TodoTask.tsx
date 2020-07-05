import React from "react";
import { ITodoTaskGetDTO, ITodoTaskPostDTO, ITodoTaskPutDTO } from "types/ITodoTaskDTO";
import { numberToColorHsl } from "helpers/numberToColor";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "redux/types";
import moment from "moment";
import { selectTask, deleteTask, setArchived, setCompleted, createTask, setTasksCreating, editTask, unselectTask } from "redux/todo-tasks/actions";
import { FormInput, FormInputTypes } from "components/Form/FormInput";

interface IProps {
    mode?: TodoTaskModes
    data: ReadData | CreateData | EditData
}

interface ReadData {
    task: ITodoTaskGetDTO,
    setEditModel: React.Dispatch<React.SetStateAction<ITodoTaskPutDTO>>,
    setEditModelDue: React.Dispatch<React.SetStateAction<Date | null>>,
}

interface CreateData {
    createModel: ITodoTaskPostDTO | null,
    createModelDue: Date | null,
    setCreateModel: React.Dispatch<React.SetStateAction<ITodoTaskPostDTO | null>>,
    setCreateModelDue: React.Dispatch<React.SetStateAction<Date | null>>,
}

interface EditData {
    editModel: ITodoTaskPutDTO | null,
    editModelDue: Date | null,
    setEditModel: React.Dispatch<React.SetStateAction<ITodoTaskPutDTO>>,
    setEditModelDue: React.Dispatch<React.SetStateAction<Date | null>>,
}

export enum TodoTaskModes {
    READ,
    CREATE,
    EDIT
}

export function TodoTask(props: IProps) {
    const categories = useSelector((state: AppState) => state.todoCategories.categories)
    const priorities = useSelector((state: AppState) => state.todoPriorities.priorities)

    const selectedTask = useSelector((state: AppState) => state.todoTasks.selectedTask)

    const dispatch = useDispatch()

    const onAddConfirm = () => {
        let model = { ...(props.data as CreateData).createModel!, dueDT: (props.data as CreateData).createModelDue } as ITodoTaskPostDTO
        dispatch(createTask(model))
    }

    const onAddReject = () => {
        dispatch(setTasksCreating(false))
    }

    const onEdit = (task: ITodoTaskGetDTO) => {
        dispatch(selectTask(task));

        (props.data as EditData).setEditModel({ ...task });
        (props.data as EditData).setEditModelDue(task.dueDT);
    }

    const onEditConfirm = () => {
        let model = { ...(props.data as EditData).editModel!, dueDT: (props.data as EditData).editModelDue } as ITodoTaskPutDTO

        dispatch(editTask(model))
    }

    const onEditReject = () => {
        dispatch(unselectTask())
    }

    const onSetArchived = (task: ITodoTaskGetDTO) => {
        dispatch(setArchived(task))
    }

    const onSetCompleted = (task: ITodoTaskGetDTO) => {
        dispatch(setCompleted(task))
    }

    const onDelete = (task: ITodoTaskGetDTO) => {
        dispatch(deleteTask(task))
    }

    switch (props.mode) {
        case TodoTaskModes.CREATE:

            const createModel = (props.data as CreateData).createModel
            const setCreateModel = (props.data as CreateData).setCreateModel
            const setCreateModelDue = (props.data as CreateData).setCreateModelDue

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

        case TodoTaskModes.EDIT:

            const editModel = (props.data as EditData).editModel
            const editModelDue = (props.data as EditData).editModelDue
            const setEditModel = (props.data as EditData).setEditModel
            const setEditModelDue = (props.data as EditData).setEditModelDue

            return (
                <div className="text-center">
                    <FormInput
                        inputType={FormInputTypes.Input}
                        data={{
                            type: "text", initialValue: selectedTask!.todoTaskName, max: 40,
                            label: "Task name"
                        }}

                        bindFunction={(value: string) => { setEditModel({ ...editModel!, todoTaskName: value }) }}
                    />
                    <FormInput
                        inputType={FormInputTypes.Select}
                        data={{
                            name: "category-id",
                            id: "category-id",
                            initialValue: selectedTask!.todoCategoryId.toString(),
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
                            initialValue: selectedTask!.todoPriorityId.toString(),
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
                            initialValue: selectedTask!.dueDT?.toString() ?? ""
                        }}

                        bindFunction={(value: Date) => {

                            console.log(value);
                            console.log(editModelDue);
                            setEditModelDue(new Date(value.toISOString()));
                            console.log(editModelDue);
                        }}
                    />

                    <div className="form-group">
                        <button type="submit" className="btn btn-success mr-1" onClick={onEditConfirm}>Confirm</button>
                        <button type="submit" className="btn btn-secondary" onClick={onEditReject}>Cancel</button>
                    </div>
                </div>
            )

        default:
            const taskRead = (props.data as ReadData).task

            return (
                <div className="task-container">
                    <div className="task-body">
                        <div className="task-headers">
                            <span style={{
                                background: numberToColorHsl(categories[
                                    taskRead.todoCategoryId]?.todoCategorySort ?? 0, 0, 100)
                            }}>
                                {categories[taskRead.todoCategoryId]?.todoCategoryName ?? ""}
                            </span>
                            <span style={{
                                background: "gray", fontWeight: "bold",
                                color: numberToColorHsl(priorities[taskRead.todoPriorityId]?.todoPrioritySort ?? 0, 0, 100)
                            }}>
                                {priorities[taskRead.todoPriorityId]?.todoPriorityName ?? ""}
                            </span>
                        </div>
                        <div className="task-content">
                            <div className="task-name">
                                <span>{taskRead.todoTaskName}</span>
                            </div>
                            {
                                taskRead.dueDT &&
                                <div className="task-deadline">
                                    <span>{moment(taskRead.dueDT).format("YYYY-MM-DD, H:mm")}</span>
                                </div>
                            }
                            <span>{taskRead.isArchived ? " archived" : " not archived"}</span>
                            <span>{taskRead.isCompleted ? " completed" : " not completed  "}</span>
                        </div>
                    </div>
                    <div className="tlist-controls">
                        {!taskRead.isArchived &&
                            <button className="btn btn-primary button-round" onClick={() => onEdit(taskRead)}>
                                <i className="fas fa-pencil-alt"></i>
                            </button>
                        }

                        {!taskRead.isArchived &&
                            <button className="btn btn-primary button-round" onClick={() => onSetCompleted(taskRead)}>
                                <i className="fas fa-check-double"></i>
                            </button>
                        }

                        {taskRead.isArchived ?
                            <button className={"btn btn-primary button-round"}
                                onClick={() => onSetArchived(taskRead)} style={{ position: "relative" }}>
                                <i className="fas fa-sort-up text-primary"
                                    style={{ position: "absolute", transform: "translate(-50%, -20%)", zIndex: 100, fontSize: "1em" }}></i>
                                <i className="fas fa-archive"
                                    style={{ position: "absolute", transform: "translate(-50%, -50%)" }}></i>
                            </button>
                            :
                            <button className={"btn btn-secondary button-round"}
                                onClick={() => onSetArchived(taskRead)} style={{ position: "relative" }}>
                                <i className="fas fa-sort-down text-secondary"
                                    style={{ position: "absolute", transform: "translate(-50%, -60%)", zIndex: 100, fontSize: "1em" }}></i>
                                <i className="fas fa-archive"
                                    style={{ position: "absolute", transform: "translate(-50%, -50%)" }}></i>
                            </button>
                        }

                        {taskRead.isArchived &&
                            <button className="btn btn-danger button-round" onClick={() => onDelete(taskRead)}>
                                <i className="fas fa-trash"></i>
                            </button>
                        }
                    </div>
                </div>
            )
    }
}