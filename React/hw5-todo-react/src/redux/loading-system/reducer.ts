import { Account, AccountAction } from "redux/types";
import { ACCOUNT_ACTION_TYPES } from "./actions";

export const initialState: Account = {
    jwt: null,
    username: null,
    expired: -1,

    errors: [],
    succMsg: null,
}

export const account = (
    state: Account = initialState,
    action: AccountAction
) => {

    const newState: Account = {
        jwt: state.jwt,
        username: state.username,
        expired: state.expired,

        errors: state.errors,
        succMsg: state.succMsg,
    }

    switch (action.type) {
        case ACCOUNT_ACTION_TYPES.LOGIN:
        case ACCOUNT_ACTION_TYPES.LOGOUT:
        case ACCOUNT_ACTION_TYPES.REGISTER:
        default: return state;
    }
}