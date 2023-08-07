import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

type FormValues = {
  name: "";
  email: "";
  password: "";
  confirmPassword: "";
  contactNumber: "";
};

type UserData = {
  name: string;
  email: string;
  password: string,
  role: string,
  _id:string;
  __v:number;
}
type InitialState = {
  loading: boolean;
  registerStatus: boolean;
  userData: UserData | null;
  error: String | ''
}

const initialState: InitialState = {
  loading: false,
  registerStatus: false,
  userData: null,
  error: "",
};

export const registerUser = createAsyncThunk(
  "user/registeUser",
  async (userData) => {
    try {
      const response = await axios.post("/api/signup", userData);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw error.response.data;
    }
  }
);

export const loginUser = createAsyncThunk(
  "/user/loginUser",
  async (credential) => {
    try {
      // console.log("role",role);

      const response = await axios.post("/api/login", credential);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const googleSign = createAsyncThunk(
  "/user/googlesign",
  async (credentialResponse) => {
    try {
      const response = await axios.post(
        "/api/googleVerify",
        credentialResponse
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action: PayloadAction) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.loading = false), (state.registerStatus = true);
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action.error);
        (state.loading = false), (state.error = action.error.message || "");
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.loading = false), (state.userData = action.payload.user);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        console.log(action.payload.user);
      })
      .addCase(googleSign.fulfilled, (state, action) => {
        console.log("payload", action);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      });
  },
});

export default userSlice.reducer;
