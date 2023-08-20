import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";
import { AxiosError } from "axios";
import { getUserData } from "./adminSlice";

type FormValues = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
};

type UserData = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  contactNumber:string;
  picture?: string;
  address?: string;
  role: string;
  _id: string;
  __v: number;
};
const InitialUserData:UserData = {
  firstName:"",
  lastName:"",
  email:"",
  password:"",
  contactNumber: "",
  picture: "",
  role: "",
  _id: "",
  __v: 0
};
type InitialState = {
  loading: boolean;
  registerStatus: boolean;
  loginSuccess: boolean | null;
  userData: UserData | null;
  signupData: FormValues | null;
  otpSendStat: boolean;
  error: string;
  successMessage: string;
};

const initialState: InitialState = {
  loading: false,
  registerStatus: false,
  loginSuccess: false,
  userData: null,
  signupData: null,
  otpSendStat: false,
  error: "",
  successMessage: "",
};

export const sendOtp = createAsyncThunk("user/sendOtp", async (userData) => {
  try {
    console.log('otp',userData);

    const response = await axios.post("/api/sendotp", userData);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/signup", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/user/loginUser",
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/login", credential);
      console.log("login",response);
      return response.data;
    } catch (error: any) {
      console.log("kskdjk", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk("/user/logout", async () => {
  try {
    const response = await axios.get("/api/logout");
    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
  }
});


export const updateUser = createAsyncThunk("/user/updateuser", async(updatedData,{rejectWithValue}) => {
  try{
    const response = await axios.patch('/api/updateuser',updatedData)
    return response.data
  } catch (error:any) {
    console.log(error.response.data); 
    return rejectWithValue(error.response.data);
  }
})
export const updateProfilePic = createAsyncThunk("/user/updateprofilepic", async(image: FormData,{rejectWithValue}) => {
  try{
    console.log("image",image);
    
    const response = await axios.patch('/api/updateprofilepic',image, {headers: {
      "Content-Type": "multipart/form-data",
    }})
    return response.data
  } catch (error:any) {
    console.log(error.response.data); 
    return rejectWithValue(error.response.data);
  }
})

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


export const getData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/getuserdata");
      console.log('axios',response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setSignupData: (state, action) => {
      console.log(action.payload);
      state.signupData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state, action: PayloadAction) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSendStat = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        console.log(action);

        state.error = action.error.message || "";
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerStatus = true;
        state.successMessage = action.payload.message;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.loading = false), (state.userData = action.payload.user);
        state.loginSuccess = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        console.log(action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.loading = false), (state.loginSuccess = false);
        state.error = action.payload.message || "";
      })
      .addCase(googleSign.fulfilled, (state, action) => {
        console.log("payload", action);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
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
          localStorage.removeItem('user')
      })
      .addCase(getData.pending, (state, action )=> {
        state.loading = true
      })
      .addCase(getData.rejected, (state, action )=> {
        state.loading = false
        state.error = action.error.message || ''
      })
      .addCase(getData.fulfilled, (state, action )=> {
        state.loading = false
        state.userData = action.payload.userData
        console.log('gotdata',action.payload);
        
      })
      .addCase(updateUser.pending, (state, action )=> {
        state.loading = true
        state.successMessage = ""
      })
      .addCase(updateUser.rejected, (state, action )=> {
        state.loading = false
        state.error = action.error.message || ''
      })
      .addCase(updateUser.fulfilled, (state, action )=> {
        state.loading = false
        state.successMessage = action.payload.message
        console.log('gotdata',action.payload);
        
      })
      .addCase(updateProfilePic.pending, (state, action )=> {
        state.loading = true
        state.successMessage = ""
      })
      .addCase(updateProfilePic.rejected, (state, action )=> {
        state.loading = false
        state.error = action.error.message || ''
      })
      .addCase(updateProfilePic.fulfilled, (state, action )=> {
        state.loading = false
        state.successMessage = action.payload.message
        console.log('gotdata',action.payload);
      })
  },
});

export default userSlice.reducer;
export const { setSignupData } = userSlice.actions;
