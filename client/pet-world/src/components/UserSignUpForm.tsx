import {
  Stack,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { GoogleLogin } from "@react-oauth/google";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { googleSign, registerUser, sendOtp, setSignupData } from "../redux/features/userSlice";
import { registerPartner,sendOtpPartner,setSignupDataPartner } from "../redux/features/partnerSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  userId: string;
  // lastName?:string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: number;
};

type Props = {
  role: "Vet" | "Groomer" | "User";
};

export const UserSignUpForm = (props: Props) => {
  const form = useForm<FormValues>({
    mode: "onTouched",
  });

  const { register, handleSubmit, formState, watch, reset } = form;
  const { errors, isSubmitSuccessful } = formState;
  const passwordCheck = watch("password", "");
  // console.log("P", passwordCheck);

  // const [ signupData, setSignupData ] = useState<FormValues | null>(null)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userState = useAppSelector((state) => state.user);
  const error = userState.error
  const otpSendStat = userState.otpSendStat

  const partnerState = useAppSelector((state) => state.vet);
  const errorPartner = partnerState.error
  const otpSendStatPartner = partnerState.otpSendStat


  const data = useAppSelector((state) => state);
  const signupSuccess = data.user.registerStatus || data.vet.registerStatus;

  const { score } = zxcvbn(passwordCheck);
  // console.log("score", score);
  // const strengthColors = ['success', '#ff9900', '#ffff00', '#33cc33', '#00ff00'];
  const strengthColors:string[] = ["error", "error",'secondary',"info", "success"];
  const strengthColor = strengthColors[score];


  const onSubmit:SubmitHandler<FormValues> = (formData) => {
    if (props.role === "User") {
      dispatch(setSignupData(formData))
      dispatch(sendOtp(formData));
    } else if (props.role === "Vet" || "Groomer") {
      console.log(111);
      dispatch(setSignupDataPartner({...formData,role:props.role}))
      dispatch(sendOtpPartner({ ...formData, role: props.role }));
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    if(otpSendStat) {
      navigate('/otp')
    }
    error && toast.error(error, { theme: "colored"})
  },[otpSendStat,error])

  useEffect(() => {
    if(otpSendStatPartner) {
      navigate('/otp')
    }
    error && toast.error(error, { theme: "colored"})
  },[otpSendStatPartner,errorPartner])

  useEffect(() => {
    if (signupSuccess) {
      toast.success("Sign up successfull", { theme: "colored" });
    }
  }, [signupSuccess]);

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        // margin:"20px auto"
      }}
    >
      <ToastContainer />

      <Paper sx={{ padding: "32px", margin: "1rem", width:'30%' }} elevation={4}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <Typography variant="h5" fontSize={30} fontWeight="bold">
              {props.role} Sign Up
            </Typography>
            <Typography >
              Please fill in this form to create an account.
            </Typography>
            {/* <Typography color={"error"}>{error ? error : ""}</Typography> */}
          </Stack>

          <Grid
            container
            my={4}
            rowSpacing={3}
            columnSpacing={1}
            // direction={"column"}
          >
            <Grid item xs={6}>
              <TextField
                size="small"
                label="User ID"
                type="name"
                placeholder="Please enter your name"
                {...register("userId", {
                  required: "UserID is required",
                })}
                error={!!errors.userId}
                helperText={errors.userId?.message}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Enter valid email",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                placeholder="Please enter your valid email id"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                label="Contact Number"
                // type="email"
                {...register("contactNumber", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Enter valid 10 digit number",
                  }
                })}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber?.message}
                placeholder="Please enter valid 10 digit number"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                label="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password  must be at least 8 characters long & must contain atleast one character, one uppercase & one lowercase",
                  },
                  minLength: {
                    value: 8,
                    message:
                      "Password  must be at least 8 characters long & must contain atleast one character, one uppercase & one lowercase",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                placeholder="Please enter a password "
                fullWidth
              ></TextField>


              {/* <LinearProgress color="success" variant="determinate" value={75} /> */}
              {score > 0 && (
                <LinearProgress
                  style={{ marginTop: "10px", backgroundColor: "lightgray" }}
                  variant="determinate"
                  value={(score + 1) * 20}
                  color={strengthColor}
                />
              ) }
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                label="Password Confirmation"
                type="password"
                placeholder="Please re-enter the password"
                {...register("confirmPassword", {
                  required: "Password do not match",
                  validate: (fieldValue) => {
                    return (
                      fieldValue === passwordCheck || "Password doesnt match"
                    );
                  },
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                fullWidth
              ></TextField>
            </Grid>
          </Grid>
          <Stack direction={"column"} spacing={2} alignItems={"center"}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
            >
              Sign Up
            </Button>
            {/* <Typography>or</Typography> */}
            {/* <Button variant="contained" size="large" startIcon={<MyIcon />}>
              Sign Up with google
            </Button> */}
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);

                dispatch(googleSign(credentialResponse)).then(() =>
                  navigate("/")
                );
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
};
