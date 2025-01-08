import { createSlice } from "@reduxjs/toolkit";

export type HistorySliceType = {
    history: string[]
}

const initialState: HistorySliceType = {
    history: []
}

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory: (state, action) => {
            state.history = action.payload.history;
        },
        addQuery: (state, action) => {
            state.history = [action.payload.query, ...state.history];
        },
        clearHistory: (state) => {
            state.history = []
        }
    }
});

export const { setHistory, addQuery, clearHistory } = historySlice.actions;
export default historySlice.reducer;