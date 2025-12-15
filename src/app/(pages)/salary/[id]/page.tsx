import { pipeNumber } from "@/services/pipe";
import { Table } from "../components/Table";
import { getSalary } from "@/services/salary.services";
import { CalenderYear } from "../components/date-picker-year";

export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [date: string]: string }>
}) {
    const { id } = await params;
    const param = (await searchParams).date;
    const data = await getSalary(`id=${id}&date=${param}`);
    const user = data?.transactions[0]?.user;

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="card mb-5 mb-xl-10">
                        <div className="card-body pt-9 pb-0">
                            <div className="d-flex flex-wrap flex-sm-nowrap">
                                <div className="me-7 mb-4">
                                    <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                                        <img src="/assets/media/avatars/300-1.jpg" alt="image" />
                                        <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                        <div className="d-flex flex-column">
                                            <div className="d-flex align-items-center mb-2">
                                                <a href="#" className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">{user?.family}</a>
                                                <a href="#">
                                                    <i className="ki-outline ki-verify fs-1 text-primary"></i>
                                                </a>
                                            </div>
                                            <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                    <i className="ki-outline ki-profile-circle fs-4 me-1"></i>
                                                    شماره پرسنلی :   {user?.id}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="d-flex my-4">
                                            <a href="#" className="btn btn-sm btn-danger me-2" id="kt_user_follow_button">
                                                <span className="indicator-label"> جریمه</span>
                                            </a>
                                            <a href="#" className="btn btn-sm btn-success me-2" id="kt_user_follow_button">
                                                <span className="indicator-label"> پاداش</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-wrap flex-stack">
                                        <div className="d-flex flex-column flex-grow-1 pe-8">
                                            <div className="d-flex flex-wrap">
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-arrow-up fs-3 text-success me-2"></i>
                                                        <span className="fs-5">{pipeNumber(data?.wallet?.balance ?? 0)} تومان</span>
                                                    </div>
                                                    <div className="fw-semibold fs-6 text-gray-400">بستانکاری</div>
                                                </div>
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-arrow-down fs-3 text-danger me-2"></i>
                                                        <span className="fs-5">{pipeNumber(data?.wallet?.credits ?? 0)} تومان</span>
                                                    </div>
                                                    <div className="fw-semibold fs-6 text-gray-400">جریمه</div>
                                                </div>
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-arrow-up fs-3 text-success me-2"></i>
                                                        <span className="fs-5">{pipeNumber(data?.wallet?.penalties ?? 0)} تومان</span>
                                                    </div>
                                                    <div className="fw-semibold fs-6 text-gray-400">پاداش</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header card-header-stretch">
                            <div className="card-title">
                                <h3 className="m-0 text-gray-800">گزارش مالی</h3>
                            </div>
                            <div className="card-title">
                                <CalenderYear id={id} />
                            </div>
                        </div>
                        <div id="kt_referred_users_tab_content" className="tab-content">
                            <div id="kt_referrals_1" className="card-body p-0 tab-pane fade show active" role="tabpanel" aria-labelledby="kt_referrals_year_tab">
                                <div className="table-responsive">
                                    <Table data={data?.transactions} userId={user?.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}