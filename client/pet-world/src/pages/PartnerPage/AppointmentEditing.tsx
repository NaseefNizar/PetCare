import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useEffect, useState } from "react";
// import dayjs from "dayjs";
import { Toolbar, AppBar, Button, Box, Grid, Chip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editSlot, getSlot } from "../../redux/features/slotSlice";



export const AppointmentEditing = () => {
  const currDate = new Date();

  const dispatch = useAppDispatch();
  const slot:any = useAppSelector(state => state.slot.slot)
  const [selectedDate, setSelectedDate] = useState<any>(null);

  console.log(selectedDate);
  console.log(slot);

  const handleDelete = (id:string) => {
    console.log(id);
    dispatch(editSlot({id,date:selectedDate}))
  }
  
  useEffect(() => {
    dispatch(getSlot(currDate));
  }, []);
  useEffect(() => {
    dispatch(getSlot(selectedDate));
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
              <Grid item md={6}>
                <Typography variant="h5">Added slots</Typography>
                {slot?.slots?.length > 0 ? 
                  (slot?.slots?.map((slot:any, index:any) => (
                    !slot.status &&                    
                    <Chip
                      key={index}
                      label={slot.time}
                      sx={{ margin: "10px" }}
                      onDelete={() => handleDelete(slot._id)}
                      />
                  ))) : <Typography>No slots added</Typography> }
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
