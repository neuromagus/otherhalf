"use server"

import { memberEditSchema, MemberEditSchema } from "@/lib/schemas/memberEditSchema";
import { ActionResult } from "@/types";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { Member, Photo } from "@prisma/client";
import fs from 'fs/promises';
import path from 'path';

export async function updateMemberProfile(data: MemberEditSchema, nameUpdated: boolean): Promise<ActionResult<Member>> {
    try {
        const userId = await getAuthUserId()

        const validated = memberEditSchema.safeParse(data)

        if (!validated.success) return { status: "error", error: validated.error.errors }

        const { name, description, city, country } = validated.data

        if (nameUpdated) {
            await prisma.user.update({
                where: { id: userId },
                data: { name }
            })
        }

        const member = await prisma.member.update({
            where: { userId },
            data: {
                name,
                description,
                city,
                country
            }
        })

        return { status: "success", data: member }
    } catch (error) {
        console.log(error)

        return { status: "error", error: "Something went wrong" }
    }
}

export async function addImage(url: string) {
    try {
        const userId = await getAuthUserId();

        return prisma.member.update({
            where: { userId },
            data: {
                photos: {
                    create: [
                        {
                            url
                        }
                    ]
                }
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function setMainImage(photo: Photo) {
    try {
        const userId = await getAuthUserId()

        await prisma.user.update({
            where: { id: userId },
            data: { image: photo.url }
        })

        return prisma.member.update({
            where: { userId },
            data: { image: photo.url }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getUserInfoForNavbar() {
    try {
        const userId = await getAuthUserId()

        return prisma.user.findUnique({
            where: { id: userId },
            select: { name: true, image: true }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function deleteImage(photo: Photo) {
    try {
        const userId = await getAuthUserId()
        const filePath = path.join(process.cwd(), 'public', photo.url);

        const updatedMember = await prisma.member.update({
            where: { userId },
            data: {
                photos: {
                    delete: { id: photo.id }
                }
            }
        })

        try {
            await fs.unlink(filePath);
        } catch (fileError) {
                console.error(`Error deleting file ${filePath}:`, fileError);
        }

        return updatedMember
    } catch (error) {
        console.log(error)
        throw error
    }
}