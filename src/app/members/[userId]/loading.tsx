import { Spinner } from "@nextui-org/react";

export default function Loading() {
    return (
        <div className="justify-center items-center vertical-center flex">
            <Spinner label="Loading..." color="secondary" labelColor="secondary" />
        </div>
    )
}