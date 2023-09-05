import { SubmitHandler, useForm } from "react-hook-form";
import otplogo from "../assets/Secure Privacy.png";
import { useRef, useEffect, useState } from "react";
import { OtpInput } from "./OtpInput";
import { Dispatch } from "@reduxjs/toolkit";
import {
  Stack,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { registerUser, sendOtp, verifyOtpPassword } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { registerPartner, sendOtpPartner } from "../redux/features/partnerSlice";

type Otp = {
  otp: string;
};

export const PasswordOtp = () => {
  const form = useForm<Otp>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const phoneNumber = userState.phoneNumber
  const otpStat = userState.otpVerify
  const error = userState.error;
  const signupDataUser = userState.signupData;
  const registerStatus = userState.registerStatus;

//   const partnerState = useAppSelector((state) => state.vet);
//   const errorPartner = partnerState.error;
//   const signupDataPartner = partnerState.signupData;
//   const registerStatusPartner = partnerState.registerStatus;

  // console.log('signupdatapartner',signupDataPartner);
  

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [showButton, setShowButton] = useState(false);
  const [timer, setTimer] = useState(0);

  const onSubmit: SubmitHandler<Otp> = (otp): void => {
// if(signupDataUser) {
//     dispatch(registerUser({ ...signupDataUser, ...otp }));
// } else if (signupDataPartner) {
//     dispatch(registerPartner({ ...signupDataPartner, ...otp }))
// }
dispatch(verifyOtpPassword({...otp,contactNumber:phoneNumber}))
  };

  const handleClick = () => {
    setTimer(0);
    setShowButton(false);
    // if(signupDataUser) {
    //   dispatch(sendOtpPartner(signupDataUser))
    // } else if(signupDataPartner){

    //   dispatch(sendOtp(signupDataPartner));
    // }
  };

  useEffect(() => {
    otpStat && navigate("/setnewpassword");
  }, [otpStat]);
//   useEffect(() => {
//     registerStatus && navigate("/login");
//     error && toast.error(error, { theme: "colored" });
//   }, [registerStatus, error]);
//   useEffect(() => {
//     registerStatusPartner && navigate("/login");
//     errorPartner && toast.error(error, { theme: "colored" });
//   }, [registerStatusPartner, errorPartner]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevCount) => prevCount + 1);
    }, 1000);

    if (timer >= 10) {
      setShowButton(true);
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, showButton]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const input = e.target;
    const value = input.value;

    if (value.length === 1 && index < inputRefs.length - 1) {
      // Move focus to the next input element
      inputRefs[index + 1].current!.focus();
    }
  };

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
            <Typography variant="h4">OTP VERIFICATION</Typography>
            <Typography variant="h6">
              Please enter the OTP sent to your register number
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
                  label="OTP"
                  type="number"
                  {...register("otp", {
                    required: "OTP is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Enter valid 6 digit OTP",
                    },
                  })}
                  error={!!errors.otp}
                  helperText={errors.otp?.message}
                  // placeholder="Please enter valid 10 digit number"
                  // fullWidth
                />
                {/* <Stack direction={"row"} spacing={2}>
                  {inputRefs.map((ref, index) => (
                    <TextField
                      key={index}
                      inputRef={ref}
                      variant="outlined"
                      size="small"
                      inputProps={{
                        maxLength: 1,
                      }}
                      onChange={(e) => handleInput(e, index)}
                      style={{ width: "38px", textAlign: "center" }}
                      error={!!errors.otp}
                      helperText={errors.otp?.message}
                    />
                  ))}

                </Stack> */}
                <Stack direction={"row"}>
                  {timer !== 10 && (
                    <Typography variant="h6" sx={{ fontSize: "15px" }}>
                      {" "}
                      {timer}{" "}
                    </Typography>
                  )}
                  {showButton && (
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "15px", cursor: "pointer" }}
                      onClick={handleClick}
                    >
                      {" "}
                      Resend OTP
                    </Typography>
                  )}
                </Stack>
                <Button
                  type="submit"
                  size="large"
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  VERIFY
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
};
