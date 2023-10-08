import {
  Box,
  Chip,
  Grid,
  Paper,
  Rating,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getIndividualDetails } from "../../redux/features/partnerListSlice";
// import { DatePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const PartnerDetail = () => {
  const { partnerId } = useParams();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.listing.individualData);

  const [defaultDate, setDefaultDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [slot, setSlot] = useState(null);
  const [isClicked, SetIsClicked] = useState(null);
  const [date, setDate] = useState(null)
  // console.log(slot);
  // console.log(defaultDate);

  // const today = new Date();
  // useEffect(() => {

  // const todayDateString = defaultDate.toISOString().split("T")[0];
  // console.log("hh", defaultDate);

  const slots = data?.availableSlots?.filter((slot) => {
    const slotDate = new Date(slot.date);
    const slotDateString = slotDate.toISOString().split("T")[0];
    return slotDateString === defaultDate;
  });
  // console.log(slots);
  // }, [defaultDate,data]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    dispatch(getIndividualDetails({ partnerId }));
  }, []);

  function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  const todayDate = new Date();
  // console.log(todayDate);

  const nextMonth = new Date(todayDate);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(0); // Set to the last day of the next month

  const datesArray = getDates(todayDate, nextMonth);

  // Format the dates as strings (e.g., "yyyy-mm-dd")
  const formattedDates = datesArray.map(formatDate);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  }

  // console.log('Dates from todayDate to end of next month:', formattedDates);

  const handleClick = (date) => {
    console.log("click", date);
    setDefaultDate(date);
  };

  const handleSlotClick = (slot) => {
    // console.log(slot);
    setSlot(slot);
    SetIsClicked(slot === isClicked ? null : slot);  
  };

  const handleBooking = () => {
    console.log(slot);
    console.log(defaultDate);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <Paper
          sx={{
            width: "auto",
            height: "100%",
            margin: "20px",
            borderRadius: "10px",
            padding: "10px",
            overflow: "hidden",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              margin: "10px",
              border: "2px solid",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: "2px",
              }}
            >
              <img
                src={data?.kycDataId.photo}
                width={"300px"}
                height={"300px"}
              />

              <Stack sx={{ pt: "45px" }} spacing={1}>
                <Typography sx={{ fontSize: "25px" }}>
                  Dr. {data?.kycDataId.firstName} {data?.kycDataId.lastName}{" "}
                </Typography>
                <Typography sx={{ fontSize: "25px" }}>BVSc & AH</Typography>
                <Typography>2 years of experience</Typography>
                <Rating name="read-only" value={5} readOnly />
              </Stack>
            </Box>
            <Stack sx={{ pt: "45px", pr: "200px" }}>
              <Typography sx={{ fontSize: "25px" }}>
                {data?.kycDataId.centreName}
              </Typography>
              <Typography sx={{ fontSize: "25px" }}>
                {data?.kycDataId.area}
              </Typography>
              <Typography sx={{ fontSize: "25px" }}>
                {data?.kycDataId.locality}
              </Typography>
              <Typography sx={{ fontSize: "25px" }}>
                {data?.kycDataId.state}- {data?.kycDataId.pincode}
              </Typography>
            </Stack>
          </Stack>

          <Grid container>
            <Grid item lg={3}>
              <Box sx={{ width: "10px" }}>
                <DateCalendar
                  disablePast
                  // value={selectedDate}
                  onChange={(date) => setDefaultDate(date)}
                  sx={{ borderRadius: "10px" }}
                />
              </Box>
            </Grid>
            <Grid item lg={6} sx={{ padding: "20px" }}>
              <Grid container>
                {slots && slots[0]?.slots.length > 0 ? (
                  slots[0]?.slots.map((slot) => (
                    <Box
                      key={slot} 
                      sx={{
                        border: "2px solid black",
                        width: "100px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "30px",
                        color: "tomato",
                        margin: "10px",
                      }}
                    >
                      {slot}
                    </Box>
                  ))
                ) : (
                  <Typography>No slots added by doctor</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper> */}
        {/* <Paper> */}
        <Grid
          container
          direction={"row"}
          spacing={2}
          sx={{
            width: "auto",
            height: "100%",
            // margin: "px",
            borderRadius: "10px",
            padding: "50px",
            overflow: "hidden",
          }}
        >
          <Grid item lg={9} sm={12}>
            <Paper sx={{ padding: "50px", height: "100%" }}>
              <Typography variant="h4" sx={{ fontSize: "30px" }}>
                Select date
              </Typography>
              <Grid container>
                <Grid item lg={12}>
                  <Carousel
                    responsive={responsive}
                    renderButtonGroupOutside={true}
                  >
                    {formattedDates.map((date, index) => (
                      <Paper
                        elevation={1}
                        key={date}
                        sx={{
                          // backgroundColor: "tomato",
                          borderRadius: "10px 10px 0 0",
                          margin: "10px",
                        }}
                      >
                        {/* <Box> */}
                        <Box
                          key={index}
                          sx={{
                            width: "100px",
                            height: "75px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "auto",
                          }}
                          onClick={() => handleClick(date)}
                        >
                          {date}
                        </Box>
                      </Paper>
                    ))}
                  </Carousel>
                </Grid>
                <Grid item lg={12} sx={{ padding: "20px" }}>
                  <Typography variant="h5">Available slots</Typography>

                  <Grid container>
                    {slots && slots[0]?.slots.length > 0 ? (
                      slots[0]?.slots.map((slot) => (
                        <Grid item key={slot}>
                          <Box
                            sx={{
                              border: "2px solid black",
                              width: "100px",
                              height: "50px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "30px",
                              // color: "tomato",
                              margin: "10px",
                              borderRadius: "10px",
                              transition: "background-color 0.3s",
                              backgroundColor:
                                isClicked === slot ? "tomato" : "white",
                              color: isClicked === slot ? "white" : "tomato",
                              "&:hover": {
                                backgroundColor: "tomato",
                                color: "white",
                                cursor: "pointer",
                              },
                            }}
                            onClick={() => handleSlotClick(slot)}
                          >
                            {slot}
                          </Box>
                        </Grid>
                      ))
                    ) : (
                      <Typography>No slots added by doctor</Typography>
                    )}
                    {slots?.[0]?.slots.length > 0 && (
                      <Grid
                        item
                        lg={12}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: "20px",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          onClick={handleBooking}
                        >
                          Book appointment
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item lg={3}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <img
                src={data?.kycDataId.photo}
                width={"200px"}
                height={"200px"}
              />

              <Typography sx={{ fontSize: "25px" }}>
                Dr. {data?.kycDataId.firstName} {data?.kycDataId.lastName}{" "}
              </Typography>
              <Typography sx={{ fontSize: "25px" }}>BVSc & AH</Typography>
              <Typography>2 years of experience</Typography>
              <Rating name="read-only" value={5} readOnly />

              <Typography sx={{ fontSize: "25px" }}>
                {data?.kycDataId.centreName}
              </Typography>
              <Typography sx={{ fontSize: "25px" }}>
                {data?.kycDataId.area}
              </Typography>
              <Typography sx={{ fontSize: "25px" }}>
                {data?.kycDataId.locality}
              </Typography>
              <Typography sx={{ fontSize: "25px" }}>
                {data?.kycDataId.state}- {data?.kycDataId.pincode}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
};
