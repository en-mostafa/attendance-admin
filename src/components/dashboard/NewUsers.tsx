import Image from "next/image";
import Link from "next/link";
import IconNoData from "@/components/ui/IconNoData";

export default function NewUsers({ data } : { data:any }) {
    return (
        <div className="col-xl-6 mb-5 mb-xl-10">
            <div className="card h-xl-100">
                <div className="card-header border-0 pt-5 align-items-center">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">کاربران جدید</span>
                    </h3>
                    <div>
                        <i className="ki-duotone ki-badge fs-1">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                        </i>
                    </div>
                </div>

                <div className="card-body py-3 overflow-auto" style={{ height: '21rem' }}>
                    {
                        data?.total_users === 0 ? (
                           <IconNoData />
                        ) : (
                            <div className="tab-content">
                                <div className="table-responsive">
                                    <table className="table align-middle gs-0 gy-3">
                                        <thead>
                                            <tr>
                                                <th className="p-0 w-50px"></th>
                                                <th className="p-0 min-w-150px"></th>
                                                <th className="p-0 min-w-140px"></th>
                                                <th className="p-0 min-w-120px"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data?.new_user?.map((user: any) => (
                                                    <tr key={user.id}>
                                                        <td>
                                                            <div className="symbol symbol-50px me-2">
                                                                <span className="symbol-label">
                                                                    <Image width={100} height={100} src={user.image} className="h-100 rounded align-self-end" alt="iamge avatart" />
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="text-dark fw-semibold text-hover-primary mb-1 fs-6 w-125px d-block text-truncate">{user.name + user.last_name}</span>
                                                            <span className="text-muted fw-semibold d-block text-truncate" style={{ maxWidth: '150px' }}>{user.id}</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-muted fw-semibold d-block fs-7">{user.phone_number}</span>
                                                        </td>
                                                        <td className="text-end">
                                                            <Link href={`/customers/list-customer/${user.id}`} className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                                <i className="ki-outline ki-arrow-left fs-2"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}