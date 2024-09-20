import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId, getMemberPhotosByUserId } from "@/app/actions/memberActions";
import MemberPhotos from "@/components/MemberPhotos";
import ImageUploadButton from "@/components/UploadImageButton";
import { CardHeader, Divider, CardBody } from "@nextui-org/react";

export default async function PhotosPage() {
    const userId = await getAuthUserId()
    const photos = await getMemberPhotosByUserId(userId)
    const member = await getMemberByUserId(userId)

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
                <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image} />
            </CardBody>
        </>
    )
}