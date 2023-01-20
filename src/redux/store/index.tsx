import {configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import loginReducer from '../features/loginSlice'
import usersReducer from '../features/usersSlice'
import polygonsReducer from '../features/polygonsSlice'
import polygonLayerReducer from '../features/polygonLayerSlice'


const store = configureStore({
    reducer: {
        login: loginReducer,
        users: usersReducer,
        polygons:polygonsReducer,
        polygonLayer:polygonLayerReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store