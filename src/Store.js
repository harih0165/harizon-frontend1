import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"
const reducer = combineReducers({
        authState: authReducer
})
const store = configureStore({
    reducer
})

export default store