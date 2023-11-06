import { ToastContainer, toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Toolbar, AppBar, Stack, Button, Box, Chip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addSlot } from "../../redux/features/slotSlice";

export const PartnerSlotPage = () => {
  const dispatch = useAppDispatch();

  // const defaultTime = new Date();
  // defaultTime.setHours(0);
  // defaultTime.setMinutes(15);
  // defaultTime.setSeconds(0);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTim, setStartTim] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState<Date | null>(null);
  const [generatedSlots, setGeneratedSlots] = useState<string[]>([]); // State to store generated slots
  console.log(selectedDate);

  const slots: string[] = [];

  const handleGenerateSlots = () => {
    if (!selectedDate || !startTim || !endTime || !duration) {
      alert("Please select all fields.");
      return;
    }

    const intervalMinutes = 15; // Duration interval in minutes

    let currentTime = dayjs(startTim);
    while (currentTime.isBefore(dayjs(endTime))) {
      slots.push(currentTime.format("HH:mm"));
      currentTime = currentTime.add(intervalMinutes, "minutes");
    }
    setGeneratedSlots(slots);
  };

  const stat = useAppSelector((state) => state.slot.stat);

  const handleDelete = (indexToDelete: number) => {
    const arr: string[] = generatedSlots?.filter(
      (_, index) => index !== indexToDelete
    );
    setGeneratedSlots(arr);
  };

  const handleAddSlot = () => {
    const slots = generatedSlots.map((slot) => ({
      time: slot,
    }));
    
    dispatch(addSlot({ date: selectedDate, slots }));
  };

  useEffect(() => {
    stat && toast.success("Slot added successfully", { theme: "colored" });
    setSelectedDate(null);
    setStartTim(null);
    setEndTime(null);
    setDuration(null);
    setGeneratedSlots([]);
  }, [stat]);

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
                ADD TIME SLOTS
              </Box>
            </Toolbar>
          </AppBar>
          <Box display={"flex"} justifyContent={"center"} marginTop={"50px"}>
            <Stack direction={"row"} spacing={2}>
              <DateCalendar
                disablePast
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                sx={{ borderRadius: "10px" }}
              />
            </Stack>

            <Box>
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              <Stack direction={"row"} spacing={2}>
                <Stack>
                  <TimePicker
                    label="Start Time"
                    value={startTim}
                    onChange={(time) => setStartTim(time)}
                    views={["hours", "minutes"]}
                    // format="HH:mm"
                  />
                </Stack>

                <Stack>
                  
                  <TimePicker
                    label="End Time"
                    value={endTime}
                    onChange={(time) => setEndTime(time)}
                    views={["hours", "minutes"]}
                  />
                </Stack>
              </Stack>

              <TimePicker
                sx={{ marginTop: "8px" }}
                label="Duration"
                onChange={(time: any) => setDuration(time)}
                views={["minutes", "seconds"]}
                format="mm:ss"
              />

              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGenerateSlots}
                >
                  Generate Slots
                </Button>
              </Box>
              <Box mt={2}>
                {generatedSlots &&
                  generatedSlots.map((slot, index) => (
                    <Chip
                      key={index}
                      label={slot}
                      sx={{ margin: "10px" }}
                      onDelete={() => handleDelete(index)}
                    />
                  ))}
              </Box>
            </Box>
          </Box>
          <Button variant="contained" color="secondary" onClick={handleAddSlot}>
            Add Slots
          </Button>
        </Box>
      </LocalizationProvider>
    </div>
  );
};
