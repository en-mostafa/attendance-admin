import { Table } from "@/app/(pages)/employe-list/components/Table";
import Spinner from "@/components/ui/spinner";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = [
        {
            id: 1,
            wallet: {
                user: {
                    id: 99,
                    email: "test@example.com",
                    client: {
                        firstName: "Mostafa",
                        lastName: "Nemati",
                    },
                    admin: {
                        salary: 3500,
                    },
                },
                balance: 12500,
            },
            totalAmount: 4200,
            paiedAt: "2025-01-10T14:20:00",
            side: "reward",
        }
    ]


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
                                                <a href="#" className="text-gray-900 text-hover-primary fs-2 fw-bold me-1">جلالی</a>
                                                <a href="#">
                                                    <i className="ki-outline ki-verify fs-1 text-primary"></i>
                                                </a>
                                            </div>
                                            <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                                <a href="#" className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                                    <i className="ki-outline ki-profile-circle fs-4 me-1"></i>
                                                    شماره پرسنلی : ۴۳۵۴۳۵
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
                    <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
                        <div className="card-header cursor-pointer">
                            <div className="card-title m-0">
                                <h3 className="fw-bold m-0">پروفایل جزییات</h3>
                            </div>
                        </div>
                        <div className="card-body p-9">
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-semibold text-muted">نام کامل</label>
                                <div className="col-lg-8">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        defaultValue={'جلالی'}
                                    />
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-semibold text-muted">شماره بیمه</label>
                                <div className="col-lg-8 fv-row">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        defaultValue={'121212'}
                                    />
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-semibold text-muted">شماره موبایل</label>
                                <div className="col-lg-8 d-flex align-items-center">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        defaultValue={'09305535392'}
                                    />
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-semibold text-muted">   تلفن اضطراری
                                    <span className="ms-1" data-bs-toggle="tooltip" aria-label="شماره تلفن باید فعال باشد" data-bs-original-title="شماره تلفن باید فعال باشد" data-kt-initialized="1">
                                    </span></label>
                                <div className="col-lg-8 d-flex align-items-center">
                                    <span className="fw-bold fs-6 text-gray-800 me-2">044 3276 454 935</span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-semibold text-muted">کد ملی</label>
                                <div className="col-lg-8">
                                    <span className="fw-bold fs-6 text-gray-800 me-2">044 3276 454 935</span>
                                </div>
                            </div>
                            <div className="row mb-7">
                                <label className="col-lg-4 fw-semibold text-muted">پایه حقوق</label>
                                <div className="col-lg-8">
                                    <span className="fw-bold fs-6 text-gray-800 me-2">044 3276 454 935</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-150px mt-10"
                                    disabled={false}
                                >
                                    {false ? <Spinner /> : 'ذخیره تغییرات'}
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="card mb-5 mb-xl-8">
                        <div className="card-header border-0 pt-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold fs-3 mb-1">خلاصه حقوق ها</span>
                            </h3>
                        </div>
                        {/*Tabel*/}
                        <div className="card-body py-3">
                            <div className="table-responsive">
                                <Table data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}