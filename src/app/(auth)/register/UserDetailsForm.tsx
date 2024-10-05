"use client"

import { Input } from "@nextui-org/react"
import { useFormContext } from "react-hook-form"

export default function UserDetailsForm() {
    const { register, formState: { errors } } = useFormContext()

    return (
        <div className="space-y-4">
            <Input
                label="Name"
                variant="bordered"
                {...register("name")}
                defaultValue=""
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message as string}
            />
            <Input
                label="Email"
                variant="bordered"
                {...register("email")}
                defaultValue=""
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message as string}
            />
            <Input
                label="Password"
                variant="bordered"
                type="password"
                {...register("password")}
                defaultValue=""
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message as string}
            />
        </div>
    )
}