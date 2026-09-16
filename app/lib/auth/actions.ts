'use server';

import { sql } from "../data";
import { z } from "zod";
import { State } from "./definations";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";


// ১. ইনপুট ভ্যালিডেশন স্কিমা
const RegisterSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export async function registerUser(prevState: State | undefined, formData: FormData): Promise<State> {
  // ২. Zod দিয়ে ডেটা ভ্যালিডেট করা
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // ৩. ইমেইলটি আগে থেকেই আছে কি না যাচাই করা
    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return {
        message: 'This email is already registered. Please log in.',
      };
    }

    // ৪. পাসওয়ার্ড হ্যাশ করা
    const hashedPassword = await bcrypt.hash(password, 10);

    // ৫. ডাটাবেজে নতুন ইউজার ইনসার্ট করা
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to create user.',
    };
  }

  // ৬. সফল হলে লগইন পেজে পাঠানো
  redirect('/login');
}