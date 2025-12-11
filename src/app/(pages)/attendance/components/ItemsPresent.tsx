import { StatusOption } from "./StatusOption";

export default function Items({ item }: { item: any }) {
    return (
        <tr>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 px-4">
                    {item.userId}
                </span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                    {item.date}
                </span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                    {item.date}
                </span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                    {item.checkIn}
                </span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                    {item.checkOut ?? '--'}
                </span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                    {item.ipAddress}
                </span>
            </td>
            <td className="text-end px-8">
                <div className="d-flex align-items-center justify-content-end gap-20">
                    <StatusOption id={item.id} status={item.status} />
                </div>
            </td>
        </tr>
    )
}
