import { SubmitHandler, useForm } from "react-hook-form";
import otplogo from "../assets/Secure Privacy.png";
import { useRef, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { OtpInput } from "./OtpInput";
import {
  Stack,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { registerUser, sendOtp } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import {
  registerPartner,
  sendOtpPartner,
} from "../redux/features/partnerSlice";

type Otp = {
  otp: string;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

export const Otp = () => {
  const form = useForm<Otp>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const error = userState.error;
  const signupDataUser = userState.signupData;
  const registerStatus = userState.registerStatus;

  const partnerState = useAppSelector((state) => state.vet);
  const errorPartner = partnerState.error;
  const signupDataPartner = partnerState.signupData;
  const registerStatusPartner = partnerState.registerStatus;

  // console.log('signupdatapartner',signupDataPartner);

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [showButton, setShowButton] = useState(false);
  const [timer, setTimer] = useState(0);
  const [reset, setReset] = useState(false);

  const onSubmit: SubmitHandler<Otp> = (otp): void => {
    if (signupDataUser) {
      console.log(signupDataUser);

      dispatch(registerUser({ ...signupDataUser, ...otp }));
    } else if (signupDataPartner) {
      dispatch(registerPartner({ ...signupDataPartner, ...otp }));
    }
  };

  const handleClick = () => {
    setTimer(0);
    setReset((prev) => !prev);
    setShowButton(false);
    if (signupDataUser) {
      console.log("otp", signupDataUser);

      dispatch(sendOtp(signupDataUser));
    } else if (signupDataPartner) {
      dispatch(sendOtpPartner(signupDataPartner));
    }
  };

  useEffect(() => {
    registerStatus && navigate("/login");
    error && toast.error(error, { theme: "colored" });
  }, [registerStatus, error]);
  useEffect(() => {
    registerStatusPartner && navigate("/login");
    errorPartner && toast.error(error, { theme: "colored" });
  }, [registerStatusPartner, errorPartner]);

  useEffect(() => {
    console.log(111111);

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
    <>
      <ToastContainer />
      {/* <Box
        sx={{
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ padding: "30px",borderRadius:'20px' }}>
          <Stack
            spacing={4}
            direction={"column"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img width="100px" height="100px" src={otplogo} alt="" />
            <Typography variant="h5">OTP VERIFICATION</Typography>
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
      </Box> */}

      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3,}} >
        <StyledPaper
          sx={{
            my: 5,
            mx: "auto",
            p: 4,
            borderRadius: "20px",
          }}
          elevation={4}
        >
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // border: "1px solid red",
            }}
          >
            <Grid item lg={12} sm={12} md={12}>
              <Grid container spacing={4}>
                <Grid
                  container
                  item
                  lg={12}
                  sm={12}
                  md={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  spacing={2}
                >
                  <Grid item>
                    <img width="75px" height="75px" src={otplogo} alt="" />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">VERIFY OTP</Typography>
                  </Grid>
                  <Grid item >
                    <Typography  sx={{fontSize:'17px',lineHeight: '2'}} variant="h6">
                      Please enter the 6 digit OTP sent to your registered mobile number ending
                      with +91xxxxxxx
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item lg={12} sm={12} md={12}>
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
                            Resend OTP
                          </Typography>
                        )}
                      </Stack>
                      <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        color="secondary"
                      >
                        VERIFY
                      </Button>
                    </Stack>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            {/* </Paper> */}
          </Grid>
        </StyledPaper>
      </Box>
    </>
  );
};
