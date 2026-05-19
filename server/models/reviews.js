const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    approvedAt: Date,
  },
  { timestamps: true },
);
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
