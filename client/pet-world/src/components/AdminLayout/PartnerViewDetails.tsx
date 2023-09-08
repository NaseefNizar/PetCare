// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Dialog, { DialogProps } from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Switch from "@mui/material/Switch";
// import {
//   Avatar,
//   Card,
//   CardActions,
//   CardContent,
//   Divider,
//   Typography,
//   Stack,
//   Grid,
//   Paper,
//   Container,
//   CardHeader,
// } from "@mui/material";

// export default function PartnerViewDetails () {
//   const [open, setOpen] = React.useState(false);
//   const [fullWidth, setFullWidth] = React.useState(true);
//   const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
//     setMaxWidth(
//       // @ts-expect-error autofill of arbitrary value is not handled.
//       event.target.value
//     );
//   };

//   const handleFullWidthChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setFullWidth(event.target.checked);
//   };

//   return (
//     <React.Fragment>
//       <Button
//         variant="contained"
//         color="primary"
//         size="small"
//         onClick={handleClickOpen}
//       >
//         View Details
//       </Button>
//       <Dialog
//         fullWidth={fullWidth}
//         maxWidth={maxWidth}
//         open={open}
//         onClose={handleClose}
//       >
//         <DialogContent         sx={{backgroundColor:'#D3D3D3'}}
// >
//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               py: 8,
//             }}
//           >
//             {/* <Paper sx={{height:'70vh'}} elevation={2}> */}
//             <Container maxWidth="lg">
//               <Stack spacing={3}>
//                 {/* <div>
//             <Typography variant="h4"></Typography>
//           </div> */}
//                 {/* <div> */}
//                 <Grid container spacing={3}>
//                   <Grid xs={12} md={6} lg={4}>
//                     <Box
//                       sx={{
//                         alignItems: "center",
//                         display: "flex",
//                         flexDirection: "column",
//                       }}
//                     >
//                       <Stack
//                         direction={"row"}
//                         sx={{ display: "flex", alignItems: "self-end" }}
//                       >
//                         <Avatar
//                           src="/"
//                           sx={{
//                             height: 80,
//                             mb: 2,
//                             width: 80,
//                           }}
//                         />
//                         {/* <img src={imageUrl} width={'100px'} height={'200px'}/> */}
//                         {/* <Grid> */}
//                         <input
//                           type="file"
//                           accept="image/*"
//                           style={{ display: "none" }}
//                           id="image-upload"
//                           // onChange={handleFileChange}
//                         />
                       
//                       </Stack>
//                       {/* </Grid> */}
//                       <Typography gutterBottom variant="h6">
//                         {/* {partnerData?.firstName} {partnerData?.lastName} */}
//                       </Typography>
//                       <Typography color="text.secondary" variant="body2">
//                         {/* {partnerData?.email} */}
//                       </Typography>
//                     </Box>
//                   </Grid>
//                   <Grid xs={12} md={6} lg={8}>
//                     <Box sx={{ m: -1.5 }}>
//                       <Grid container spacing={0.5} p={4}>
//                         {/* <Stack spacing={2}> */}
//                         <Grid item xs={12} md={12}>
//                             <Stack direction={"row"} >
//                           <Typography gutterBottom variant="h6" sx={{width:"120px"}}>
//                             First Name 
//                           </Typography>
//                           <Typography gutterBottom variant="h6">
//                             :
//                           </Typography>
//                           </Stack>
//                         </Grid>
//                         <Grid item xs={12} md={12}>
//                         <Stack direction={"row"} sx={{padding:'5px',borderRadius:"5px",backgroundColor:'#D3D3D3'}}>
//                           <Typography gutterBottom variant="h6" sx={{width:"120px"}}>
//                             Last Name
//                           </Typography>
//                           <Typography gutterBottom variant="h6">
//                             :
//                           </Typography>
//                           </Stack>
//                         </Grid>
//                         <Grid item xs={12} md={12} >
//                             <Stack direction={'row'} sx={{border:'2px solid #808080'}} >
//                           <Typography gutterBottom variant="h6" sx={{width:"120px"}}>
//                             Email
//                           </Typography>
//                           <Typography gutterBottom variant="h6">
//                             :
//                           </Typography>
//                           </Stack>
//                         </Grid>
//                         <Grid item xs={12} md={12}>
//                         <Stack direction={'row'} >

