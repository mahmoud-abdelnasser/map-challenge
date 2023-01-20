import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ErrorMsg, PolygonLayer } from "../../utils/types";



type InitialStateType = {
    isLoading: boolean, layers: PolygonLayer, error: ErrorMsg
}

export const polygonLayerRequest = createAsyncThunk<
    PolygonLayer,
    string
>("polygonLayer/request", async (DATA_URL, thunkApi) => {

    try {
        const response = await fetch(`${DATA_URL}`)
        return (await response.json()) as PolygonLayer
    } catch (e) {
        return thunkApi.rejectWithValue({
            message: "PolygonLayers not found"
        });
    }
})

const initialState: InitialStateType = { isLoading: false, layers: [], error: {} }
export const polygonLayerSlice = createSlice({
    name: "polygonLayer",
    initialState,
    reducers: {},
    extraReducers: {
        [polygonLayerRequest.pending.type]: (state: InitialStateType) => {
            state.isLoading = true
        },
        [polygonLayerRequest.fulfilled.type]: (state: InitialStateType, action: PayloadAction<PolygonLayer>) => {
            state.isLoading = false
            state.layers = action.payload
            state.error = {}
        },
        [polygonLayerRequest.rejected.type]: (state: InitialStateType, action: PayloadAction<object>) => {
            state.isLoading = false
            state.layers = []
            state.error = action.payload
        },
    }
})

export default polygonLayerSlice.reducer