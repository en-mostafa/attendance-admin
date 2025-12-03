import { useMemo, useState } from "react";
import { useData } from "./useData"

export const useSelectionAdmins = () => {
    const [admins, setAdmins] = useState(null);
    const { data } = useData("/admin/manager/retrive-admins?page=1&limit=10000");

    useMemo(() => {
        const admin = data?.data
            .filter((item:any) => item.admin.level !== 11)
            .map((item:any) => ({
                value: item.id,
                label: item.client.firstName + item.client.lastName
            }));

        setAdmins(admin)
    }, [data]);

    return admins
}