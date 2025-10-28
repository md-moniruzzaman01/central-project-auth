import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    // password: z.string().min(6),
    role: z.enum(['admin', 'employee', 'student', 'partner', 'principal']),
    name: z.string(),
    phone: z.string().min(10),
    gender: z.enum(['Male', 'Female', 'Others']).optional(),
    dateOfBirth: z.string().optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),

    // Employee/Admin/Partner/Principal specific details
    employeeDetails: z
      .object({
        profileImage: z.string().optional(),
        coverImage: z.string().optional(),
        resumeUrl: z.string().optional(),
        position: z.string().optional(),
        department: z.string().optional(),
        joinDate: z.string().optional(),
        status: z
          .enum(['active', 'resigned', 'terminated', 'on_leave'])
          .optional(),
        emergencyContact: z
          .object({
            name: z.string(),
            phone: z.string(),
            relation: z.string(),
          })
          .optional(),
        bankAccount: z
          .object({
            bankName: z.string(),
            accountNumber: z.string(),
            branch: z.string(),
          })
          .optional(),
        salaryInfo: z
          .object({
            baseSalary: z.number().optional(),
            bonuses: z.number().optional(),
            deductions: z.number().optional(),
            currency: z.string().optional(),
          })
          .optional(),
        workingDays: z.array(z.string()).optional(),
        workingHours: z
          .object({
            start: z.string(),
            end: z.string(),
          })
          .optional(),
      })
      .optional(),

    customerDetails: z
      .object({
        customerType: z.enum(['student', 'partner', 'principal']).optional(),
        companyName: z.string().optional(),
        contactPerson: z.string().optional(),
        companyAddress: z.string().optional(),
        taxNumber: z.string().optional(),
        billingCycle: z.enum(['monthly', 'on-demand']).optional(),
        creditLimit: z.number().optional(),
        paymentTerms: z.string().optional(),
        servicesTaken: z
          .array(
            z.object({
              serviceId: z.string(),
              serviceType: z.string(),
              details: z.string().optional(),
              amount: z.number().optional(),
              status: z.enum(['active', 'completed', 'pending', 'cancelled']),
              date: z.string().optional(),
            }),
          )
          .optional(),
      })
      .optional(),

    adminDetails: z
      .object({
        accessLevel: z.enum(['super', 'manager', 'limited']).optional(),
        permissions: z.array(z.string()).optional(),
        notes: z.string().optional(),
      })
      .optional(),
  }),
});

export const UserValidation = {
  createUserSchema,
};
