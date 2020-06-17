import { Notification, NotificationAction } from "redux/types";
import { NOTIFICATION_ACTION_TYPES } from "./actions";

export const initialState: Notification = {
    errors: [],
    succMsg: null,
}

export const notification = (
    state: Notification = initialState,
    action: NotificationAction
) => {

    const newState: Notification = {
        errors: state.errors,
        succMsg: state.succMsg,
    }

    switch (action.type) {
        case NOTIFICATION_ACTION_TYPES.CLEAR_NOTIFICATION:
        case NOTIFICATION_ACTION_TYPES.SET_ERRORS:
        case NOTIFICATION_ACTION_TYPES.SET_SUCC_MSG:
        default: return state;
    }
}