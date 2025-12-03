'use client'
import { dateTimeFormat } from "@/services/formatDate"

export const GetTime = ({ time }: { time:string }) => {
    return (
        <>
            {dateTimeFormat(time)}
        </>
    )
}