import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import config from '@config/index';

/* -----------------------------------------------
Schema
------------------------------------------------ */
const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

/* -----------------------------------------------
  Static Methods
------------------------------------------------ */

UserSchema.statics.isUserExist = async function (
  email: string,
): Promise<IUser | null> {
  return await User.findOne(
    { email },
    { email: 1, password: 1, role: 1, needsPasswordChange: 1 },
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

/* -----------------------------------------------
   Instance Methods
------------------------------------------------ */

UserSchema.methods.changedPasswordAfterJwtIssued = function (
  jwtTimestamp: number,
) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000,
    );
    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

/* -----------------------------------------------
   Pre-save hook
------------------------------------------------ */
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // Only hash password if it is new or modified
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bycrypt_salt_rounds),
    );
    if (!user.needsPasswordChange) {
      user.passwordChangedAt = new Date();
    }
  }

  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
