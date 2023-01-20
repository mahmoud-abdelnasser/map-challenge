import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoginFormType } from "../../pages/Login";
import activeUsers from '../../utils/activeUsers.json';
import { find as _find } from 'lodash'
import { ErrorMsg, User } from "../../utils/types";


type InitialStateType = {
    isLoading: boolean, isLoggedIn: boolean, error: ErrorMsg
}

export const loginRequest = createAsyncThunk("login/request", async (data:LoginFormType, thunkApi) => {
    const isActive = _find(activeUsers.Users, data)
    if (!isActive) {
      return thunkApi.rejectWithValue({ 
        message: "User not found" 
      });
    }
    return isActive as User;
})

const initialState: InitialStateType = { isLoading: false, isLoggedIn: false, error: {} }
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers:{
        [loginRequest.pending.type]: (state: InitialStateType, action:PayloadAction<object>) => {
            state.isLoading = true
            state.isLoggedIn = false
        },
        [loginRequest.fulfilled.type]: (state: InitialStateType, action:PayloadAction<object>) => {
            state.isLoading = false
            state.isLoggedIn = true
            state.error = {}
        },
        [loginRequest.rejected.type]: (state:InitialStateType, action:PayloadAction<object>) => {
            state.isLoading = false
            state.isLoggedIn = false
            state.error = action.payload 
        },
    }
})

export default loginSlice.reducer