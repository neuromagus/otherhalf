"use client"

import { deleteImage, setMainImage } from "@/app/actions/userActions"
import { Photo } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import DeleteButton from "./DeleteButton"
import StarButton from "./StarButton"
import { Image, useDisclosure } from "@nextui-org/react"
import AppModal from "./AppModal"

type Props = {
    photos: Photo[] | null
    editing?: boolean
    mainImageUrl?: string | null
}

export default function MemberPhotos({ photos, editing, mainImageUrl }: Props) {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const router = useRouter()
    const [loading, setLoading] = useState({
        type: "",
        isLoading: false,
        id: ""
    })

    const handleImageClick = (photo: string) => {
        setSelectedPhoto(photo)
        onOpen()
    }

    const onSetMain = async (photo: Photo) => {
        if (photo.url === mainImageUrl) return null

        setLoading({ isLoading: true, id: photo.id, type: "main" })

        await setMainImage(photo)
        router.refresh()

        setLoading({ isLoading: false, id: "", type: "" })
    }

    const onDelete = async (photo: Photo) => {
        if (photo.url === mainImageUrl) return null

        setLoading({ isLoading: true, id: photo.id, type: "delete" })

        await deleteImage(photo)
        router.refresh()
        setLoading({ isLoading: false, id: "", type: "" })
    }

    const handleClose = () => {
        setTimeout(() => onClose(), 10)
    }

    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
            {photos && photos.map(photo => (
                <div key={photo.id} className="relative">
                    <Image
                        width={200}
                        height={200}
                        src={photo.url}
                        alt="Image of user"
                        className="object-cover aspect-square"
                        onClick={() => handleImageClick(photo.url)}
                    />
                    {editing && (
                        <>
                            <div onClick={() => onSetMain(photo)} className="absolute top-3 left-2 z-20">
                                <StarButton selected={photo.url === mainImageUrl}
                                    loading={loading.isLoading && loading.type === "main" && loading.id === photo.id}
                                />
                            </div>
                            <div onClick={() => onDelete(photo)} className="absolute top-3 right-5 z-20">
                                <DeleteButton
                                    loading={loading.isLoading && loading.type === "delete" && loading.id === photo.id}
                                />
                            </div>
                        </>
                    )}
                </div>
            ))}
            <AppModal
                imageModal={true}
                isOpen={isOpen}
                onClose={handleClose}
                body={selectedPhoto && (
                    <div className="relative flex items-center justify-center">
                        <Image
                            src={selectedPhoto}
                            alt="Image of user"
                            className="object-cover max-w-full max-h-full aspect-square"
                        />
                    </div>
                )}
            />
        </div>
    )
}