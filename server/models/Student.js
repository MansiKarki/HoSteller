import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    rollNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    hostel: {
      type: String,
      trim: true,
    },
    
    mess: {
      type: { type: String },
      timings: { type: String },
    },
    room: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ✅ New field added
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt automatically
  }
);

export default mongoose.model("Student", studentSchema);
