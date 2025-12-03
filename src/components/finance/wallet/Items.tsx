import { Description } from "@/components/log/Description";
import { useJalaliFormat } from "@/services/formatDate";
import { pipeNumber } from "@/services/pipe";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Items({ item } : { item:any }) {
    const locale = await getLocale();
    const t = await getTranslations('Public.Finance');

    return (
        <tr key={item.id}>
            <td>
                <span className="text-gray-900 fw-bold d-block mb-1 fs-6">{item?.user?.client.firstName + " " + item?.user?.client.lastName}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold d-block mb-1 fs-6">{useJalaliFormat(item?.paiedAt, locale)}</span>
            </td>
            <td>
                <span className="text-gray-900 fw-bold d-block mb-1 fs-6">{pipeNumber(item?.amount)}</span>
            </td>
            <td>
                <span 
                    className={`badge ${item?.transformType === 'deposite' ? 'badge-light-success' : 'badge-light-danger'}`}>
                        {item?.transformType === 'deposite' ? t("deposit") : t("withdraw")}
                </span>
            </td>
            <td className="text-end">
                <Description item={item?.description}/>
            </td>
        </tr>
    )
}