import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Container,
  Typography,
  Avatar,
  IconButton,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { CloudUpload, PhotoCamera } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { getData, updateProfilePic, updateUser } from "../../redux/features/userSlice";
import { useAppSelector } from "../../redux/hooks";
import { ProfileEdit } from "./ProfileEdit";
import { useNavigate } from "react-router-dom";

const states = [
  {
    value: "select state",
    label: "Select",
  },
  {
    value: "andhra-pradesh",
    label: "Andhra Pradesh",
  },
  {
    value: "arunachal-pradesh",
    label: "Arunachal Pradesh",
  },
  {
    value: "assam",
    label: "Assam",
  },
  {
    value: "bihar",
    label: "Bihar",
  },
  {
    value: "chhattisgarh",
    label: "Chhattisgarh",
  },
  {
    value: "goa",
    label: "Goa",
  },
  {
    value: "gujarat",
    label: "Gujarat",
  },
  {
    value: "haryana",
    label: "Haryana",
  },
  {
    value: "himachal-pradesh",
    label: "Himachal Pradesh",
  },
  {
    value: "jharkhand",
    label: "Jharkhand",
  },
  {
    value: "karnataka",
    label: "Karnataka",
  },
  {
    value: "kerala",
    label: "Kerala",
  },
  {
    value: "madhya-pradesh",
    label: "Madhya Pradesh",
  },
  {
    value: "maharashtra",
    label: "Maharashtra",
  },
  {
    value: "manipur",
    label: "Manipur",
  },
  {
    value: "meghalaya",
    label: "Meghalaya",
  },
  {
    value: "mizoram",
    label: "Mizoram",
  },
  {
    value: "nagaland",
    label: "Nagaland",
  },
  {
    value: "odisha",
    label: "Odisha",
  },
  {
    value: "punjab",
    label: "Punjab",
  },
  {
    value: "rajasthan",
    label: "Rajasthan",
  },
  {
    value: "sikkim",
    label: "Sikkim",
  },
  {
    value: "tamil-nadu",
    label: "Tamil Nadu",
  },
  {
    value: "telangana",
    label: "Telangana",
  },
  {
    value: "tripura",
    label: "Tripura",
  },
  {
    value: "uttar-pradesh",
    label: "Uttar Pradesh",
  },
  {
    value: "uttarakhand",
    label: "Uttarakhand",
  },
  {
    value: "west-bengal",
    label: "West Bengal",
  },
];

// Usage example:
// states.forEach(state => {
//   console.log(`Value: ${state.value}, Label: ${state.label}`);
// });
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

export const UserProfile = () => {
  let user;
  const userString: string | null = localStorage.getItem("user");
  if (userString !== null) {
    user = JSON.parse(userString);
  }

  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userState = useAppSelector((state) => state.user);
  const userData = userState?.userData;
  const blockStat = userState.blockStat
  console.log('hdgfhsgdh',userData?.picture);
  
  console.log("profile", userData);
  // const serverBaseURI = 'http://localhost:8000/images' 


  // const [userDetails, setUserDetails] = useState<UserData | null>(userData);

  const handleUpdate = (updatedDetails: UserData) => {
    // setUserDetails(updatedDetails);
    console.log("axiosupdate", updatedDetails);
    dispatch(updateUser(updatedDetails));
  };

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      
    // setSelectedFile(e.target.files[0]);
    const formData = new FormData();
    formData.append('image', e.target.files[0]) 
    console.log("ff",formData.get('image'));
    
    dispatch(updateProfilePic(formData))
    }
    // console.log("sele",selectedFile);
    
    // if(selectedFile) {
    // const formData = new FormData();
    // formData.append('image', selectedFile) 
    // dispatch(updateProfilePic(formData))
  // };
  };

  useEffect(() => {
    dispatch(getData(user._id));
  }, [userState.successMessage]);
  useEffect(() => {
    blockStat && navigate('/login')
  }, [blockStat]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4"></Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Stack direction={"row"} sx={{display:"flex",alignItems:'self-end'}}>
                      <Avatar
                        src={userData?.picture}
                        sx={{
                          height: 80,
                          mb: 2,
                          width: 80,
                        }}
                      />
                      {/* <img src={imageUrl} width={'100px'} height={'200px'}/> */}
                      {/* <Grid> */}
                      <input
                        type="file"
                        accept="image/*"
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
                        {/* {selectedFile && <p>Selected: {selectedFile.name}</p>} */}
                      </label>
                      </Stack>
                    {/* </Grid> */}
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
                    

                    <Button fullWidth variant="text">
                      Upload picture
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <form
                  autoComplete="off"
                  noValidate
                  //   onSubmit={handleSubmit}
                >
                  <Card>
                    <CardHeader
                      // subheader="The information can be edited"
                      title="Profile"
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <Box sx={{ m: -1.5 }}>
                        <Grid container spacing={3} p={4}>
                          <Grid xs={12} md={6}>
                            {/* <TextField
                              fullWidth
                              label="First name"
                              name="firstName"
                              onChange={handleChange}
                              required
                              defaultValue={userData?.name}
                              value={userData?.name}
                              focused={false}
                              disabled
                            /> */}
                            <Typography gutterBottom variant="h6">
                              First Name : {userData?.firstName}
                            </Typography>
                            <Divider />
                            {/* <Input
        placeholder="Enter text"
        disableUnderline // This removes the default underline/border
        fullWidth */}
                            {/* /> */}
                          </Grid>
                          <Grid xs={12} md={6}>
                            {/* <TextField
                              fullWidth
                              label="Last name"
                              name="lastName"
                              onChange={handleChange}
                              required
                              value={values.lastName}
                            /> */}
                            <Typography gutterBottom variant="h6">
                              Last Name : {userData?.lastName}
                            </Typography>
                            <Divider />
                          </Grid>
                          <Grid xs={12} md={6}>
                            {/* <TextField
                              fullWidth
                              label="Email Address"
                              name="email"
                              onChange={handleChange}
                              required
                              value={userData?.email}
                            /> */}
                            <Typography gutterBottom variant="h6">
                              Email : {userData?.email}
                            </Typography>
                            <Divider />
                          </Grid>
                          <Grid xs={12} md={6}>
                            {/* <TextField
                              fullWidth
                              label="Phone Number"
                              name="phone"
                              onChange={handleChange}
                              type="number"
                              value={userData?.contactNumber}
                            /> */}
                            <Typography gutterBottom variant="h6">
                              PH : {userData?.contactNumber}
                            </Typography>
                            <Divider />
                          </Grid>
                          {/* <Grid xs={12} md={6}> */}
                          {/* <TextField
                              fullWidth
                              label="Country"
                              name="country"
                              onChange={handleChange}
                              required
                              value={values.country}
                            /> */}
                          {/* <Typography gutterBottom variant="h6">
                              Address : {userData?.address}
                            </Typography>
                            <Divider />
                          </Grid> */}
                          {/* <Grid xs={12} md={6}> */}
                          {/* <TextField
                              fullWidth
                              label="Select State"
                              name="state"
                              onChange={handleChange}
                              required
                              select
                              defaultValue={'select state'}
                              SelectProps={{ native: true }}
                              value={values.state}
                            >
                              {states.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField> */}
                          {/* <Typography gutterBottom variant="h6">
                              State : {userData?.name}
                            </Typography>
                            <Divider />
                          </Grid> */}
                        </Grid>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpenDialog(true)}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </form>
              </Grid>
            </Grid>
          </div>
        </Stack>
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
