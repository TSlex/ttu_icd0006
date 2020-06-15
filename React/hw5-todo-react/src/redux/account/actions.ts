import {
    AccountLoginAction,
    AccountLogoutAction,
    AccountRegisterAction
} from 'redux/types';

export enum AccountActions {
    Login = "Account:Login",
    Logout = "Account:Logout",
    Register = "Account:Register",
}

export const login = (): AccountLoginAction => ({
    type: AccountActions.Login
});

export const logout = (): AccountLogoutAction => ({
    type: AccountActions.Logout
});

export const register = (): AccountRegisterAction => ({
    type: AccountActions.Register
});