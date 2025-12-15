import { Table } from "@/app/(pages)/employe-list/components/Table";
import Spinner from "@/components/ui/spinner";
import { getData } from "@/services/fetchData";
import { userInfo } from "@/services/userServices";
import { Shift } from "../components/shift";
import { Form } from "../components/form";
import { jalali } from "@/lib/helper/jalali-date";
import { useJalaliFormat } from "@/services/formatDate";

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
                                        <div className={`position-absolute translate-middle bottom-0 start-100 mb-6 rounded-circle border border-4 border-body h-20px w-20px ${user.status === 'ACTIVE' ? 'bg-success' : 'bg-danger'}`}></div>
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
                                                    توسعه دهنده
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-wrap flex-stack">
                                        <div className="d-flex flex-column flex-grow-1 pe-8">
                                            <div className="d-flex flex-wrap">
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <span>{user?.id}</span>
                                                    </div>
                                                    <div className="fw-semibold fs-6 text-gray-400">شماره پرسنلی</div>
                                                </div>
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <span>{useJalaliFormat(user?.createdAt)}</span>
                                                    </div>
                                                    <div className="fw-semibold fs-6 text-gray-400">تاریخ ثبت نام</div>
                                                </div>
                                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <span className={`${user.status === 'ACTIVE' ? 'text-success' : "text-danger"} `}>
                                                            {user.status === 'ACTIVE' ? 'فعال' : "غیرفعال"}
                                                        </span>
                                                    </div>
                                                    <div className="fw-semibold fs-6 text-gray-400">وضعیت</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
                        <div className="card-header cursor-pointer">
                            <div className="card-title m-0">
                                <h3 className="fw-bold m-0">پروفایل جزییات</h3>
                            </div>
                        </div>
                        <Form user={user} shifts={shifts} />
                    </div>
                </div>
            </div>
        </div>
    )
}