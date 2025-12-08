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
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 px-4">{item?.createdAt}</span>
            </td>
            {/*<td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 px-4">{item?.endHour}</span>
            </td>*/}
            <Operation item={item} />
        </tr>
    )
}