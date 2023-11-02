import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';


type PartnerData = {
    firstName: string,
      lastName: string,
      email: string,
      password: string,
      contactNumber: number,
      rol:string,
      picture: string,
      is_blocke:boolean,
      centreNam: string,
      localit: string,
      area: string,
      pincode: string,
      state: string,
      bankName: string,
      branchName: string,
      accountHolderName: string,
      accountNumber: string,
      ifsc: string,
      poi: string,
      poq: string,
      is_verifie:boolean,
      is_kycSubmitted:boolean,
}
type InitialState = {
    loading: boolean
    partnerData: PartnerData | null
    errorMsg : string
    stat: boolean
}

const initialState: InitialState = {
    loading: false,
    partnerData :  null,
    errorMsg : "",
    stat: false
}

export const getPartnerData = createAsyncThunk<void,string>('adminVerifySlice/getpartnerdata',async (id,{rejectWithValue}) =>{
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
        builder.addCase(getPartnerData.pending, (state) => {
            state.loading = true;
            state.stat = false
        })
        .addCase(getPartnerData.fulfilled, (state, action:any) => {
            state.loading = false,
            state.partnerData = action.payload.partnerData
            state.stat = true
        })
        .addCase(getPartnerData.rejected, (state, action:any) => {
            state.loading = false,
            state.partnerData = action.payload.message || ''
            state.stat = false
        })
    }
})

export default adminVerifySlice.reducer