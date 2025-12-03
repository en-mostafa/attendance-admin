import { useEffect, useState } from "react"
import { useData } from "./useData";

export const useDefaultSelectionAdmin = (id: number) => {
    const [admin, setAdmin] = useState<any>(null);
    const { data } = useData("/admin/manager/retrive-admins?page=1&limit=10000");
    
    useEffect(() => {
        const admin = data?.data.find((item:any) => item.id === id);
        if(admin) {
            setAdmin({
                value: admin?.id,
                label: admin?.client.firstName + admin?.client.lastName
            })
        }
       
    }, [data, id])
    return admin
}