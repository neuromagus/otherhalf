"use client"

import { registerUser } from "@/app/actions/authActions";
import { profileSchema, RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { handleFormServerErrors } from "@/lib/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { toast } from "react-toastify";
import UserDetailsForm from "./UserDetailsForm";
import { useState } from "react";

const stepSchemas = [registerSchema, profileSchema]

export default function RegisterForm() {
    const [activeStep, setActiveStep] = useState(0)
    const currentValidationSchema = stepSchemas[activeStep]

    const router = useRouter()

    const methods = useForm<RegisterSchema>({
        resolver: zodResolver(currentValidationSchema),
        mode: "onTouched"
    })
    const { handleSubmit, setError, getValues, formState: { errors, isValid, isSubmitting } } = methods

    // const onSubmit = async (data: RegisterSchema) => {
    const onSubmit = async () => {
        console.log(getValues())
        // const result = await registerUser(data)

        // if (result.status === "success") {
        //     toast.success("User registered")
        //     router.push("/login")
        // } else {
        //     handleFormServerErrors(result, setError)
        // }
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30} />
                        <h1 className="text-3xl font-semibold">Register</h1>
                    </div>
                    <p className="text-neutral-500">Welcome to OtherHalf</p>
                </div>
            </CardHeader>
            <CardBody>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-3">
                            <UserDetailsForm />
                            {errors.root?.serverError && (
                                <p className="text-danger text-sm">{errors.root.serverError.message}</p>
                            )}
                            <Button
                                isLoading={isSubmitting}
                                isDisabled={!isValid} fullWidth color="secondary" type="submit">
                                Register
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CardBody>
        </Card>
    )
}