import { deleteMessage } from "@/app/actions/messageActions"
import { MessageDto } from "@/types"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useCallback, Key } from "react"

export const useMessages = (messages: MessageDto[]) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const isOutbox = searchParams.get("container") === "outbox"
    const [isDeleting, setDeleting] = useState({ id: "", loading: false })

    const columns = [
        { key: isOutbox ? "recipientName" : "senderName", label: isOutbox ? "Recipient" : "Sender" },
        { key: "text", label: "Message" },
        { key: "created", label: isOutbox ? "Date sent" : "Date received" },
        { key: "actions", label: "Actions" }
    ]

    const handleDeleteMessage = useCallback(async (message: MessageDto) => {
        setDeleting({ id: message.id, loading: true })
        await deleteMessage(message.id, isOutbox)
        router.refresh()
        setDeleting({ id: "", loading: false })
    }, [isOutbox, router])

    const handleRowSelect = (key: Key) => {
        const message = messages.find(m => m.id === key)
        const url = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`
        router.push(url + "/chat")
    }

    return {
        isOutbox,
        columns,
        deleteMessage: handleDeleteMessage,
        selectRow: handleRowSelect,
        isDeleting
    }
}