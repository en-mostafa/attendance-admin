import NodataItems from "@/components/ui/NodataItems";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Items({ item } : { item:any }) {
    const t = useTranslations('Public');
    const userName = (user: any) => {
        if(user.firstName && user.lastName) {
            return user.firstName + " " + user.lastName
        } else {
            return t('User.anonymous_user')
        }
    } 
     

    return (
        item?.data.length > 0 ? (

            item?.data.map((data:any) => 
                <tr key={data.id}>
                    <td>
                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">{userName(data?.client)}</span>
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
                    <td className="text-end">
                        <Link href={`/users/${data?.id}`} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1">
                            <i className="ki-outline ki-pencil fs-2"></i>
                        </Link>
                    </td>
                </tr>
            )
        )
        : <NodataItems colSpan={7}/>
    )
}