import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider, Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getVetList } from "../redux/features/partnerListSlice";

export default function PartnerCard() {
  const [dataList, setDataList] = useState<any>(
    useAppSelector((state) => state.listing.partnerData)
  );

  const dispatch = useAppDispatch();
  const getList = useAppSelector((state) => state.listing.partnerData);
  // setDataList(getList)
  // const loading = getList.loading
  // const list = getList.partnerData
  console.log(getList);

  useEffect(() => {
    dispatch(getVetList());
  }, []);

  return (
    <>
      <Box sx={{ margin: "20p", backgroundColor: "#000000" }}>
        <Typography sx={{ fontSize: "30px", color: "#ffffff" }}>
          Select Preferred Doctor
        </Typography>
      </Box>
      <Divider />

      <Grid container direction={"row"} spacing={2} sx={{ marginTop: "30px" }}>
        {getList.map((element: any, index) => (
          <Grid item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={element.kycDataId.photo}
                  alt={element.firstName}
                />
                <CardContent>
                  {/* <Stack> */}
                  <Typography gutterBottom variant="h5" component="div">
                    Dr. {element?.firstName} {element.kycDataId.lastName}
                  </Typography>
                  {/* </Stack> */}
                  <Rating name="read-only" value={5} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                    vero amet recusandae quibusdam culpa quidem architecto optio
                    molestias, quaerat, voluptas, ex autem quia doloremque
                    veritatis molestiae delectus dolorem sunt hic?
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
