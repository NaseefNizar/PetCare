import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";
import { initialState,kycData } from "../../types/kyc";
// import { act } from "react-dom/test-utils";

type FormValues = {
  // firstName: string;
  userId: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: number;
  role?: string;
};

// type CredentialResponse = {};

type UserData = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  contactNumber: string;
  picture?: string;
  address?: string;
  role: string;
  is_verified: boolean;
  is_kycSubmitted: boolean;
  _id: string;
  __v: number;
};

type ContactNumber = {
  contactNumber: number;
};

type InitialState = {
  loading: boolean;
  registerStatus: boolean;
  loginSuccess: null | boolean;
  userData: UserData | null;
  signupData: FormValues | null;
  error: any;
  otpSendStat: boolean;
  successMessage: string;
  tokenStat: boolean | null;
  blockStat: boolean;
  status:string;
  kycData: null | kycData
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
  tokenStat: null,
  blockStat: false,
  status: "",
  kycData: null,
};

export const sendOtpPartner = createAsyncThunk(
  "vet/sendOtp",
  async (userData:any) => {
    try {
      //   console.log("role", role);

      const response = await axios.post("/api/partner/sendotp", userData);
      // console.log(response);
      return response.data;
    } catch (error: any) {
      // console.log(error);
      throw error.response.data;
    }
  }
);

export const registerPartner = createAsyncThunk(
  "partner/registerPartner",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/partner/signup", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginPartner = createAsyncThunk<any,any>(
  "partner/loginPartner",
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/partner/login", credential);
      // console.log(response);
      return response.data;
    } catch (error: any) {
      // console.log(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPartnerData = createAsyncThunk(
  "partner/getPartnerData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/partner/getpartnerdata");
      // console.log("axios", response.data);
      return response.data;
    } catch (error: any) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePartner = createAsyncThunk<any,any>(
  "/partner/updatepartner",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "/api/partner/updatepartner",
        updatedData
      );
      return response.data;
    } catch (error: any) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePartnerProfilePic = createAsyncThunk(
  "/partner/updatepartnerprofilepic",
  async (image: FormData, { rejectWithValue }) => {
    try {
      // console.log("image", image);

      const response = await axios.patch(
        "/api/partner//updatepartnerprofilepic",
        image,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk("vet/logout", async () => {
  try {
    const response = await axios.get("/api/partner/logout");
    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
  }
});

export const forgotPassword = createAsyncThunk(
  "partner/forgotpasswordpartner",
  async (number: ContactNumber, { rejectWithValue }) => {
    console.log("number", number);

    try {
      const response = await axios.post("/api/partner/forgotpassword", number);
      // console.log("axios", response.data);
      return response.data;
    } catch (error: any) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOtpPassword = createAsyncThunk(
  "partner/verifyotppassword",
  async (data, { rejectWithValue }) => {
    try {
      // console.log("data", data);

      const response = await axios.post("/api/partner/verifyotppassword", data);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

export const setNewPassword = createAsyncThunk(
  "partner/setnewpassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/partner/setnewpassword", data);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

export const kycUpdate = createAsyncThunk<void,any>(
  "/kyc/upload",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("api/partner/kycupdate", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const kycDocUpload = createAsyncThunk(
  "kyc/documentUpload",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "/api/partner/kycdocumentupload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const vetSlice = createSlice({
  initialState,
  name: "partner",
  reducers: {
    setSignupDataPartner: (state, action) => {
      // console.log(action.payload);
      state.signupData = action.payload;
    },
    setKycData: (state, action) => {
      state.kycData = { ...state.kycData,...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtpPartner.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(sendOtpPartner.fulfilled, (state) => {
        state.loading = false;
        state.otpSendStat = true;
      })
      .addCase(sendOtpPartner.rejected, (state, action) => {
        state.loading = false;
        console.log(action);

        state.error = action.error.message || "";
      })
      .addCase(registerPartner.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerPartner.fulfilled, (state) => {
        (state.loading = false), (state.registerStatus = true);
      })
      .addCase(registerPartner.rejected, (state, action) => {
        console.log(action.error);
        (state.loading = false), (state.error = action.error.message || "");
      })
      .addCase(loginPartner.pending, (state) => {
        state.loading = true;
        state.blockStat = false;
        state.error = "";
      })
      .addCase(loginPartner.fulfilled, (state, action) => {
        (state.loading = false), (state.userData = action.payload.user);
        console.log(action.payload.user);

        state.loginSuccess = true;
        state.tokenStat = true;
        localStorage.setItem("partner", JSON.stringify(action.payload.user));
        console.log(action.payload.user);
      })
      .addCase(loginPartner.rejected, (state, action:any) => {
        (state.loading = false), (state.loginSuccess = false);
        state.tokenStat = false;
        state.error = action.payload.message || "";
      })

      .addCase(getPartnerData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPartnerData.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.payload.message || "";
        state.blockStat = true;
        state.tokenStat = false;
      })
      .addCase(getPartnerData.fulfilled, (state, action:any) => {
        state.loading = false;
        state.userData = action.payload.partnerData;
        state.tokenStat = true;
        // console.log("gotdata", action.payload);
      })
      .addCase(logOut.fulfilled, (state) => {
        (state.loading = false),
          (state.registerStatus = false),
          (state.loginSuccess = null),
          (state.userData = null),
          (state.signupData = null),
          (state.otpSendStat = false),
          (state.error = ""),
          (state.tokenStat = null),
          (state.successMessage = "");
        localStorage.removeItem("partner");
      })
      .addCase(updatePartner.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        console.log("gotdata", action.payload);
      })
      .addCase(updatePartnerProfilePic.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
      })
      .addCase(updatePartnerProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(updatePartnerProfilePic.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        console.log("gotdata", action.payload);
      })
      .addCase(kycUpdate.pending, (state) => {
        state.loading = false;
      })
      .addCase(kycUpdate.fulfilled, (state, action:any) => {
        state.status = action.payload.message;
      })
      .addCase(kycDocUpload.fulfilled, (state, action) => {
        state.status = action.payload.message;
      })
      .addCase(kycDocUpload.rejected, (state, action) => {
        state.status = action.error.message || '';
      });
  },
});

export default vetSlice.reducer;
export const { setSignupDataPartner,setKycData } = vetSlice.actions;
