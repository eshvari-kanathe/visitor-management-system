import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addVisitor } from "../store/slices/visitorSlice";

const AddVisitor = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [unit, setUnit] = useState("");
  const [visitDate, setVisitDate] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    unit: "",
    visitDate: "",
  });

  const handleSubmit = () => {
    const newErrors = {
      name: "",
      phone: "",
      unit: "",
      visitDate: "",
    };

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(name)) {
      newErrors.name = "Name should contain only letters";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!unit.trim()) {
      newErrors.unit = "Unit number is required";
    }

    if (!visitDate) {
      newErrors.visitDate = "Visit date is required";
    } else {
      const today = new Date().toISOString().split("T")[0];

      if (visitDate < today) {
        newErrors.visitDate = "Visit date cannot be in the past";
      }
    }

    setErrors(newErrors);

    if (
      newErrors.name ||
      newErrors.phone ||
      newErrors.unit ||
      newErrors.visitDate
    ) {
      return;
    }

    dispatch(
      addVisitor({
        id: Date.now(),
        name: name.trim(),
        phone,
        unit: unit.trim(),
        visitDate,
        status: "Pending",
      })
    );

    setName("");
    setPhone("");
    setUnit("");
    setVisitDate("");

    setErrors({
      name: "",
      phone: "",
      unit: "",
      visitDate: "",
    });
  };

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "500px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add Visitor
        </Typography>

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          fullWidth
          label="Phone"
          margin="normal"
          value={phone}
          onChange={(e) => {
            const value = e.target.value;

            if (/^\d{0,10}$/.test(value)) {
              setPhone(value);
            }
          }}
          error={!!errors.phone}
          helperText={errors.phone || "Enter 10 digit phone number"}
        />

        <TextField
          fullWidth
          label="Unit Number"
          margin="normal"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          error={!!errors.unit}
          helperText={errors.unit}
        />

        <TextField
          fullWidth
          label="Visit Date"
          type="date"
          margin="normal"
          value={visitDate}
          onChange={(e) => setVisitDate(e.target.value)}
          error={!!errors.visitDate}
          helperText={errors.visitDate}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: new Date().toISOString().split("T")[0],
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
};

export default AddVisitor;
