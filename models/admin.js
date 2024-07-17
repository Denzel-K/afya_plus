import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "This username is already in use"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  }
});

// Pre-save hook to hash the password
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password

    next();
  }
  catch (error) {
    console.log('Error hashing password:', error); // Logging errors
    next(error);
  }
});

// Static method for logging in
adminSchema.statics.login = async function(username, password) {
  const admin = await this.findOne({ username });

  if (admin) {
    const auth = await bcrypt.compare (password, admin.password);
    
    if (auth) {
      return admin;
    }
    throw Error("Incorrect password")
  }
  throw Error ("Incorrect username")
}

const Admin = models.Admin || model("Admin", adminSchema);

export default Admin;