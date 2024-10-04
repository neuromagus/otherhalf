import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { FaMale, FaFemale } from "react-icons/fa"
import useFilterStore from "./useFilterStore"
import { useEffect, useTransition } from "react"
import { Selection } from "@nextui-org/react"

export const useFilters = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const { filters, setFilters } = useFilterStore()
    const { gender, ageRange, orderBy } = filters

    useEffect(() => {
        startTransition(() => {
            const searchParams = new URLSearchParams()

            if (gender) searchParams.set("gender", gender.join(","))
            if (ageRange) searchParams.set("ageRange", ageRange.toString())
            if (orderBy) searchParams.set("orderBy", orderBy)
    
            router.replace(`${pathname}?${searchParams}`)
        })
    }, [ageRange, gender, orderBy, router, pathname])

    const orderByList = [
        { label: "Last active", value: "updated" },
        { label: "Newest members", value: "created" },
    ]

    const genderList = [
        { value: "male", icon: FaMale },
        { value: "female", icon: FaFemale },
    ]

    const handleAgeSelect = (value: number[]) => {
        setFilters("ageRange", value)
    }

    const handleOrderSelect = (value: Selection) => {
        if (value instanceof Set) {
            setFilters("orderBy", value.values().next().value)
        }
    }

    const handleGenderSelect = (value: string) => {
        if (gender.includes(value)) setFilters("gender", gender.filter(g => g !== value))
        else setFilters("gender", [...gender, value])
    }

    return {
        orderByList,
        genderList,
        selectAge: handleAgeSelect,
        selectGender: handleGenderSelect,
        selectOrder: handleOrderSelect,
        filters,
        isPending
    }
}