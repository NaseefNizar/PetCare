import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axiosInstance'
import { initialState } from '../../types/kyc';


type InitialState = {
    loading: boolean;
    partnerData : []
    responseMsg : string
    individualData : {} | null
}

const initialState: InitialState = {
    loading: false,
    partnerData : [],
    responseMsg : '',
    individualData : null
}


export const getVetList =  createAsyncThunk(
    'list/vet',
    async(_,{rejectWithValue}) => {
        try {
            const response = await axios.get('api/general/getvetlist')
            // console.log('response',response);
            
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getIndividualDetails = createAsyncThunk<string,any>(
    'getdetail/vet',
    async(partnerId,{ rejectWithValue}) => {        
        try {
            const response = await axios.post('api/general/getindividualdetail',partnerId)
            return response.data
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }
)

const listSlice = createSlice({
    initialState,
    name:'partnerlist',
    reducers:{},
    extraReducers: builder => {
        builder
        .addCase(getVetList.pending, (state) => {
            state.loading = true;
        })
        .addCase(getVetList.fulfilled, (state, action) => {
            state.loading = false;
            state.partnerData = action.payload.vetList
        })
        .addCase(getVetList.rejected, (state, action) => {
            state.loading = false;
            state.responseMsg = action.error.message || ''
        })
        .addCase(getIndividualDetails.pending, (state) => {
            state.loading = true;
        })
        .addCase(getIndividualDetails.fulfilled, (state, action:any) => {
            state.loading = false;
            state.individualData = action.payload.partnerData
        })
        .addCase(getIndividualDetails.rejected, (state, action) => {
            state.loading = false;
            state.responseMsg = action.error.message || ''
        })
    }
})


export default listSlice.reducer