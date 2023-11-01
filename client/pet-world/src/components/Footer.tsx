import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";

function Footer() {
  const footercontent = [
    {
      mainHeading: "Featured",
      subheading: [
        { heading: "Gudies", linkTo: "" },
        { heading: "Services", linkTo: "" },
        { heading: "Contact Us", linkTo: "" },
      ],
    },
    {
      mainHeading: "Overview",
      subheading: [
        { heading: "Location", linkTo: "" },
        { heading: "Partnership", linkTo: "" },
        { heading: "Terms of use & Privacy Policies", linkTo: "" },
      ],
    },
    {
      mainHeading: "Partner",
      subheading: [
        { heading: "Become our Vet-partner", linkTo: "/vet/signup" },
        { heading: "Become our Groomer-partner", linkTo: "/groomer/signup" },
        // { heading: "Contact Us", linkTo: "" },
      ],
    },
  ];
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  // const FooterLink = styled(Stack)(({ theme }) => ({
  // fontsize: "16px",
  // color: "#ffff",
  // fontWeight: "300",
  // cursor: "pointer",
  // "&:hover": {
  //   color: "#ffff",
  // },
  // }));

  return (
    <>
      <Box sx={{ py: 10, backgroundColor: "#19263C" }}>
        <CustomContainer>
          {footercontent.map((item, index) => (
            <Box key={index}>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#908E92",
                  fontWeight: "700",
                  mb: 2,
                }}
              >
                {item.mainHeading}
              </Typography>
              {item.subheading.map((item, index) => (
                <Stack pb={2} key={index}>
                  <Typography
                    sx={{
                      color: "#ffffff",
                      textDecoration: "none",
                      "&:hover": {
                        color: "#ff9800",
                      },
                    }}
                    component={Link}
                    to={item.linkTo}
                  >
                    {item.heading}
                  </Typography>
                </Stack>
              ))}
            </Box>
          ))}
        </CustomContainer>
      </Box>
    </>
  );
}

export default Footer;
