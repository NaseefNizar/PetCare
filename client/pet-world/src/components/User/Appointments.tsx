import { useEffect } from "react";
import { Button, Stack, Typography, Paper, Grid, Badge } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
// import VideoCallIcon from "@mui/icons-material/VideoCall";
// import { useDispatch } from "react-redux";
// import { updateProfilePic, updateUser } from "../../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import {
  cancelAppointment,
  // getInvoice,
  usersAppointments,
} from "../../redux/features/appointmentSlice";
import moment from "moment";
import { baseUrl } from "../../utils/constants";
import easyinvoice from 'easyinvoice';

export const Appointments = () => {
  // let user;
  // const userString: string | null = localStorage.getItem("user");
  // if (userString !== null) {
  //   user = JSON.parse(userString);
  // }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  console.log(userState);
  
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

  const handleCancel = (
    appointmentId: any,
    slot: any,
    partnerId: any,
    date: any
  ) => {
    console.log(appointmentId, slot, partnerId, date);

    dispatch(cancelAppointment({ appointmentId, slot, partnerId, date }));
  };

  function getSampleData(firstName:string | undefined,lastName:string | undefined,date:any,fees:any,petName:any,petBreed:any,petKind:any) {
    return {
      // "images": {
      //   "background": "https://public.easyinvoice.cloud/pdf/sample-background.pdf"
      // },
      "sender": {
        "company": "The PetNest",
        "address": "Street 123",
        "zip": "691003",
        "city": "Banglore",
        "country": "India"
      },
      "client": {
        "company": `${firstName} ${lastName}`,
        // "address": "Clientstreet 456",
        // "zip": "4567 CD",
        // "city": "Clientcity",
        "country": "India"
      },
      "information": {
        // "number": "2022.0001",
        "date": date,
        // "due-date": "15.1.2022"
      },
      "products": [
        {
          "quantity": "1",
          "description": `Consultation for ${petName}, a ${petBreed} ${petKind} `,
          "tax-rate": 0,
          "price": fees
        },
        // {
        //   "quantity": "4",
        //   "description": "Test2",
        //   "tax-rate": 21,
        //   "price": 10.45
        // }
      ],
      // "bottom-notice": "Kindly pay your invoice within 15 days.",
      // "settings": {
      //   "currency": "USD",
      //   "tax-notation": "vat",
      //   "margin-top": 50,
      //   "margin-right": 50,
      //   "margin-left": 50,
      //   "margin-bottom": 25
      // }
    }
}
  
  const handleInvoice = async (date:any,fees:any,petName:any,petBreed:any,petKind:any) => {
    // dispatch(getInvoice())
    const data = getSampleData(userState?.userData?.firstName,userState?.userData?.lastName,date,fees,petName,petBreed,petKind);
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download('myInvoice.pdf', result.pdf);
  }

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
            <Grid item xs={12} key={appointment?._id}>
              <Paper sx={{ p: "10px", display: "flex" }}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <img
                      alt={`${appointment?.partnerId.firstName} ${appointment?.partnerId.lastName}`}
                      src={`${baseUrl}/users/${appointment.partnerId.photo}`}
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
                    <Stack spacing={2}>
                      <div>
                        <Typography textAlign={"end"}>
                          <Badge
                            sx={{ marginRight: "10px" }}
                            color="success"
                            variant="dot"
                          ></Badge>
                          {/* {appointment?.status} */}
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
                        {/* {appointment.status!=='Cancelled'}
                      {currDate < new Date(appointment?.date) && (
                        <Stack direction={"row"} spacing={2}>
                          <Button
                            color="error"
                            variant="outlined"
                            onClick={() =>
                              handleCancel(
                                appointment._id,
                                appointment.slot,
                                appointment.partnerId._id,
                                appointment.date
                              )
                            }
                          >
                            cancel
                          </Button>
                          {appointment.status === "Cancelled" && (
                            <Typography><Badge
                            sx={{ marginRight: "10px" }}
                            color="error"
                            variant="dot"
                          ></Badge>Your appointment is cancelled</Typography>
                          )}
                        </Stack>
                      )} */}
                        <Stack direction="row" spacing={2}>
                          {appointment.status !== "Cancelled" ? (
                            currDate < new Date(appointment?.date) && (
                              <Button
                                color="error"
                                variant="outlined"
                                onClick={() =>
                                  handleCancel(
                                    appointment._id,
                                    appointment.slot,
                                    appointment.partnerId._id,
                                    appointment.date
                                  )
                                }
                              >
                                Cancel appointment
                              </Button>
                            )
                          ) : (
                            <Typography>
                              <Badge
                                sx={{ marginRight: "10px" }}
                                color="error"
                                variant="dot"
                              ></Badge>
                              Your appointment is cancelled
                            </Typography>
                          )}
                        </Stack>
                      </div>
                      <Stack>
                        <Button variant="outlined" onClick={() =>handleInvoice(moment(appointment?.date).format("MMMM DD, YYYY"),appointment.partnerId.onlineconsultationfee,appointment?.petName,appointment?.petBreed,appointment?.petKind)}>Get Invoice</Button>
                      </Stack>
                    </Stack>
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
