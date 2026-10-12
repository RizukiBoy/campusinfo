import { z } from "zod";

const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Maksimal ${max} karakter`)
    .transform((v) => (v === "" ? undefined : v));

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(
      z
        .email("Format email tidak valid")
        .max(255, "Email maksimal 255 karakter"),
    ),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(255, "Password maksimal 255 karakter"),
  fullName: z
    .string()
    .trim()
    .min(1, "Nama lengkap wajib diisi")
    .max(255, "Nama lengkap maksimal 255 karakter"),
  phone: optionalTrimmed(50).optional(),
  dob: z.coerce.date().optional(),
  gender: optionalTrimmed(20).optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Format email tidak valid")),
  password: z.string().min(1, "Password wajib diisi"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
