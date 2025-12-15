"use client";
import Spinner from "@/components/ui/spinner";
import { useActionState, useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import { addUser } from "@/services/userServices";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ListShift } from "./list-shift";
import { pipe } from "@/services/pipe";
const Select = dynamic(() => import('react-select'), { ssr: false });

export default function AddUser({ shifts }: { shifts: any }) {
    const router = useRouter();
    const [salary, setSalary] = useState('');
    const [password, setPassword] = useState(true);
    const [shift, setShift] = useState<any>(null);
    const [state, action, pending] = useActionState(addUser, null);

    const handleInputPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newValue = value.replace(/,/g, "");
        setSalary(newValue)
    }

    useEffect(() => {
        if (state?.message === "success") {
            router.push("/employe-list");
            toast.success('باموفقیت انجام شد');
        }
    }, [state]);

    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
                    <div
                        id="kt_app_toolbar_container"
                        className="app-container container-fluid d-flex align-items-stretch"
                    >
                        <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                            <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                                <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0">
                                    کارمند جدید
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    id="kt_app_content_container"
                    className="app-container container-fluid"
                >
                    <div id="kt_app_content" className="app-content flex-column-fluid">
                        <div className="card">
                            <div className="card-body pt-6">
                                <form action={action} className="form">
                                    <div className="row g-9 mb-8">
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="form-label">
                                                نام
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                className={`form-control ${state?.errors?.name && "is-invalid"
                                                    }`}
                                                placeholder="نام"
                                                aria-label="Server"
                                            />
                                            <div className="invalid-feedback">
                                                {state?.errors?.name}
                                            </div>
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="form-label">
                                                نام خانوادگی
                                            </label>
                                            <input
                                                type="text"
                                                name="family"
                                                className={`form-control ${state?.errors?.family && "is-invalid"}`}
                                                placeholder="  نام خانوادگی"
                                                aria-label="Server"
                                            />
                                            <div className="invalid-feedback">
                                                {state?.errors?.family}
                                            </div>
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="form-label">
                                                کد ملی
                                            </label>
                                            <input
                                                type="text"
                                                name="nationalCode"
                                                className={`form-control ${state?.errors?.nationalCode && "is-invalid"
                                                    }`}
                                                placeholder="کد ملی"
                                                aria-label="Server"
                                            />
                                            <div className="invalid-feedback">
                                                {state?.errors?.nationalCode}
                                            </div>
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="form-label">
                                                شماره موبایل
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                placeholder="شمار موبایل"
                                                className={`form-control ${state?.errors?.phone && "is-invalid"
                                                    }`}
                                            />
                                            <div className="invalid-feedback">
                                                {state?.errors?.phone}
                                            </div>
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="form-label">
                                                پایه حقوق  (تومان)
                                            </label>
                                            <input
                                                type="text"
                                                value={pipe(salary)}
                                                onChange={handleInputPrice}
                                                className={`form-control ${state?.errors?.baseSalary && "is-invalid"
                                                    }`}
                                                placeholder="پایه حقوق (تومان)"
                                                aria-label="Server"
                                            />
                                            <input type="hidden" name="baseSalary" defaultValue={salary} />
                                            <div className="invalid-feedback">
                                                {state?.errors?.baseSalary}
                                            </div>
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="form-label">
                                                تلفن اضطراری
                                            </label>
                                            <input
                                                type="text"
                                                name="emergencyPhone"
                                                className={`form-control ${state?.errors?.emergencyPhone && "is-invalid"
                                                    }`}
                                                placeholder="تلفن اضطراری"
                                                aria-label="Server"
                                            />
                                            <div className="invalid-feedback">
                                                {state?.errors?.emergencyPhone}
                                            </div>
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="form-label">
                                                شماره بیمه
                                            </label>
                                            <input
                                                type="text"
                                                name="insurance"
                                                className={`form-control ${state?.errors?.insurance && "is-invalid"
                                                    }`}
                                                placeholder="شماره بیمه"
                                                aria-label="Server"
                                            />
                                            <div className="invalid-feedback">
                                                {state?.errors?.insurance}
                                            </div>
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="mb-2">شیفت</label>
                                            <Select
                                                value={shift}
                                                onChange={setShift}
                                                classNamePrefix={'react-select'}
                                                placeholder="انتخاب کنید"
                                                options={ListShift(shifts)}
                                            />
                                            <input type="hidden" name="shiftId" defaultValue={shift?.value} />
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="form-label">
                                                رمز عبور
                                            </label>
                                            <div className="position-relative ">
                                                <input
                                                    className={`form-control bg-transparent ${state?.errors?.password && "is-invalid"
                                                        }`}
                                                    type={`${password ? "password" : "text"}`}
                                                    placeholder="رمز عبور"
                                                    name="password"
                                                    autoComplete="off"
                                                />

                                                <span
                                                    className={`btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2`}
                                                    data-kt-password-meter-control="visibility"
                                                    onClick={() => setPassword(!password)}
                                                >
                                                    <i
                                                        className={`ki-outline ki-eye-slash fs-2 ${!password && "d-none"
                                                            }`}
                                                    ></i>
                                                    <i
                                                        className={`ki-outline ki-eye fs-2 ${password && "d-none"
                                                            }`}
                                                    ></i>
                                                </span>
                                                <div
                                                    id="validationServerUsernameFeedback"
                                                    className="invalid-feedback"
                                                >
                                                    {state?.errors?.password}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="form-label">
                                                آدرس
                                            </label>
                                            <textarea
                                                name="address"
                                                className={`form-control ${state?.errors?.address && "is-invalid"
                                                    }`}
                                                placeholder="آدرس"
                                                aria-label="Server"
                                            />
                                            <div className="invalid-feedback">
                                                {state?.errors?.address}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-150px mt-10"
                                            disabled={pending}
                                        >
                                            {pending ? <Spinner /> : "ثبت"}
                                        </button>
                                    </div>
                                    {state?.message === "error" && (
                                        <span className="text-danger d-block mt-3 text-end">
                                            {state?.error}
                                        </span>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
