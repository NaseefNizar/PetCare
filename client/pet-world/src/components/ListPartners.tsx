import { Grid } from "@mui/material";
import PartnerCard from "./Card";
import { SideBar } from "./listing-partner/SideBar";
import { Page } from "./pagination/Page";
import { Box } from "@mui/material";

export default function ListPartners() {
  return (
    // <div style={{display:"flex",marginLeft:'100px',marginRight:'10px',marginTop:'10px'}}>
    <>
      <Grid
        container
        direction={"row"}
        sx={{ px: { lg: "80px", sm: "10px", xs: "10px" } }}
      >
        <Grid item lg={3}>
          <SideBar />
        </Grid>
        <Grid item lg={9}>
          <PartnerCard />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Page />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
