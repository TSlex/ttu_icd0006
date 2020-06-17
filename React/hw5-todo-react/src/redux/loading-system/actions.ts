import {
    LoadingSystemSetGlobalLoadingAction,
    LoadingSystemSetGlobalLoadedAction,
    LoadingSystemSetLocalLoadingAction,
    LoadingSystemSetLocalLoadedAction
} from 'redux/types';

export enum LOADING_SYSTEM_ACTION_TYPES {
    SET_GLOBAL_LOADING = "LOADING_SYSTEM:SET_GLOBAL_LOADING",
    SET_GLOBAL_LOADED = "LOADING_SYSTEM:SET_GLOBAL_LOADED",
    SET_LOCAL_LOADING = "LOADING_SYSTEM:SET_LOCAL_LOADING",
    SET_LOCAL_LOADED = "LOADING_SYSTEM:SET_LOCAL_LOADED",
}

export const setGlobalLoading = (payload: boolean): LoadingSystemSetGlobalLoadingAction => ({
    type: LOADING_SYSTEM_ACTION_TYPES.SET_GLOBAL_LOADING
});

export const setGlobalLoaded = (payload: boolean): LoadingSystemSetGlobalLoadedAction => ({
    type: LOADING_SYSTEM_ACTION_TYPES.SET_GLOBAL_LOADED
});

export const setLocalLoading = (payload: boolean): LoadingSystemSetLocalLoadingAction => ({
    type: LOADING_SYSTEM_ACTION_TYPES.SET_LOCAL_LOADING
});

export const setLoacalLoaded = (payload: boolean): LoadingSystemSetLocalLoadedAction => ({
    type: LOADING_SYSTEM_ACTION_TYPES.SET_LOCAL_LOADED
});