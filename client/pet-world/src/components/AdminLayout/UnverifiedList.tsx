import {
    DataGrid,
    GridColDef,
    // GridValueGetterParams,
    GridRenderCellParams,
  } from "@mui/x-data-grid";
  import { Button } from "@mui/material";
  import { useEffect, useState } from "react";
  import { useAppDispatch, useAppSelector } from "../../redux/hooks";
  import { blockPartner, unverifiedPartners } from "../../redux/features/adminSlice";
  import Dialog from '@mui/material/Dialog';
  import DialogActions from '@mui/material/DialogActions';
  import DialogContent from '@mui/material/DialogContent';
  // import DialogContentText from '@mui/material/DialogContentText';
  import DialogTitle from '@mui/material/DialogTitle';
  // import PartnerViewDetails from "./PartnerViewDetails";
import { Link } from "react-router-dom";
  // import { User } from "../../redux/api/types";
  
  interface UserData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: number;
    role: string;
    is_blocked: boolean;
  }
  
  
  
  export default function UnverifiedList() {
  
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [blockStat, setBlockStat] = useState<boolean | null>(null);

  
    const handleClickOpen = (id:string,block:boolean) => {
      setOpen(true);
      setUserId(id)
    setBlockStat(block)
    };
  
    const handleClose = () => {
      setOpen(false);
      setUserId('')
    };
    const dispatch = useAppDispatch();
  
    const handleBlock = (partnerId:string,is_blocked:boolean | null) => {
      console.log(partnerId);
      setOpen(false);
      dispatch(blockPartner({partnerId,is_blocked}))
    }

    const handleButtonClick = (id:string) => {
        console.log(id);    
    }
  
    const columns: GridColDef[] = [
      { field: "slno", headerName: "Sl.No", width: 50 },
      { field: "role", headerName: "Role", width: 100 },
      { field: "name", headerName: "Name", width: 150 },
      {
        field: "email",
        headerName: "Email",
        width: 250,
      },
      {
        field: "contactNumber",
        headerName: "Contact No",
        // type: "number",
        width: 250,
      },
      {
        field: "action",
        headerName: "Action",
        width: 130,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams) => {
          const rowData: UserData = params.row as UserData;
          // console.log(rowData.is_blocked);
          
          return rowData.is_blocked ? (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleClickOpen(rowData._id,false)}
            >
              Unblock
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              size="small"
              // onClick={() => handleBlock(rowData._id)}
              // onClick={handleClickOpen}
              onClick={() => handleClickOpen(rowData._id,true)}
            >
              Block
            </Button>
          );
        },
      },
      {
        field: " ",
        headerName: " ",
        width: 130,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams) => (
          <Button 
          component= {Link} to={`/admin/viewdetails/${params.row._id}`}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleButtonClick(params.row._id)}
          >
            View Details
          </Button>

        ),
        
      },
    ];
    const userData:UserData[] = useAppSelector((state) => state.admin.unverifiedList);
    const userDataWithSlno = userData.map((row, index) => {
      return { ...row, slno: index + 1, name: `${row.firstName} ${row.lastName}` };
    });
    useEffect(() => {
      dispatch(unverifiedPartners());
    }, []);
    return (
      <div style={{ height: "80vh", width: "100%" }}>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open alert dialog
        </Button> */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure??"}
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-description">
              Are you sure??
            </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" onClick={() => handleBlock(userId,blockStat)}autoFocus>
              Yes
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <DataGrid
          rows={userDataWithSlno}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          disableRowSelectionOnClick
          // checkboxSelection
        />
      </div>
    );
  }
  