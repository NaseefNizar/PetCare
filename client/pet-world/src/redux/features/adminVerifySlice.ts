import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';


type PartnerData = {
    firstName: String,
      lastName: String,
      email: String,
      password: String,
      contactNumber: Number,
      rol:String,
      picture: String,
      is_blocke:Boolean,
      centreNam: String,
      localit: String,
      area: String,
      pincode: String,
      state: String,
      bankName: String,
      branchName: String,
      accountHolderName: String,
      accountNumber: String,
      ifsc: String,
      poi: String,
      poq: String,
      is_verifie:Boolean,
      is_kycSubmitted:Boolean,
}
type InitialState = {
    loading: boolean
    partnerData: PartnerData | null
    errorMsg : string
}

const initialState: InitialState = {
    loading: false,
    partnerData :  null,
    errorMsg : ""
}

export const getPartnerData = createAsyncThunk('adminVerifySlice/getpartnerdata',async (id,{rejectWithValue}) =>{
    try {
        const response = await axios.post("/api/admin/getindividualpartner",{id});
        console.log(response.data);
        
        return response.data
    } catch (error: any) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})

const adminVerifySlice = createSlice({
    initialState,
    name:'adminVerifySlice',
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getPartnerData.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getPartnerData.fulfilled, (state, action) => {
            state.loading = false,
            state.partnerData = action.payload.partnerData
        })
        .addCase(getPartnerData.rejected, (state, action) => {
            state.loading = false,
            state.partnerData = action.payload.message || ''
        })
    }
})

export default adminVerifySlice.reducer