import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";
// import { AxiosError } from "axios";
import { CredentialResponse } from "@react-oauth/google";
// import { users } from "../../types/users";

type FormValues = {
  // firstName: string;
  // lastName?: string;
  // email: string;
  // password: string;
  // confirmPassword: string;
  // contactNumber: number;
  userId: string;
  lastName?:string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: number;
};

// type LoginCred = {
//   email: string;
//   password: string;
// }

type ContactNumber = {
  contactNumber: string | null | number;
};

// interface GetDataRejectedAction {
//   type: string; // Replace with the actual action type
//   payload: {
//     message: string; // Define the expected payload structure
//   };
// }

type UserData = {
  firstName: string;
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
// const InitialUserData: UserData = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   contactNumber: "",
//   picture: "",
//   role: "",
//   _id: "",
//   __v: 0,
// };
type InitialState = {
  loading: boolean;
  registerStatus: boolean;
  loginSuccess: boolean | null;
  userData: UserData | null;
  signupData: FormValues | null;
  otpSendStat: boolean;
  otpVerify: boolean;
  error: any;
  successMessage: string;
  phoneNumber: string | null;
  actionStat: boolean;
  blockStat: boolean;
  petDetails: any
};

const initialState: InitialState = {
  loading: false,
  registerStatus: false,
  loginSuccess: false,
  userData: null,
  signupData: null,
  otpSendStat: false,
  otpVerify: false,
  error: "",
  successMessage: "",
  phoneNumber: null,
  actionStat: false,
  blockStat: false,
  petDetails : []
};

export const sendOtp = createAsyncThunk<void,FormValues>(
  "user/sendOtp",
  async (userData: FormValues) => {
    try {
      const response = await axios.post("/api/sendotp", userData);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const otp = createAsyncThunk<any,any>(
  "user/otp",
  async (contactNumber, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/otp", contactNumber);
      console.log(response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: FormValues, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/signup", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk<any,any>(
  "/user/loginUser",
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/login", credential);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk("/user/logout", async () => {
  try {
    const response = await axios.get("/api/logout");
    return response.data;
  } catch (error: any) {}
});

export const updateUser = createAsyncThunk<any,any>(
  "/user/updateuser",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/updateuser", updatedData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateContact = createAsyncThunk<any,any>(
  "/user/updatecontact",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/updateuser", updatedData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateProfilePic = createAsyncThunk(
  "/user/updateprofilepic",
  async (image: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/updateprofilepic", image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addPetDetail = createAsyncThunk<any,any>(
  "/user/addpetdetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/addpetdetail", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getPetDetail = createAsyncThunk<any,void>(
  "/user/getpetdetail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/getpetdetail");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleSign = createAsyncThunk<void,CredentialResponse>(
  "/user/googlesign",
  async (credentialResponse) => {
    try {
      const response = await axios.post(
        "/api/googleVerify",
        credentialResponse
      );

      return response.data;
    } catch (error) {
      // console.log(error);
    }
  }
);

export const getData = createAsyncThunk<void,void>(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/getuserdata`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk<void,ContactNumber>(
  "user/forgotpassword",
  async (number: ContactNumber, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/forgotpassword", number);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOtpPassword = createAsyncThunk<void,{otp:string,contactNumber:string | null}>(
  "user/verifyotppassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/verifyotppassword", data);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

export const setNewPassword = createAsyncThunk<any,any>(
  "user/setnewpassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/setnewpassword", data);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.otpSendStat = false;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSendStat = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.otpSendStat = false;
        state.error = action.error.message || "";
      })
      .addCase(otp.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.otpSendStat = false;
      })
      .addCase(otp.fulfilled, (state) => {
        state.loading = false;
        state.otpSendStat = true;
      })
      .addCase(otp.rejected, (state, action) => {
        state.loading = false;
        state.otpSendStat = false;
        state.error = action.error.message || ''
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.otpSendStat = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.otpSendStat = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.otpSendStat = false;
        state.error = action.error.message || "";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.payload.message || "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerStatus = true;
        state.successMessage = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.blockStat = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action:any) => {
        (state.loading = false), (state.userData = action.payload.user);
        state.loginSuccess = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action:any) => {
        (state.loading = false), (state.loginSuccess = false);
        state.error = action.payload.message || "";
      })
      .addCase(googleSign.fulfilled, (state, action:any) => {
        (state.loading = false), (state.userData = action.payload.user);
        state.loginSuccess = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(logOut.fulfilled, (state) => {
        (state.loading = false),
          (state.registerStatus = false),
          (state.loginSuccess = null),
          (state.userData = null),
          (state.signupData = null),
          (state.otpSendStat = false),
          (state.error = ""),
          (state.successMessage = "");
        localStorage.removeItem("user");
      })
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getData.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action?.payload?.message || "";
        state.blockStat = true;
        localStorage.removeItem("user");
      })
      .addCase(getData.fulfilled, (state, action:any) => {
        state.loading = false;
        state.userData = action.payload.userData;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.error = "";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.error = "";
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(updateContact.fulfilled, (state, action:any) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(updateProfilePic.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
      })
      .addCase(updateProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(updateProfilePic.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(verifyOtpPassword.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.error = "";
        state.otpSendStat = false;
      })
      .addCase(verifyOtpPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(verifyOtpPassword.fulfilled, (state, action:any) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.otpVerify = true;
      })
      .addCase(setNewPassword.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.error = "";
        state.actionStat = false;
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(setNewPassword.fulfilled, (state, action:any) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.actionStat = true;
      })
      .addCase(addPetDetail.fulfilled, (state, action:any) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(getPetDetail.fulfilled, (state, action:any) => {
        state.loading = false;
        state.petDetails = action.payload.petDetails
      })
  },
});

export default userSlice.reducer;
export const { setSignupData, setPhoneNumber } = userSlice.actions;
