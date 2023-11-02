import { SubmitHandler, useForm } from "react-hook-form";
import otplogo from "../assets/Secure Privacy.png";
import { useEffect } from "react";

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
import { setNewPassword } from "../redux/features/userSlice";

type Password = {
  password: string;
  confirmPassword: string;
};

export const NewPassword = () => {
  const form = useForm<Password>({
    mode: "onTouched"
  });
  const navigate = useNavigate();
  const actionStat = useAppSelector((state) => state.user.actionStat);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, watch } = form;
  const passwordCheck = watch('password')
  const { errors } = formState;
  const phoneNumber = useAppSelector(state => state.user.phoneNumber)

    useEffect(() => {
      actionStat && navigate('/login')
    },[actionStat])

  const onSubmit: SubmitHandler<Password> = (password) => {
    dispatch(setNewPassword({...password,contactNumber:phoneNumber}))
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
        <Paper sx={{ padding: "30px",width:"40%" }}>
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
            {/* <Typography variant="h4">Forgot Password ?</Typography> */}
            <Typography variant="h6">Enter new password</Typography>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing={4}
                direction={"column"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width:"100%"
                }}
              >
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

<Typography>Re-enter password</Typography>
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

                <Button
                  type="submit"
                  size="large"
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  CHANGE PASSWORD
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
};
