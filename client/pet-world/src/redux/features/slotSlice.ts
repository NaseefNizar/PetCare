import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";


// interface SlotData {
//   date: Date;
//   slots: { [key: string]: any }[]; // You can define a more specific type for the objects inside the array
//   _id: string; // Assuming _id is a string
// }

type initialState = {
  loading: boolean,
  stat: boolean,
  slot: any 
  statMSg: string
}

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

export const editSlot = createAsyncThunk<any, any>(
  "slot/editslots",
  async (data, { rejectWithValue }) => {
    try {
        console.log(data);
      const response = await axios.patch("api/partner/editslot",data);
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
    // setEdittedSlots: (state, action) => {
    //   console.log(action.payload);
    //   const updateSlot = state.slot?.slots.find(element => element._id == action.payload)
    //   console.log(updateSlot);
    //       }
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
      .addCase(getSlot.fulfilled, (state,action) => {
        state.loading = false
        state.slot = action.payload.slots
      })
      .addCase(editSlot.fulfilled, (state,action) => {
        state.loading = false
        state.slot = action.payload.slots
      })
  },
});

export default slotSlice.reducer;
export const { setSelectedSlot } = slotSlice.actions;
