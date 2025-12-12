'use client'
import Spinner from "@/components/ui/spinner"
import { Shift } from "./shift"
import { useActionState, useEffect } from "react"
import { updateUser } from "@/services/userServices";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { pipeNumber } from "@/services/pipe";

export const Form = ({ user, shifts }: { user: any, shifts: any }) => {
    const [state, action, pending] = useActionState(updateUser, null);
    const router = useRouter();

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
                            name="baseSalary"
                            className="form-control"
                            defaultValue={pipeNumber(user?.baseSalary)}
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