import { jalaliTime } from "@/lib/helper/jalali-date";
import { Operation } from "./Operation";

export default function Items({ item }: { item: any }) {

    return (
        <tr key={item.id}>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 px-4">{item?.id}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item?.name}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 px-4">{jalaliTime(item?.createdAt)}</span>
            </td>
            <td>
                <span className={` fw-bold text-hover-primary d-block mb-1 fs-6 px-4 ${item?.isActive ? 'text-success' : "text-danger"}`}>{item?.isActive ? 'فعال' : 'غیرفعال'}</span>
            </td>
            <Operation item={item} />
        </tr>
    )
}