// import PartnerLayout from "../../components/PartnerLayout/PartnerLayout";
import { ToastContainer, toast } from "react-toastify";
// import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Toolbar,
  AppBar,
  Stack,
  Button,
  Box,
  Chip,
  // TextField,
  // Typography,
} from "@mui/material";
// import Autocomplete from "@mui/material/Autocomplete";
// import { DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addSlot } from "../../redux/features/slotSlice";

export const PartnerSlotPage = () => {

  const dispatch = useAppDispatch()
  // const form = useForm();
  // const { handleSubmit, formState, watch, control } = form;
  // const { errors } = formState;

  const defaultTime = new Date();
  defaultTime.setHours(0);
  defaultTime.setMinutes(15);
  defaultTime.setSeconds(0);

  const [selectedDate, setSelectedDate] = useState(null);
  const [startTim, setStartTim] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState<Date | null>(null);
  const [generatedSlots, setGeneratedSlots] = useState<string[]>([]); // State to store generated slots

  const slots: string[] = [];

  const handleGenerateSlots = () => {
    if (!selectedDate || !startTim || !endTime || !duration) {
      // Ensure all required fields are selected
      alert("Please select all fields.");
      return;
    }

    // Parse the start time and end time
    // const start = dayjs(startTim);
    // const end = dayjs(endTime);
    // console.log(selectedDate);
    // console.log(startTim);
    // console.log(endTime);
    // console.log(duration);

    const intervalMinutes = 15; // Duration interval in minutes

    let currentTime = dayjs(startTim);
    while (currentTime.isBefore(dayjs(endTime))) {
      slots.push(currentTime.format("HH:mm"));
      currentTime = currentTime.add(intervalMinutes, "minutes");
    }

    // console.log("Generated Slots:", slots);
    setGeneratedSlots(slots);

    // const slotDuration = duration.split(":");
    // const durationMinutes = parseInt(slotDuration[0]) * 60 + parseInt(slotDuration[1]);
    // const [hours, minutes] = String(duration).split(":").map(Number);
    // const durationMinutes = hours * 60 + minutes;

    // // Generate slots based on the selected duration
    // while (start.isBefore(end)) {
    //   slots.push(start.format("HH:mm"));
    //   start.add(durationMinutes, "minutes");
    // }

    // // Display or use the generated slots
    // console.log("Generated Slots:", slots);
  };

  // const timeSlots = Array.from(new Array(24 * 2)).map(
  //   (_, index) =>
  //     `${index < 20 ? "0" : ""}${Math.floor(index / 2)}:${
  //       index % 2 === 0 ? "00" : "30"
  //     }`
  // );
  // const timeSlots = [15, 20, 45, 60];

  // const defaultTime = new Date();
  // defaultTime.setHours(0);
  // defaultTime.setMinutes(15);
  // defaultTime.setSeconds(0);

  // const startTime = watch("startTime");
  // const endTime = watch("endTime");

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  // const validateEndTime = (value) => {
  //   if (startTime && dayjs(value).isBefore(dayjs(startTime))) {
  //     return "End Time must be greater than Start Time";
  //   }
  //   return true;
  // };

  const stat = useAppSelector(state => state.slot.stat)
  console.log('curr',selectedDate);
  

  const handleDelete = (indexToDelete: number) => {
    const arr:string[] = generatedSlots?.filter( (_, index) => index !== indexToDelete );
    setGeneratedSlots(arr);
  };

  const handleAddSlot = () => {
    
    const slots = generatedSlots.map(slot => ({
      time: slot
    }));
    
    dispatch(addSlot({date:selectedDate,slots}))
  }

  useEffect(() => {
    stat && 
      toast.success("Slot added successfully", { theme: "colored" })
    setSelectedDate(null)
    setStartTim(null)
    setEndTime(null)
    setDuration(null)
    setGeneratedSlots([])
  },[stat])

  return (
    <div>
      {/* <PartnerLayout> */}
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
                  // onChange={(e) => console.log(e)}
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  sx={{ borderRadius: "10px" }}
                />
              </Stack>

              <Box>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <Stack direction={"row"}>
                  <Stack>
                    {/* <Controller
                          name="startTime"
                          control={control}
                          defaultValue={null}
                          rules={{
                            required: "Start Time is required",
                          }}
                          render={({ field }) => (
                            <TimePicker
                              label="Start Time"
                              {...field}
                              // disablePast
                              sx={{
                                marginRight: ".5rem",
                              }}
                            />
                          )}
                        />
                        {errors.startTime && <p>{errors.startTime.message}</p>} */}
                    <TimePicker
                      label="Start Time"
                      value={startTim}
                      onChange={(time) => setStartTim(time)}
                      views={["hours", "minutes"]}
                      // format="HH:mm"
                    />
                  </Stack>

                  <Stack>
                    {/* <Controller
                          name="endTime"
                          control={control}
                          defaultValue={null}
                          rules={{
                            required: "End Time is required",
                            validate: validateEndTime, // Apply the custom validation function
                          }}
                          render={({ field }) => (
                            <TimePicker
                              label="End Time"
                              {...field}
                              // disablePast
                              sx={{
                                marginRight: ".5rem",
                              }}
                            />
                          )}
                        />
                        {errors.endTime && <p>{errors.endTime.message}</p>} */}
                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={(time) => setEndTime(time)}
                      views={["hours", "minutes"]}
                      // format="HH:mm"
                    />
                  </Stack>
                </Stack>

                {/* <TimePicker
                    sx={{ marginTop: "8px" }}
                    label="Select slot duration"
                    views={["minutes", "seconds"]}
                    defaultValue={dayjs(defaultTime)}
                    format="mm:ss"
                    onChange={(e) => console.log(e)}
                  /> */}
                <TimePicker
                  sx={{ marginTop: "8px" }}
                  label="Duration"
                  // value={duration}
                  // defaultValue={defaultTime}
                  onChange={(time:any) => setDuration(time)}
                  views={["minutes", "seconds"]}
                  format="mm:ss"
                />

                <Box mt={2}>
                  {/* <Button type="submit" variant="contained" color="primary">
                      Generate slots
                    </Button> */}
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
                {/* </form> */}
              </Box>
            </Box>
            <Button variant="contained" color="secondary" onClick={handleAddSlot}>
              Add Slots
            </Button>
          </Box>
        </LocalizationProvider>
      {/* </PartnerLayout> */}
    </div>
  );
};
