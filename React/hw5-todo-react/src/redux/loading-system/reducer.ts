import { LoadingSystem, LoadingSystemAction } from "redux/types";
import { LOADING_SYSTEM_ACTION_TYPES } from "./actions";

export const initialState: LoadingSystem = {
    isGlobalLoading: false,
    isGlobalLoaded: false,
    isLocalLoading: false,
    isLocalLoaded: false,
}

export const loadingSystem = (
    state: LoadingSystem = initialState,
    action: LoadingSystemAction
) => {

    const newState: LoadingSystem = {
        isGlobalLoading: state.isGlobalLoading,
        isGlobalLoaded: state.isGlobalLoaded,
        isLocalLoading: state.isLocalLoading,
        isLocalLoaded: state.isLocalLoaded,
    }

    switch (action.type) {
        case LOADING_SYSTEM_ACTION_TYPES.SET_GLOBAL_LOADING:
        case LOADING_SYSTEM_ACTION_TYPES.SET_GLOBAL_LOADED:
        case LOADING_SYSTEM_ACTION_TYPES.SET_LOCAL_LOADING:
        case LOADING_SYSTEM_ACTION_TYPES.SET_LOCAL_LOADED:
        default: return state;
    }
}