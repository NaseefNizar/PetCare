import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import banner from "../assets/pet-banner-tpn-12052020-v1.jpg";
import "../pages/homePage.css";

const Userhomepage = () => {
  // const CustomBox = styled(Box)(({ theme }) => ({
  //   width: "30%",
  //   [theme.breakpoints.down("md")]: {
  //     width: "85%",
  //   },
  // }));

  // const GuidesBox = styled(Box)(({ theme }) => ({
  //   display: "flex",
  //   justifyContent: "space-around",
  //   width: "70%",
  //   marginTop: theme.spacing(5),
  //   marginBottom: theme.spacing(5),
  //   [theme.breakpoints.down("md")]: {
  //     width: "100%",
  //   },
  //   [theme.breakpoints.down("sm")]: {
  //     marginBottom: "0",
  //     flexDirection: "column",
  //   },
  // }));

  // const GuideBox = styled(Box)(({ theme }) => ({
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   marginTop: theme.spacing(5),
  //   [theme.breakpoints.down("sm")]: {
  //     margin: theme.spacing(2, 0, 2, 0),
  //   },
  // }));

  const FeatureBox = styled(Box)`
    width: 300px;
    height: 85px;
    border: 2px solid #d3d3d3; /* Set the border color here */
    border-radius: 5px;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    &:hover {
      border-color: #ff0000;
    }
  `;

  const features = [
    {
      heading: "Pet Grooming",
      description: "Book In-Home Grooming Session For Your Pet",
      link: "/list-vet",
    },
    {
      heading: "Vet on Call",
      description: "Expert Veterinary Care Service At Your Home",
      link: "/list-vet",
    },
    {
      heading: "Adopt a Pet",
      description: "Book In-Home Grooming Session For Your Pet",
      link: "/list-vet",
    },
  ];

  return (
    <Box>
      <img src={banner} width={"100%"} alt="" />
      <Box>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
            position: "relative",
            // top: "-200px"
            top: { lg: "-200px", xs: "-75px" },
            // margin: "-50px auto",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              minWidth: "75%",
              minHeight: "400px",
              borderRadius: "10px",
              xs: 12,
            }}
            // xs={12}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Stack
                sx={{ margin: "40px", alignItems: "center" }}
                spacing={0.5}
              >
                <Typography
                  variant="h1"
                  fontSize={{ xs: 20, md: 30, lg: 40 }}
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  ThePetNest: The Pet People
                </Typography>
                <Typography variant="h6">
                  Book Pet Care Service Appointments At Home
                </Typography>
              </Stack>
            </Box>
            <Stack>
              <Grid
                container
                spacing={5}
                display={"flex"}
                justifyContent={"center"}
              >
                {/* <Grid item>
                  <Box
                    width={300}
                    height={85}
                    border={2}
                    padding={1}
                    borderRadius={1}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    style={{ borderColor: "lightgrey" }}
                  >
                    <img src={banner} width={"75"} height={"75%"} />
                    <Stack spacing={0.25} paddingLeft={2}>
                      <Typography
                        variant="h5"
                        sx={{ fontSize: "20px", fontWeight: "bold" }}
                      >
                        Adopt a Pet
                      </Typography>
                      <Typography variant="h6" sx={{ fontSize: "15px" }}>
                        Expert Veterinary Care Service At Your Home
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>  */}
                {features.map((feature) => (
                  <Grid
                    item
                    // xs={12} sm={12} md={6} lg={3.5}
                  >
                    <Link to={feature.link}>
                    <FeatureBox >
                      <img src={banner} width={"75"} height={"75%"} />
                      <Stack
                        // spacing={0.25}
                        paddingLeft={2}
                      >
                        <Typography
                          variant="h5"
                          sx={{ fontSize: "20px", fontWeight: "bold",textDecorationLine:'none' }}
                        >
                          {feature.heading}
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: "15px" }}>
                          {feature.description}
                        </Typography>
                      </Stack>
                    </FeatureBox>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Paper>
        </Stack>
      </Box>

      {/* footer */}
      {/* <Box
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
          sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
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
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                component={Link}
                to={"/vet/signup"}
                variant="body2"
                sx={{ fontWeight: "bold", fontsize: "14px", color: "#0689FF" }}
              >
                Become a vet
              </Typography>
              <Typography
                component={Link}
                to={"/groomer/signup"}
                variant="body2"
                sx={{ fontWeight: "bold", fontsize: "14px", color: "#0689FF" }}
              >
                Become a Groomer
              </Typography>
            </Box>
          </GuideBox>
        </GuidesBox>
      </Box> */}
    </Box>
  );
};

export default Userhomepage;
