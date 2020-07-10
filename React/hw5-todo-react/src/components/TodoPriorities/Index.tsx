import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPriorities, selectPriority, unselectPriority, deletePriority, editPriority, createPriority, setPrioritiesCreating } from 'redux/todo-priorities/actions';
import { AppState } from 'redux/types';
import { ITodoPriorityGetDTO, ITodoPriorityPostDTO, ITodoPriorityPutDTO } from 'types/ITodoPriorityDTO';
import { setGlobalLoaded } from 'redux/loading-system/actions';
import { FormInput } from 'components/Form/FormInput';
import { styled } from '@material-ui/core/styles';
import ReactTooltip from 'react-tooltip';
import Errors from 'components/Shared/Errors';
import { numberToColorHsl } from 'helpers/numberToColor';

export default function Index() {
    const [formValid, setFormValid] = useState({ name: true })
    const [formErrors, setFormErrors] = useState({ name: '' })

    const [createModel, setCreateModel] = useState(null as ITodoPriorityPostDTO | null)
    const [editModel, setEditModel] = useState({} as ITodoPriorityPutDTO)

    const priorities = useSelector((state: AppState) => state.todoPriorities.priorities)
    const sPriority = useSelector((state: AppState) => state.todoPriorities.selectedPriority)

    const isCreating = useSelector((state: AppState) => state.todoPriorities.priorityCreatingMode)

    const dispatch = useDispatch()

    const InfoTooltip = styled(ReactTooltip)({
        fontFamily: 'Roboto',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        alignItems: 'center',
        marginTop: '-5px !important',
        boxShadow: '0 0 10px lightgray',
        opacity: '1 !important',
        '& span': {
            fontWeight: 'bold'
        }
    })

    useEffect(() => {
        dispatch(getPriorities())

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        dispatch(setGlobalLoaded(true));
        return () => {
            dispatch(setGlobalLoaded(false));
            dispatch(setPrioritiesCreating(false));
            dispatch(unselectPriority());
        };

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onAdd = () => {
        if (isCreating || sPriority) {
            return
        }

        setFormValid({ name: true })
        setFormErrors({ name: "" })

        setCreateModel({ todoPriorityName: "", todoPrioritySort: 0 })
        dispatch(setPrioritiesCreating(true))
    }

    const onAddConfirm = () => {
        setFormValid({ name: true })
        setFormErrors({ name: "" })

        if (createModel!.todoPriorityName === "") {
            setFormValid({ name: false })
            setFormErrors({ name: "This field is required" })
        } else {
            dispatch(createPriority(createModel!))
        }
    }

    const onAddReject = () => {
        dispatch(setPrioritiesCreating(false))
    }

    const onEdit = (item: ITodoPriorityGetDTO) => {
        if (isCreating) {
            dispatch(setPrioritiesCreating(false))
        }

        setFormValid({ name: true })
        setFormErrors({ name: "" })

        dispatch(selectPriority(item))

        setEditModel({ ...item })
    }

    const onEditConfirm = () => {
        setFormValid({ name: true })
        setFormErrors({ name: "" })

        if (editModel!.todoPriorityName === "") {
            setFormValid({ name: false })
            setFormErrors({ name: "This field is required" })
        } else {
            dispatch(editPriority(editModel!))
        }
    }

    const onEditReject = () => {
        dispatch(unselectPriority())
    }

    const onDelete = (item: ITodoPriorityGetDTO) => {
        dispatch(deletePriority(item))
    }

    const renderCreatingModel = () => {
        if (isCreating) {
            return (
                <div className="tlist">
                    <div className="tlist-item">
                        <div className="tlist-content">
                            <div className="tlist-content-name" data-tip data-for="priority-name">
                                <FormInput
                                    data={
                                        {
                                            type: "text", initialValue: "",
                                            ignoreClasses: false, wrapInput: false, max: 40,

                                            isValid: formValid.name,
                                            prompt: formErrors.name
                                        }
                                    }

                                    validationControl={(bool: boolean) => { setFormValid({ name: bool }) }}

                                    bindFunction={(value: string) => { setCreateModel({ ...createModel!, todoPriorityName: value }) }}
                                /></div>
                            <div className="tlist-content-value" data-tip data-for="priority-value">
                                <FormInput
                                    data={
                                        {
                                            type: "number", initialValue: createModel!.todoPrioritySort.toString(),
                                            ignoreClasses: false, wrapInput: false, max: 100, min: 0
                                        }
                                    }

                                    bindFunction={(value: number) => { setCreateModel({ ...createModel!, todoPrioritySort: Number(value) }) }}
                                />
                            </div>
                        </div>
                        <div className="tlist-controls">
                            <button className="btn btn-success button-round" onClick={onAddConfirm}><span className="fas fa-check" /></button>
                            <button className="btn btn-secondary button-round" onClick={onAddReject}><span className="fas fa-times" /></button>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="text-center">
                    <button className="btn btn-success button-round" onClick={onAdd}><span className="fas fa-plus" /></button>
                </div>
            )
        }
    }

    const renderItem = (item: ITodoPriorityGetDTO) => {
        if (item.id === sPriority?.id) {
            return (
                <div key={item.id} className="tlist-item">
                    <div className="tlist-content">
                        <div className="tlist-content-name" data-tip data-for="priority-name">
                            <FormInput
                                data={
                                    {
                                        type: "text", initialValue: item.todoPriorityName,
                                        ignoreClasses: false, wrapInput: false, max: 40,

                                        isValid: formValid.name,
                                        prompt: formErrors.name
                                    }
                                }

                                validationControl={(bool: boolean) => { setFormValid({ name: bool }) }}

                                bindFunction={(value: any) => { setEditModel({ ...editModel!, todoPriorityName: value }) }}
                            /></div>
                        <div className="tlist-content-value" data-tip data-for="priority-value">
                            <FormInput
                                data={
                                    {
                                        type: "number", initialValue: item.todoPrioritySort.toString(),
                                        ignoreClasses: false, wrapInput: false, max: 100, min: 0
                                    }
                                }

                                bindFunction={(value: number) => { setEditModel({ ...editModel!, todoPrioritySort: Number(value) }) }}
                            /></div>
                    </div>
                    <div className="tlist-controls">
                        <button className="btn btn-primary button-round" onClick={onEditConfirm}><span className="fas fa-check" /></button>
                        <button className="btn btn-danger button-round" onClick={onEditReject}><span className="fas fa-times" /></button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div key={item.id} className="tlist-item">
                    <div className="tlist-content">
                        <div className="tlist-content-name">
                            <span>{item.todoPriorityName}</span>
                        </div>
                        <div className="tlist-content-value" style={{ background: numberToColorHsl(item.todoPrioritySort, 0, 100) }}>
                            <span>{item.todoPrioritySort}</span>
                        </div>
                    </div>
                    <div className="tlist-controls">
                        <button className="btn btn-primary button-round" onClick={() => onEdit(item)}><span className="fas fa-pencil-alt" /></button>
                        <button className="btn btn-danger button-round" onClick={() => onDelete(item)}><span className="fas fa-trash" /></button>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            {/* tooltips */}
            <InfoTooltip id="priority-value" type="light" effect="solid">
                <span>Priority value</span>
                <span>0 - 100</span>
                <small>(Lower - Higher)</small>
            </InfoTooltip>

            <InfoTooltip id="priority-name" type="light" effect="solid">
                <span>Priority name</span>
            </InfoTooltip>

            <div className="text-center">
                <h4>Priorities</h4>
                <hr />
                <div className="row align-items-center d-flex flex-column">
                    <div className="col-md-6">
                        <Errors />
                    </div>
                </div>
            </div>

            {/* creating model */}
            {renderCreatingModel()}

            <div className="tlist mt-2">
                {Object.values(priorities)
                    .sort((item1, item2) => item1.todoPrioritySort <= item2.todoPrioritySort ? 1 : -1)
                    .map((item: ITodoPriorityGetDTO) => renderItem(item))}
            </div>
        </>
    )
}