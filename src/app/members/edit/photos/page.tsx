import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId, getMemberPhotosByUserId } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import MemberPhotos from "@/components/MemberPhotos";
import ImageUploadButton from "@/components/UploadImageButton";
import { CardHeader, Divider, CardBody } from "@nextui-org/react";

export default async function PhotosPage() {
    const userId = await getAuthUserId()
    const photos = await getMemberPhotosByUserId(userId)
    const member = await getMemberByUserId(userId)

    const body = (
        <>
            <div className="pl-5">
                <ImageUploadButton />
            </div>
            <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image} />
        </>
    )
    return (
        <CardInnerWrapper header="Edit Photos" body={body} />

    )
}