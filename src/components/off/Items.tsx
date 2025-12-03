import { useJalaliFormat } from "@/services/formatDate";
import { EditStatus } from "./EditStatus";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Items({ item } : { item:any }) {
    const t = await getTranslations('Public');
    const locale = await getLocale();

    return (
        <tr>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item?.admin?.user?.client.firstName + " " + item?.admin?.user?.client.lastName}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item?.admin?.user.email}</span>
            </td>
            <td className="text-start">
                <span dir="ltr" className="text-gray-900 fw-bold text-start text-hover-primary d-block mb-1 fs-6">{useJalaliFormat(item?.createdAt, locale)}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{useJalaliFormat(item?.startDate, locale) + " -- " + useJalaliFormat(item?.endDate, locale)}</span>
            </td>
            <td>
                <span className={`badge ${item?.status === 'Pending' ? 'badge-light-warning' : 'badge-light-success'}`}>{item?.status === 'Pending' ? t("Status.pending") : t("Status.confirmed")}</span>
            </td>
            <td className="text-end">
                <EditStatus item={item}/>
            </td>
        </tr>
    )
}