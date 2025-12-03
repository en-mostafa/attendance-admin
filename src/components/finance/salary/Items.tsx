import { Link } from "@/i18n/routing";
import { Edit } from "./Edit";
import { pipeNumber } from "@/services/pipe";
import { useJalaliFormat } from "@/services/formatDate";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Items({ item } : { item:any }) {
    const locale = await getLocale();
    const t = await getTranslations('Public.Finance');
    
    return (
            <tr>
                <td>
                    <Link href={`/admin/${item?.wallet?.user.id}`} className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item?.wallet?.user?.client.firstName + " " + item?.wallet?.user.client?.lastName}</Link>
                </td>
                <td>
                    <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{item?.wallet?.user?.email}</span>
                </td>
                <td>
                    <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{pipeNumber(item?.wallet?.user?.admin.salary)}</span>
                </td>
                <td>
                    <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{pipeNumber(item?.wallet?.balance)}</span>
                </td>
                <td>
                    <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{pipeNumber(item?.totalAmount)}</span>
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
                <td>
                    <Link 
                        href={`/finance/salary/${item?.wallet?.user.id}`} 
                        className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2">{t("show")}</Link>
                </td>
                <td className="text-end">
                    <Edit key={item.id} item={item} />
                </td>
            </tr>

    )
}