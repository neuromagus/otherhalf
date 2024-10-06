"use client"

import { Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { format, subYears } from "date-fns"
import { useFormContext } from "react-hook-form"

export default function ProfileForm() {
    const { register, getValues, setValue, formState: { errors } } = useFormContext()
    const genderList = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
    ]

    return (
        <div className="space-y-4">
            <Select
                label="Gender"
                aria-label="Select gender"
                variant="bordered"
                {...register("gender")}
                defaultSelectedKeys={getValues("gender")}
                isInvalid={!!errors.gender}
                errorMessage={errors.gender?.message as string}
                onChange={e => setValue("gender", e.target.value)}
            >
                {genderList.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
            <Input
                label="Date of birth"
                max={format(subYears(new Date(), 18), "yyyy-MM-dd")}
                variant="bordered"
                type="date"
                {...register("dateOfBirth")}
                defaultValue={getValues("dateOfBirth")}
                isInvalid={!!errors.dateOfBirth}
                errorMessage={errors.dateOfBirth?.message as string}
            />
            <Textarea
                label="Description"
                variant="bordered"
                {...register("description")}
                defaultValue={getValues("description")}
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message as string}
            />
            <Input
                label="City"
                variant="bordered"
                {...register("city")}
                defaultValue={getValues("city")}
                isInvalid={!!errors.city}
                errorMessage={errors.city?.message as string}
            />
            <Input
                label="Country"
                variant="bordered"
                {...register("country")}
                defaultValue={getValues("country")}
                isInvalid={!!errors.country}
                errorMessage={errors.country?.message as string}
            />

        </div>
    )
}