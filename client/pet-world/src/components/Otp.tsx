import { SubmitHandler, useForm } from "react-hook-form";
import otplogo from "../assets/Secure Privacy.png";
import { useRef, useEffect, useState } from "react";
import { OtpInput } from "./OtpInput";
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
import { registerUser, sendOtp } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

type Otp = {
  otp: string;
};

export const Otp = () => {
  const form = useForm<Otp>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const error = userState.error;
  const signupData = userState.signupData;
  const registerStatus = userState.registerStatus;
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [showButton, setShowButton] = useState(false);
  const [timer, setTimer] = useState(0);

  const onSubmit: SubmitHandler<Otp> = (otp) => {
    console.log({ ...signupData, ...otp });

    dispatch(registerUser({ ...signupData, ...otp }));
  };

  const handleClick = () => {
    setTimer(0);
    setShowButton(false);
    dispatch(sendOtp(signupData));
  };

  useEffect(() => {
    registerStatus && navigate("/login");
    error && toast.error(error, { theme: "colored" });
  }, [registerStatus, error]);

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
              Please enter the OTP sent to your register number ending with 450
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
                <Stack direction={"row"} spacing={2}>
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

                </Stack>
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
