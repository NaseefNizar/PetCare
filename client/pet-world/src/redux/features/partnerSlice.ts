import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";
import { act } from "react-dom/test-utils";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
};

type UserData = {
  name: string;
  lastName?: string;
  email: string;
  password: string;
  contactNumber: string;
  picture?: string;
  address?: string;
  role: string;
  _id: string;
  __v: number;
};

type InitialState = {
  loading: boolean;
  registerStatus: boolean;
  loginSuccess: null | boolean;
  userData: UserData | null;
  signupData: FormValues | null;
  error: string;
  otpSendStat: boolean;
  successMessage: string;
};
const initialState: InitialState = {
  loading: false,
  registerStatus: false,
  loginSuccess: null,
  userData: null,
  signupData: null,
  error: "",
  successMessage: "",
  otpSendStat: false,
};

export const sendOtpPartner = createAsyncThunk(
  "vet/sendOtp",
  async (userData) => {
    try {
      //   console.log("role", role);

      const response = await axios.post("/api/vet/sendotp", userData);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw error.response.data;
    }
  }
);

export const registerPartner = createAsyncThunk(
  "user/registerPartner",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/vet/signup", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginPartner = createAsyncThunk(
  "vet/loginVet",
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/vet/login", credential);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk("vet/logout", async () => {
  try {
    const response = await axios.get("/api/vet/logout");
    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
  }
});

const vetSlice = createSlice({
  initialState,
  name: "vet",
  reducers: {
    setSignupDataPartner: (state, action) => {
      console.log(action.payload);
      state.signupData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtpPartner.pending, (state, action: PayloadAction) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(sendOtpPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSendStat = true;
      })
      .addCase(sendOtpPartner.rejected, (state, action) => {
        state.loading = false;
        console.log(action);

        state.error = action.error.message || "";
      })
      .addCase(registerPartner.pending, (state, action: PayloadAction) => {
        state.loading = true;
      })
      .addCase(registerPartner.fulfilled, (state, action) => {
        (state.loading = false), (state.registerStatus = true);
      })
      .addCase(registerPartner.rejected, (state, action) => {
        console.log(action.error);
        (state.loading = false), (state.error = action.error.message || "");
      })
      .addCase(loginPartner.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginPartner.fulfilled, (state, action) => {
        (state.loading = false), (state.userData = action.payload.user);
        state.loginSuccess = true;
        localStorage.setItem("partner", JSON.stringify(action.payload.user));
        console.log(action.payload.user);
      })
      .addCase(loginPartner.rejected, (state, action) => {
        (state.loading = false), (state.loginSuccess = false);
        state.error = action.payload.message || "";
      })
      .addCase(logOut.fulfilled, (state, action) => {
        (state.loading = false),
          (state.registerStatus = false),
          (state.loginSuccess = null),
          (state.userData = null),
          (state.signupData = null),
          (state.otpSendStat = false),
          (state.error = ""),
          (state.successMessage = "");
        localStorage.removeItem("user");
      });
  },
});

export default vetSlice.reducer;
export const { setSignupDataPartner } = vetSlice.actions;
