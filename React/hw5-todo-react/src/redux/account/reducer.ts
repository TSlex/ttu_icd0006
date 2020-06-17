import { Account, AccountAction } from "redux/types";
import { ACCOUNT_ACTION_TYPES } from "./actions";

export const initialState: Account = {
    jwt: null,
    username: null,
    expired: -1,
    isAuthenticated: false,
    isLoading: false
}

export const account = (
    state: Account = initialState,
    action: AccountAction
) => {

    const newState: Account = {
        jwt: state.jwt,
        username: state.username,
        expired: state.expired,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
    }

    switch (action.type) {
        case ACCOUNT_ACTION_TYPES.LOGIN:
        case ACCOUNT_ACTION_TYPES.LOGOUT:
        case ACCOUNT_ACTION_TYPES.REGISTER:
        default: return state;
    }
}