"use server"

import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import bcrypt from "bcryptjs"
import { error } from "console";

export async function registerUser(data: RegisterSchema) {
    const validated = await registerSchema.safeParseAsync(data)

    if (!validated.success) return { error: validated.error.errors }

    const { name, email, password } = validated.data

    // 10 - length of salt, terrible "magic numbers"
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    return existingUser
        ? { error: "User already exists" }
        : prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword
            }
        })

}