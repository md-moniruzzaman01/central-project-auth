import { Model, Types } from 'mongoose';

export type IUser = {
  email: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  profileId?: Types.ObjectId;
};

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<
    Pick<IUser, 'email' | 'password' | 'role' | 'needsPasswordChange'>
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

export interface IUserMethods {
  changedPasswordAfterJwtIssued(jwtTimestamp: number): boolean;
}

interface IBankAccount {
  bankName?: string;
  accountNumber?: string;
  branch?: string;
}

interface ISalaryInfo {
  baseSalary?: number;
  bonuses?: number;
  deductions?: number;
  currency?: string;
}

interface IEmergencyContact {
  name?: string;
  phone?: string;
  relation?: string;
}

interface IEmployeeDetails {
  profileImage?: string;
  coverImage?: string;
  resumeUrl?: string;
  resignLetterUrl?: string;
  nidFrontUrl?: string;
  nidBackUrl?: string;
  additionalDocs?: {
    title: string;
    url: string;
    category?: string;
    uploadedAt?: Date;
  }[];

  nid?: string;
  position?: string;
  department?: string;
  joinDate?: Date;
  resignDate?: Date;
  status?: 'active' | 'resigned' | 'terminated' | 'on_leave';

  emergencyContact?: IEmergencyContact;
  bankAccount?: IBankAccount;
  salaryInfo?: ISalaryInfo;

  workingDays?: string[];
  workingHours?: { start: string; end: string };
}

interface ICustomerDetails {
  customerType?: 'student' | 'partner' | 'principal';
  companyName?: string;
  contactPerson?: string;
  companyAddress?: string;
  taxNumber?: string;
  billingCycle?: 'monthly' | 'on-demand';
  creditLimit?: number;
  paymentTerms?: string;
  servicesTaken?: {
    serviceId: string;
    serviceType: string;
    details?: string;
    amount?: number;
    status?: 'active' | 'completed' | 'pending' | 'cancelled';
    date?: string;
  }[];
}

interface IAdminDetails {
  accessLevel?: 'super' | 'manager' | 'limited';
  permissions?: string[];
  notes?: string;
}

export interface IAdmin {
  // Basic info
  name: string;
  phone: string;
  email: string;
  role: string;
  password: string;
  gender?: 'Male' | 'Female' | 'Others';
  dateOfBirth?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

  // Role-specific details
  employeeDetails?: IEmployeeDetails;
  customerDetails?: ICustomerDetails;
  adminDetails?: IAdminDetails;
}
