import { Notification, NotificationAction } from "redux/types";
import { NOTIFICATION_ACTION_TYPES } from "./actions";

export const initialState: Notification = {
    errors: [],
    succMsg: null,
}

export const notification = (
    state: Notification = initialState,
    action: NotificationAction
): Notification => {

    const newState: Notification = {
        errors: state.errors,
        succMsg: state.succMsg,
    }

    switch (action.type) {
        case NOTIFICATION_ACTION_TYPES.CLEAR_NOTIFICATION:
            return { ...newState, errors: [], succMsg: null }
        case NOTIFICATION_ACTION_TYPES.SET_ERRORS:
            return { ...newState, errors: (action as any).errors }
        case NOTIFICATION_ACTION_TYPES.SET_SUCC_MSG:
            return { ...newState, succMsg: (action as any).msg }
        default: return state;
    }
}