//                           <Typography gutterBottom variant="h6" sx={{width:"120px"}}>
//                             PH
//                           </Typography>
//                           <Typography gutterBottom variant="h6">
//                             :
//                           </Typography>
//                           </Stack>
                          
//                         </Grid>
//                         {/* </Stack> */}
//                       </Grid>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Stack>
//             </Container>
//           </Box>
//         </DialogContent>
//         <DialogActions         sx={{backgroundColor:'#D3D3D3'}}
// >
//           <Button onClick={handleClose}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }
import React from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Container,
  Divider,
  Button,
  Card,
  CardMedia,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getCenterDetails,
//   centerapproval,
// } from "../../../redux/features/admiSlice";
import { ToastContainer, toast } from "react-toastify";
import { getPartnerData } from "../../redux/features/adminVerifySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const PartnerViewDetails = () => {
  const [open, setOpen] = React.useState(false);

  const partnerData = useAppSelector((state) => state.adminVerify.partnerData);

  const dispatch = useAppDispatch();
  const { user_id } = useParams();


  useEffect(() => {
    dispatch(getPartnerData(user_id));
  }, []);

//   useEffect(() => {
//     dispatch(getCenterDetails(id));
//   }, [data.adminActionStatus]);

//   const handleButtonClick = (data) => {
//     console.log(data);
//     dispatch(centerapproval(data));
//   };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   const { register, handleSubmit } = useForm();


