import { Link } from "@/i18n/routing";
import { SessionContext } from "@/store";
import { useLocale, useTranslations } from "next-intl";
import { useContext } from "react";
import { DeleteCase } from "./Delete";
import { CaseStatus } from "../detail_case/CaseStatus";
import { useJalaliFormat } from "@/services/formatDate";

export default function Items({ item, mutate } : { item:any, mutate:any }) {
    const role = useContext(SessionContext);
    const locale = useLocale();
    const t = useTranslations('Public');

    return (
        <tr>
            <td className="px-4">
                <span className="fw-bold">{item?.id}</span>
            </td>
            <td className="text-center">
                {item?.asigner?.client?.firstName} {item?.asigner?.client?.lastName}
            </td>
            <td>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <span className="badge badge-light-primary rounded fw-bold fs-6">
                    {item?.user?.id}
                    </span>
                    <Link
                    href={`/users/${item?.user?.id}`}
                    className="text-gray-900 fw-bold d-block mb-1 fs-6"
                    target="_blank"
                    >
                    {item?.user?.client?.firstName} {item?.user?.client?.lastName}
                    </Link>
                </div>
            </td>
            <td className="text-center">
                <CaseStatus status={item?.status}/>
            </td>
            <td className="text-center">{useJalaliFormat(item?.createdAt, locale)}</td>
            <td className="text-center">{item?.totalPrice?.toLocaleString()} {t('euro')}</td>
            <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
                    {role?.case.delete_case && (
                        <>
                        <DeleteCase id={item?.id} mutate={mutate}/>
                        </>
                    )}
                    {role?.case.update_case && (
                        <Link
                            href={`/detail_case/${item?.id}/more`}
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        >
                            <i className="ki-outline ki-pencil fs-2"></i>
                        </Link>
                    )}
                </div>
            </td>
        </tr>
    )
}