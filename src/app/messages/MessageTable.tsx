"use client"

import { MessageDto } from "@/types"
import {
    Avatar, Button, Card,
    Table, TableBody, TableCell,
    TableColumn, TableHeader, TableRow
} from "@nextui-org/react"
import { useSearchParams, useRouter } from "next/navigation"
import { Key, useCallback } from "react"
import { AiFillDelete } from "react-icons/ai"

type Props = {
    messages: MessageDto[]
}

export default function MessageTable({ messages }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const isOutbox = searchParams.get("container") === "outbox"

    const columns = [
        { key: isOutbox ? "recipientName" : "senderName", label: isOutbox ? "Recipient" : "Sender" },
        { key: "text", label: "Message" },
        { key: "created", label: isOutbox ? "Date sent" : "Date received" },
        { key: "actions", label: "Actions" }
    ]

    const handleRowSelect = (key: Key) => {
        const message = messages.find(m => m.id === key)
        const url = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`
        router.push(url + "/chat")
    }

    const renderCell = useCallback((item: MessageDto, colmunKey: keyof MessageDto) => {
        const cellValue = item[colmunKey]

        switch (colmunKey) {
            case "recipientName":
            case "senderName":
                return (
                    <div className="flex items-center gap-2 cursor-pointer">                        
                        <Avatar
                            alt="Image of member"
                            src={(isOutbox ? item.recipientImage : item.senderImage) || "/image/user.png"}
                        />
                        <span>{cellValue}</span>
                    </div>
                )
            case "text":
                return (
                    <div className="truncate max-w-[200px] md:max-w-[400px] lg:max-w-[500px]">{cellValue}</div>
                )
            case "created":
                return cellValue

            default:
                return (
                    <Button isIconOnly variant="light">
                        <AiFillDelete size={24} className="text-danger" />
                    </Button>
                )
        }
    }, [isOutbox])

    return (
        <Card className="flex flex-col gap-3 h-[80vh] overflow-auto mr-4">
            <Table
                aria-label="Table with messages"
                selectionMode="single"
                onRowAction={key => handleRowSelect(key)}
                shadow="none"
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={messages} emptyContent="No messages for this container">
                    {item => (
                        <TableRow key={item.id} className="cursor-pointer">
                            {colmunKey => (
                                <TableCell className={`${!item.dateRead && !isOutbox ? "font-semibold" : ""}`}>
                                    {renderCell(item, colmunKey as keyof MessageDto)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    )
}