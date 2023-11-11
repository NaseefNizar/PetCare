import {
  Box,
  Grid,
  Paper,
  Rating,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getIndividualDetails } from "../../redux/features/partnerListSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { setSelectedSlot } from "../../redux/features/slotSlice";
import { baseUrl } from "../../utils/constants";
// import { StripeContainer } from "../Payment/StripeContainer";

export const PartnerDetail = () => {
  const { partnerId } = useParams();
  const dispatch = useAppDispatch();
  const data: any = useAppSelector((state) => state.listing.individualData);
  console.log(data);

  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = (data:any) => {
    console.log(data);
    dispatch(setSelectedSlot(data));
  };

  const [defaultDate, setDefaultDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [slot, setSlot] = useState<any>();
  const [isClicked, SetIsClicked] = useState(null);
  const [nextButton, setNextButton] = useState(true);
  // const [date, setDate] = useState(null)

  const [displaySlot, setDisplaySlot] = useState(true);

  const slots = data?.availableSlots?.filter((slot: any) => {
    const slotDate = new Date(slot.date);
    const slotDateString = slotDate.toISOString().split("T")[0];
    return slotDateString === defaultDate;
  });
  console.log(slots);
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

  function getDates(startDate:any, endDate:any) {
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

  function formatDate(date:any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  }

  // console.log('Dates from todayDate to end of next month:', formattedDates);

  const handleClick = (date:any) => {
    // console.log("click", date);
    setDefaultDate(date);
  };

  const handleSlotClick = (slot:any) => {
    // console.log(slot);
    setSlot(slot);
    SetIsClicked(slot === isClicked ? null : slot);
  };

  const handleNext = () => {
    setDisplaySlot(false);
    slot && dispatch(
      setSelectedSlot({ partnerId, slot: slot.time, date: defaultDate })
    );
    // console.log(slot);
    // console.log(defaultDate);
  };

  useEffect(() => {
    setNextButton(slot !== null ? false : true);
  }, [slot]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid
          container
          spacing={2}
          sx={{
            padding: "50px",
          }}
        >
          <Grid item lg={9} sm={12}>
            <Paper
              sx={{
                padding: "50px",
                border: "1px solid lightgrey",
                borderRadius: "20px",
              }}
            >
              {displaySlot ? (
                <>
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
                            key={date}
                            sx={{
                              borderRadius: "10px 10px 0 0",
                              borderColor: "black",
                              borderWidth: "1px",
                              borderStyle: "solid",
                              margin: "10px",
                              backgroundColor:
                                defaultDate === date ? "tomato" : "white",
                              color: defaultDate === date ? "white" : "black",
                              "&:hover": {
                                backgroundColor: "tomato",
                                color: "white",
                                cursor: "pointer",
                              },
                            }}
                          >
                            <Box
                              key={index}
                              sx={{
                                width: "100px",
                                height: "75px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "auto",
                                cursor: "pointer",
                                fontSize: "18px",
                              }}
                              onClick={() => handleClick(date)}
                            >
                              <Typography sx={{ fontWeight: "bold" }}>
                                {date}
                              </Typography>
                            </Box>
                          </Paper>
                        ))}
                      </Carousel>
                    </Grid>
                    <Grid item lg={12} sx={{ padding: "20px" }}>
                      <Typography variant="h5">Available slots</Typography>

                      <Grid container>
                        {slots && slots[0]?.slots.length > 0 ? (
                          slots[0]?.slots.map(
                            (slot:any) =>
                              !slot.status && (
                                <Grid item key={slot.time}>
                                  <Box
                                    sx={{
                                      border: "2px solid black",
                                      width: "100px",
                                      height: "50px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      fontSize: "30px",
                                      margin: "10px",
                                      borderRadius: "10px",
                                      transition: "background-color 0.3s",
                                      backgroundColor:
                                        isClicked === slot ? "tomato" : "white",
                                      color:
                                        isClicked === slot ? "white" : "tomato",
                                      "&:hover": {
                                        backgroundColor: "tomato",
                                        color: "white",
                                        cursor: "pointer",
                                      },
                                    }}
                                    onClick={() => handleSlotClick(slot)}
                                  >
                                    {slot.time}
                                  </Box>
                                </Grid>
                              )
                          )
                        ) : (
                          <Typography>No slots added by doctor</Typography>
                        )}
                        {slots?.[0]?.slots.length > 0 && (
                          <>
                            <Grid
                              item
                              lg={12}
                              sx={{
                                display: "flex",
                                justifyContent: "end",
                              }}
                            >
                              <Button
                                sx={{ mt: "50px" }}
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={handleNext}
                                disabled={nextButton}
                                // component={Link}
                                // to="/appointment-booking"
                              >
                                Next
                              </Button>
                            </Grid>
                            <Grid
                              item
                              lg={12}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                mt: "20px",
                              }}
                            ></Grid>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid container spacing={2}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <Grid item lg={12}>
                        <Typography variant="h4" sx={{ fontSize: "30px" }}>
                          Enter Pet Details
                        </Typography>
                      </Grid>
                      <Grid item lg={12}>
                        <Grid container spacing={2}>
                          <Grid item lg={6}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Enter your pet's name"
                              {...register("petName", {
                                required: "Name is required",
                              })}
                              error={!!errors.petName}
                              // helperText={errors.petName?.message}
                            />
                          </Grid>
                          <Grid item lg={6}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Enter pet's kind"
                              {...register("petKind", {
                                required: "Kind is required",
                              })}
                              error={!!errors.petKind}
                              // helperText={errors.petName?.message}
                            />
                          </Grid>
                          <Grid item lg={6}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Enter pet's breed"
                              {...register("petBreed", {
                                required: "Breed is required",
                              })}
                            />
                          </Grid>
                          <Grid item lg={6}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Enter pet's age"
                              {...register("petAge", {
                                required: "Age is required",
                              })}
                            />
                          </Grid>
                          <Grid item lg={6}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Enter pet's weight"
                              {...register("petWeight", {
                                required: "Kind is required",
                              })}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        lg={12}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          Add pet details
                        </Button>
                      </Grid>
                    </form>
                    <Grid
                      item
                      lg={12}
                      sx={{ display: "flex", justifyContent: "end" }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/appointment-booking"
                      >
                        Proceed to pay
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
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
                borderRadius: "20px",
              }}
            >
              <img src={`${baseUrl}/users/${data?.photo}`} width={"200px"} height={"200px"} />

              <Typography sx={{ fontSize: "25px" }}>
                Dr. {data?.firstName} {data?.lastName}{" "}
              </Typography>
              <Typography sx={{ fontSize: "25px" }}>
                {data?.qualification}
              </Typography>
              <Typography>{data?.experience} years of experience</Typography>
              <Rating name="read-only" value={5} readOnly />

              <Typography sx={{ fontSize: "25px" }}>
                {data?.centreName}
              </Typography>
              <Typography sx={{ fontSize: "25px" }}>{data?.area}</Typography>
              <Typography sx={{ fontSize: "25px" }}>
                {data?.locality}
              </Typography>
              <Typography sx={{ fontSize: "25px" }}>
                {data?.state}- {data?.pincode}
              </Typography>
              <Typography sx={{ fontSize: "25px" }}>
                ₹{data?.onlineconsultationfee}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        {/* <Box>hfghfd</Box> */}

        {/* <Footer /> */}
      </LocalizationProvider>
    </>
  );
};
