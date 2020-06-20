import { LoadingSystem, LoadingSystemAction } from "redux/types";
import { LOADING_SYSTEM_ACTION_TYPES } from "./actions";

export const initialState: LoadingSystem = {
    isGlobalLoading: false,
    isGlobalLoaded: false,
    isLocalLoading: false,
    isLocalLoaded: false,
    isRedirecting: false,
}

export const loadingSystem = (
    state: LoadingSystem = initialState,
    action: LoadingSystemAction
): LoadingSystem => {

    const newState: LoadingSystem = { ...state }

    switch (action.type) {
        case LOADING_SYSTEM_ACTION_TYPES.SET_GLOBAL_LOADING:
            return { ...newState, isGlobalLoading: (action as any).payload }
        case LOADING_SYSTEM_ACTION_TYPES.SET_GLOBAL_LOADED:
            return { ...newState, isGlobalLoaded: (action as any).payload }
        case LOADING_SYSTEM_ACTION_TYPES.SET_LOCAL_LOADING:
            return { ...newState, isLocalLoading: (action as any).payload }
        case LOADING_SYSTEM_ACTION_TYPES.SET_LOCAL_LOADED:
            return { ...newState, isLocalLoaded: (action as any).payload }
        case LOADING_SYSTEM_ACTION_TYPES.SET_REDIRECTING:
            return { ...newState, isRedirecting: (action as any).payload }
        default: return state;
    }
}