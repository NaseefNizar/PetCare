import { useEffect } from "react";

import Typography from "@mui/material/Typography";
import { Button, Grid, Paper, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getVetList } from "../redux/features/partnerListSlice";
import { Link } from "react-router-dom";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { baseUrl } from "../utils/constants";
import rupee from "../assets/rupee.png";

export default function PartnerCard() {
  // const [dataList, setDataList] = useState<any>(
  //   useAppSelector((state) => state.listing.partnerData)
  // );

  const dispatch = useAppDispatch();
  const getList = useAppSelector((state) => state.listing.partnerData);
  // const navigate = useNavigate();
  // setDataList(getList)
  // const loading = getList.loading
  // const list = getList.partnerData
  // console.log(getList);

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    border: "1px solid ",
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
          <Grid item lg={12} sm={12} key={index}>
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: "100%",
                flexGrow: 1,
                borderRadius: "10px",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 200, height: 200 }}>
                    <Img
                      alt="complex"
                      src={`${baseUrl}/users/${element.photo}`}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Stack spacing={2}>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          // component="div"
                        >
                          <strong>
                            Dr. {element.firstName} {element.lastName}
                          </strong>
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          BVSc & AH
                        </Typography>
                        <Stack direction={"row"}>
                          <img width={"20px"} height={"20px"} src={rupee} />
                          <Typography variant="body2">
                            <span>
                              {" "}
                              {element.onlineconsultationfee} consulation fee
                            </span>
                          </Typography>
                        </Stack>

                        {/* <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        readOnly
                      /> */}
                      </Stack>
                    </Grid>
                    <Grid item>
                      {/* <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        readOnly
                      /> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={4} md={3}>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {element.centreName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {element.area}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {element.locality}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {element.state} - {element.pincode}
                  </Typography>

                  <Grid
                    container
                    spacing={2}
                    direction={"column"}
                    sx={{ mt: "10px" }}
                  >
                    {/* <Grid item xs={12}>
                      <Button variant="outlined" fullWidth color="secondary">
                        Book Appointment
                      </Button>
                    </Grid> */}
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        color="secondary"
                        component={Link}
                        to={`/partner-details/${element._id}`}
                      >
                        Book Appointment
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
