"use client"

import { setMainImage } from "@/app/actions/userActions"
import { Photo } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import DeleteButton from "./DeleteButton"
import StarButton from "./StarButton"
import { Image } from "@nextui-org/react"

type Props = {
    photos: Photo[] | null
    editing?: boolean
    mainImageUrl?: string | null
}

export default function MemberPhotos({ photos, editing, mainImageUrl }: Props) {
    const router = useRouter()
    const [loading, setLoading] = useState({
        type: "",
        isLoading: false,
        id: ""
    })

    const onSetMain = async (photo: Photo) => {
        if (photo.url === mainImageUrl) return null

        setLoading({ isLoading: true, id: photo.id, type: "main" })

        await setMainImage(photo)
        router.refresh()

        setLoading({ isLoading: false, id: "", type: "" })
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
            {photos && photos.map(photo => (
                <div key={photo.id} className="relative">
                    <Image
                        width={200}
                        height={200}
                        src={photo.url}
                        alt="Image of user"
                        className="object-cover aspect-square"
                    />
                    {editing && (
                        <>
                            <div onClick={() => onSetMain(photo)} className="absolute top-3 left-2 z-20">
                                <StarButton selected={photo.url === mainImageUrl} 
                                loading={loading.isLoading && loading.type === "main" && loading.id === photo.id} 
                            />
                            </div>
                            <div className="absolute top-3 right-5 z-20">
                                <DeleteButton loading={false} />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}