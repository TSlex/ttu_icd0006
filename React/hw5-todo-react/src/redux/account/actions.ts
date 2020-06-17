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

export const login = (loginModel: ILoginDTO) =>
    async (dispatch: any) => {

        let result = await AccountApi.Login(loginModel);

        if (result.errors?.length > 0) {
            dispatch(setErrors(result.errors))

        } else {
            let action: AccountLoginAction = {
                type: ACCOUNT_ACTION_TYPES.LOGIN,
                jwt: result.data!.token,
            }

            dispatch(action)
            dispatch(setLoading(true))
            dispatch(loadUser())
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

export const setLoading = (payload: boolean): AccountSetLoadingAction => ({
    type: ACCOUNT_ACTION_TYPES.SET_LOADING,
    payload: payload,
});