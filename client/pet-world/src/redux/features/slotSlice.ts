import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axiosInstance'


const initialState = {
    loading: false,
    stat: false,
    statMsg: '',
}

export const addSlot = createAsyncThunk(
    'slot/add',
    async(data,{rejectWithValue}) => {
        try {
            const response = await axios.patch('api/partner/addslot',data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



const slotSlice = createSlice({
    initialState,
    name:'addSlot',
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(addSlot.pending, (state,action) => {
            state.loading = true
            state.stat = false
        })
        .addCase(addSlot.fulfilled, (state,action) => {
            state.statMsg = action.payload.message
            state.stat = true
        })
        .addCase(addSlot.rejected, (state,action) => {
            state.loading = false,
            state.statMsg = action.error.message || ''
            state.stat = false
        })
    },
})


export default slotSlice.reducer