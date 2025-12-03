'use client'

import { taskStatus } from "@/lib/helper/taskStatus"
import { updateStatusTask } from "@/services/task.server";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

export const TaskStatus = ({ items } : { items:any }) => {
    const role = useContext(SessionContext);
    const [state, action] = useActionState(updateStatusTask, null);
    const t = useTranslations('Public');
    const status = taskStatus(t);

    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        } else if (state?.message === 'error') {
            toast.error(t('toast_error'))
        }
    }, [state])


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(!role?.task.update_task) {
            toast.error(t('not_allowed_change_task_statsu'))
            return;
        }

        const selectedIndex = e.target.selectedIndex;
        const value = e.target.value;
        const lable = e.target.options[selectedIndex].text;
        const data = {
            id: items?.id,
            status: { value, lable }
        }
        startTransition(() => action(data))
    }
 
    return (
        <select 
            name="selectedFruit" 
            className="form-select form-select-solid fs-7"
            onChange={handleChange}
            defaultValue={items?.status.value}
            >

            {status.map(item => (
                <option key={item.value} value={item.value}>{item.label}</option>
            ))}
        </select>
    )
}