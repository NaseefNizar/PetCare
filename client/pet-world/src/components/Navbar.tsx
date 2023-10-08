import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logOut } from "../redux/features/userSlice";

export const Navbar = () => {
  const settings = ["Profile", "Logout"];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch()
  const userData = useAppSelector(state => state.user.userData)

  const navigate = useNavigate()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(logOut())
  };

  const data = localStorage.getItem('user')
  let user
  if(data) {
    user = JSON.parse(data)
    console.log("navbar", user);
  }

  return (
    <AppBar position="static" sx={{backgroundColor:'#f8f8f8'}}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <PetsIcon color="secondary" sx={{ fontSize: 40 }} />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1,color:"black" }}>
          PETCARE
        </Typography>

        {/* <Stack direction="row" spacing={2}>
          {localStorage.getItem('user') ? (
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            <AccountCircleIcon />
          </Avatar>) : (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
          )}
        </Stack> */}

        <Box sx={{ flexGrow: 0 }}>
          {localStorage.getItem("user") ? (
            <>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.name} src={userData?.picture} />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* {settings.map((setting) => ( */}
                <MenuItem onClick={handleCloseUserMenu}>
                  {/* <Typography component={Link} textAlign="center" to='/user/profile'>Profile</Typography> */}
                  <Button component={Link} to='/user/profile'>Profile</Button>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button  onClick={handleLogout}>
                    Logout
                  </Button>
                </MenuItem>
                {/* // ))} */}
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
