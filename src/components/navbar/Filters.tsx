"use client"

import { useFilters } from "@/hooks/useFilters"
import { Button, Select, SelectItem, Slider, Spinner, Switch } from "@nextui-org/react"

export default function Filters() {
    const { genderList, orderByList, selectAge, selectGender,
        selectOrder, filters, isPending, selectWithPhoto
    } = useFilters()

    return (
        <div className="shadow-md py-2">
            <div className="flex flex-row justify-around items-center">
                <div className="flex gap-2 items-center">
                    <div className="text-secondary font-semibold text-xl">Results: 10</div>
                    <div className="w-6 h-6 flex items-center justify-center">
                        {isPending && <Spinner size="sm" color="secondary" />}
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div>Gender:</div>
                    {genderList.map(({ icon: Icon, value }) => (
                        <Button
                            key={value} size="sm"
                            isIconOnly
                            color={filters.gender.includes(value) ? "secondary" : "default"}
                            onClick={() => selectGender(value)}
                        >
                            <Icon size={24} />
                        </Button>
                    ))}
                </div>
                <div className="flex flex-row items-center gap-2 w-1/4">
                    <Slider
                        label="Age range"
                        color="secondary"
                        size="sm"
                        minValue={18}
                        maxValue={100}
                        defaultValue={filters.ageRange}
                        onChangeEnd={value => selectAge(value as number[])}
                        aria-label="Age range slider"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm">With photo</p>
                    <Switch
                        color="secondary"
                        defaultSelected
                        size="sm"
                        onChange={selectWithPhoto}
                    />
                </div>
                <div className="w-1/4">
                    <Select
                        size="sm"
                        fullWidth
                        label="Order by"
                        color="secondary"
                        variant="bordered"
                        aria-label="Order by selector"
                        selectedKeys={new Set([filters.orderBy])}
                        onSelectionChange={selectOrder}
                    >
                        {orderByList.map(item => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    )
}