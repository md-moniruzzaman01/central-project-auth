import config from '@config/index';
import { User } from './user.model';
import { publishEvent } from '@libs/rabbitmq';
import ApiError from 'errors/ApiError';
import { IAdmin, IUser } from './user.interface';
import { EVENT_ADMIN_CREATED } from './user.constant';

const createAdmin = async (admin: IAdmin): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!admin.password) {
    admin.password = '123456';
  }
  // set role
  admin.role = 'admin';

  try {
    const newUser = new User({
      email: admin.email,
      password: admin.password,
      role: admin.role,
    });
    await newUser.save();

    const profileData = {
      userId: newUser._id.toString(),
      email: admin.email,
      role: admin.role,
      name: admin.name,
      phone: admin.phone,
      gender: admin.gender,
      dateOfBirth: admin.dateOfBirth,
      bloodGroup: admin.bloodGroup,
      employeeDetails: admin.employeeDetails,
      customerDetails: admin.customerDetails,
      adminDetails: admin.adminDetails,
    };

    // Publish to RabbitMQ
    await publishEvent(EVENT_ADMIN_CREATED, profileData);

    return newUser;
  } catch (error) {
    throw new ApiError(400, (error as Error).message);
  }
};

export const UserService = {
  createAdmin,
};
