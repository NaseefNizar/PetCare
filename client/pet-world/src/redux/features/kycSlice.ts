// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "../../utils/axiosInstance";
// import { initialState } from "../../types/kyc";


// type FileData = {
//     poi: File[]; // An array of files for the 'poi' field
//     poq: File[]; // An array of files for the 'poq' field
//   };

// const initialState: initialState = {
//   loading: false,
//   status: "",
//   kycData: null,
// };

// export const kycUpdate = createAsyncThunk(
//   "/kyc/upload",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch("api/partner/kycupdate", data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const kycDocUpload = createAsyncThunk(
//   "kyc/documentUpload",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(
//         "/api/partner/kycdocumentupload",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );



// const kycSlice = createSlice({
//   initialState,
//   name: "kyc",
//   reducers: {
//     setKycData: (state, action) => {
//       state.kycData = { ...state.kycData,...action.payload };
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(kycUpdate.pending, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(kycUpdate.fulfilled, (state, action) => {
//         state.status = action.payload.message;
//       })
//       .addCase(kycDocUpload.fulfilled, (state, action) => {
//         state.status = action.payload.message;
//       })
//       .addCase(kycDocUpload.rejected, (state, action) => {
//         state.status = action.error.message;
//       });
//   },
// });

// export default kycSlice.reducer;
// export const { setKycData } = kycSlice.actions;
