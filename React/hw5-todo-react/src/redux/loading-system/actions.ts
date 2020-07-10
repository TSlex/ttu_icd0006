import { LoadingSystemSetRedirectingAction, AppState } from './../types';
import {
    LoadingSystemSetGlobalLoadingAction,
    LoadingSystemSetGlobalLoadedAction,
    LoadingSystemSetLocalLoadingAction,
    LoadingSystemSetLocalLoadedAction
} from 'redux/types';
import { clearNotifications } from 'redux/notification/actions';

export enum LOADING_SYSTEM_ACTION_TYPES {
    SET_GLOBAL_LOADING = "LOADING_SYSTEM:SET_GLOBAL_LOADING",
    SET_GLOBAL_LOADED = "LOADING_SYSTEM:SET_GLOBAL_LOADED",
    SET_LOCAL_LOADING = "LOADING_SYSTEM:SET_LOCAL_LOADING",
    SET_LOCAL_LOADED = "LOADING_SYSTEM:SET_LOCAL_LOADED",
    SET_REDIRECTING = "LOADING_SYSTEM:SET_REDIRECTING",
}

export const setGlobalLoading = (payload: boolean): LoadingSystemSetGlobalLoadingAction => ({
    type: LOADING_SYSTEM_ACTION_TYPES.SET_GLOBAL_LOADING,
    payload: payload,
});

export const setGlobalLoaded = (payload: boolean, clearUp: boolean = true) => (dispatch: any, getState: any) => {

    let state: AppState = getState();

    // console.log(payload)

    if (clearUp === true && payload === false) {
        if (state.notification.errors.length > 0 || state.notification.succMsg) {
            // dispatch(clearNotifications())
        }
    }

    let action: LoadingSystemSetGlobalLoadedAction = {
        type: LOADING_SYSTEM_ACTION_TYPES.SET_GLOBAL_LOADED,
        payload: payload,
    }

    dispatch(action)
};

export const setLocalLoading = (payload: boolean) => (dispatch: any, getState: any) => {

    let state: AppState = getState();

    if (state.loadingSystem.isLocalLoading !== payload) {
        dispatch(setLocalLoadingResult(payload))
    }
}

export const setLocalLoadingResult = (payload: boolean): LoadingSystemSetLocalLoadingAction => ({
    type: LOADING_SYSTEM_ACTION_TYPES.SET_LOCAL_LOADING,
    payload: payload,
});

export const setLoacalLoaded = (payload: boolean): LoadingSystemSetLocalLoadedAction => ({
    type: LOADING_SYSTEM_ACTION_TYPES.SET_LOCAL_LOADED,
    payload: payload,
});

export const setRedirecting = (payload: boolean): LoadingSystemSetRedirectingAction => ({
    type: LOADING_SYSTEM_ACTION_TYPES.SET_REDIRECTING,
    payload: payload,
});