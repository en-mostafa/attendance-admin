import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Items({ item } : { item:any }) {
    const t = useTranslations('Public');

    return (
        item?.data
            .filter((data: any) => data?.admin?.level !== 11)
            .map((data:any) => 
                <tr key={data.id}>
                    <td>
                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 px-4">{data?.client?.firstName ?? t("user") + " " + (data?.client?.lastName ?? t("anonymous"))}</span>
                    </td>
                    <td>
                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{data?.id}</span>
                    </td>
                    <td className="text-start">
                        <span dir="ltr" className="text-gray-900 fw-bold text-start text-hover-primary d-block mb-1 fs-6">{data?.cellphone}</span>
                    </td>
                    <td>
                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{data?.email}</span>
                    </td>
                    <td>
                        <span className={`badge ${data?.deletedAt === null ? 'badge-light-success' : 'badge-light-danger'}`}>{data?.deletedAt === null ? t('active') : t("not_active")}</span>
                    </td>
                    <td className="text-end">
                        <Link href={`/admin/check_present/${data?.id}`} className="btn btn-outline btn-bg-light text-black btn-sm ms-1">
                            {t("display")}
                        </Link>
                    </td>
                </tr>
            )
    )
}