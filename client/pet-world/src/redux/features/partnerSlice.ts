import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from '../../utils/axiosInstance'
import { act } from "react-dom/test-utils";

type FormValues = {
    name: "",
    email:"",
    password:"",
    confirmPassword:"",
    contactNumber:""
}

type InitialState = {
    loading:boolean,
    registerStatus: boolean,
    loginSuccess: null | boolean,
    userData:{},
    error: ''
}
const initialState: InitialState = {
    loading:false,
    registerStatus: false,
    loginSuccess: null,
    userData:{},
    error: ''
}

export const registerVet = createAsyncThunk('vet/registerVet', async(userData,role) => {
    try{
        console.log('role',role);
        
        const response = await axios.post('/api/vet/signup',userData)
        console.log(response);
        return response.data
    }
    catch(error:any) {
        console.log(error);
        throw error.response.data
    }
})

export const loginVet = createAsyncThunk('vet/loginVet', async(credential,{rejectWithValue}) => {
    try {
        const response = await axios.post('/api/vet/login', credential)
        console.log(response);
        return response.data
    }
    catch(error: any) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data)
        
    }
})

// export const logoutUser = createAsyncThunk('/user/logout', async() => {
//     try{
//         const response = await axios.
//     }
// })

const vetSlice = createSlice({
    initialState,
    name:'vet',
    reducers:{},
    extraReducers: builder => {
        builder.addCase(registerVet.pending, (state, action:PayloadAction) => {
            state.loading = true
        })
        .addCase(registerVet.fulfilled, (state, action) => {
            state.loading = false,
            state.registerStatus = true
        })
        .addCase(registerVet.rejected,(state,action) => {
            console.log(action.error)
            state.loading = false,
            state.error = action.error.message || ''
        })
        .addCase(loginVet.pending, (state, action) => {
            state.loading = true
        })
        .addCase(loginVet.rejected, (state, action) => {
            state.loading = false
            console.log('act',action);
            state.loginSuccess = false;
            state.error = action.payload.message
            
        })
        .addCase(loginVet.fulfilled, ( state, action) => {
            state.loading = false,  
            state.userData = action.payload.user
            state.loginSuccess = true
            localStorage.setItem('vet', JSON.stringify(action.payload.user))
            console.log(action.payload.user); 
        })
}
})

export default vetSlice.reducer