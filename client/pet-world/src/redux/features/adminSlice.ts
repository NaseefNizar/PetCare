import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";
import { User } from "../api/types";

type LoginData = {
  email: string;
  password: string;
};
interface UserState {
  user: User | null;
}
type InitialState = {
  userData: {};
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  userList: [];
  partnerList: [];
  unverifiedList: [];
  successMsg : string ;
  stat: boolean
};

const initialState: InitialState = {
  userData: [],
  loading: false,
  error: "",
  isLoggedIn: false,
  userList: [],
  partnerList: [],
  unverifiedList: [],
  successMsg: '',
  stat: false
};

export const loginAuth = createAsyncThunk(
  "adminSlice/loginAuth",
  async (userData: LoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/admin/login", userData);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserData = createAsyncThunk(
  "adminSlice/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/getusers");
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const blockUser = createAsyncThunk(
  "adminSlice/blockUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put("api/admin/blockuser", userData);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPartnerData = createAsyncThunk(
  "adminSlice/getPartnerData",
  async () => {
    try {
      const response = await axios.get("/api/admin/getpartner");
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
);

export const unverifiedPartners = createAsyncThunk(
  'adminSlice/unverifiedpartners',
  async () => {
    try{
    const response = await axios.get('api/admin/getunverifiedpartner');
    console.log(response.data);
    
    return response.data
    }
  catch (error: any) {
    console.log(error.response.data);
  }

})

export const blockPartner = createAsyncThunk(
  "adminSlice/blockpartner",
  async (partnerData, { rejectWithValue }) => {
    try {
      const response = await axios.put("api/admin/blockpartner", partnerData);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("adminSlice/logout", async () => {
  try {
    const response = await axios.get("/api/admin/logout");
    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
  }
});

export const approval = createAsyncThunk(
  'admin/partnerapproval',
  async(partnerId,{rejectWithValue}) => {
    try {
      console.log(partnerId);
      
      const response = await axios.patch('api/admin/approvepartner',{partnerId})
      return response.data
    } catch (error: any) {
      rejectWithValue(error.response.data)
    }
  }
)

const adminSlice = createSlice({
  initialState,
  name: "adminSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loginAuth.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          state.userData = action.payload;
          state.error = "";
          state.isLoggedIn = true;
        }
      )
      .addCase(loginAuth.rejected, (state, action) => {
        state.userData = {};
        state.error = action.error.message || "";
        state.isLoggedIn = false;
      })


      .addCase(getUserData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload.userData;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "";
      })


      .addCase(getPartnerData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPartnerData.fulfilled, (state, action) => {
        state.loading = false;
        state.partnerList = action.payload.partnerData;
      })
      .addCase(getPartnerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })


      .addCase(unverifiedPartners.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(unverifiedPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.unverifiedList = action.payload.unverifiedPartners;
      })
      .addCase(unverifiedPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      })


      .addCase(blockUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload.userData;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "";
      })


      .addCase(blockPartner.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(blockPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.partnerList = action.payload.partnerData;
      })
      .addCase(blockPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "";
      })



      .addCase(approval.pending, (state,action) => {
        state.loading = true
        state.stat = false
      })
      .addCase(approval.fulfilled, (state, action) =>{
        state.loading = false;
        state.successMsg = action.payload.message
        state.stat = true
      })
      .addCase(approval.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload.message
        state.stat = false
      })


      .addCase(logout.fulfilled, (state, action: PayloadAction<UserState>) => {
        (state.userData = []),
          (state.loading = false),
          (state.error = ""),
          (state.isLoggedIn = false),
          (state.userList = []),
          (state.partnerList = []);
      });
  },
});

export default adminSlice.reducer;
