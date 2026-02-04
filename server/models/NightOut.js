import mongoose from "mongoose";

const nightOutSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  date: String,
  reason: String,
  status: {
    type: String,
    default: "Pending",
  },
});

export default mongoose.model("NightOut", nightOutSchema);
