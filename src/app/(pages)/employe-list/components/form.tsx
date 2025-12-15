'use client'
import Spinner from "@/components/ui/spinner"
import { Shift } from "./shift"
import { useActionState, useEffect, useState } from "react"
import { updateUser } from "@/services/userServices";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { pipe } from "@/services/pipe";

export const Form = ({ user, shifts }: { user: any, shifts: any }) => {
    const [salary, setSalary] = useState(`${user.baseSalary}`);
    const [state, action, pending] = useActionState(updateUser, null);
    const router = useRouter();

    const handleInputPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newValue = value.replace(/,/g, "");
        setSalary(newValue)
    }

    useEffect(() => {
        if (state?.success) {
            toast.success("با موفقیت انجام شد");
            router.refresh()
        }
    }, [state])

    return (
        <form action={action}>
            <input type="hidden" name="id" defaultValue={user?.id} />
            <div className="card-body p-9">
                <div className="row mb-7">
                    <label className="col-lg-4 fw-semibold text-muted">نام </label>
                    <div className="col-lg-8">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            defaultValue={user?.name}
                        />
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-semibold text-muted">نام خانوادگی</label>
                    <div className="col-lg-8">
                        <input
                            type="text"
                            name="family"
                            className="form-control"
                            defaultValue={user?.family}
                        />
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-semibold text-muted">شماره بیمه</label>
                    <div className="col-lg-8 fv-row">
                        <input
                            type="text"
                            name="insurance"
                            className="form-control"
                            defaultValue={user?.insurance}
                        />
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-semibold text-muted">شماره موبایل</label>
                    <div className="col-lg-8 d-flex align-items-center">
                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            defaultValue={user?.phone}
                        />
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-semibold text-muted">تلفن اضطراری</label>
                    <div className="col-lg-8 d-flex align-items-center">
                        <input
                            type="text"
                            name="emergencyPhone"
                            className="form-control"
                            defaultValue={user?.emergencyPhone}
                        />
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-semibold text-muted">کد ملی</label>
                    <div className="col-lg-8 d-flex align-items-center">
                        <input
                            type="text"
                            name="nationalCode"
                            className="form-control"
                            defaultValue={user?.nationalCode}
                        />
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-semibold text-muted">پایه حقوق  (تومان)</label>
                    <div className="col-lg-8 d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            value={pipe(salary)}
                            onChange={handleInputPrice}
                        />
                        <input
                            type="hidden"
                            name="baseSalary"
                            defaultValue={salary ?? user?.baseSalary}
                        />
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-semibold text-muted">پسورد جدید</label>
                    <div className="col-lg-8 d-flex align-items-center">
                        <input
                            type="text"
                            name="password"
                            className="form-control"
                            placeholder="پسورد جدید را وارد نمایید"
                        />
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-semibold text-muted">آدرس</label>
                    <div className="col-lg-8 d-flex align-items-center">
                        <textarea
                            name="address"
                            className="form-control"
                            placeholder="آدرس"
                            defaultValue={user?.address}
                        />
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-semibold text-muted">شیفت</label>
                    <div className="col-lg-8 d-flex align-items-center">
                        <Shift
                            shifts={shifts?.data}
                            shiftId={user?.shiftId}
                        />
                    </div>
                </div>
                <div className="row mb-7">
                    <label className="col-lg-4 fw-semibold text-muted">وضعیت</label>
                    <div className="col-lg-8 d-flex align-items-center gap-3">
                        <label htmlFor="userActive" className="d-flex gap-1">
                            <input
                                type="radio"
                                value="ACTIVE"
                                id="userActive"
                                name="status"
                                defaultChecked={user.status === 'ACTIVE'}
                            />
                            فعال
                        </label>
                        <label htmlFor="userNotActive" className="d-flex gap-1">
                            <input
                                type="radio"
                                value="NOTACTIVE"
                                id="userNotActive"
                                name="status"
                                defaultChecked={user.status === 'NOTACTIVE'}
                            />
                            غیرفعال
                        </label>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        type="submit"
                        className="btn btn-primary w-150px mt-10"
                        disabled={pending}
                    >
                        {pending ? <Spinner /> : 'ذخیره تغییرات'}
                    </button>
                </div>
            </div>
        </form>
    )
}