import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    address: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
})


export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
})

// Form validation schema
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

