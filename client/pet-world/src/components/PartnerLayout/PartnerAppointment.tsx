// import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import {  Divider, Typography } from "@mui/material";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VideoCallIcon from "@mui/icons-material/VideoCall";
import Box from "@mui/material/Box";
import {  useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAppointmentData } from "../../redux/features/appointmentSlice";
import moment from "moment";
// import { Link } from "react-router-dom";

export const PartnerAppointment = () => {
  const dispatch = useAppDispatch();
  const data:any = useAppSelector((state) => state.appointment.appointments);
  // console.log(data);

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  useEffect(() => {
    dispatch(getAppointmentData());
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "80%",
        margin: "auto",
        overflow: "hidden",
        padding: "10px",
        borderRadius: "10px",
        //   border: "2px solid #FFA500",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          padding: "12px",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Appointment Details
        </Typography>
        <Divider />
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Patient Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  MobileNumber
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Email
                </TableCell>
                {/* <TableCell align="left" style={{ minWidth: "100px" }}>
                  Gender
                </TableCell> */}
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Booking Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Booking Time
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  {/* View Details */}
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((element:any) => (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell align="left">
                      {element.userId?.firstName} {element.userId?.lastName}
                    </TableCell>
                    <TableCell align="left">
                      {element.userId?.contactNumber}
                    </TableCell>
                    <TableCell align="left">{element.userId?.email}</TableCell>
                    <TableCell align="left">
                      {moment(element?.date).format("MMMM DD, YYYY")}
                    </TableCell>
                    <TableCell align="left">{element?.slot}</TableCell>
                    <TableCell align="left">{element?.status}</TableCell>
                    {/* <TableCell align="left" size="small" ><Button variant="contained" component={Link} to={'/'}>View details</Button> </TableCell> */}
                    {/* <VideoCallIcon color="success" fontSize="large" sx={{marginTop:"6px"}}/> */}
                    {/* <TableCell align="left"></TableCell> */}
                    {/* <TableCell align="left"></TableCell> */}
                  </TableRow>
                ))}

              {/* <TableRow>
                <TableCell colSpan={1}>Loading...</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        rowsPerPage={rowsPerPage}
        count={fetchedDetails?.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
        {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>BOOKED SCAN</DialogTitle>
        <DialogContent>
          {
          {fetchedDetails && fetchedDetails.length > 0
            ? fetchedDetails[0]?.testDetails?.item.map((data, index) => (
                <TextField
                  key={index}
                  autoFocus
                  margin="dense"
                  id={data.TestId}
                  value={data.description}
                  type="email"
                  fullWidth
                  variant="standard"
                />
              ))
            : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog> */}
      </Paper>
    </Box>
  );
};
