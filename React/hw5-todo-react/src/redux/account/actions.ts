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

import { setErrors, clearNotifications } from 'redux/notification/actions';
import BrowserHistory from 'router/History';

export const login = (loginModel: ILoginDTO) =>
    async (dispatch: any) => {

        dispatch(clearNotifications())
        dispatch(setLocalLoading(true))

        let result = await AccountApi.Login(loginModel);

        if (result.errors?.length > 0) {
            dispatch(setErrors(["Authorisation fails"]));
            dispatch(setLocalLoading(false));

        } else {
            let action: AccountLoginAction = {
                type: ACCOUNT_ACTION_TYPES.LOGIN,
                jwt: result.data!.token,
            }

            dispatch(action);
            dispatch(setLocalLoading(false));

            BrowserHistory.replace("/")

            dispatch(setAccountLoading(true));
            dispatch(loadUser());
        }
    };

export const logout = (): AccountLogoutAction => ({
    type: ACCOUNT_ACTION_TYPES.LOGOUT
});

export const register = (registerModel: IRegisterDTO): AccountRegisterAction => ({
    type: ACCOUNT_ACTION_TYPES.REGISTER
});

export const loadUser = (): AccountRegisterAction => ({
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