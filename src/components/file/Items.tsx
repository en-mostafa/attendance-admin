'use client'

import { SessionContext } from "@/store";
import { useContext } from "react";
import { DeleteFile } from "./DeleteFIle";
import { EditFile } from "./Edit";
import { TranslateFile } from "./Translate";
import { pipeNumber } from "@/services/pipe";

export default function Items({ item } : { item:any }) {
    const role = useContext(SessionContext);

    return (
        <tr>
            <td className="text-start px-4">{item.id}</td>
            <td className="text-center">{item.title}</td>
            <td className="text-center">{pipeNumber(item.singlePrice)}</td>
            <td className="text-center">{item.tax}%</td>
            <td className="text-center">{item.discount}%</td>
            <td>
                <div className="d-flex justify-content-end gap-2">
                    {role?.product.update_product && (
                        <EditFile data={item}/>
                    )}
                    <TranslateFile id={item.id} />
                    {role?.product.delete_product && (
                        <DeleteFile id={item.id}/>
                    )}
                </div>
            </td>
        </tr>
    )
}