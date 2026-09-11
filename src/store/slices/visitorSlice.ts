import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Visitor {
  id: number;
  name: string;
  phone: string;
  unit: string;
  visitDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface VisitorState {
  visitors: Visitor[];
}

const initialState: VisitorState = {
  visitors: [
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      unit: "A-101",
      visitDate: "2026-09-12",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Patel",
      phone: "9876543211",
      unit: "B-202",
      visitDate: "2026-09-13",
      status: "Pending",
    },
    {
      id: 3,
      name: "Amit Verma",
      phone: "9876543212",
      unit: "C-303",
      visitDate: "2026-09-14",
      status: "Approved",
    },
  ],
};

const visitorSlice = createSlice({
  name: "visitors",
  initialState,

  reducers: {
    addVisitor: (state, action: PayloadAction<Visitor>) => {
      state.visitors.push(action.payload);
    },

    approveVisitor: (state, action: PayloadAction<number>) => {
      const visitor = state.visitors.find(
        (visitor) => visitor.id === action.payload
      );

      if (visitor) {
        visitor.status = "Approved";
      }
    },

    rejectVisitor: (state, action: PayloadAction<number>) => {
      const visitor = state.visitors.find(
        (visitor) => visitor.id === action.payload
      );

      if (visitor) {
        visitor.status = "Rejected";
      }
    },

    deleteVisitor: (state, action: PayloadAction<number>) => {
      state.visitors = state.visitors.filter(
        (visitor) => visitor.id !== action.payload
      );
    },
  },
});

export const {
  addVisitor,
  approveVisitor,
  rejectVisitor,
  deleteVisitor,
} = visitorSlice.actions;

export default visitorSlice.reducer;
