import { Account, AccountAction } from "redux/types";
import { ACCOUNT_ACTION_TYPES } from "./types";

import JwtDecode from "jwt-decode";

export const initialState: Account = {
    jwt: null,
    username: null,
    expired: -1,
    isAuthenticated: false,
    isLoading: true
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

    let jwt: string | null = null;

    switch (action.type) {
        case ACCOUNT_ACTION_TYPES.LOGIN:
            jwt = (action as any).jwt

            if (jwt) {
                localStorage.setItem('token', jwt)
            }
            else {
                localStorage.removeItem('token')
            }

            return { ...newState, ...{ jwt: jwt } }

        case ACCOUNT_ACTION_TYPES.LOGOUT:
            return logout()

        case ACCOUNT_ACTION_TYPES.REGISTER:
        case ACCOUNT_ACTION_TYPES.LOAD_USER:
            jwt = newState.jwt;

            if (jwt === null) {
                jwt = localStorage.getItem('token')
            }

            if (jwt !== null) {

                const decoded = JwtDecode(jwt) as Record<string, string>;

                const expired = parseInt(decoded.exp)

                if (Date.now() >= expired * 1000) {
                    return logout()
                } else {
                    return {
                        ...newState, ...{
                            jwt: jwt,
                            username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                            expired: expired,
                            isAuthenticated: true,
                            isLoading: false
                        }
                    }
                }
            } else {
                return { ...newState, isLoading: false };
            }

        case ACCOUNT_ACTION_TYPES.SET_LOADING:
            return { ...newState, ...{ isLoading: (action as any).payload } }

        case ACCOUNT_ACTION_TYPES.SET_AUTH:
            return { ...newState, ...{ isAuthenticated: (action as any).payload } }

        default: return state;
    }
}

const logout = (): Account => {
    localStorage.removeItem('token')
    return { ...initialState, isLoading: false };
}