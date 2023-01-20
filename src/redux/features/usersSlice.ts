import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import activeUsers from '../../utils/activeUsers.json';
import { ErrorMsg, User } from "../../utils/types";

type InitialStateType = {
    isLoading: boolean, data: User[], error : ErrorMsg
}

export const usersRequest = createAsyncThunk("users/request", ( _ , thunkApi ) => {
    
    try {
        const res = activeUsers
        return res.Users as User[]
    } catch (e) {
         return thunkApi.rejectWithValue({ 
            message: "User not found" 
          });
    }
})

const initialState: InitialStateType = { isLoading: false, data: [], error: {} }
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers:{
        [usersRequest.pending.type]: (state: InitialStateType) => {
            state.isLoading = true
        },
        [usersRequest.fulfilled.type]: (state: InitialStateType, action:PayloadAction<User[]>) => {
            state.isLoading = false
            state.data = action.payload
            state.error = {}
        },
        [usersRequest.rejected.type]: (state: InitialStateType, action:PayloadAction<object>) => {
            state.isLoading = false
            state.data = []
            state.error = action.payload
        },
    }
})

export default usersSlice.reducer