import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './features/adminSlice'
import userReducer from "./features/userSlice";
import partnerReducer from "./features/partnerSlice";
import kycReducer from './features/kycSlice'

const store = configureStore({
    reducer: {
        admin:adminReducer,
        user: userReducer,
        vet : partnerReducer,
        kyc : kycReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch