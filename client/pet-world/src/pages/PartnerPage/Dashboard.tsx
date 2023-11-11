import { useEffect } from "react";
import Box from "@mui/material/Box";
// import AdminPanel from "../../../Pages/AdminPages/AdminPanel/adminPanel";
// import Navbar from "../AdminNavbar/Navbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import { Stack } from "@mui/material";
// import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import "../../../Dash.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { dashboard } from "../../redux/features/appointmentSlice";
import moment from "moment";
// import { adminDashboard } from "../../../redux/features/admiSlice";
// import BarChart from "../../Chart/BarChart";
// import PieChart from "../../Chart/PieChart";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(
    (state) => state.appointment.appointments
  );
  let todaysappointment
  if (appointments) {
    console.log();
    
     todaysappointment = appointments.filter(
      (element: { date: string | number | Date }) =>
      moment(new Date(element?.date) ).format("MMMM DD, YYYY") === moment(new Date()).format("MMMM DD, YYYY")

        // new Date(element?.date) === new Date()
    );
    console.log(todaysappointment);
    }

  useEffect(() => {
    dispatch(dashboard());
  }, []);
  return (
    <>
      {/* <Paper> */}
      <Box
        sx={{
          display: "flex",
          maxWidth: 1200,
          margin: "auto",
          overflow: "hidden",
          padding: "20px",
          borderRadius: "10px",
          //   border: "2px solid #FFA500",
        }}
      >
        {/* <Paper></Paper> */}
        {/* <AdminPanel /> */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* <Stack spacing={2} direction={"row"}> */}
              <Card
                sx={{
                  minWidth: 49 + "%",
                  height: 140,
                  backgroundColor: "skyblue",
                }}
                // className="gradienttwo "
              >
                <CardContent>
                  <div>
                    <CreditCardIcon />
                  </div>
                  <Typography gutterBottom variant="h5" component="div">
                    {todaysappointment?.length}
                    {/* 6 */}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    // sx={{ color: "black" }}
                  >
                    Todays no.of appointments
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  minWidth: 49 + "%",
                  height: 140,
                  backgroundColor: "#EF566A",
                }}
                className="gradient"
              >
                <CardContent>
                  <div>
                    <ShoppingBagIcon />
                  </div>
                  <Typography gutterBottom variant="h5" component="div">
                    {appointments?.length}
                    {/* 10 */}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    // sx={{ color: "#ccd1d1" }}
                  >
                    Total no of appointments
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  minWidth: 49 + "%",
                  height: 140,
                  backgroundColor: "#EF566A",
                }}
                className="gradient"
              >
                <CardContent>
                  <div>
                    <ShoppingBagIcon />
                  </div>
                  <Typography gutterBottom variant="h5" component="div">
                    {/* 10 */}
                    {todaysappointment?.length *
                      appointments?.[0]?.partnerId?.onlineconsultationfee}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    // sx={{ color: "#ccd1d1" }}
                  >
                    Todays Income
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  minWidth: 49 + "%",
                  height: 140,
                  backgroundColor: "skyblue",
                }}
                className="gradient"
              >
                <CardContent>
                  <div>
                    <ShoppingBagIcon />
                  </div>
                  <Typography gutterBottom variant="h5" component="div">
                    ₹
                    {appointments?.length *
                      appointments?.[0]?.partnerId?.onlineconsultationfee}
                    {/* 10 */}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    // sx={{ color: "#ccd1d1" }}
                  >
                    Total Income
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card sx={{ maxWidth: 345 }} className="gradienttwo">
                    <Stack spacing={2} direction="row">
                      <div className="iconstyle">
                        <StorefrontIcon />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle">
                          1000
                        </span>
                        <br />
                        <span className="pricesubtitle">
                          Todays Total Income
                        </span>
                      </div>
                    </Stack>
                  </Card>
                  <Card sx={{ maxWidth: 345 }} className="gradient">
                    <Stack spacing={2} direction="row">
                      <div className="iconstyle">
                        <StorefrontIcon />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle">
                          5000
                        </span>
                        <br />
                        <span className="pricesubtitle">
                          {" "}
                        Total Income generated
                        </span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid> */}
          </Grid>
          <Box height={20} />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>{/* <BarChart /> */}</CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ height: 60 + "vh", width: 49 + "vh" }}>
                <CardContent>{/* <PieChart /> */}</CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* </Paper> */}
    </>
  );
};

export default Dashboard;
