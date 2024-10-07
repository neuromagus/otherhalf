import AppModal from "@/components/AppModal"
import PresenceAvatar from "@/components/PresenceAvatar"
import { MessageDto } from "@/types"
import { Button, ButtonProps, useDisclosure } from "@nextui-org/react"
import { AiFillDelete } from "react-icons/ai"

type Props = {
    item: MessageDto
    columnKey: string
    isOutbox: boolean
    deleteMessage: (message: MessageDto) => void
    isDeleting: boolean
}

export default function MessageTableCell({ item, columnKey, isOutbox, deleteMessage, isDeleting }: Props) {
    const cellValue = item[columnKey as keyof MessageDto]
    const { isOpen, onOpen, onClose } = useDisclosure()
    const footerButtons: ButtonProps[] = [
        { color: "default", onClick: onClose, children: "Close" },
        { color: "secondary", onClick: onClose, children: "Submit" }
    ]

    switch (columnKey) {
        case "recipientName":
        case "senderName":
            return (
                <div className="flex items-center gap-2 cursor-pointer">
                    <PresenceAvatar
                        userId={isOutbox ? item.recipientId : item.senderId}
                        src={isOutbox ? item.recipientImage ?? null : item.senderImage ?? null}
                    />
                    <span>{cellValue}</span>
                </div>
            )
        case "text":
            return (
                <div className="truncate max-w-[200px] md:max-w-[300px] lg:max-w-[400px]">{cellValue}</div>
            )
        case "created":
            return <div>{cellValue}</div>
        default:
            return (
                <>
                    <Button
                        onClick={() => onOpen()}
                        isLoading={isDeleting}
                        isIconOnly
                        variant="light"
                    >
                        <AiFillDelete size={24} className="text-danger" />
                    </Button>
                    <AppModal
                        isOpen={isOpen}
                        onClose={onClose}
                        header="Test modal"
                        body={<div>Just testing</div>}
                        footerButtons={footerButtons}
                    />
                </>

            )
    }
}