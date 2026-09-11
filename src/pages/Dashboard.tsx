import { Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import AddVisitor from "./AddVisitor";
import VisitorList from "./VisitorList";

import { logout } from "../store/slices/authSlice";
import type { RootState } from "../store/store";

const Dashboard = () => {
  const dispatch = useDispatch();

  const email = useSelector(
    (state: RootState) => state.auth.email
  );

  return (
    <Box>
          
      <Box
        sx={{
          padding: 2,
          backgroundColor: "#1976d2",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          Admin Dashboard
        </Typography>

        <Box>
          <Typography
            component="span"
            sx={{ marginRight: 2 }}
          >
            {email}
          </Typography>

          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <VisitorList />
<AddVisitor />
    
    </Box>
  );
};

export default Dashboard;
