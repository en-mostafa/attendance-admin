import { DeleteIp } from "./DeleteIp";

export default function Items({ item } : { item:any }) {
    return (
        <tr>
            <td className="px-4">{item.id}</td>
            <td className="text-center">{item.description}</td>
            <td className="text-center">{item.ip}</td>
            <td className="px-4">
                <div className="d-flex justify-content-end">
                    <DeleteIp id={item.id}/>
                </div>
            </td>
        </tr>
    )
}