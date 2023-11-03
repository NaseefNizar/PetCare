import { ToastContainer, toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Toolbar, AppBar, Stack, Button, Box, Chip, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSlot } from "../../redux/features/slotSlice";

export const AppointmentEditing = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);
  const dispatch = useAppDispatch();
  const currDate = new Date();
  console.log(currDate);


  const formattedDate = currDate

  

  useEffect(() => {
    console.log(1);
    dispatch(getSlot(formattedDate));
  }, [selectedDate]);

  return (
    <div>
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            maxWidth: 936,
            margin: "auto",
            overflow: "hidden",
            padding: "20px",
            borderRadius: "10px",
            border: "2px solid #FFA500",
          }}
        >
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar sx={{ justifyContent: "center" }}>
              <Box alignItems="center" justifyContent={"center"}>
                EDIT TIME SLOTS
              </Box>
            </Toolbar>
          </AppBar>
          <Box display={"flex"} justifyContent={"center"} marginTop={"50px"}>
            <Grid container>
              <Grid item md={6}>
                <DateCalendar
                  disablePast
                  // onClick={() => console.log(1)}
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  sx={{ borderRadius: "10px" }}
                />
              </Grid>
              <Grid
                item
                md={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button variant="contained" color="secondary">
                  Edit Slots
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </LocalizationProvider>
    </div>
  );
};
