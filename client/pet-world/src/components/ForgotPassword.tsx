import { SubmitHandler, useForm } from "react-hook-form";
import otplogo from "../assets/Secure Privacy.png";
import { useEffect} from "react";

import {
  Stack,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { forgotPassword, setPhoneNumber } from "../redux/features/userSlice";


type PhoneNumber = {
  contactNumber: number;
};

export const ForgotPassword = () => {
  const form = useForm<PhoneNumber>();
  const navigate = useNavigate();
  // const params = useParams()
  // console.log(params.role);
  
  const otpStat = useAppSelector(state => state.user.otpSendStat)
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    otpStat && navigate('/otpverifypassword')
  },[otpStat])

  const onSubmit:SubmitHandler<PhoneNumber> = (contactNumber) => {
    dispatch(setPhoneNumber(contactNumber.contactNumber))
    dispatch(forgotPassword(contactNumber))
  }


  return (
    <div>
      <Box
        sx={{
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ToastContainer />
        <Paper sx={{ padding: "30px" }}>
          <Stack
            spacing={4}
            direction={"column"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img width="200px" height={"200px"} src={otplogo} alt="" />
            <Typography variant="h4">Forgot Password ?</Typography>
            <Typography variant="h6">
              Please enter your registered phone number
            </Typography>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing={4}
                direction={"column"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  size="small"
                  label="Phone number"
                  type="number"
                  {...register("contactNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Enter valid 10 digit phone number",
                    },
                  })}
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber?.message}
                  placeholder="Please enter valid 10 digit number"
                  // fullWidth
                />

                <Button
                  type="submit"
                  size="large"
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  SEND OTP
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
};
