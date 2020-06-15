import { Account, AccountAction } from "redux/types";
import { AccountActions } from "./actions";

export const initialState: Account = {
    jwt: null,
    username: null,
    expired: -1
}

export const account = (
    state: Account = initialState,
    action: AccountAction
) => {

    const newState: Account = {
        jwt: state.jwt,
        username: state.username,
        expired: state.expired
    }

    switch (action.type) {
        case AccountActions.Login:
        case AccountActions.Logout:
        case AccountActions.Register:
        default: return state;
    }
}