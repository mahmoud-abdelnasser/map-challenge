import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import polygon from '../../utils/polygon.json';
import { ErrorMsg, Polygon } from "../../utils/types";

type InitialStateType = {
    isLoading: boolean, data:Polygon[], error : ErrorMsg
}

export const polygonRequest = createAsyncThunk("polygon/request", ( _ , thunkApi ) => {
    
    try {
        const res = polygon
        return res.Polygons 
    } catch (e) {
         return thunkApi.rejectWithValue({ 
            message: "Polygons not found" 
          });
    }
})

const initialState: InitialStateType = { isLoading: false, data: [], error: {} }
export const polygonSlice = createSlice({
    name: "polygon",
    initialState,
    reducers: {},
    extraReducers:{
        [polygonRequest.pending.type]: (state: InitialStateType) => {
            state.isLoading = true
        },
        [polygonRequest.fulfilled.type]: (state: InitialStateType, action:PayloadAction<Polygon[]>) => {
            state.isLoading = false
            state.data = action.payload
            state.error = {}
        },
        [polygonRequest.rejected.type]: (state: InitialStateType, action:PayloadAction<object>) => {
            state.isLoading = false
            state.data = []
            state.error = action.payload
        },
    }
})

export default polygonSlice.reducer