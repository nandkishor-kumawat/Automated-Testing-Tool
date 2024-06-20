import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CategoryItem({
    label,
    options,
    handleSelect,
    value
}) {
    return (
        <Select onValueChange={(e)=>handleSelect(label, e)} value={value||''}>
            <SelectTrigger className="w-fit">
            <SelectValue placeholder={label} />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    {options.map(value => (
                        <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
