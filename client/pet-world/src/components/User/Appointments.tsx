import { useEffect } from "react";
import {
  // Box,
  // Button,
  // Card,
  // CardActions,
  // CardContent,
  // CardHeader,
  // Divider,
  // Stack,
  // Container,
  Typography,
  // Avatar,
  // IconButton,
  Paper,
  Grid,
} from "@mui/material";
// import VideoCallIcon from "@mui/icons-material/VideoCall";
// import { useDispatch } from "react-redux";
// import { updateProfilePic, updateUser } from "../../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {  useNavigate } from "react-router-dom";
import { usersAppointments } from "../../redux/features/appointmentSlice";

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
  const appointments:any = appointmentState.appointments;
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
        {appointments.length !== 0 ? (
          appointments?.map((appointment:any) => (
            <Grid item md={12} lg={12} sm={12} xs={6}>
              <Paper sx={{ p: "10px" }}>
                <Grid container spacing={2}>
                  <Grid item>
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
                  <Grid item>
                    <Typography>
                      <strong>
                        Dr. {appointment?.partnerId.firstName}{" "}
                        {appointment?.partnerId.lastName}
                      </strong>
                    </Typography>
                    <Typography>{appointment?.partnerId.email}</Typography>
                    <Typography>
                      {appointment?.partnerId.contactNumber}
                    </Typography>
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
