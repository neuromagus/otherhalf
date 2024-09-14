"use client"

import { signInUser } from "@/app/actions/authActions";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

export default function LoginForm() {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<loginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched"
    })

    const onSubmit = async (data: loginSchema) => {
        const result = await signInUser(data)

        if (result.status === "success") {
            router.push("/members")
        } else {
            console.log(result.error)
        }
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30} />
                        <h1 className="text-3xl font-semibold">login</h1>
                    </div>
                    <p className="text-neutral-500">Welcome back to OtherHalf</p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-3">
                        <Input
                            label="Email"
                            variant="bordered"
                            {...register("email")}
                            defaultValue=""
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            label="Password"
                            variant="bordered"
                            type="password"
                            {...register("password")}
                            defaultValue=""
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                        />
                        <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth color="secondary" type="submit">
                            Login
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}