import mongoose, { Schema, model, models } from "mongoose";

const checkInSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    registrationId: { type: Schema.Types.ObjectId, ref: "Registration", required: true },
    email: { type: String, required: true },
    checkInDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CheckIn = models.CheckIn || model("CheckIn", checkInSchema);

export default CheckIn;
