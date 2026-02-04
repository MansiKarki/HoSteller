import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"], // allowed values
      default: "Open",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Maintenance", maintenanceSchema);
