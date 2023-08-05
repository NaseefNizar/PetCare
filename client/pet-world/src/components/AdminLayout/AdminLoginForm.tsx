import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAuth } from "../../redux/features/loginSlice";
import { useAppDispatch } from "../../redux/hooks";
import {
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Paper,
} from "@mui/material";

type credentials = {
  email: string;
  password: string;
};

export default function AdminLoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const loginData: credentials = { email: email, password: password };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const HandleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginAuth(loginData)).then(() => navigate("/admin/home"));
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
            <form onSubmit={HandleLogin}>
              <Stack spacing={2}>
                <TextField
                  label="Username"
                  value={email}
                  placeholder="Please enter your email"
                  sx={{ width: "320px", borderColor: "#FF0000" }}
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
                <TextField
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Please enter your Password"
                  sx={{ width: "320px", borderColor: "" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {password ? (
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
                {/* <Typography
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                Don't Have an Account
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#1778F2",
                    cursor: "pointer",
                  }}
                >
                  SignUp
                </Typography>
              </Typography> */}
              </Stack>
            </form>
          </Box>
        </Paper>
      </Stack>
    </>
  );
}
