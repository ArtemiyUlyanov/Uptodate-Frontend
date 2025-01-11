import { createSlice } from "@reduxjs/toolkit";

export type AuthenticationMenuSliceType = {
    unwrappedLogin: boolean
    unwrappedRegister: boolean
}

const initialState: AuthenticationMenuSliceType = {
    unwrappedLogin: false,
    unwrappedRegister: false
}

const authenticationMenuSlice = createSlice({
    name: 'authentication_menu',
    initialState,
    reducers: {
        setAuthenticationMenu: (state, action) => {
            state.unwrappedLogin = action.payload.unwrappedLogin;
            state.unwrappedRegister = action.payload.unwrappedRegister;
        }
    }
});

export const { setAuthenticationMenu } = authenticationMenuSlice.actions;
export default authenticationMenuSlice.reducer;