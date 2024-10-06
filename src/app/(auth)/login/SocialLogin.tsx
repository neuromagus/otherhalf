import { Button } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
    const onClick = (provider: "google" | "github") => {
        console.log(provider)
    }

    return (
        <div className="flex items-center w-full gap-2">
            <Button
                size="lg"
                fullWidth
                variant="bordered"
                onClick={() => onClick("google")}
            >
                <FcGoogle />
            </Button>
            <Button
                size="lg"
                fullWidth
                variant="bordered"
                onClick={() => onClick("github")}
            >
                <FaGithub />
            </Button>
        </div>
    )
}