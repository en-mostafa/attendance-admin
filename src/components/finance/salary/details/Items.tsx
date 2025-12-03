import { pipeNumber } from "@/services/pipe";
import { useJalaliFormat } from "@/services/formatDate";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Items({ item } : { item:any }) {
    const t = await getTranslations('Public.Finance');
    const locale = await getLocale();
    
    return (
            <tr>
                <td>
                    <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{pipeNumber(item?.wallet?.user?.admin.salary)}</span>
                </td>
                <td>
                    <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{pipeNumber(item?.wallet?.balance)}</span>
                </td>
                <td>
                    <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{pipeNumber(item?.amount)}</span>
                </td>
                <td>
                    <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{useJalaliFormat(item?.paiedAt, locale)}</span>
                </td>
                <td>
                    <span 
                        className={`badge ${item?.side === 'reward' ? 'badge-light-success' : 'badge-light-danger'}`}>
                            {item?.side === 'reward' ? t("deposit") : t("withdraw")}
                    </span>
                </td>
                <td className="text-end w-150px">
                    <span className="text-truncate w-300px d-block ms-auto">{item?.description}</span>
                </td>
            </tr>

    )
}