//   const onSubmit = (data) => {
//     console.log(data)
//   };

  return (
    <>
      <Grid container>
        <Container sx={{ minHeight: "100vh" }}>
          <Paper
            sx={{
              maxWidth: "1100px",
              margin: "auto",
              marginTop: "50px",
              padding: "20px",
              border: "1px solid #999",
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Box>
              <Typography
                sx={{
                  margin: "10px",
                  marginBottom: "15px",
                  color: "#1778F2",
                  fontWeight: "bold",
                }}
              >
                Basic Information
              </Typography>
              <Divider
                sx={{
                  width: "100%",
                  backgroundColor: "#c0c0c0",
                  margin: "0 auto 20px auto",
                  marginLeft: "10px",
                  marginRight: "30px",
                }}
              />
              <Stack direction="row" spacing={15}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      CENTER NAME
                      <Typography>{partnerData?.firstName}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      EMAIL ADDRESS
                      {/* <Typography>{CenterData?.owner?.email}</Typography> */}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      CONTACT NUMBER
                      {/* <Typography>{CenterData?.ContactNumber}</Typography> */}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      BUILDING NAME
                      {/* <Typography>{CenterData?.BuildingName}</Typography> */}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      AREA
                      {/* <Typography>{CenterData?.Area}</Typography> */}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      LANDMARK
                      {/* <Typography>{CenterData?.LandMark}</Typography> */}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      CITY
                      {/* <Typography>{CenterData?.City}</Typography> */}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      STATE
                      {/* <Typography>{CenterData?.State}</Typography> */}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
            <Box>
              <Typography
                sx={{
                  margin: "30px",
                  marginBottom: "15px",
                  color: "#1778F2",
                  fontWeight: "bold",
                }}
              >
                Your Addresses
              </Typography>
              <Divider
                sx={{
                  width: "98%",
                  backgroundColor: "#c0c0c0",
                  margin: "0 auto 20px auto",
                  marginLeft: "10px",
                  marginRight: "30px",
                }}
              />
              <Stack direction="row" spacing={15}>
                {/* <Grid container spacing={3}>
                  {CenterData?.CenterImages &&
                  CenterData?.CenterImages.length > 0 ? (
                    CenterData.CenterImages.map((centerimage, index) => (
                      <Grid item xs={12} md={4}>
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            "& > :not(style)": {
                              m: 1,
                              width: 300,
                              height: 200,
                              marginLeft: "60px",
                              // maxWidth: 220,
                              border: "2px dashed gray",
                            },
                          }}
                        >
                          <Stack>
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                // color: "#1778F2",
                                // fontWeight: "bold",
                              }}
                            >
                              <Card sx={{ width: "200px" }}>
                                <CardMedia
                                  component="img"
                                  sx={{ width: 200, margin: 0, height: 150 }}
                                  image={`http://localhost:5000/images/${CenterData?.CenterImages?.[index]}`}
                                  alt="no Image"
                                />
                              </Card>
                            </Typography>
                            <Stack
                              direction={"row"}
                              spacing={1}
                              marginBottom={"10PX"}
                              marginLeft={"10px"}
                            ></Stack>
                          </Stack>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Typography>No certificate images available.</Typography>
                  )}
                </Grid> */}
              </Stack>
            </Box>
            <Box>
              <Typography
                sx={{
                  margin: "30px",
                  marginBottom: "15px",
                  color: "#1778F2",
                  fontWeight: "bold",
                }}
              >
                Center Certificates
              </Typography>
              <Divider
                sx={{
                  width: "98%",
                  backgroundColor: "#c0c0c0",
                  margin: "0 auto 20px auto",
                  marginLeft: "10px",
                  marginRight: "30px",
                }}
              />
              <Stack direction="row" spacing={15}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        "& > :not(style)": {
                          m: 1,
                          width: 300,
                          height: 200,
                          marginLeft: "60px",
                          // maxWidth: 220,
                          border: "2px dashed gray",
                        },
                      }}
                    >
                      <Stack>
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            // color: "#1778F2",
                            // fontWeight: "bold",
                          }}
                        >
                          {/* <Card sx={{ width: "200px" }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 200, margin: 0, height: 150 }}
                              image={`http://localhost:5000/images/${CenterData?.CertificateImages?.[0]?.NABH}`}
                              alt="no Image"
                            />
                          </Card> */}
                        </Typography>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          marginBottom={"10PX"}
                          marginLeft={"10px"}
                        ></Stack>
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        "& > :not(style)": {
                          m: 1,
                          width: 300,
                          height: 200,
                          marginLeft: "60px",
                          // maxWidth: 220,
                          border: "2px dashed gray",
                        },
                      }}
                    >
                      <Stack>
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            // color: "#1778F2",
                            // fontWeight: "bold",
                          }}
                        >
                          {/* <Card sx={{ width: "200px" }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 200, margin: 0, height: 150 }}
                              image={`http://localhost:5000/images/${CenterData?.CertificateImages?.[1]?.NABL}`}
                              alt="no Image"
                            />
                          </Card> */}
                        </Typography>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          marginBottom={"10PX"}
                          marginLeft={"10px"}
                        ></Stack>
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        "& > :not(style)": {
                          m: 1,
                          width: 300,
                          height: 200,
                          marginLeft: "60px",
                          // maxWidth: 220,
                          border: "2px dashed gray",
                        },
                      }}
                    >
                      <Stack>
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            // color: "#1778F2",
                            // fontWeight: "bold",
                          }}
                        >
                          {/* <Card sx={{ width: "200px" }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 200, margin: 0, height: 150 }}
                              image={`http://localhost:5000/images/${CenterData?.CertificateImages?.[2]?.ISO}`}
                              alt="no Image"
                            />
                          </Card> */}
                        </Typography>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          marginBottom={"10PX"}
                          marginLeft={"10px"}
                        ></Stack>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
              {/* {CenterData?.isVerified ? (
                <Button
                  variant="contained"
                  sx={{ margin: "20px" }}
                  onClick={() => handleButtonClick(id)}
                >
                  Approved
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ margin: "20px" }}
                  onClick={() => handleButtonClick(id)}
                >
                  Approve
                </Button>
              )}
              {!CenterData?.isVerified ? (
                <Button
                  variant="contained"
                  sx={{
                    background: "#d32f2f",
                    color: "white",
                    "&:hover": {
                      background: "#d32f2f",
                    },
                  }}
                  onClick={handleClickOpen}
                >
                  Reject
                </Button>
              ) : (
                ""
              )} */}
            </Box>
          </Paper>
        </Container>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
      {/* <form onSubmit={handleSubmit()}>
        <DialogTitle>Reason For Reject</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            id="outlined-multiline-static"
            multiline
            {...register("rejectreason")}
            label="Reason for Reject"
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
        </form> */}
      </Dialog>
    </>
  );
};

