import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Container,
  Typography,
  Avatar,
  IconButton,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import {  PhotoCamera } from "@mui/icons-material";
// import { useDispatch } from "react-redux";
import {
  getData,
  updateProfilePic,
  updateUser,
} from "../../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ProfileEdit } from "./ProfileEdit";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl } from "../../utils/constants";

type UserData = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  contactNumber: string;
  picture?: string;
  role: string;
  _id: string;
  __v: number;
};

export const ProfileLayout = () => {
  // let user:any;
  // const userString: string | null = localStorage.getItem("user");
  // if (userString !== null) {
  //   user = JSON.parse(userString);
  // }

  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const userData = userState?.userData;
  const blockStat = userState.blockStat;

  const handleUpdate = (updatedDetails: UserData) => {
    // setUserDetails(updatedDetails);
    // console.log("axiosupdate", updatedDetails);
    dispatch(updateUser(updatedDetails));
  };

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedTypes = ["image/jpeg", "image/jpg"]
      if (allowedTypes.includes(file.type)) {

      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(updateProfilePic(formData));
      } else {
        toast.error("Please select a valid JPEG or JPG image file.", { theme: "colored" })
      }
    }
    // console.log("sele",selectedFile);

    // if(selectedFile) {
    // const formData = new FormData();
    // formData.append('image', selectedFile)
    // dispatch(updateProfilePic(formData))
    // };
  };

  useEffect(() => {
    dispatch(getData());
  }, [userState.successMessage]);
  useEffect(() => {
    blockStat && navigate("/login");
  }, [blockStat]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 5,
      }}
    >
      <ToastContainer/>
      <Container>
        <Grid container spacing={2}>
          <Grid lg={3}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Stack
                    direction={"row"}
                    sx={{ display: "flex", alignItems: "self-end" }}
                  >
                    <Avatar
                      src={`${baseUrl}/users/${userData?.picture}`}
                      sx={{
                        height: 80,
                        mb: 2,
                        width: 80,
                      }}
                    />
                    <input
                      type="file"
                      accept="image/jpeg, image/jpg"
                      style={{ display: "none" }}
                      id="image-upload"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="image-upload">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </Stack>
                  <Typography gutterBottom variant="h6">
                    {userData?.firstName} {userData?.lastName}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {userData?.email}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  fullWidth
                  variant="text"
                  component={Link}
                  to="/user/profileinfo"
                >
                  Profile
                </Button>
              </CardActions>
              <Divider />
              <CardActions>
                <Button
                  fullWidth
                  variant="text"
                  component={Link}
                  to="/user/appointment"
                >
                  Appointments
                </Button>
              </CardActions>
              <Divider />
              <CardActions>
                <Button
                  fullWidth
                  variant="text"
                  component={Link}
                  to="/user/petdetails"
                >
                  Pet Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid lg={9} md={9} sm={9}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>

      {userData && (
        <ProfileEdit
          open={openDialog}
          userDetails={userData}
          onClose={() => setOpenDialog(false)}
          onUpdate={handleUpdate}
        />
      )}
    </Box>
  );
};
