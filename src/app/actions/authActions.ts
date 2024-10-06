"use server"

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { combinedRegisterSchema, registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth";

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = await combinedRegisterSchema.safeParseAsync(data)

        if (!validated.success) return { status: "error", error: validated.error.errors }

        const { name, email, password, gender, description, dateOfBirth, city, country } = validated.data

        // 10 - length of salt, terrible "magic numbers"
        const hashedPassword = await bcrypt.hash(password, 10)

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) return { status: "error", error: "User already exists" }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
                member: {
                    create: {
                        name,
                        description,
                        city,
                        country,
                        dateOfBirth: new Date(dateOfBirth),
                        gender
                    }
                }
            }
        })

        return { status: "success", data: user }
    } catch (error) {
        console.log(error)
        return { status: "error", error: "Something went wrong" }
    }
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({ where: { id } })
}

export async function signInUser(data: loginSchema): Promise<ActionResult<string>> {
    try {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        })
        console.log(result)

        return { status: "success", data: `Logged in ${data.email}` }
    } catch (error) {
        console.log(error)

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { status: "error", error: "Invalid credentials" }
                default:
                    return {status: "error", error: "Something went wrong"}
            }
        } else {
            return {status: "error", error: "Something else went wrong"}
        }
    }
}

export async function signOutUser() {
    await signOut({redirectTo: "/"})
}

export async function getAuthUserId() {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) throw new Error("Unauthorised")

    return userId
}