import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from '../../utils/axiosInstance'
import { AxiosResponse } from 'axios'
import { User } from "../api/types";


 type LoginData = {
    email:string;
    password:string
}
interface UserState {
    user: User | null 
}
type InitialState = {
    userData:{},
    error:string | null,
    isLoggedIn:boolean
}

const initialState: InitialState = {
    userData: {},
    error:"",
    isLoggedIn: false
}


export const loginAuth = createAsyncThunk('loginSlice/loginAuth',async(userData:LoginData,{rejectWithValue}) => {
    try {
        console.log(userData);
        
        const response = await axios.post('/api/admin/login',userData)
        console.log(response.data);
        return response.data
    }
    catch(error:any){
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data)
    }
})


const loginSlice = createSlice({
    initialState,
    name:'loginSlice',
    reducers:{},
    extraReducers: builder => {
        builder.addCase(loginAuth.fulfilled, (state,action:PayloadAction<UserState>) => {
            state.userData = action.payload
            state.error= ""
            state.isLoggedIn = true
        })
        .addCase(loginAuth.rejected,(state,action) => {
            state.userData = {}
            state.error=action.error.message || ""
            state.isLoggedIn = false
        })      
    }
})

export default loginSlice.reducer
