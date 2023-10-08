import Pagination from "@mui/material/Pagination";
import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";

export const Page = () => {


  return (
    <>
      {/* <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      > */}
        {/* <Pagination count={10} siblingCount={0} defaultPage={1} variant="outlined" color="secondary" /> */}
        <Pagination count={11} defaultPage={6} siblingCount={0} boundaryCount={1} variant="outlined" color="secondary" />

      {/* </Box> */}
    </>
  );
};
