import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { IUser } from './user.interface';
import { UserService } from './user.service';
import catchAsync from '@libs/catchAsync';
import sendResponse from '@libs/sendResponse';

const createEmployee: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createEmployee(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'employee created successfully!',
      data: result,
    });
  },
);

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.createAdmin(req.body);
    console.log('user', req.body);
    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  },
);

const createPrincipal: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createPrincipal(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'Principal created successfully!',
      data: result,
    });
  },
);

const createPartner: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createPartner(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'Partner created successfully!',
      data: result,
    });
  },
);

export const UserController = {
  createEmployee,
  createAdmin,
  createPrincipal,
  createPartner,
};
