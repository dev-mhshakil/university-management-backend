import { model, Schema } from 'mongoose';
import validator from 'validator';
import { AdminMethod, AdminModel, TAdmin } from './admin.interface';

const nameSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },

    lastName: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const adminSchema = new Schema<TAdmin, AdminMethod, AdminModel>(
  {
    id: {
      type: String,
      required: [true, 'Faculty ID is required and must be unique'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: nameSchema,

    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: 'Gender must be either male, female or other.',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required and must be unique'],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

adminSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ _id: id });
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
