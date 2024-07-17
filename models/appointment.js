import { Schema, model, models } from 'mongoose';

const apptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  createdBy: {
    type: String,
    required: [true, "Creator required"]
  },
  doctor: {
    type: String,
    required: [true, "Doctor required"]
  },
  reason: {
    type: String,
    required: [true, "Reason required"]
  },
  apptDate: {
    type: Date,
    required: [true, "Appointment date required"]
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: [true, "Creation date required"]
  },
  apptStatus: {
    type: String
  }
});

const Appointment = models.Appointment || model("Appointment", apptSchema);

export default Appointment;