import { Schema, model, models } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const patientSchema = new Schema({
  personal_details: {
    name: {
      type: String,
      required:[true, "Enter your name"],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z\s]+$/.test(v); // Only letters and spaces
        },
        message: props => `${props.value} is not a valid name!`
      }
    },
    birthDate: {
      type: String,
      required:[true, "Enter your date of birth"]
    },
    email: {
      type: String,
      required:[true, "Enter your email address"],
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    },
    phone: {
      type: String,
      required:[true, "Enter your phone number"],
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    gender: {
      type: String,
      required:[true, "Select a gender"]
    },
    password: {
      type: String,
      required:[true, "Password is required"]
    }
  },
  medical_information: {
    insurance_provider: {
      type: String,
      required: [true, "Insurance provider is required"]
    },
    insurance_number: {
      type: String,
      required: [true, "Insurance number is required"]
    },
    allergies: {
      type: String
    },
    current_meds: {
      type: String
    },
    family_med_history: {
      type: String
    }
  }
});

// Pre-save hook to hash the password
patientSchema.pre('save', async function (next) {
  if (!this.isModified('personal_details.password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.personal_details.password = await bcrypt.hash(this.personal_details.password, salt); // Hash the password

    next();
  }
  catch (error) {
    console.log('Error hashing password:', error); // Logging errors
    next(error);
  }
});

// Static method for logging in
// patientSchema.statics.login = async function(email, password) {
//   const patient = await this.findOne({ email });

//   if (patient) {
//     const auth = await bcrypt.compare (password, patient.personal_details.password);
    
//     if (auth) {
//       return patient;
//     }
//     throw Error("Incorrect password")
//   }
//   throw Error ("Incorrect email")
// }

const Patient = models.Patient || model("Patient", patientSchema);

export default Patient;