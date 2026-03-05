import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  endorsements: {
    type: Number,
    default: 0
  }
});

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    bio: {
      type: String
    },
    profilePicture: {
      type: String
    },
    socialLinks: {
      linkedin: String,
      github: String
    },
    skills: [
        {
          name: { type: String, required: true },
          endorsements: { type: Number, default: 0 }
        }
    ]
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;