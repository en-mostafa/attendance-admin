import DeletedItem from "./Delete";
import { EditCategory } from "./Edit";

export default function Items({ item } : { item:any }) {

    return (
        <tr key={item.id}>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 px-4">{item?.name}</span>
            </td>
            <td className="text-end">
                <DeletedItem id={item?.id} />
                <EditCategory key={item.id} item={item}/>
            </td>
        </tr>
    )
}