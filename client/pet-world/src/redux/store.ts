import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../redux/features/loginSlice'
import userReducer from "./features/userSlice";
import vetReducer from "./features/vetSlice";

const store = configureStore({
    reducer: {
        login:loginReducer,
        user: userReducer,
        vet : vetReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch