import bcryptjs from "bcryptjs";
import { UserDocumentTS } from "../types/index.js";
import { InferSchemaType, model, Schema } from "mongoose";

const UserSchema = new Schema<UserDocumentTS>(
  {
    first_name: {
      type: String,
      default: "",
      required: false,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    last_name: {
      type: String,
      default: "",
      required: false,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    image: {
      type: String,
      default: "",
      required: false,
    },
    color: {
      type: Number,
      default: 0,
      required: false,
    },
    profile_setup: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//note => encrypt password:
UserSchema.pre("save", async function (next): Promise<void> {
  if (!this.isModified("password")) return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

//note => compare password:
UserSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcryptjs.compare(password, this.password);
};
export type UserType = InferSchemaType<typeof UserSchema>;

const User = model<UserDocumentTS>("User", UserSchema);

export default User;
