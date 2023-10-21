import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: String,
    avatarPublicId: String,
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
