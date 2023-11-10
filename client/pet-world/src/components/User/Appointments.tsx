import { useEffect } from "react";
import { Button, Stack, Typography, Paper, Grid, Badge } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
// import VideoCallIcon from "@mui/icons-material/VideoCall";
// import { useDispatch } from "react-redux";
// import { updateProfilePic, updateUser } from "../../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { usersAppointments } from "../../redux/features/appointmentSlice";
import moment from "moment";

export const Appointments = () => {
  // let user;
  // const userString: string | null = localStorage.getItem("user");
  // if (userString !== null) {
  //   user = JSON.parse(userString);
  // }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const appointmentState = useAppSelector((state) => state.appointment);
  const appointments: any = appointmentState.appointments;
  const currDate = new Date();
  // console.log("app", appointments);

  // const userData = userState?.userData;
  const blockStat = userState.blockStat;

  useEffect(() => {
    // dispatch(getData(user._id));
    dispatch(usersAppointments());
  }, [userState.successMessage]);
  useEffect(() => {
    blockStat && navigate("/login");
  }, [blockStat]);

  return (
    // <Card>
    //   <CardHeader title="Appointments" />
    //   <CardContent sx={{ pt: 0 }}>
    //     <Box sx={{ m: -1.5 }}>
    //       <Grid container spacing={3} sx={{ pt: 0 }}>
    //         {appointments?.map((appointment) => (
    //           <Grid
    //             item
    //             key={appointment._id}
    //             xs={12}
    //             md={12}
    //             lg={12}
    //             sx={{ borderRadius: "5px", border: "1px solid" }}
    //           >
    //             <Avatar
    //               alt={`${appointment?.partnerId.firstName} ${appointment?.partnerId.lastName}`}
    //               src={appointment.partnerId.photo}
    //               sx={{ width: 56, height: 56 }}
    //             />

    //           </Grid>
    //         ))}
    //       </Grid>
    //     </Box>
    //   </CardContent>
    // </Card>
    <Paper sx={{ padding: "30px" }}>
      <Grid container spacing={2}>
        <Grid item md={12} lg={12} sm={12} xs={6}>
          <Typography sx={{ fontSize: "20px" }}>
            <strong>Appointments</strong>
          </Typography>
        </Grid>
        {appointments?.length !== 0 ? (
          appointments?.map((appointment: any) => (
            <Grid item xs={12}>
              <Paper sx={{ p: "10px", display: "flex" }}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <img
                      alt={`${appointment?.partnerId.firstName} ${appointment?.partnerId.lastName}`}
                      src={appointment.partnerId.photo}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "5px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container direction={"column"} spacing={1}>
                      <Grid item xs={3}>
                        <Typography>
                          <strong>
                            Dr. {appointment?.partnerId.firstName}{" "}
                            {appointment?.partnerId.lastName}
                          </strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          {" "}
                          <span style={{ marginRight: "5px" }}>
                            <EmailIcon fontSize="small" />
                          </span>
                          <span>{appointment?.partnerId.email}</span>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          <span style={{ marginRight: "5px" }}>
                            <PhoneIcon fontSize="small" />
                          </span>

                          {appointment?.partnerId.contactNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                  >
                    <div>
                      
                      <Typography textAlign={"end"}>
                      <Badge sx={{marginRight:"10px"}}
                        color="success" 
                        variant="dot"
                      ></Badge>
                        Scheduled on{" "}
                        {moment(appointment?.date).format("MMMM DD, YYYY")}
                      </Typography>
                      <Typography textAlign={"center"}>
                        at {appointment?.slot}
                      </Typography>
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {/* <Typography textAlign={"center"}>View details</Typography> */}
                      {/* <Typography textAlign={"center"}>View details</Typography> */}
                      {currDate < new Date(appointment?.date) && <Stack direction={"row"} spacing={2}>
                        <Button color="error" variant="outlined">
                          cancel
                        </Button>
                        <Button variant="outlined">Reschedule</Button>
                      </Stack>}
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item md={12} lg={12} sm={12} xs={6}>
            <Typography>No Appointments</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
