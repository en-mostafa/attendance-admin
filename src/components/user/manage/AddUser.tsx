"use client";
import Spinner from "@/components/ui/spinner";
import { useActionState, useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { addUser } from "@/services/userServices";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ListShifts } from "@/components/admin/work_shift/ListShift";
import dynamic from "next/dynamic";
const Select = dynamic(() => import('react-select'), { ssr: false });

export default function AddUser({ shifts }: { shifts: any }) {
    const router = useRouter();
    const [phone, setPhone] = useState<string>();
    const [password, setPassword] = useState(true);
    const [shift, setShift] = useState<any>(null);
    const [state, action, pending] = useActionState(addUser, null);
    const t = useTranslations("Public");

    useEffect(() => {
        if (state?.message === "success") {
            router.push("/users");
            toast.success(t("toast_success"));
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
                                    {t("User.add_new_customer")}
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
                                                {t("name")}
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                className={`form-control ${state?.errors?.name && "is-invalid"
                                                    }`}
                                                placeholder={t("name")}
                                                aria-label="Server"
                                            />
                                            <div className="invalid-feedback">
                                                {state?.errors?.name}
                                            </div>
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="form-label">
                                                {t("last_name")}
                                            </label>
                                            <input
                                                type="text"
                                                name="family"
                                                className={`form-control ${state?.errors?.family && "is-invalid"}`}
                                                placeholder={t("last_name")}
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
                                                {t("phone_number")}
                                            </label>
                                            <PhoneInput
                                                international
                                                defaultCountry="IR"
                                                value={phone}
                                                onChange={setPhone}
                                                className="h-40px"
                                            />
                                            <input
                                                type="text"
                                                name="phone"
                                                defaultValue={phone}
                                                className={`form-control ${state?.errors?.phone && "is-invalid"
                                                    }`}
                                                hidden
                                            />
                                            <div className="invalid-feedback">
                                                {state?.errors?.phone}
                                            </div>
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="form-label">
                                                پایه حقوق
                                            </label>
                                            <input
                                                type="text"
                                                name="baseSalary"
                                                className={`form-control ${state?.errors?.baseSalary && "is-invalid"
                                                    }`}
                                                placeholder="پایه حقوق (تومان)"
                                                aria-label="Server"
                                            />
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
                                                isMulti
                                                classNamePrefix={'react-select'}
                                                placeholder="انتخاب کنید"
                                                options={ListShifts(shifts)}
                                            />
                                        </div>
                                        <div className="col-md-4 fv-row">
                                            <label htmlFor="basic-url" className="form-label">
                                                {t("User.password")}
                                            </label>
                                            <div className="position-relative ">
                                                <input
                                                    className={`form-control bg-transparent ${state?.errors?.password && "is-invalid"
                                                        }`}
                                                    type={`${password ? "password" : "text"}`}
                                                    placeholder={t("User.password")}
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
                                            {pending ? <Spinner /> : t("info_add")}
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
