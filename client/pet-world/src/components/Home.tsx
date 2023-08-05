import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
// import LabPicture from "../../Assets/medical-lab.png";
// import ScanIcon from "../../Assets/mri-scanner.png";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
// import Govandlab from "../../Assets/lab.png";
// import thermometer from "../../Assets/thermometer.png";
// import sanitizer from "../../Assets/sanitizer.png";
// import disinfection from "../../Assets/disinfection.png";
// import buyIcon from "../../Assets/buy_icon.png";

const Userhomepage = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "70%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  return (
    <Box>
      <Box>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: "13px",
          }}
          rowSpacing={5}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item lg={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Paper
              elevation={10}
              variant="outlined"
              square
              sx={{
                width: 185,
                height: 185,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "", // Add custom border style here
                borderRadius: "10px",
              }}
            >
              <img
                style={{
                  width: "90px",
                  height: "90px",
                  margin: "42px",
                  padding: "",
                }}
              />
              <Typography variant="h6" sx={{ paddingTop: "10px" }}>
                BOOK LAB TEST
              </Typography>
            </Paper>
          </Grid>
          <Grid item lg={2}>
            <Paper
            //   elevation={5}
            //   variant="outlined"
            //   square
            //   sx={{
            //     width: 185,
            //     height: 185,
            //     display: "flex",
            //     flexDirection: "column",
            //     alignItems: "center",
            //     border: "", // Add custom border style here
            //     borderRadius: "10px",
            //   }}
            //   rowSpacing={5}
            //   columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <img
                style={{
                  width: "90px",
                  height: "90px",
                  margin: "42px",
                  padding: "",
                }}
              />
              <Typography variant="h6" sx={{ paddingTop: "10px" }}>
                BOOK SCANS
              </Typography>
            </Paper>
          </Grid>
          <Grid item rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Paper
              elevation={5}
              variant="outlined"
              square
              sx={{
                width: 185,
                height: 185,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "", // Add custom border style here
                borderRadius: "30px",
              }}
            >
              <img
                style={{
                  width: "90px",
                  height: "90px",
                  margin: "42px",
                  padding: "",
                }}
              />
              <Typography variant="h6" sx={{ paddingTop: "10px" }}>
                BOOK LAB TEST
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <div
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: "#c0c0c0",
          margin: "90px auto",
        }}
      ></div>
      <Box>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
            margin: "-50px auto",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              minWidth: "75%",
              minHeight: "470px",
              //   display: "flex",
              //   justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "#ebf2fe;",
            }}
          >
            <Stack sx={{ margin: "40px" }} spacing={1}>
              <Typography
                fontSize={{ xs: 20, md: 30, lg: 30 }}
                sx={{
                  fontWeight: "bold",
                  color: "rgb(5, 10, 78)",
                }}
              >
                Trusted BY 12,0000+
              </Typography>
              <Typography
                fontSize={{ xs: 20, md: 30, lg: 28 }}
                sx={{
                  fontWeight: "bold",
                  color: "rgb(5, 10, 78)",
                }}
              >
                Users Every month
              </Typography>
            </Stack>
            <Stack>
              <Grid container>
                <Grid item lg={6}>
                  <Paper
                    elevation={5}
                    sx={{
                      width: "90%",
                      my: 1,
                      mx: "auto",
                      p: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item></Grid>
                      <Grid item>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <img
                            width="50px"
                            //   minHeight="50px"
                          />
                          <Typography
                            sx={{
                              marginLeft: "20px",
                              fontSize: "20px",
                              fontWeight: "",
                            }}
                          >
                            Govt.Approved <br />
                            Diagnostic Centres
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item lg={6}>
                  <Paper
                    elevation={5}
                    sx={{
                      width: "90%",
                      my: 1,
                      mx: "auto",
                      p: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item></Grid>
                      <Grid item>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <img
                            width="50px"
                            // minHeight="50px"
                          />
                          <Typography
                            sx={{
                              marginLeft: "20px",
                              fontSize: "20px",
                              fontWeight: "",
                            }}
                          >
                            Daily Temperature
                            <br />
                            Check of all Technicians
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item lg={6}>
                  <Paper
                    elevation={5}
                    sx={{
                      width: "90%",
                      my: 1,
                      mx: "auto",
                      p: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item></Grid>
                      <Grid item>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <img
                            width="50px"
                            //   minHeight="50px"
                          />
                          <Typography
                            sx={{
                              marginLeft: "20px",
                              fontSize: "20px",
                              fontWeight: "",
                            }}
                          >
                            Mandotory use of Mask
                            <br />& Sanitizers
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item lg={6}>
                  <Paper
                    elevation={5}
                    sx={{
                      width: "90%",
                      my: 1,
                      mx: "auto",
                      p: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item></Grid>
                      <Grid item>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <img
                            width="50px"
                            // minHeight="50px"
                          />
                          <Typography
                            sx={{
                              marginLeft: "20px",
                              fontSize: "20px",
                              fontWeight: "",
                            }}
                          >
                            Regular Disinfectation
                            <br />
                            of Labs
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "130px",
        }}
      >
        <div
          style={{
            width: "5%",
            height: "5px",
            backgroundColor: "#c0c0c0",
            margin: "0 auto",
          }}
        ></div>
        <Typography
          variant="h3"
          sx={{ fontSize: "35px", fontWeight: "blod", color: "#000339", my: 3 }}
        >
          How to Book?
        </Typography>
        <CustomBox>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontsize: "20px",
              color: "#383c45",
              textAlign: "center",
            }}
          >
            Everything you need to know when you book for advance slot
          </Typography>
        </CustomBox>

        <GuidesBox>
          <GuideBox>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "500",
                fontSize: "20px",
                color: "#3B3c45",
                my: 1,
              }}
            >
              Order Guides
            </Typography>

            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", fontsize: "14px", color: "#0689FF" }}
              >
                How to Order
              </Typography>
            </Box>
          </GuideBox>

          <GuideBox>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "500",
                fontSize: "20px",
                color: "#3B3c45",
                my: 1,
              }}
            >
              Booking Guides
            </Typography>

            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", fontsize: "14px", color: "#0689FF" }}
              >
                How to Order
              </Typography>
            </Box>
          </GuideBox>

          <GuideBox>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "500",
                fontSize: "20px",
                color: "#3B3c45",
                my: 1,
              }}
            >
              Become a partner
            </Typography>

            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                flexDirection:'column',
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography component={Link} to={'/vet/signup'}
                variant="body2"
                sx={{ fontWeight: "bold", fontsize: "14px", color: "#0689FF" }}
              >
                Become a vet
              </Typography>
              <Typography component={Link} to={'/signup'}
                variant="body2"
                sx={{ fontWeight: "bold", fontsize: "14px", color: "#0689FF" }}
              >
                Become a Groomer
              </Typography>
            </Box>
          </GuideBox>
        </GuidesBox>
      </Box>
    </Box>
  );
};

export default Userhomepage;
