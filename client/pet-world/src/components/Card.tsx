import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Divider, Grid, Paper } from "@mui/material";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getVetList } from "../redux/features/partnerListSlice";
import { Link, useNavigate } from "react-router-dom";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import { Page } from "./pagination/Page";

export default function PartnerCard() {
  const [dataList, setDataList] = useState<any>(
    useAppSelector((state) => state.listing.partnerData)
  );

  const dispatch = useAppDispatch();
  const getList = useAppSelector((state) => state.listing.partnerData);
  const navigate = useNavigate();
  // setDataList(getList)
  // const loading = getList.loading
  // const list = getList.partnerData
  console.log(getList);

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    border: "1px solid",
  });

  useEffect(() => {
    dispatch(getVetList());
  }, []);

  return (
    <>
      <Grid
        container
        sx={{ marginTop: "0px", marginBottom: "75px" }}
        spacing={2}
      >
        {getList.map((element: any, index) => (
          <Grid item lg={12} sm={12}>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: "100%",
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 200, height: 200 }}>
                    <Img alt="complex" src={element.kycDataId.photo} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {element.kycDataId.firstName}{" "}
                        {element.kycDataId.lastName}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        BVSc & AH
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary">
                        ID: 1030114
                      </Typography> */}
                      <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        readOnly
                      />
                    </Grid>
                    <Grid item>
                      {/* <Typography sx={{ cursor: "pointer" }} variant="body2">
                        Remove
                      </Typography> */}
                    </Grid>
                    {/* <Grid item>
                      <Typography sx={{ cursor: "pointer" }} variant="body2">
                        Remove
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ cursor: "pointer" }} variant="body2">
                        Remove
                      </Typography>
                    </Grid> */}
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={4} md={3}>
                  <Typography gutterBottom variant="subtitle1" component="div">
                  {element.kycDataId.centreName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                  {element.kycDataId.area}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {element.kycDataId.locality}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {element.kycDataId.state} - {element.kycDataId.pincode}
                  </Typography>
                  
                  <Grid
                    container
                    spacing={2}
                    direction={"column"}
                    sx={{ mt: "10px" }}
                  >
                    <Grid item xs={12}>
                      <Button variant="outlined" fullWidth color="secondary">
                        Book Appointment
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        color="secondary"
                        component={Link}
                        to={`/partner-details/${element._id}`}
                      >
                        Book Online Consultation
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
