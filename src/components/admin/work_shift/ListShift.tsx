
import { useMemo, useState } from "react"

export const ListShifts = (data: any) => {
    const [options, setOptions] = useState();

    useMemo(() => {
        const value = data?.map((item: any) => ({
            value: item.id,
            label: item.name
        })
        )
        setOptions(value)
    }, [data])

    return options
}