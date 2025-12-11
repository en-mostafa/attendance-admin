
import Image from "next/image";
import { getLeaves } from "@/services/userServices";
import { Updateleave } from "./components/update-leave";

enum LeaveStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export default async function Page() {
    const data = await getLeaves();

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">مرخصی ها</span>
                            </h3>
                            <div className="card-toolbar gap-4 d-flex">
                            </div>
                        </div>
                        <div className="card-body py-3 px-0">
                            {!data || data.length === 0 ? (
                                <div className="d-flex flex-column align-items-center py-5">
                                    <Image
                                        src="/5.png"
                                        width={400}
                                        height={400}
                                        className="w-400px h-400px"
                                        alt="not-found"
                                    />
                                    <div className="fs-1 fw-bolder text-dark mb-4">مرخصی یافت نشد</div>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table align-middle table-row-dashed gs-0 gy-4 text-center">
                                        <thead>
                                            <tr className="fw-bold text-muted bg-light border-0">
                                                <th className="ps-4 min-w-150px rounded-start">شناسه</th>
                                                <th className="min-w-125px">کارمند</th>
                                                <th className="min-w-125px">تاریخ شروع</th>
                                                <th className="min-w-200px">تاریخ پایان</th>
                                                <th className="min-w-100px">مدت زمان</th>
                                                <th className="min-w-150px">وضعیت</th>
                                                <th className="min-w-50px rounded-end">عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((leave: any) => (
                                                <tr key={leave.id} className="text-center">
                                                    <td>
                                                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                                                            {leave.id}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                                                            {leave.user.name + " " + leave.user.family}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                                                            {leave.startDate}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                                                            {leave.endDate}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                                                            {leave.duration}
                                                            {leave.type === "DAILY" ? "روز" : "ساعت"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={
                                                            "badge fs-7 fw-bold " +
                                                            (leave.status === LeaveStatus.APPROVED
                                                                ? "badge-light-success"
                                                                : leave.status === LeaveStatus.REJECTED ? "badge-light-danger" : "badge-light-warning")
                                                        }>
                                                            {leave.status === LeaveStatus.PENDING
                                                                ? 'در انتظار'
                                                                : leave.status === LeaveStatus.REJECTED ? 'رد شده' : "تایید شده"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Updateleave leave={leave} />
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
