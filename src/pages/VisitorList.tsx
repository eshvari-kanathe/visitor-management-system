import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../store/store";

import {
  approveVisitor,
  rejectVisitor,
  deleteVisitor,
} from "../store/slices/visitorSlice";

const VisitorList = () => {
  const dispatch = useDispatch();

  const visitors = useSelector(
    (state: RootState) => state.visitors.visitors
  );

  return (
    <div style={{ padding: "30px" }}>
      <Typography variant="h4" gutterBottom>
        Visitor List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Visit Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visitors.map((visitor) => (
              <TableRow key={visitor.id}>
                <TableCell>{visitor.name}</TableCell>

                <TableCell>{visitor.phone}</TableCell>

                <TableCell>{visitor.unit}</TableCell>

                <TableCell>{visitor.visitDate}</TableCell>

                <TableCell>
                  <Chip
                    label={visitor.status}
                    color={
                      visitor.status === "Approved"
                        ? "success"
                        : visitor.status === "Rejected"
                        ? "error"
                        : "warning"
                    }
                  />
                </TableCell>

                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() =>
                      dispatch(approveVisitor(visitor.id))
                    }
                    sx={{ mr: 1 }}
                  >
                    Approve
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    color="warning"
                    onClick={() =>
                      dispatch(rejectVisitor(visitor.id))
                    }
                    sx={{ mr: 1 }}
                  >
                    Reject
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() =>
                      dispatch(deleteVisitor(visitor.id))
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VisitorList;
