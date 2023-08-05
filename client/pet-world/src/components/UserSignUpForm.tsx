import {
  Stack,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { googleSign, registerUser } from "../redux/features/userSlice";
import { registerVet } from "../redux/features/vetSlice";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: number;
};

type Props = {
  role: "vet" | "groomer" | "user";
};

export const UserSignUpForm = (props: Props) => {
  const form = useForm<FormValues>();
  //     {
  //     defaultValues:{
  //         name:"",
  //         email:"",
  //         password:"",
  //         confirmPassword:"",
  //         contactNumber:0
  //     }
  // }
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const passwordCheck = watch("password");
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const error = useAppSelector((state) => state.user.error);
  // console.log(error);

  console.log({ props });

  const onSubmit = (data: FormValues) => {
    if (props.role === "user") {
      dispatch(registerUser(data));
    } else if (props.role === "vet") {
      console.log(111);
      dispatch(registerVet(data));
    }
  };

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
      <Paper sx={{ padding: "32px", margin: "1rem" }} elevation={4}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <Typography variant="h5" fontSize={30} fontWeight="bold">
              {props.role}Sign Up
            </Typography>
            <Typography>
              Please fill in this form to create an account.
            </Typography>
            <Typography color={"error"}>{error ? error : ""}</Typography>
          </Stack>

          <Grid container my={4} rowSpacing={2} columnSpacing={1}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                type="name"
                placeholder="Please enter your full name"
                {...register("name", {
                  required: "Username is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
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
                label="Contact Number"
                type="email"
                {...register("contactNumber", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Enter valid 10 digit number",
                  },
                })}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber?.message}
                placeholder="Please enter valid 10 digit number"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                placeholder="Please enter a password of minimum 10 characters"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
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
                
                dispatch(googleSign(credentialResponse))
                .then(() => navigate('/'))
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
