import { Link } from "@/i18n/routing";
import { Edit } from "./Edit";
import { useJalaliFormat } from "@/services/formatDate";
import { pipeNumber } from "@/services/pipe";
import { getLocale } from "next-intl/server";

export default async function Items({ item } : { item:any }) {
    const locale = await getLocale();

    return (
        <tr>
            <td>
                <Link href={`/admin/${item?.user.id}`} className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item?.user?.client.firstName + " " + item?.user.client?.lastName}</Link>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item?.user?.email}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 px-4">{pipeNumber(item?.amount)}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 px-4">{item?.textId}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 px-4">{useJalaliFormat(item?.paiedAt, locale)}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 px-4">{useJalaliFormat(item?.createdAt, locale)}</span>
            </td>
            <td>
                <div className="d-flex justify-content-end">
                    <Edit key={item.id} item={item}/>
                </div>
            </td>
        </tr>
    )
}