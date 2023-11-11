import {  useEffect, useState } from "react";
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
  Paper
} from "@mui/material";
import {  PhotoCamera } from "@mui/icons-material";
// import { useDispatch } from "react-redux";
// import { getData, updateProfilePic, updateUser } from "../../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ProfileEdit } from "../User/ProfileEdit";
import { getPartnerData, updatePartner, updatePartnerProfilePic } from "../../redux/features/partnerSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/constants";



export const PartnerProfile = () => {
  // let user;
  // const userString: string | null = localStorage.getItem("partner");
  // if (userString !== null) {
  //   user = JSON.parse(userString);
  // }

  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useAppDispatch()
  const partnerState = useAppSelector((state) => state.vet);
  const partnerData = partnerState?.userData;
  // const pic   = partnerData?.pic 
  const navigate = useNavigate()


  const handleUpdate = (updatedDetails:any) => {
    // setUserDetails(updatedDetails);
    // console.log("axiosupdate", updatedDetails);
    dispatch(updatePartner(updatedDetails));
  };

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // console.log(e.target.files);
      
    // setSelectedFile(e.target.files[0]);
    const formData = new FormData();
    formData.append('image', e.target.files[0]) 
    // console.log("ff",formData.get('image'));
    
    dispatch(updatePartnerProfilePic(formData))
    }
    // console.log("sele",selectedFile);
    
    // if(selectedFile) {
    // const formData = new FormData();
    // formData.append('image', selectedFile) 
    // dispatch(updateProfilePic(formData))
  // };
  };

  useEffect(() => {    
    dispatch(getPartnerData());
  }, [partnerState.successMessage]);

  useEffect(() => {
    // console.log('profile');
    !localStorage.getItem('partner') && navigate('/login')
    // dispatch(getPartnerData());
  }, [localStorage.getItem('partner')]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Paper sx={{height:'70vh'}} elevation={2}>
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
                        // src={`${baseUrl}/users/${partnerData?.photo}`} 
                        src={`${baseUrl}/users/${partnerData}`} 
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
                        {partnerData?.firstName} {partnerData?.lastName}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {partnerData?.email}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    

                    <Button fullWidth variant="text">
                      Complete KYC
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                {/* <form
                  autoComplete="off"
                  noValidate
                  //   onSubmit={handleSubmit}
                > */}
                  <Card>
                    <CardHeader
                      title="Profile"
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <Box sx={{ m: -1.5 }}>
                        <Grid container spacing={3} p={4}>
                          <Grid xs={12} md={6}>
                            
                            <Typography gutterBottom variant="h6">
                              First Name : {partnerData?.firstName}
                            </Typography>
                            <Divider />
                            
                          </Grid>
                          <Grid xs={12} md={6}>
                                                   <Typography gutterBottom variant="h6">
                              Last Name : {partnerData?.lastName}
                            </Typography>
                            <Divider />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <Typography gutterBottom variant="h6">
                              Email : {partnerData?.email}
                            </Typography>
                            <Divider />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <Typography gutterBottom variant="h6">
                              PH : {partnerData?.contactNumber}
                            </Typography>
                            <Divider />
                          </Grid>
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
                {/* </form> */}
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
      </Paper>

      {partnerData && (
        <ProfileEdit
          open={openDialog}
          userDetails={partnerData}
          onClose={() => setOpenDialog(false)}
          onUpdate={handleUpdate}
        />
      )}
    </Box>
  );
};
