
import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Box, Container } from "@mui/system";


function Footer() {
    const footercontent = [
      {
        heading: "Featured",
        subheading: ["Gudies", "Services", "Contact Us"],
      },
      {
        heading: "Overview",
        subheading: [
          "Location",
          "Partnership",
          "Terms of use & Privacy Policies",
        ],
      },
      {
        heading: "Get in touch",
        subheading: [
          "Location",
          "Partnership",
          "Terms of use & Privacy Policies",
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
  
    const FooterLink = styled(Stack)(({ theme }) => ({
      fontsize: "16px",
      color: "#ffff",
      fontWeight: "300",
      cursor: "pointer",
      "&:hover": {
        color: "#ffff",
      },
    }));
    return (
      <>
        <Box sx={{ py: 10, backgroundColor: "#19263C" }}>
          <CustomContainer>
            {footercontent.map((item, index) => (
              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "#908E92",
                    fontWeight: "700",
                    mb: 2,
                  }}
                >
                  {item.heading}
                </Typography>
                {item.subheading.map((item) => (
                  <FooterLink pb={2}>{item}</FooterLink>
                ))}
              </Box>
            ))}
          </CustomContainer>
        </Box>
      </>
    );
  }
  
  export default Footer;