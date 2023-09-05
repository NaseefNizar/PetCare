import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/features/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useAppSelector } from "../../redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import {
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { loginPartner } from "../../redux/features/partnerSlice";

type Props = {
  role: "User" | "Vet" | "Groomer";
};

type Credentials = {
  email: string;
  password: string;
};

export default function UserLoginForm(props: Props) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  // const partnerData = useAppSelector((state) => state.vet);
  const [isUser, setIsUser] = useState(true);
  const userState = useAppSelector((state) => state.user);
  const partnerState = useAppSelector((state) => state.vet);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<Credentials>();
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const pswd = watch("password");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (data: Credentials) => {
    if (isUser) {
      dispatch(loginUser(data));
      //  .then(() => navigate('/'))
    } else {
      dispatch(loginPartner(data));
      // .then(() => navigate('/vet/home'))
    }
  };

  const role = isUser ? 'user' : 'partner';

  useEffect(() => {
    userData.error && toast.error(userData.error, { theme: "colored" });
    userData.loginSuccess && navigate("/");
  }, [userData.loginSuccess, userData.error]);

  useEffect(() => {
    partnerState.error && toast.error(partnerState.error, { theme: "colored" });
    partnerState.loginSuccess && navigate("/partner/home");
  }, [partnerState.loginSuccess, partnerState.error]);

  useEffect(() => {
    userState.successMessage &&
      toast.success(userState.successMessage, { theme: "colored" });
  }, [userState.successMessage]);
  useEffect(() => {
    partnerState.registerStatus &&
      toast.success('Sign up successfull', { theme: "colored" });
  }, [partnerState.registerStatus]);

  return (
    <>
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
        <Paper elevation={2} sx={{ width: 500, height: 500 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "150px auto",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2}>
                <Stack
                  direction={"row"}
                  spacing={2}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography>
                    {isUser ? "User Login" : "Partner Login"}
                  </Typography>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    onClick={() => setIsUser(!isUser)}
                  >
                    {isUser ? "Not a user ?" : "Not a partner ?"}
                  </Typography>
                </Stack>
                <TextField
                  label="Username"
                  //   value={email}
                  placeholder="Please enter your email"
                  sx={{ width: "320px", borderColor: "#FF0000" }}
                  {...register("email", {
                    required: "Username is required",
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                ></TextField>
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Please enter your Password"
                  sx={{ width: "320px", borderColor: "" }}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {pswd ? (
                            showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )
                          ) : (
                            ""
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
                <Button color="secondary" variant="contained" type="submit">
                  Login
                </Button>
                <Stack direction={"row"}>
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    Don't Have an Account ?
                  </Typography>
                  <Typography component={Link} to="/signup">
                    SignUp
                  </Typography>
                </Stack>
                <Typography component={Link} to='/forgotpassword'>
                  Forgot Password?
                </Typography>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Stack>
    </>
  );
}
