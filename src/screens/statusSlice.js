import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    awaitingResponse: false,
}

export const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        startWaiting: (state) => {
            state.awaitingResponse = true
        },
        stopWaiting: (state) => {
            state.awaitingResponse = false
        }
    }
})

export const { startWaiting, stopWaiting } = statusSlice.actions

export default statusSlice.reducer