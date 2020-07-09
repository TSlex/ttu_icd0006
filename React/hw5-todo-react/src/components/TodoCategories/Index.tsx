import React, { useEffect, useState } from 'react';
import { ITodoCategoryPostDTO, ITodoCategoryPutDTO, ITodoCategoryGetDTO } from 'types/ITodoCategoryDTO';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'redux/types';
import { styled } from '@material-ui/core';
import ReactTooltip from 'react-tooltip';
import { getCategories, setCategoriesCreating, createCategory, selectCategory, editCategory, unselectCategory, deleteCategory } from 'redux/todo-categories/actions';
import { setGlobalLoaded } from 'redux/loading-system/actions';
import { FormInput } from 'components/Form/FormInput';
import { numberToColorHsl } from 'helpers/numberToColor';
import Errors from 'components/Shared/Errors';

export default function Index() {
    const [formValid, setFormValid] = useState({ name: true })
    const [formErrors, setFormErrors] = useState({ name: '' })

    const [createModel, setCreateModel] = useState(null as ITodoCategoryPostDTO | null)
    const [editModel, setEditModel] = useState({} as ITodoCategoryPutDTO)

    const categories = useSelector((state: AppState) => state.todoCategories.categories)
    const sCategory = useSelector((state: AppState) => state.todoCategories.selectedCategory)

    const isCreating = useSelector((state: AppState) => state.todoCategories.categoryCreatingMode)

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
        dispatch(getCategories())
    }, [])

    useEffect(() => {
        dispatch(setGlobalLoaded(true));
        return () => {
            dispatch(setGlobalLoaded(false));
            dispatch(setCategoriesCreating(false));
            dispatch(unselectCategory());
        };
    }, [])

    const onAdd = () => {
        if (isCreating || sCategory) {
            return
        }

        setFormValid({ name: true })
        setFormErrors({ name: "" })

        setCreateModel({ todoCategoryName: "", todoCategorySort: 0 })
        dispatch(setCategoriesCreating(true))
    }

    const onAddConfirm = () => {
        setFormValid({ name: true })
        setFormErrors({ name: "" })

        if (createModel!.todoCategoryName === "") {
            setFormValid({ name: false })
            setFormErrors({ name: "This field is required" })
        } else {
            dispatch(createCategory(createModel!))
        }
    }

    const onAddReject = () => {
        dispatch(setCategoriesCreating(false))
    }

    const onEdit = (item: ITodoCategoryGetDTO) => {
        if (isCreating) {
            dispatch(setCategoriesCreating(false))
        }

        setFormValid({ name: true })
        setFormErrors({ name: "" })

        dispatch(selectCategory(item))

        setEditModel({ ...item })
    }

    const onEditConfirm = () => {
        setFormValid({ name: true })
        setFormErrors({ name: "" })

        if (editModel!.todoCategoryName === "") {
            setFormValid({ name: false })
            setFormErrors({ name: "This field is required" })
        } else {
            dispatch(editCategory(editModel!))
        }
    }

    const onEditReject = () => {
        dispatch(unselectCategory())
    }

    const onDelete = (item: ITodoCategoryGetDTO) => {
        dispatch(deleteCategory(item))
    }

    const renderCreatingModel = () => {
        if (isCreating) {
            return (
                <div className="tlist">
                    <div className="tlist-item">
                        <div className="tlist-content">
                            <div className="tlist-content-name" data-tip data-for="category-name">
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

                                    bindFunction={(value: string) => { setCreateModel({ ...createModel!, todoCategoryName: value }) }}
                                /></div>
                            <div className="tlist-content-value" data-tip data-for="category-value">
                                <FormInput
                                    data={
                                        {
                                            type: "number", initialValue: createModel!.todoCategorySort.toString(),
                                            ignoreClasses: false, wrapInput: false, max: 100, min: 0
                                        }
                                    }

                                    bindFunction={(value: number) => { setCreateModel({ ...createModel!, todoCategorySort: Number(value) }) }}
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

    const renderItem = (item: ITodoCategoryGetDTO) => {
        if (item.id === sCategory?.id) {
            return (
                <div key={item.id} className="tlist-item">
                    <div className="tlist-content">
                        <div className="tlist-content-name" data-tip data-for="category-name">
                            <FormInput
                                data={
                                    {
                                        type: "text", initialValue: item.todoCategoryName,
                                        ignoreClasses: false, wrapInput: false, max: 40,

                                        isValid: formValid.name,
                                        prompt: formErrors.name
                                    }
                                }

                                validationControl={(bool: boolean) => { setFormValid({ name: bool }) }}

                                bindFunction={(value: any) => { setEditModel({ ...editModel!, todoCategoryName: value }) }}
                            /></div>
                        <div className="tlist-content-value" data-tip data-for="category-value">
                            <FormInput
                                data={
                                    {
                                        type: "number", initialValue: item.todoCategorySort.toString(),
                                        ignoreClasses: false, wrapInput: false, max: 100, min: 0
                                    }
                                }

                                bindFunction={(value: number) => { setEditModel({ ...editModel!, todoCategorySort: Number(value) }) }}
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
                            <span>{item.todoCategoryName}</span>
                        </div>
                        <div className="tlist-content-value" style={{ background: numberToColorHsl(item.todoCategorySort, 0, 100) }}>
                            <span>{item.todoCategorySort}</span>
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
            <InfoTooltip id="category-value" type="light" effect="solid">
                <span>Category priority</span>
                <span>0 - 100</span>
                <small>(Lower - Higher)</small>
            </InfoTooltip>

            <InfoTooltip id="category-name" type="light" effect="solid">
                <span>Category name</span>
            </InfoTooltip>

            <div className="text-center">
                <h4>Categories</h4>
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
                {Object.values(categories)
                    .sort((item1, item2) => item1.todoCategorySort <= item2.todoCategorySort ? 1 : -1)
                    .map((item: ITodoCategoryGetDTO) => renderItem(item))}
            </div>
        </>
    )
}
