
import Image from "next/image";
import { getTransactions } from "@/services/transaction.services";
import { pipeNumber } from "@/services/pipe";
import { Dialog } from "./components/dialog";

export default async function Page() {
    const data = await getTransactions();

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">واریزی ها</span>
                            </h3>
                            <div className="card-toolbar gap-4 d-flex">
                            </div>
                        </div>
                        <div className="card-body py-3 px-0">
                            {!data ? (
                                <div className="d-flex flex-column align-items-center py-5">
                                    <Image
                                        src="/5.png"
                                        width={400}
                                        height={400}
                                        className="w-400px h-400px"
                                        alt="not-found"
                                    />
                                    <div className="fs-1 fw-bolder text-dark mb-4">اطلاعاتی یافت نشد</div>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table align-middle table-row-dashed gs-0 gy-4 text-center">
                                        <thead>
                                            <tr className="fw-bold text-muted bg-light border-0">
                                                <th className="ps-4 min-w-150px rounded-start">شناسه</th>
                                                <th className="min-w-125px">کارمند</th>
                                                <th className="min-w-125px">تاریخ واریز</th>
                                                <th className="min-w-200px">مبلغ واریزی (تومان)</th>
                                                <th className="min-w-50px rounded-end">عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.map((item: any) => (
                                                <tr key={item.id} className="text-center">
                                                    <td>
                                                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                                                            {item.id}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                                            {item.user.name + " " + item.user.family}
                                                        </span>
                                                    </td>
                                                    <td dir="ltr">
                                                        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                                                            {item.date}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                                            {pipeNumber(item.amount)}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Dialog item={item} />
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
