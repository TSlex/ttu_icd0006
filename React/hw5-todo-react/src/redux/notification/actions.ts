import {
    AccountLoginAction,
    AccountLogoutAction,
    AccountRegisterAction,
    NotificationCrearNotificationsAction,
    NotificationSetErrorsAction,
    NotificationSetSuccMsgAction,
} from 'redux/types';

export enum ACCOUNT_ACTION_TYPES {
    LOGIN = "ACCOUNT:LOGIN",
    LOGOUT = "ACCOUNT:LOGOUT",
    REGISTER = "ACCOUNT:REGISTER",

    CLEAR_NOTIFICATION = "ACCOUNT:CLEAR_NOTIFICATION",
    SET_ERRORS = "ACCOUNT:SET_ERRORS",
    SET_SUCC_MSG = "ACCOUNT:SET_SUCC_MSG",
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

// Notifications

export const crearNotifications = (): NotificationCrearNotificationsAction => ({
    type: ACCOUNT_ACTION_TYPES.CLEAR_NOTIFICATION,
});

export const setErrors = (): NotificationSetErrorsAction => ({
    type: ACCOUNT_ACTION_TYPES.SET_ERRORS,
});

export const setSuccMsg = (): NotificationSetSuccMsgAction => ({
    type: ACCOUNT_ACTION_TYPES.SET_SUCC_MSG,
});