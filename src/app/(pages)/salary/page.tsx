
import Image from "next/image";
import { getUsers } from "@/services/userServices";
import Link from "next/link";
import { year } from "@/lib/helper/today-jalaly";

export default async function Page() {
    const data = await getUsers();

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">حقوق ها</span>
                            </h3>
                            <div className="card-toolbar gap-4 d-flex">
                            </div>
                        </div>
                        <div className="card-body py-3 px-0">
                            {!data || !data.length ? (
                                <div className="d-flex flex-column align-items-center py-5">
                                    <Image
                                        src="/5.png"
                                        width={400}
                                        height={400}
                                        className="w-400px h-400px"
                                        alt="not-found"
                                    />
                                    <div className="fs-1 fw-bolder text-dark mb-4">کاربر یافت نشد</div>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table align-middle table-row-dashed gs-0 gy-4 text-center">
                                        <thead>
                                            <tr className="fw-bold text-muted bg-light border-0">
                                                <th className="ps-4 min-w-150px rounded-start">شناسه</th>
                                                <th className="min-w-125px">کارمند</th>
                                                <th className="min-w-125px">شماره موبایل</th>
                                                <th className="min-w-200px">شماره بیمه</th>
                                                <th className="min-w-150px">وضعیت</th>
                                                <th className="min-w-50px rounded-end">عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((client: any) => (
                                                <tr key={client.id} className="text-center">
                                                    <td>
                                                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                                                            {client.id}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                                            {client.name + " " + client.family}
                                                        </span>
                                                    </td>
                                                    <td dir="ltr">
                                                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                                                            {client.phone}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                                            {client.insurance}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={
                                                            "badge fs-7 fw-bold " +
                                                            (client.deletedAt !== null
                                                                ? "badge-light-success"
                                                                : "badge-light-danger")
                                                        }>
                                                            {client.deletedAt !== null ? 'فعال' : 'غیرفعال'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            href={`/salary/${client.id}?data=${year}`}
                                                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1"
                                                        >
                                                            <i className="ki-outline ki-pencil fs-2" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
