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
import Dialog from "@mui/material/Dialog";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
// import {
//   getCenterDetails,
//   centerapproval,
// } from "../../../redux/features/admiSlice";
import { ToastContainer } from "react-toastify";
import { getPartnerData } from "../../redux/features/adminVerifySlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { approval } from "../../redux/features/adminSlice";
import { baseUrl } from "../../utils/constants";

export const PartnerViewDetails = () => {
  const [open, setOpen] = React.useState(false);

  const partnerData: any = useAppSelector(
    (state) => state.adminVerify.partnerData
  );
  console.log(partnerData);

  const stat = useAppSelector((state) => state.admin.stat);
  // console.log('stat',stat);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user_id } = useParams<{ user_id: any }>();
  // const user_id: string = userid as string
  console.log(user_id);

  const handleApproval = (id: string) => {
    dispatch(approval(id));
  };

  useEffect(() => {
    dispatch(getPartnerData(user_id));
  }, []);

  useEffect(() => {
    stat && navigate("/admin/verify-partners");
  }, [stat]);

  //   useEffect(() => {
  //     dispatch(getCenterDetails(id));
  //   }, [data.adminActionStatus]);

  //   const handleButtonClick = (data) => {
  //     console.log(data);
  //     dispatch(centerapproval(data));
  //   };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

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
                      NAME
                      <Typography>
                        {partnerData?.firstName} {partnerData?.lastName}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      EMAIL ADDRESS
                      <Typography>{partnerData?.email}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      CONTACT NUMBER
                      <Typography>{partnerData?.contactNumber}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      CENTER NAME
                      <Typography>{partnerData?.centreName}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      AREA
                      <Typography>{partnerData?.area}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      LANDMARK
                      <Typography>{partnerData?.pincode}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      LOCALITY
                      <Typography>{partnerData?.locality}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      STATE
                      <Typography>{partnerData?.state}</Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
            <Box>
              {/* <Typography
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
              /> */}
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
                DOCUMENTS
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
                          <Card sx={{ width: "200px" }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 200, margin: 0, height: 150 }}
                              image={`${baseUrl}/users/${partnerData?.poi}`}
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
                          <Card sx={{ width: "200px" }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 200, margin: 0, height: 150 }}
                              image={`${baseUrl}/users/${partnerData?.poq}`}
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
                            color: "#1778F2",
                            fontWeight: "bold",
                          }}
                        >
                          <Card sx={{ width: "200px" }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 200, margin: 0, height: 150 }}
                              image={`${baseUrl}/users/${partnerData?.photo}`}
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
              <Box display={"flex"} justifyContent={"flex-end"}>
                {/* <Button
                  variant="contained"
                  sx={{ margin: "20px" }}
                  color="error"
                >
                  Reject
                </Button> */}
                {!partnerData.is_verified && (
                  <Button
                    variant="contained"
                    sx={{ margin: "20px" }}
                    color="success"
                    onClick={() => handleApproval(user_id)}
                  >
                    Approve
                  </Button>
                )}
              </Box>
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
