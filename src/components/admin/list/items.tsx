import { Link } from "@/i18n/routing";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
import { useContext } from "react";

export default function Items({ item } : { item:any }) {
    const role = useContext(SessionContext);
    const t = useTranslations('Public');

    return (
        item?.data
            .filter((data: any) => data?.admin?.level !== 11)
            .map((data:any) => 
                <tr key={data.id}>
                    <td>
                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{data?.client?.firstName + " " + data?.client?.lastName}</span>
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
                        <span className={`badge ${data?.deletedAt === null ? 'badge-light-success' : 'badge-light-danger'}`}>{data?.deletedAt === null ? t('active') : t('not_active')}</span>
                    </td>
                    {role?.admin.update_admin && (
                        <td className="text-end">
                            <Link href={`/admin/${data?.id}`} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1">
                                <i className="ki-outline ki-pencil fs-2"></i>
                            </Link>
                        </td>
                    )}
                </tr>
        )
    )
}