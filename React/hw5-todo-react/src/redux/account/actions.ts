import { AccountLoadUserAction } from './../types';
import { setLocalLoading } from './../loading-system/actions';
import {
    AccountLoginAction,
    AccountLogoutAction,
    AccountRegisterAction,
    AccountSetAuthAction,
    AccountSetLoadingAction,
} from 'redux/types';

import { ACCOUNT_ACTION_TYPES } from './types';

import { ILoginDTO } from 'types/Identity/ILoginDTO';
import { IRegisterDTO } from 'types/Identity/IRegisterDTO';

import AccountApi from 'services/AccountApi';

import { setErrors } from 'redux/notification/actions';
import BrowserHistory from 'router/History';

export const login = (loginModel: ILoginDTO) =>
    async (dispatch: any) => {

        dispatch(setLocalLoading(true))

        let result = await AccountApi.Login(loginModel);

        if (result.errors?.length > 0) {
            dispatch(setErrors(["Authorisation fails."]));

        } else {
            dispatch(loginResult(result.data!.token));

            BrowserHistory.replace("/")

            dispatch(loadUser());
        }

        dispatch(setLocalLoading(false));
    };

const loginResult = (jwt: string): AccountLoginAction => ({
    type: ACCOUNT_ACTION_TYPES.LOGIN,
    jwt: jwt
})

export const register = (registerModel: IRegisterDTO) =>
    async (dispatch: any) => {

        dispatch(setLocalLoading(true))

        let result = await AccountApi.Register(registerModel);

        if (result.errors?.length > 0) {
            dispatch(setErrors(result.errors));

        } else {
            dispatch(registerResult());

            BrowserHistory.replace("/account/login")
        }

        dispatch(setLocalLoading(false));
    };

const registerResult = (): AccountRegisterAction => ({
    type: ACCOUNT_ACTION_TYPES.REGISTER,
})

export const logout = () => (dispatch: any) => {
    dispatch(logoutResult())
};

const logoutResult = (): AccountLogoutAction => ({
    type: ACCOUNT_ACTION_TYPES.LOGOUT
});

export const loadUser = () => (dispatch: any) => {
    dispatch(setAccountLoading(true))
    dispatch(loadUserResult())
};

const loadUserResult = (): AccountLoadUserAction => ({
    type: ACCOUNT_ACTION_TYPES.LOAD_USER
});

export const setAuthenticated = (payload: boolean): AccountSetAuthAction => ({
    type: ACCOUNT_ACTION_TYPES.SET_AUTH,
    payload: payload,
});

export const setAccountLoading = (payload: boolean): AccountSetLoadingAction => ({
    type: ACCOUNT_ACTION_TYPES.SET_LOADING,
    payload: payload,
});