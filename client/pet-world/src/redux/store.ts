import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './features/adminSlice'
import userReducer from "./features/userSlice";
import vetReducer from "./features/partnerSlice";

const store = configureStore({
    reducer: {
        admin:adminReducer,
        user: userReducer,
        vet : vetReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch