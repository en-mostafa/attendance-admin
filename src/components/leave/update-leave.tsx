'use client'

import { updateLeaves } from "@/services/userServices";
import { startTransition, useActionState, useEffect, useState } from "react"
import { toast } from "react-toastify";

export const Updateleave = ({ leave }: { leave: any }) => {
    const [select, setSelecet] = useState(leave.status);
    const [state, action, pending] = useActionState(updateLeaves, null)

    useEffect(() => {
        if (state?.success) {
            toast.success("با موفقیت ثبت شد");
        }
    }, [state])

    const handleChange = (value: string) => {
        setSelecet(value);
        const formData = {
            id: leave.id,
            status: value
        };
        startTransition(() => action(formData))
    }

    return (
        <select
            value={select}
            onChange={(e) => handleChange(e.target.value)}
            disabled={pending}
        >
            <option value="PENDING">در انتظار </option>
            <option value="APPROVED">تایید</option>
            <option value="REJECTED">رد</option>
        </select>
    )
}