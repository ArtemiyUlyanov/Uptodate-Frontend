import { User } from '@/models/user';
import { createSlice } from '@reduxjs/toolkit';

export type AuthSliceType = {
    user: User | null
    token: string | null
    isAuthenticated: boolean
}

const initialState: AuthSliceType = {
    user: null,
    token: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;