import { Prisma } from "@prisma/client";
import { ZodIssue } from "zod";

type ActionResult<T> = { status: "success", data: T } | { status: "error", error: string | ZodIssue[] }

// Why "?" here? Because this field can be "undefined"
type MessageDto = {
    id: string
    text: string
    created: string
    dateRead: string | null
    senderId: string
    senderImage?: string | null
    recepientId: string
    recepientName: string
    recepientImage?: string | null
}

type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
    select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
            select: { userId, name, image }
        },
        recipient: {
            select: { userId, name, image }
        }
    }
}>