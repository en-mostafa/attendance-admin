import { useMemo, useState } from "react"

export const ListAdmins = (data: any) => {
    const [options, setOptions] = useState();

    useMemo(() => {
        const value = data?.
            filter((data: any) => data?.admin?.level !== 11)
            .map((item:any) => ({
                value: item.id,
                label: item.client.firstName + ' ' + item.client.lastName
            })
    )
        setOptions(value)
    }, [data])

    return options
}