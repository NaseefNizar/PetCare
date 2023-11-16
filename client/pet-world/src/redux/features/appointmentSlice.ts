import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

// type appointment = {
//   userId: string;
//   partnerId: string;
//   date: Date;
//   slot: string;
//   petName: string;
//   petKind: string;
//   petBreed: string;
//   petAge: string;
//   petWeight: string;
//   paymentStatus: string;
//   paymentIntentId: string;
// };

type InitialState = {
  loading: boolean;
  appointments: any;
};

const initialState: InitialState = {
  loading: false,
  appointments: null,
};

export const getAppointmentData = createAsyncThunk(
  "appointment/getdata",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/appointment/getallappointments");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const usersAppointments = createAsyncThunk<any, void>(
  "appointment/userappointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("api/appointment/userappointments");
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelAppointment = createAsyncThunk<any,any>("appointment/cancelappointment",async(data,{rejectWithValue}) => {
  try {
    const response = await axios.post('api/appointment/cancelappointment',data)
    return response.data
  } catch (error:any) {
    return rejectWithValue(error.response.data)
  }
})
export const getInvoice = createAsyncThunk<void,any>("appointment/createInvoice",async(_,{rejectWithValue}) => {
  try {
    const response = await axios.get('api/appointment/getinvoice')
    return response.data
  } catch (error:any) {
    return rejectWithValue(error.response.data)
  }
})

export const dashboard = createAsyncThunk<any,void>("appointment/getdashboarddata",async(_,{rejectWithValue}) => {
  try {
    const response = await axios.get('api/appointment/getpartnerappointment')
    return response.data
  } catch (error:any) {
    return rejectWithValue(error.response.data)
  }
})
export const adminDashboard = createAsyncThunk<any,void>("appointment/getadmindashboarddata",async(_,{rejectWithValue}) => {
  try {
    const response = await axios.get('api/admin/getadmindashboard')
    return response.data
  } catch (error:any) {
    return rejectWithValue(error.response.data)
  }
})


export const getAppointments = createAsyncThunk("appointment/getAll", async () => {
  try {
    const response = await axios.get("/api/admin/appointments");
    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
  }
});

const appointmentSlice = createSlice({
  initialState,
  name: "appointment",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppointmentData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAppointmentData.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.appointments;
      })
      .addCase(usersAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(usersAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.appointments;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.appointments
      })
      .addCase(getInvoice.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(dashboard.fulfilled, (state,action) => {
        state.loading = false;
        state.appointments = action.payload.appointments
      })
      .addCase(adminDashboard.fulfilled, (state,action) => {
        state.loading = false;
        state.appointments = action.payload.appointments
      })
      .addCase(getAppointments.fulfilled, (state,action) => {
        state.loading = false;
        state.appointments = action.payload.appointments
      })
  },
});

export default appointmentSlice.reducer;
