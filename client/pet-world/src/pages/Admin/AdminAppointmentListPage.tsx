import AdminLayout from '../../components/AdminLayout/AdminLayout'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {  Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import {  useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {  getAppointments } from "../../redux/features/appointmentSlice";
import moment from "moment";

export const AdminAppointmentListPage = () => {


const dispatch = useAppDispatch()
const data = useAppSelector(state => state.appointment.appointments)
    useEffect(() => {
        dispatch(getAppointments())
    })
  return (
    <div>
        <AdminLayout>
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
                  Doctor Name
                </TableCell>
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
                      {element.partnerId?.firstName} {element.partnerId?.lastName}
                    </TableCell>
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
                    <TableCell align="left">{element?.slot} </TableCell>
                    <TableCell align="left">{element?.status}</TableCell>
                    
                  </TableRow>
                ))}

              
            </TableBody>
          </Table>
        </TableContainer>
        
      </Paper>
    </Box>
        </AdminLayout>
    </div>
  )
}
