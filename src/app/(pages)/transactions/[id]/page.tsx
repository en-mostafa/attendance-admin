import { Table } from "@/app/(pages)/employe-list/components/Table";
import Spinner from "@/components/ui/spinner";
import { getData } from "@/services/fetchData";
import { userInfo } from "@/services/userServices";
import { Shift } from "../components/shift";
import { Form } from "../components/form";

export default async function Page({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const user = await userInfo(id);
    const shifts = await getData("/shift/index");



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
                                                        <span>34</span>
                                                    </div>
                                                    <div className="fw-semibold fs-6 text-gray-400">بستانکاری</div>
                                                </div>
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-arrow-down fs-3 text-danger me-2"></i>
                                                        <span>34</span>
                                                    </div>
                                                    <div className="fw-semibold fs-6 text-gray-400">جریمه</div>
                                                </div>
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-arrow-up fs-3 text-success me-2"></i>
                                                        <span>34</span>
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
                            <div className="card-toolbar m-0">
                                <span>1404</span>
                            </div>
                        </div>
                        <div id="kt_referred_users_tab_content" className="tab-content">
                            <div id="kt_referrals_1" className="card-body p-0 tab-pane fade show active" role="tabpanel" aria-labelledby="kt_referrals_year_tab">
                                <div className="table-responsive">
                                    <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9">
                                        <thead className="border-gray-200 fs-6 fw-semibold bg-lighten">
                                            <tr>
                                                <th className="min-w-100px ps-9">تاریخ</th>
                                                <th className="min-w-100px px-0">ساعت کاری</th>
                                                <th className="min-w-100px">اضافه کاری</th>
                                                <th className="min-w-125px">تاخیر (ساعت)</th>
                                                <th className="min-w-125px">مجموع دریافتی  (تومان)</th>
                                                <th className="min-w-125px">پرداخت شده  (تومان)</th>
                                                <th className="min-w-125px"> باقی مانده  (تومان)</th>
                                                <th className="min-w-100px">وضعیت</th>
                                                <th className="min-w-125px text-center">عملیات</th>
                                            </tr>
                                        </thead>
                                        <tbody className="fs-6 fw-semibold text-gray-600">
                                            <tr>
                                                <td className="ps-9">آذر ماه</td>
                                                <td className="ps-0">102445788</td>
                                                <td className="ps-0">102445788</td>
                                                <td className="text-success">$38.00</td>
                                                <td className="text-success">$38.00</td>
                                                <td className="text-success">$38.00</td>
                                                <td className="text-success">$38.00</td>
                                                <td className="text-success">تسویه کامل</td>
                                                <td className="text-center">
                                                    <button className="btn btn-light btn-sm btn-active-light-primary">پرداخت</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}