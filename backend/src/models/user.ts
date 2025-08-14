import mongoose, { HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";
import { NOT_FOUNDED_USER } from "../utils/constants";

interface IUser {
  name: string;
  email: string;
  password: string;
  tokens: Array<string>;
}
interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<HydratedDocument<IUser>>;

  // придумать как реализовать генерацию токенов
  // generateTokens: (
  //   _id: mongoose.Types.UUID
  // ) =>
}
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  tokens: {
    type: [String],
    default: [],
  },
});

userSchema.static(
  "findUserByCredentials",
  async function findUserByCredentials(email: string, password: string) {
    const user = await this.findOne({ email });

    if (!user) {
      return Promise.reject(new Error(NOT_FOUNDED_USER));
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return Promise.reject(new Error(NOT_FOUNDED_USER));
    }

    return user;
  }
);

export default mongoose.model<IUser, UserModel>("User", userSchema);
