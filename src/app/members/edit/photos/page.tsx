import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import DeleteButton from "@/components/DeleteButton";
import StarButton from "@/components/StarButton";
import ImageUploadButton from "@/components/UploadImageButton";
import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react";

export default async function PhotosPage() {
    const userId = await getAuthUserId()
    const photos = await getMemberPhotosByUserId(userId)

    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">
                Edit Photos
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="pl-5">
                    <ImageUploadButton />
                </div>
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
                            <div className="absolute top-3 left-2 z-20">
                                <StarButton selected={true} loading={false} />
                            </div>
                            <div className="absolute top-3 right-5 z-20">
                                <DeleteButton loading={false} />
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </>
    )
}