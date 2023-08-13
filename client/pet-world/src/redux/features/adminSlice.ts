import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from '../../utils/axiosInstance'
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
    loading: boolean,
    error:string | null,
    isLoggedIn:boolean,
    userList: [],
    partnerList: []
}

const initialState: InitialState = {
    userData: [],
    loading: false,
    error:"",
    isLoggedIn: false,
    userList: [],
    partnerList: []
}


export const loginAuth = createAsyncThunk('adminSlice/loginAuth',async(userData:LoginData,{rejectWithValue}) => {
    try {        
        const response = await axios.post('/api/admin/login',userData)
        console.log(response.data);
        return response.data
    }
    catch(error:any){
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data)
    }
})

export const getUserData = createAsyncThunk('adminSlice/getUserData', async() => {
    try {
        const response = await axios.get('/api/admin/getusers')
        console.log(response.data);
        return response.data
    }
    catch(error:any) {
        console.log(error.response.data);
    }
})

export const blockUser = createAsyncThunk('adminSlice/blockUser', async(id) => {
    try{
        console.log(id);
        
        const response = await axios.put('api/admin/blockuser',{id})
        return response.data
    }
    catch(error:any) {
        console.log(error.response.data);    
    }
})

export const getPartnerData = createAsyncThunk('adminSlice/getPartnerData', async() => {
    try {
        const response = await axios.get('/api/admin/getpartner')
        console.log(response.data);
        return response.data
    }
    catch(error:any) {
        console.log(error.response.data);
    }
})

export const blockPartner = createAsyncThunk('adminSlice/blockpartner', async(id) => {
    try{
        console.log(id);
        
        const response = await axios.put('api/admin/blockpartner',{id})
        return response.data
    }
    catch(error:any) {
        console.log(error.response.data);    
    }
})

const adminSlice = createSlice({
    initialState,
    name:'adminSlice',
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
        .addCase(getUserData.pending, (state, action) => {
            state.loading = true
        })      
        .addCase(getUserData.fulfilled, (state, action) => {
            state.loading = false
            state.userList = action.payload.userData
        })
        .addCase(getUserData.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || ''
        })
        .addCase(getPartnerData.pending, (state, action) => {
            state.loading = true
        })      
        .addCase(getPartnerData.fulfilled, (state, action) => {
            state.loading = false
            state.partnerList = action.payload.partnerData
        })
        .addCase(getPartnerData.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || ''
        })
        .addCase(blockUser.pending, (state, action) => {
            state.loading = true
        })      
        .addCase(blockUser.fulfilled, (state, action) => {
            state.loading = false
            // state.userList = action.payload.userData
            state.userList = action.payload.userData
        })
        .addCase(blockUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || ''
        })
        .addCase(blockPartner.pending, (state, action) => {
            state.loading = true
        })      
        .addCase(blockPartner.fulfilled, (state, action) => {
            state.loading = false
            // state.userList = action.payload.userData
            state.partnerList = action.payload.partnerData
        })
        .addCase(blockPartner.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || ''
        })
              
    }
})

export default adminSlice.reducer
