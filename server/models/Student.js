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
      name: {
        type: String,
        trim: true,
      },
      block: {
        type: String,
        trim: true,
      },
      room: {
        type: String,
        trim: true,
      },
    },

    mess: {
      type: {
        type: String,
        trim: true,
      },
      timings: {
        type: String,
        trim: true,
      },
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "student",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", studentSchema);
