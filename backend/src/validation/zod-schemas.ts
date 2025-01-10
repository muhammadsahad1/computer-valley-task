import { z } from 'zod';

// Signup Schema
export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    email: z.string().email('Invalid email format'),
    address: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    balance: z.number().min(0, 'Balance must be positive').optional()
});

// Login Schema
export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});

// Form Validation Schema
export const formSchema = z.object({
    textInput: z.string().min(1, 'Text input is required'),
    emailInput: z.string().email('Invalid email format'),
    passwordInput: z.string().min(6, 'Password must be at least 6 characters'),
    dateInput: z.coerce.date(),
    numberInput: z.number().min(0, 'Number must be positive'),
    checkboxInput: z.boolean(),
    radioInput: z.enum(['option1', 'option2', 'option3']),
    textareaInput: z.string().min(10, 'Must be at least 10 characters'),
    selectInput: z.string(),
    fileUrl: z.string().url().optional(),
});
