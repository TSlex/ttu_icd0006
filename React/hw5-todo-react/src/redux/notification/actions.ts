import {
    NotificationCrearNotificationsAction,
    NotificationSetErrorsAction,
    NotificationSetSuccMsgAction,
} from 'redux/types';

export enum NOTIFICATION_ACTION_TYPES {
    CLEAR_NOTIFICATION = "NOTIFICATION:CLEAR_NOTIFICATION",
    SET_ERRORS = "NOTIFICATION:SET_ERRORS",
    SET_SUCC_MSG = "NOTIFICATION:SET_SUCC_MSG",
}

export const crearNotifications = (): NotificationCrearNotificationsAction => ({
    type: NOTIFICATION_ACTION_TYPES.CLEAR_NOTIFICATION,
});

export const setErrors = (): NotificationSetErrorsAction => ({
    type: NOTIFICATION_ACTION_TYPES.SET_ERRORS,
});

export const setSuccMsg = (): NotificationSetSuccMsgAction => ({
    type: NOTIFICATION_ACTION_TYPES.SET_SUCC_MSG,
});