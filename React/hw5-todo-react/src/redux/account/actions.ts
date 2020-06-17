import {
    AccountLoginAction,
    AccountLogoutAction,
    AccountRegisterAction,
    AccountSetAuthAction,
    AccountSetLoadingAction,
} from 'redux/types';

export enum ACCOUNT_ACTION_TYPES {
    LOGIN = "ACCOUNT:LOGIN",
    LOGOUT = "ACCOUNT:LOGOUT",
    REGISTER = "ACCOUNT:REGISTER",
    SET_AUTH = "ACCOUNT:SET_AUTH",
    SET_LOADING = "ACCOUNT:SET_LOADING",
}

export const login = (dispatch: any): AccountLoginAction => ({
    type: ACCOUNT_ACTION_TYPES.LOGIN
});

export const logout = (): AccountLogoutAction => ({
    type: ACCOUNT_ACTION_TYPES.LOGOUT
});

export const register = (): AccountRegisterAction => ({
    type: ACCOUNT_ACTION_TYPES.REGISTER
});

export const setAuthenticated = (payload: boolean): AccountSetAuthAction => ({
    type: ACCOUNT_ACTION_TYPES.SET_AUTH
});

export const setLoading = (payload: boolean): AccountSetLoadingAction => ({
    type: ACCOUNT_ACTION_TYPES.SET_LOADING
});