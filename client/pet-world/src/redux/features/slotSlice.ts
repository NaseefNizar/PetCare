import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

const initialState = {
  loading: false,
  stat: false,
  slot: {},
  statMsg: "",
  
};

export const addSlot = createAsyncThunk<any, any>(
  "slot/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("api/partner/addslot", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSlot = createAsyncThunk<any, any>(
  "slot/getslots",
  async (date, { rejectWithValue }) => {
    try {
        console.log(date);
        
      const response = await axios.get(`api/partner/getslot?date=${date}`);
      return response.data;
    } catch (error: any) {
    return rejectWithValue(error.response.data);
    }
  }
);

const slotSlice = createSlice({
  initialState,
  name: "addSlot",
  reducers: {
    setSelectedSlot: (state, action) => {
      state.slot = { ...state.slot, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSlot.pending, (state) => {
        state.loading = true;
        state.stat = false;
      })
      .addCase(addSlot.fulfilled, (state, action) => {
        state.statMsg = action.payload.message;
        state.stat = true;
      })
      .addCase(addSlot.rejected, (state, action) => {
        (state.loading = false), (state.statMsg = action.error.message || "");
        state.stat = false;
      })
      .addCase(getSlot.fulfilled, (state) => {
        state.loading = false
        state
      })
  },
});

export default slotSlice.reducer;
export const { setSelectedSlot } = slotSlice.actions;
