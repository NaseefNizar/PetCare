import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/features/userSlice";
import { useAppDispatch } from "../../redux/hooks";
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

type Credentials = {
  email: string;
  password: string;
};

export default function UserLoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<Credentials>();
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const pswd = watch("password");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  //   const HandleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     dispatch(loginAuth(loginData)).then(() => navigate("/admin/home"));
  //   };
  const onSubmit = (data: Credentials) => {
    dispatch(loginUser(data))
    // localStorage.setItem
    .then(() => navigate('/'))
  };

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
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  Don't Have an Account ?
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "secondary",
                    cursor: "pointer",
                  }}
                >
                  SignUp
                </Typography>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Stack>
    </>
  );
}
